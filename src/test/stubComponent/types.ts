import React, { HTMLAttributes } from 'react';
import type { Mock } from 'vitest';
export type IgnorePropsKeys = string[] | '*' | undefined;

type OnEventKeys<T> = {
  [K in keyof T as K extends `on${string}` ? K : never]: T[K];
};

// Probably the best we can do for now. There is no clean way to get the event handlers from the DOMAttributes based
// on the type of element. So just use HTMLDivElement for now.
type GlobalEventHandlers = EventsStartingWithOn<React.DOMAttributes<HTMLDivElement>>;

export type EventType = keyof GlobalEventHandlers;

export type ProxyEventHandlers<Props> = Partial<
  Record<keyof OnEventKeys<Props>, EventType | [EventType, ...unknown[]]>
>;

type EventsStartingWithOn<T> = {
  [K in keyof T as K extends `on${string}` ? K : never]: T[K];
};

export type ImplementStubProps<Props, M extends Record<string, Mock>> = {
  applyEventHandlers?: boolean;
  el?: keyof HTMLElementTagNameMap;
  htmlAttributes?: React.AllHTMLAttributes<Element>;
  ignorePropKeys?: IgnorePropsKeys;
  ignorePropValues?: string[];
  mocks: M;
  name: keyof M;
  proxyEventHandlers?: ProxyEventHandlers<Props>;
  shouldRenderChildren?: boolean;
};

export type StubAttributes = HTMLAttributes<HTMLElement> & {
  'data-props': string | null | undefined; // JSON string
};

export type StubbedElement = React.DetailedReactHTMLElement<StubAttributes, HTMLElement>;
