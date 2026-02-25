import Env from './lib/env.ts';
import * as element from './lib/element.ts';

export type {
  Child,
  HTMLVoidElementTagName,
  Attributes
} from './lib/element.ts';
export type { CellOptions } from './lib/virtual.ts';
export type { Json } from './lib/json.ts';

export const env = new Env();

export default element.html(env);

export const svg = element.svg(env);
export const mathml = element.mathml(env);
export const xml = element.xml(env);
export const list = element.list;
export const virtual = element.virtual(env);
