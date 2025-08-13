import * as element from './lib/dom/element.ts';

const instance = new Map();
if (typeof document !== 'undefined') instance.set('document', document);

export const env = (document: Document) =>
  instance.set('document', document);

export default <T extends keyof HTMLElementTagNameMap>(tag: T) =>
  element.html(instance.get('document'))(tag);

export const svg = <T extends keyof SVGElementTagNameMap>(tag: T) =>
  element.svg(instance.get('document'))(tag);

export const mathml = <T extends keyof MathMLElementEventMap>(tag: T) =>
  element.mathml(instance.get('document'))(tag);

export const xml = (tag: string) =>
  element.xml(instance.get('document'))(tag);

export type { Child, HTMLVoidElementTagName } from './lib/dom/element.ts';

export type { Attributes } from './lib/dom/set.ts';

export { default as list } from './lib/dom/list.ts';
export type { Component } from './lib/dom/list.ts';
