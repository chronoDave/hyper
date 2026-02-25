type CellOptions<T> = {
    /** If empty, equal to container width */
    width?: number | ((data: T, i: number, arr: T[]) => number | null) | null;
    /** If true, cells do not fill container width */
    gap?: boolean;
    height: number | ((data: T, i: number, arr: T[]) => number);
};

type Json = string | number | boolean | null | Json[] | {
    [key: string]: Json;
};

declare class Env {
    private _document;
    private _window;
    get document(): Document;
    set document(document: Document);
    get window(): Window;
    set window(window: Window);
    constructor();
}

type Attributes = Record<string, unknown>;
type HTMLAttributes = Attributes & {
    style?: Record<string, string>;
};
type Child = Node | string;
type HTMLVoidElementTagName = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'input' | 'link' | 'meta' | 'source' | 'track' | 'wbr';

declare const env: Env;
declare const _default: <T extends keyof HTMLElementTagNameMap>(tag: T) => <P extends HTMLAttributes>(attributes?: P) => (...children: T extends HTMLVoidElementTagName ? never[] : Child[]) => HTMLElementTagNameMap[T];

declare const svg: <T extends keyof SVGElementTagNameMap>(tag: T) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => SVGElementTagNameMap[T];
declare const mathml: <T extends keyof MathMLElementEventMap>(tag: T) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => MathMLElement;
declare const xml: (tag: string) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => HTMLElement;
declare const list: <T extends Json>(render: (x: T, i: number, arr: T[]) => Element) => (root: Element) => (next: T[]) => void;
declare const virtual: <T>(cell: CellOptions<T>) => (render: (x: T, i: {
    real: number;
    virtual: number;
}, arr: T[]) => HTMLElement) => (root: HTMLElement) => {
    update: (next: T[]) => void;
    scrollTo: (i: number) => void;
};

export { _default as default, env, list, mathml, svg, virtual, xml };
export type { Attributes, CellOptions, Child, HTMLVoidElementTagName, Json };
