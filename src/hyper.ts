import type { Attributes } from './lib/set.ts';

import { maybe } from './lib/fn.ts';
import * as set from './lib/set.ts';

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

const init = (document: Document) => ({
  create: <T extends Element>(element: (document: Document) => T) =>
    (attributes?: Attributes) =>
      (children: Child[]): T => {
        const root = element(document);

        maybe(set.attributes(root))(attributes);
        root.append(...children);

        return root;
      }
});

let hyper = typeof document !== 'undefined' ?
  init(document) :
  null;

export const env = (document: Document) => {
  hyper = init(document);
};

/**
 * Create HTML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 */
export default <T extends keyof HTMLElementTagNameMap>(tag: T) =>
  <P extends Attributes>(attributes?: P) =>
    (...children: T extends HTMLVoidElementTagName ? never[] : Child[]) => {
      if (!hyper) throw new Error('Missing env');
      return hyper.create(document => document.createElement(tag))(attributes)(children);
    };

/**
 * Create SVG element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const svg = <T extends keyof SVGElementTagNameMap>(tag: T) =>
  <P extends Attributes>(attributes?: P) =>
    (...children: Child[]) => {
      if (!hyper) throw new Error('Missing env');
      return hyper.create(document => document.createElementNS('http://www.w3.org/2000/svg', tag))(attributes)(children);
    };

/**
 * Create MathML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const mathml = <T extends keyof MathMLElementEventMap>(tag: T) =>
  <P extends Attributes>(attributes?: P) =>
    (...children: Child[]) => {
      if (!hyper) throw new Error('Missing env');
      return hyper.create(document => document.createElementNS('http://www.w3.org/1998/Math/MathML', tag))(attributes)(children);
    };

/**
 * Create XML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const xml = (tag: string) =>
  <P extends Attributes>(attributes?: P) =>
    (...children: Child[]) => {
      if (!hyper) throw new Error('Missing env');
      return hyper.create(document => document.createElementNS('http://www.w3.org/1999/xhtml', tag))(attributes)(children);
    };
