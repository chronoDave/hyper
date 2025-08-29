import * as element from './lib/dom/element.ts';
import Env from './lib/env.ts';

export const env = new Env();

export default <T extends keyof HTMLElementTagNameMap>(tag: T) =>
  element.html(env.document)(tag);

export const svg = <T extends keyof SVGElementTagNameMap>(tag: T) =>
  element.svg(env.document)(tag);

export const mathml = <T extends keyof MathMLElementEventMap>(tag: T) =>
  element.mathml(env.document)(tag);

export const xml = (tag: string) =>
  element.xml(env.document)(tag);

export type { Child, HTMLVoidElementTagName } from './lib/dom/element.ts';

export type { Attributes } from './lib/dom/set.ts';

export { default as list } from './lib/dom/list.ts';
export type { Component } from './lib/dom/list.ts';
