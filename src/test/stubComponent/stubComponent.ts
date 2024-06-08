import { Children, PropsWithChildren, createElement } from 'react';
import type { Mock } from 'vitest';
import { EventType, IgnorePropsKeys, ImplementStubProps, ProxyEventHandlers } from './types';
import { DEFAULT_ELEMENT, IGNORED, stringify } from './constants';
import { formatFunctionName, getComponentFunctionName, isEmpty, noop, titleCase } from './utils';
import type { StubbedElement } from './types';

const stubbedComponents: Record<string, StubbedElement> = {};

export function stubComponent<Props, Mocks extends Record<string, Mock>>({
  el = DEFAULT_ELEMENT,
  applyEventHandlers = true,
  name,
  mocks,
  ignorePropKeys,
  ignorePropValues,
  htmlAttributes,
  proxyEventHandlers,
  shouldRenderChildren,
}: ImplementStubProps<Props, Mocks>) {
  const shouldStringify = (p?: Props, propKeys?: IgnorePropsKeys) =>
    !isEmpty(p) && propKeys !== '*';
  mocks[name].mockImplementation((props?: Props) => {
    const propsJSON = shouldStringify(props, ignorePropKeys)
      ? stringify(props, replacer({ ignorePropKeys, ignorePropValues }))
      : null;
    const eventHandlers = generateEventHandlers<Props>({
      applyEventHandlers,
      componentProps: props,
      proxyEventHandlers,
    });

    const stubComponent = createElement(
      el,
      {
        'data-stub': name,
        'data-testid': name,
        'data-props': propsJSON,
        ...htmlAttributes,
        ...eventHandlers,
      },
      shouldRenderChildren ? Children.toArray((props as PropsWithChildren<Props>).children) : null
    );
    if (stubComponent.props['data-props']) {
      stubbedComponents[name as string] = stubComponent;
    }
    return stubComponent;
  });
  return mocks[name];
}

const replacer = ({
  ignorePropKeys = [],
  ignorePropValues = [],
}: {
  ignorePropKeys?: IgnorePropsKeys;
  ignorePropValues?: string[];
}) => {
  const ignoreKeysSet = new Set(['children', ...ignorePropKeys]);

  const shouldIgnoreKey = (key: string) => {
    return key.startsWith('_') || ignoreKeysSet.has(key);
  };

  const shouldIgnoreValue = (key: string) => ignorePropValues.includes(key);

  return (key: number | string, value: unknown) => {
    if (typeof key === 'string') {
      if (shouldIgnoreKey(key)) return undefined;
      if (shouldIgnoreValue(key)) return IGNORED;
    }

    if (typeof value === 'function') {
      return formatFunctionName(getComponentFunctionName(value).name);
    }

    return value;
  };
};

const generateEventHandlers = <Props>({
  componentProps,
  proxyEventHandlers,
  applyEventHandlers,
}: {
  componentProps?: Props;
  applyEventHandlers?: boolean;
  proxyEventHandlers?: ProxyEventHandlers<Props>;
}) => {
  if (!applyEventHandlers || !componentProps) return null;

  const handlers = {} as Record<string, () => void>;

  for (const prop in componentProps) {
    if (prop.startsWith('on') && typeof componentProps[prop] === 'function') {
      handlers[prop] = componentProps[prop] as () => void;
    }
  }

  if (!proxyEventHandlers) {
    return isEmpty(handlers) ? null : handlers;
  }

  for (const name in proxyEventHandlers) {
    const originalFn = componentProps[name as keyof typeof proxyEventHandlers] as () => void;
    const proxyFnWithArgs = proxyEventHandlers[name as keyof typeof proxyEventHandlers];

    let onHandler = (
      Array.isArray(proxyFnWithArgs) ? proxyFnWithArgs[0] : proxyFnWithArgs
    ) as string;
    onHandler = onHandler.startsWith('on') ? onHandler : `on${titleCase(onHandler)}`;

    handlers[onHandler] = bindOriginalFnWithProxyParams(originalFn, proxyFnWithArgs);
  }
  return handlers;
};

function bindOriginalFnWithProxyParams(
  originalFn: (() => void) | undefined,
  proxyFnWithArgs?: EventType | [EventType, ...unknown[]]
) {
  if (!originalFn) return noop;
  if (!proxyFnWithArgs || !Array.isArray(proxyFnWithArgs)) {
    return originalFn;
  }
  return originalFn.bind(undefined, ...proxyFnWithArgs.slice(1, proxyFnWithArgs.length));
}

export function getStubProps<Props>(name: string, propertyName?: keyof Props) {
  const stub = stubbedComponents[name];
  if (!stub) throw new Error(`Stub component ${name} not found in ${stubbedComponents}`);
  if (stub.props['data-props']) {
    const props = JSON.parse(stub.props['data-props'] as string) as Props;
    return propertyName ? props[propertyName] : props;
  }
  throw new Error(`Stub has no props ${stubbedComponents}`);
}
