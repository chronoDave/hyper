import { maybe } from './fn.ts';

export type Child = Node | string;

export type Attributes = Record<string, unknown>;

/**
 * Set element attributes
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
 * */
export const set = (element: Element) =>
  (attributes: Attributes) => {
    Object.entries(attributes).forEach(([k, v]) => {
      if (typeof v === 'string') element.setAttribute(k, v);
      if (typeof v === 'number') element.setAttribute(k, `${v}`);
      if (typeof v === 'boolean') element.setAttribute(k, `${v}`);
    });
  };

export type HTMLVoidElementTag = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'input' | 'link' | 'meta' | 'source' | 'track' | 'wbr';

/**
 * Create HTML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
*/
export const html = (document: Document) =>
  <T extends keyof HTMLElementTagNameMap>(tag: T) =>
    (attributes?: Attributes) =>
      (...children: T extends HTMLVoidElementTag ? never[] : Child[]) => {
        const root = document.createElement(tag);

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
    (attributes?: Attributes) =>
      (...children: Child[]) => {
        const root = document.createElementNS('http://www.w3.org/2000/svg', tag);

        maybe(set(root))(attributes);
        root.append(...children);

        return root;
      };

/**
 * Create MathML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const mathml = (document: Document) =>
  <T extends keyof MathMLElementEventMap>(tag: T) =>
    (attributes?: Attributes) =>
      (...children: Child[]) => {
        const root = document.createElementNS('http://www.w3.org/1998/Math/MathML', tag);

        maybe(set(root))(attributes);
        root.append(...children);

        return root;
      };

/**
 * Create XML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const xml = (document: Document) =>
  (tag: string) =>
    (attributes?: Attributes) =>
      (...children: Child[]) => {
        const root = document.createElementNS('http://www.w3.org/1999/xhtml', tag);

        maybe(set(root))(attributes);
        root.append(...children);

        return root;
      };
