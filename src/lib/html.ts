import { maybe } from './fn.ts';

export type Child = Element | Text | string;

export type Attributes = Record<string, unknown>;

export type HTMLVoidElementTag = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'input' | 'link' | 'meta' | 'source' | 'track' | 'wbr';

export const set = (element: Element) =>
  (attributes: Attributes) => {
    Object.entries(attributes).forEach(([k, v]) => {
      if (typeof v === 'string') element.setAttribute(k, v);
      if (typeof v === 'number') element.setAttribute(k, `${v}`);
      if (typeof v === 'boolean') element.setAttribute(k, `${v}`);
    });

    return element;
  };

export default (document: Document) =>
  <T extends keyof HTMLElementTagNameMap>(tag: T) =>
    (attributes?: Attributes) =>
      (...children: T extends HTMLVoidElementTag ? never[] : Child[]) => {
        const root = document.createElement(tag);
        maybe(set(root))(attributes);
        root.append(...children);

        return root;
      };
