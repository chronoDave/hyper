import type { Cell, CellOptions } from './virtual.ts';
import type { Json } from './json.ts';
import type Env from './env.ts';

import { debounce, maybe } from './fn.ts';
import { cells, height, view } from './virtual.ts';
import * as array from './array.ts';
import { clone, equals } from './json.ts';

export type Attributes = Record<string, unknown>;

export type HTMLAttributes = Attributes & {
  style?: Record<string, string>;
};

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
export const set = (element: Element) =>
  (attributes: Attributes): void => Object
    .entries(attributes)
    .forEach(([k, v]) => {
      if (typeof v === 'string') element.setAttribute(k, v);
      if (typeof v === 'number') element.setAttribute(k, `${v}`);
      if (v === true) element.toggleAttribute(k, v);
    });

export const style = (element: HTMLElement) =>
  (style: Record<string, string>): void => Object
    .entries(style)
    .forEach(([k, v]) => {
      element.style.setProperty(k, v);
    });

export type Child = Node | string;

const create = <T extends Element>(element: T) =>
  (attributes?: Attributes) =>
    (children: Child[]): T => {
      maybe(set(element))(attributes);

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
export const html = (env: Env) =>
  <T extends keyof HTMLElementTagNameMap>(tag: T) =>
    <P extends HTMLAttributes>(attributes?: P) =>
      (...children: T extends HTMLVoidElementTagName ? never[] : Child[]) => {
        const root = create(env.document.createElement(tag))(attributes)(children);
        maybe(style(root))(attributes?.style);

        return root;
      };

/**
 * Create SVG element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const svg = (env: Env) =>
  <T extends keyof SVGElementTagNameMap>(tag: T) =>
    <P extends Attributes>(attributes?: P) =>
      (...children: Child[]) =>
        create(env.document.createElementNS('http://www.w3.org/2000/svg', tag))(attributes)(children);

/**
 * Create MathML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const mathml = (env: Env) =>
  <T extends keyof MathMLElementEventMap>(tag: T) =>
    <P extends Attributes>(attributes?: P) =>
      (...children: Child[]) =>
        create(env.document.createElementNS('http://www.w3.org/1998/Math/MathML', tag))(attributes)(children);

/**
 * Create XML element
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
export const xml = (env: Env) =>
  (tag: string) =>
    <P extends Attributes>(attributes?: P) =>
      (...children: Child[]) =>
        create(env.document.createElementNS('http://www.w3.org/1999/xhtml', tag))(attributes)(children);

/**
 * Create cached element container.
 * 
 * `list` only support the following types:
 * 
 * - `string`
 * - `number`
 * - `boolean`
 * - `null`
 * - `array`
 * - `object`
 * 
 * Where `array` and `object` can only contain aformentioned types.
 * 
 * @see https://github.com/chronoDave/hyper?tab=readme-ov-file#list
 */
export const list = <T extends Json>(render: (x: T, i: number, arr: T[]) => Element) =>
  (root: Element) => {
    let cache: T[] = [];

    return (next: T[]): void => {
      /** Remove excess children in reverse order */
      while (root.children.length > next.length) root.lastChild?.remove();

      next.forEach((x, i) => {
        if (i < cache.length && equals(x)(cache[i])) return;

        const element = render(x, i, next);
        const child = root.children.item(i);

        if (child) {
          root.replaceChild(element, child);
        } else {
          root.appendChild(element);
        }
      });

      cache = clone(next);
    };
  };

/**
 * Create virtualised element container
 * 
 * @see https://github.com/chronoDave/hyper?tab=readme-ov-file#virtual
*/
export const virtual = (env: Env) =>
  <T>(cell: CellOptions<T>) =>
    (render: (x: T, i: { real: number; virtual: number }, arr: T[]) => HTMLElement) =>
      (root: HTMLElement) => {
        style(root)({
          'position': 'relative',
          'max-height': '100%',
          'overflow-y': 'scroll'
        });

        let cache: Cell[] = [];
        let state: T[] = [];

        const update = debounce(env)((full?: boolean) => {
          if (full) cache = cells(cell)({ width: root.getBoundingClientRect().width })(state);

          const [min, max] = view({
            height: root.getBoundingClientRect().height,
            y: Math.floor(root.scrollTop)
          })(cache);

          const spacer = html(env)('div')({
            'aria-hidden': 'true',
            'style': {
              'width': '100%',
              'height': `${height(cache)}px`,
              'z-index': '-1'
            }
          })();

          root.replaceChildren(...cache.slice(min, max + 1).map((cell, j) => {
            const child = render(state[cell.i], { real: cell.i, virtual: j }, state);
            style(child)({
              position: 'absolute',
              transform: `translate(${cell.x}px, ${cell.y}px)`,
              width: `${cell.width}px`,
              height: `${cell.height}px`
            });

            return child;
          }), spacer);
        });

        root.addEventListener('scroll', () => update(false), { passive: true });
        env.window.addEventListener('resize', () => update(true), { passive: true });

        return {
          update: (next: T[]) => {
            state = next;

            update(true);
          },
          scrollTo: (i: number) => {
            const y = array.get(cache)(i)?.y;
            if (typeof y !== 'number') return;

            root.scrollTop = y;
          }
        };
      };
