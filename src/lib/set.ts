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
export const attributes = (element: Element) =>
  (attributes: Attributes): void => Object
    .entries(attributes)
    .forEach(([k, v]) => {
      if (typeof v === 'string') element.setAttribute(k, v);
      if (typeof v === 'number') element.setAttribute(k, `${v}`);
      if (v === true) element.toggleAttribute(k, v);
    });
