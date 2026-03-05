declare class Env {
	private _document;
	private _window;
	get document(): Document;
	set document(document: Document);
	get window(): Window;
	set window(window: Window);
	constructor();
}
export type CellOptions<T> = {
	/** If null, equal to container width */
	width?: number | ((data: T, i: number, arr: T[]) => number | null) | null;
	/** If true, cells do not fill container width */
	gap?: boolean;
	/** If null, equal to item height (1:1) */
	height: number | ((data: T, i: number, arr: T[]) => number | null) | null;
};
export type Json = string | number | boolean | null | Json[] | {
	[key: string]: Json;
};
export type Attributes = Record<string, unknown>;
type HTMLAttributes = Attributes & {
	style?: Record<string, string>;
};
export type Child = Node | string;
export type HTMLVoidElementTagName = "area" | "base" | "br" | "col" | "embed" | "hr" | "img" | "input" | "link" | "meta" | "source" | "track" | "wbr";
export declare const env: Env;
declare const _default: <T extends string = keyof HTMLElementTagNameMap>(tag: T) => <P extends HTMLAttributes>(attributes?: P) => (...children: T extends HTMLVoidElementTagName ? never[] : Child[]) => T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : HTMLElement;
export declare const set: (element: Element) => (attributes: Attributes) => void;
export declare const style: (element: HTMLElement) => (style: Record<string, string>) => void;
export declare const svg: <T extends string = keyof SVGElementTagNameMap>(tag: T) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => T extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[T] : SVGElement;
export declare const mathml: <T extends string = keyof MathMLElementEventMap>(tag: T) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => T extends keyof MathMLElementEventMap ? MathMLElementEventMap[T] : MathMLElement;
export declare const xml: (tag: string) => <P extends Attributes>(attributes?: P) => (...children: Child[]) => HTMLElement;
export declare const list: <T extends Json>(render: (x: T, i: number, arr: T[]) => Element) => (root: Element) => (next: T[]) => void;
export declare const virtual: <T>(cell: CellOptions<T>) => (render: (x: T, i: {
	real: number;
	virtual: number;
}, arr: T[]) => HTMLElement) => (root: HTMLElement) => {
	update: (next: T[]) => void;
	scrollTo: (i: number) => void;
};

export {
	_default as default,
};

export {};
