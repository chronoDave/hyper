import type { Attributes } from './set.ts';

import { maybe } from './fn.ts';
import * as set from './set.ts';

export type Child = Node | string;

export type HTMLVoidElementTagName =
  'area' |
  'base' |
  'br' |
  'col' |
  'embed' |
  'hr' |
  'img' |
  'input' |
  'link' |
  'meta' |
  'source' |
  'track' |
  'wbr';

const create = <T extends Element>(element: T) =>
  (attributes?: Attributes) =>
    (children: Child[]): T => {
      maybe(set.attributes(element))(attributes);
      element.append(...children);

      return element;
    };

/**
 * Create HTML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 */
export const html = (document: Document) =>
  <T extends keyof HTMLElementTagNameMap>(tag: T) =>
    <P extends Attributes>(attributes?: P) =>
      (...children: T extends HTMLVoidElementTagName ? never[] : Child[]) =>
        create(document.createElement(tag))(attributes)(children);

/**
 * Create SVG element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const svg = (document: Document) =>
  <T extends keyof SVGElementTagNameMap>(tag: T) =>
    <P extends Attributes>(attributes?: P) =>
      (...children: Child[]) =>
        create(document.createElementNS('http://www.w3.org/2000/svg', tag))(attributes)(children);

/**
 * Create MathML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const mathml = (document: Document) =>
  <T extends keyof MathMLElementEventMap>(tag: T) =>
    <P extends Attributes>(attributes?: P) =>
      (...children: Child[]) =>
        create(document.createElementNS('http://www.w3.org/1998/Math/MathML', tag))(attributes)(children);

/**
 * Create XML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const xml = (document: Document) =>
  (tag: string) =>
    <P extends Attributes>(attributes?: P) =>
      (...children: Child[]) =>
        create(document.createElementNS('http://www.w3.org/1999/xhtml', tag))(attributes)(children);
