import type { Cell, CellOptions } from './virtual.ts';
import type { Json } from './json.ts';
import type Env from './env.ts';

import { debounce, maybe } from './fn.ts';
import * as v from './virtual.ts';
import * as array from './array.ts';
import * as json from './json.ts';

export type HTMLAttributes = {
  [key: string]: unknown;
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
 *
 */
export const set = (element: Element) =>
  (attributes: Record<string, unknown>): void => Object
    .entries(attributes)
    .forEach(([k, v]) => {
      if (typeof v === 'string') element.setAttribute(k, v);
      if (typeof v === 'number') element.setAttribute(k, `${v}`);
      if (v === true) element.toggleAttribute(k, v);
    });

/**
 * Set element styles.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty
 */
export const style = (element: HTMLElement) =>
  (style: Record<string, string>): void => Object
    .entries(style)
    .forEach(([k, v]) => {
      element.style.setProperty(k, v);
    });

export type Child = Node | string;

const create = <T extends Element>(element: T) =>
  (attributes?: Record<string, unknown>) =>
    (...children: Child[]): T => {
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
  <T extends string = keyof HTMLElementTagNameMap>(tag: T) =>
    (attributes?: HTMLAttributes) =>
      (...children: T extends HTMLVoidElementTagName ? never[] : Child[]) => {
        const root = create(env.document.createElement(tag))(attributes)(...children) as T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : HTMLElement;
        maybe(style(root))(attributes?.style);

        return root;
      };

/**
 * Create SVG element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
 */
export const svg = (env: Env) =>
  <T extends string = keyof SVGElementTagNameMap>(tag: T) =>
    create(env.document.createElementNS('http://www.w3.org/2000/svg', tag) as T extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[T] : SVGElement);

/**
 * Create MathML element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
 */
export const mathml = (env: Env) =>
  <T extends string = keyof MathMLElementTagNameMap>(tag: T) =>
    create(env.document.createElementNS('http://www.w3.org/1998/Math/MathML', tag) as T extends keyof MathMLElementTagNameMap ? MathMLElementTagNameMap[T] : MathMLElement);

/**
 * Create XML element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
 */
export const xml = (env: Env) =>
  (tag: string) =>
    create(env.document.createElementNS('http://www.w3.org/1999/xhtml', tag));

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
        if (i < cache.length && json.equals(x)(cache[i])) return;

        const element = render(x, i, next);
        const child = root.children.item(i);

        if (child) {
          root.replaceChild(element, child);
        } else {
          root.appendChild(element);
        }
      });

      cache = json.clone(next); // Create clone to break reference
    };
  };

export type VirtualOptions<T> = CellOptions<T> & {
  render: (x: T, i: { real: number; virtual: number }, arr: T[]) => HTMLElement;
};

/**
 * Create cached virtualised element container
 *
 * @see https://github.com/chronoDave/hyper?tab=readme-ov-file#virtual
 */
export const virtual = (env: Env) =>
  <T>(options: VirtualOptions<T>) =>
    (root: HTMLElement, container?: HTMLElement) => {
      root.style.overflowY = 'scroll';

      container ??= html(env)('div')()();
      style(container)({ position: 'relative', height: '100%' });
      root.replaceChildren(container);

      let cells: Cell[] = [];
      let state: T[] = [];
      let cache: HTMLElement[] = [];

      const update = (force?: boolean) => {
        if (force) {
          cache = [];
          cells = v.cells(options)({ width: root.clientWidth })(state);
        }

        const [min, max] = v.view({
          height: root.getBoundingClientRect().height,
          y: Math.floor(root.scrollTop)
        })(cells);

        container.style.height = `${v.height(cells)}px`;
        container.replaceChildren(...cells.slice(min, max + 1).map((cell, j) => {
          let child = array.get(cache)(cell.i);
          if (!child) {
            child = options.render(state[cell.i], { real: cell.i, virtual: j }, state);
            style(child)({
              position: 'absolute',
              transform: `translate(${cell.x}px, ${cell.y}px)`,
              width: `${cell.width}px`,
              height: `${cell.height}px`
            });
            cache[cell.i] = child;
          }

          return child;
        }));
      };

      const scroll = () => debounce(env)(update)(false);
      const resize = () => debounce(env)(update)(true);

      root.addEventListener('scroll', scroll, { passive: true });
      env.window.addEventListener('resize', resize, { passive: true });

      // @ts-expect-error: TS2339, it does exist, actually (https://github.com/Microsoft/TypeScript/issues/11305)
      const observer: MutationObserver = new env.window.MutationObserver(mutations => {
        for (const mutation of mutations) {
          for (const element of mutation.removedNodes) {
            if (element === root) {
              observer.disconnect();
              root.removeEventListener('scroll', scroll);
              env.window.removeEventListener('resize', resize);
            }
          }
        }
      });
      if (root.parentElement) observer.observe(root.parentElement, {
        childList: true
      });

      return {
        update: (next: T[]) => {
          state = next;

          update(true);
        },
        scrollTo: (i: number) => {
          const y = array.get(cells)(i)?.y;
          if (typeof y !== 'number') return;

          root.scrollTop = y;
        }
      };
    };
