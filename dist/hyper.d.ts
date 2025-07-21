type Attributes = Record<string, unknown>;

type Child = Node | string;
type HTMLVoidElementTagName = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'input' | 'link' | 'meta' | 'source' | 'track' | 'wbr';
declare const env: (document: Document) => void;
/**
 * Create HTML element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 */
declare const _default: <T extends keyof HTMLElementTagNameMap>(tag: T) => <P extends Attributes>(attributes?: P) => (...children: T extends HTMLVoidElementTagName ? never[] : Child[]) => HTMLElementTagNameMap[T];

/**
 * Create SVG element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
declare const svg: <T extends keyof SVGElementTagNameMap>(tag: T) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => SVGElementTagNameMap[T];
/**
 * Create MathML element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
declare const mathml: <T extends keyof MathMLElementEventMap>(tag: T) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => MathMLElement;
/**
 * Create XML element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
declare const xml: (tag: string) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => HTMLElement;

export { _default as default, env, mathml, svg, xml };
export type { Child, HTMLVoidElementTagName };
