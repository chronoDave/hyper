type Attributes = Record<string, unknown>;

type Child = Node | string;
type HTMLVoidElementTagName = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'input' | 'link' | 'meta' | 'source' | 'track' | 'wbr';
/**
 * Create HTML element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 */
declare const _default: (document: Document) => <T extends keyof HTMLElementTagNameMap>(tag: T) => <P extends Attributes>(attributes?: P) => (...children: T extends HTMLVoidElementTagName ? never[] : Child[]) => HTMLElementTagNameMap[T];

/**
 * Create SVG element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
declare const svg: (document: Document) => <T extends keyof SVGElementTagNameMap>(tag: T) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => SVGElementTagNameMap[T];
/**
 * Create MathML element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
declare const mathml: (document: Document) => <T extends keyof MathMLElementEventMap>(tag: T) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => MathMLElement;
/**
 * Create XML element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
*/
declare const xml: (document: Document) => (tag: string) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => HTMLElement;

export { _default as default, mathml, svg, xml };
export type { Child, HTMLVoidElementTagName };
