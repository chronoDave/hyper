import { maybe } from './fn.ts';

export type Attributes = Record<string, unknown>;

/**
 * Set element attributes
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
 * */
export const set = (element: Element) =>
  (attributes: Attributes): void => Object
    .entries(attributes)
    .forEach(([k, v]) => {
      if (typeof v === 'string') element.setAttribute(k, v);
      if (typeof v === 'number') element.setAttribute(k, `${v}`);
      if (typeof v === 'boolean') element.setAttribute(k, `${v}`);
    });

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

/**
 * Create HTML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 */
export const html = (document: Document) =>
  <T extends keyof HTMLElementTagNameMap>(tag: T) =>
    <P extends Attributes>(attributes?: P) =>
      (...children: T extends HTMLVoidElementTagName ? never[] : Child[]) => {
        const root = document.createElement(tag);

        maybe(set(root))(attributes);
        root.append(...children);

        return root;
      };

const create = <T extends Element>(element: () => T) =>
  <P extends Attributes>(attributes?: P) =>
    (...children: Child[]) => {
      const root = element();

      maybe(set(root))(attributes);
      root.append(...children);

      return root;
    };

/**
 * Create SVG element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const svg = (document: Document) =>
  <T extends keyof SVGElementTagNameMap>(tag: T) =>
    create(() => document.createElementNS('http://www.w3.org/2000/svg', tag));

/**
 * Create MathML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const mathml = (document: Document) =>
  <T extends keyof MathMLElementEventMap>(tag: T) =>
    create(() => document.createElementNS('http://www.w3.org/1998/Math/MathML', tag));

/**
 * Create XML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const xml = (document: Document) =>
  <T extends string>(tag: T) =>
    create(() => document.createElementNS('http://www.w3.org/1999/xhtml', tag));
