type Attributes = Record<string, unknown>;
type Child = Node | string;
type HTMLVoidElementTagName = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'input' | 'link' | 'meta' | 'source' | 'track' | 'wbr';

declare class Env {
    private _document;
    get document(): Document;
    set document(document: Document);
    constructor();
}

declare const env: Env;
declare const _default: <T extends keyof HTMLElementTagNameMap>(tag: T) => <P extends Attributes>(attributes?: P | undefined) => (...children: T extends HTMLVoidElementTagName ? never[] : Child[]) => HTMLElementTagNameMap[T];

declare const svg: <T extends keyof SVGElementTagNameMap>(tag: T) => <P extends Attributes>(attributes?: P | undefined) => (...children: Child[]) => SVGElementTagNameMap[T];
declare const mathml: <T extends keyof MathMLElementEventMap>(tag: T) => <P extends Attributes>(attributes?: P | undefined) => (...children: Child[]) => MathMLElement;
declare const xml: (tag: string) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => HTMLElement;
declare const list: <T>(render: (data: T, i: number) => Element) => (root: Element) => (next: T[]) => void;

export { _default as default, env, list, mathml, svg, xml };
export type { Attributes, Child, HTMLVoidElementTagName };
