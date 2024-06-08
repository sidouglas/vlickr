import { formatType, getType, isObject, isReactElement, isStub } from './utils';

const TEST_SYMBOL = Symbol.for('react.test.json');

const processObject = (value) => {
  if (!isObject(value) || value.$$typeof === TEST_SYMBOL) {
    return value;
  }

  if (isReactElement(value)) {
    const { children, ...props } = value.props;
    const processedChildren = getChildren([].concat(children).filter(Boolean));
    const type = getType(value);

    return {
      ...value,
      $$typeof: TEST_SYMBOL,
      children: processedChildren,
      props: processProps(props),
      type: formatType(type),
    };
  }

  if (value instanceof HTMLElement || value instanceof SVGElement) {
    return value;
  }

  return Array.isArray(value)
    ? value.map(processObject)
    : Object.entries(value).reduce((acc, [key, value]) => {
        acc[key] = processObject(value);
        return acc;
      }, {});
};

const processProps = (props) => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    acc[key] = processObject(value);
    return acc;
  }, {});
};

const getChildren = (children, html = '') => {
  const childrenObjects = Array.from(children);
  const hasChildrenObjects = childrenObjects.length > 0;
  const childrenHTML = hasChildrenObjects ? '' : html;
  const hasChildrenHTML = childrenHTML.trim().length > 0;

  return hasChildrenObjects
    ? childrenObjects.map((child) =>
        Array.isArray(child) ? getChildren(child) : processObject(child)
      )
    : hasChildrenHTML
      ? [childrenHTML]
      : undefined;
};

export default {
  serialize(val, config, indentation, depth, refs, printer) {
    const json = {
      ...val,
      $$typeof: TEST_SYMBOL,
      children: getChildren(val.children, val.innerHTML),
      props: processProps(JSON.parse(val.dataset.props || '{}')),
      type: val.dataset.stub,
    };

    return printer(json, config, indentation, depth, refs, printer);
  },

  test(val) {
    return isStub(val);
  },
};
