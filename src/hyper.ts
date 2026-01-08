import * as element from './lib/element.ts';
import Env from './lib/env.ts';

export type { Child, HTMLVoidElementTagName, Attributes } from './lib/element.ts';

export const env = new Env();

export default <T extends keyof HTMLElementTagNameMap>(tag: T) =>
  element.html(env.document)(tag);

export const svg = <T extends keyof SVGElementTagNameMap>(tag: T) =>
  element.svg(env.document)(tag);

export const mathml = <T extends keyof MathMLElementEventMap>(tag: T) =>
  element.mathml(env.document)(tag);

export const xml = (tag: string) =>
  element.xml(env.document)(tag);

export const list = element.list;
