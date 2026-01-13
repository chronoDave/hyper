import { maybe } from './fn.ts';

export type Attributes = Record<string, unknown>;

/**
 * Set element attributes.
 * 
 * Only `string`, `number` and `true` attributes are set:
 * 
 *  - `string`: `key="string"`
 *  - `number`: `key="number"`
 *  - `true`: `key=""`
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
 * */
export const setAttributes = (element: Element) =>
  (attributes: Attributes): void => Object
    .entries(attributes)
    .forEach(([k, v]) => {
      if (typeof v === 'string') element.setAttribute(k, v);
      if (typeof v === 'number') element.setAttribute(k, `${v}`);
      if (v === true) element.toggleAttribute(k, v);
    });

export type Child = Node | string;

const create = <T extends Element>(element: T) =>
  (attributes?: Attributes) =>
    (children: Child[]): T => {
      maybe(setAttributes(element))(attributes);
      element.append(...children);

      return element;
    };

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

/**
 * Create cached element container
 * 
 * @see https://github.com/chronoDave/hyper?tab=readme-ov-file#list
 */
export const list = <T>(render: (x: T, i: number, arr: T[]) => Element) =>
  (key: (x: T) => string) =>
    (root: Element) => {
      const cache = new Map<string, Element>();

      return (next: T[]): void => {
        const refs = new WeakSet();

        /** Remove excess children in reverse order */
        while (root.children.length > next.length) root.lastChild?.remove();

        next.forEach((x, i) => {
          const k = key(x);
          const child = root.children.item(i);

          let element = cache.get(k);

          /** If data is cached and unchanged, return */
          if (element === child) return;

          /** Create and cache element */
          if (!element) {
            element = render(x, i, next);
            cache.set(k, element);
          }

          /** If data has duplicate entries, clone node */
          if (refs.has(element)) {
            element = element.cloneNode(true) as Element;
          } else {
            refs.add(element);
          }

          /** If child exists at current index replace with element, otherwise append element */
          if (child) {
            root.replaceChild(element, child);
          } else {
            root.appendChild(element);
          }
        });
      };
    };