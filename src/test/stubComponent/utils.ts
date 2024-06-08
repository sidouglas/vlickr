import type { Mock } from 'vitest';
// import { vi } from 'vitest';
import { FN_ANONYMOUS, FN_PREFIX } from './constants';

export const getComponentFunctionName = (func: unknown) => {
  return vi.isMockFunction(func)
    ? (func as Mock)
    : { name: (func as { name?: string }).name ?? FN_ANONYMOUS };
};
export const isEmpty = (...objs: unknown[]) => {
  return objs.every((obj) => !obj || Object.keys(obj).length === 0);
};
export const noop = () => {};

export const titleCase = (str: string) => str[0].toUpperCase() + str.slice(1);

export const formatFunctionName = (str?: string) => `${FN_PREFIX}${str || FN_ANONYMOUS}`;

export const isObject = (obj: unknown): obj is object => typeof obj === 'object' && obj !== null;

export const isStub = (val: unknown) => val instanceof HTMLElement && val.dataset.stub != null;

export const isReactElement = (obj?: object) =>
  // eslint-disable-next-line no-prototype-builtins
  ['key', 'props', 'ref'].every((key) => obj?.hasOwnProperty(key));

export const getType = (value: { type?: string | { displayName?: string; render?: string } }) =>
  (isObject(value.type) ? value.type.displayName || value.type.render : value.type) || 'Fragment';

export const formatType = (type: string) =>
  type.startsWith(FN_PREFIX) ? titleCase(type.replace(FN_PREFIX, '')) : type;

const DOM_EVENT_HANDLERS = new Set([
  'onBlur',
  'onChange',
  'onClick',
  'onContextMenu',
  'onCopy',
  'onCut',
  'onDoubleClick',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onError',
  'onFocus',
  'onInput',
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  'onLoad',
  'onMouseDown',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onPaste',
  'onScroll',
  'onSubmit',
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
  'onWheel',
]);
export const isValidEventHandler = (handler: string) => DOM_EVENT_HANDLERS.has(handler);
export const baseName = (p: string) => p.substring(p.lastIndexOf('/') + 1);
