import * as element from './element.ts';
import { clamp } from './math.ts';

export type TargetAttribute = '_blank' | '_self' | '_parent' | '_top';
export type RelAttribute = 'help' | 'license' | 'next' | 'prev' | 'search';
export type LoadingAttribute = 'lazy' | 'eager';
export type ReferrerAttribute = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
export type AutocompleteAttribute = 'off' | 'on' | string;
export type FetchPriorityAttribute = 'high' | 'low' | 'auto';

export type HTMLElementAttributes = {
  accesskey: string;
  autocapitalize: 'on' | 'off' | 'none' | 'sentences' | 'words' | 'characters';
  autofocus: boolean;
  contenteditable: 'true' | 'plaintext-only' | 'false';
  dir: 'ltr' | 'rtl' | 'auto';
  draggable: 'true' | 'false';
  enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  hidden: 'until-found' | 'hidden' | true;
  inert: boolean;
  inputmode: 'none' | 'text' | 'tel' | 'email' | 'url' | 'numeric' | 'decimal' | 'search';
  is: string;
  itemid: string;
  itemprop: string;
  itemref: string;
  itemscope: boolean;
  itemtype: string;
  lang: string;
  nonce: string;
  popover: 'auto' | 'manual';
  spellcheck: 'true' | 'false';
  style: string;
  tabindex: number;
  title: string;
  translate: 'yes' | 'no';
} & Record<string, undefined>;

export type HTMLAElementAttributes = HTMLElementAttributes & {
  href: string;
  target: TargetAttribute;
  download: string;
  ping: string;
  rel: RelAttribute | 'alternate' | 'author' | 'bookmark' | 'external' | 'me' | 'privacy-policy' | 'tag' | 'terms-of-service';
  hreflang: string;
  type: string;
  referrerpolicy: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a */
export const a = (document: Document) =>
  element.html(document)('a')<Partial<HTMLAElementAttributes>>;

export type HTMLAbbrElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/abbr */
export const abbr = (document: Document) =>
  element.html(document)('abbr')<Partial<HTMLAbbrElementAttributes>>;

export type HTMLAddressElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/address */
export const address = (document: Document) =>
  element.html(document)('address')<Partial<HTMLAddressElementAttributes>>;

export type HTMLAreaElementAttributes = HTMLElementAttributes & {
  alt: string;
  coords: string;
  download: string;
  href: string;
  ping: string;
  referrerpolicy: ReferrerAttribute;
  rel: string;
  shape: 'rect' | 'circle' | 'poly' | 'default';
  target: TargetAttribute;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/area */
export const area = (document: Document) =>
  (attributes?: Partial<HTMLAreaElementAttributes>) =>
    element.html(document)('area')(attributes)();

export type HTMLArticleElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article */
export const article = (document: Document) =>
  element.html(document)('article')<Partial<HTMLArticleElementAttributes>>;

export type HTMLAsideElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside */
export const aside = (document: Document) =>
  element.html(document)('aside')<Partial<HTMLAsideElementAttributes>>;

export type HTMLAudioElementAttributes = HTMLElementAttributes & {
  autoplay: boolean;
  controls: boolean;
  controlslist: 'nodownload' | 'nofullscreen' | 'noremoteplayback';
  crossorigin: 'anonymous' | 'use-credentials';
  disableremoteplayback: boolean;
  loop: boolean;
  muted: boolean;
  preload: 'none' | 'metadata' | 'auto';
  src: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio */
export const audio = (document: Document) =>
  element.html(document)('audio')<Partial<HTMLAudioElementAttributes>>;

export type HTMLBElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/b */
export const b = (document: Document) =>
  element.html(document)('b')<Partial<HTMLBElementAttributes>>;

export type HTMLBaseElementAttributes = HTMLElementAttributes & {
  href: string;
  target: TargetAttribute;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/base */
export const base = (document: Document) =>
  (attributes?: Partial<HTMLBaseElementAttributes>) =>
    element.html(document)('base')(attributes)();

export type HTMLBdiElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdi */
export const bdi = (document: Document) =>
  element.html(document)('bdi')<Partial<HTMLBdiElementAttributes>>;

export type HTMLBdoElementAttributes = HTMLElementAttributes & {
  dir: 'ltr' | 'rtl';
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdo */
export const bdo = (document: Document) =>
  element.html(document)('bdo')<Partial<HTMLBdoElementAttributes>>;

export type HTMLBlockquoteElementAttributes = HTMLElementAttributes & {
  cite: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/blockquote */
export const blockquote = (document: Document) =>
  element.html(document)('blockquote')<Partial<HTMLBlockquoteElementAttributes>>;

export type HTMLBodyElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/body */
export const body = (document: Document) =>
  element.html(document)('body')<Partial<HTMLBodyElementAttributes>>;

export type HTMLBrElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/br */
export const br = (document: Document) =>
  (attributes?: Partial<HTMLBrElementAttributes>) =>
    element.html(document)('br')(attributes)();

export type HTMLButtonElementAttributes = HTMLElementAttributes & {
  autofocus: boolean;
  command: 'show-modal' | 'close' | 'request-close' | 'show-popover' | 'hide-popover' | 'toggle-popover' | `--${string}`;
  commandfor: string;
  disabled: boolean;
  form: string;
  formaction: string;
  formenctype: string;
  formmethod: string;
  formnovalidate: boolean;
  formtarget: TargetAttribute;
  name: string;
  popovertarget: string;
  popovertargetaction: 'hide' | 'show' | 'toggle';
  type: 'submit' | 'reset' | 'button';
  value: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button */
export const button = (document: Document) =>
  element.html(document)('button')<Partial<HTMLButtonElementAttributes>>;

export type HTMLCanvasElementAttributes = HTMLElementAttributes & {
  width: number;
  height: number;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas */
export const canvas = (document: Document) =>
  element.html(document)('canvas')<Partial<HTMLCanvasElementAttributes>>;

export type HTMLCaptionElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/caption */
export const caption = (document: Document) =>
  element.html(document)('caption')<Partial<HTMLCaptionElementAttributes>>;

export type HTMLCiteElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/cite */
export const cite = (document: Document) =>
  element.html(document)('cite')<Partial<HTMLCiteElementAttributes>>;

export type HTMLCodeElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/code */
export const code = (document: Document) =>
  element.html(document)('code')<Partial<HTMLCodeElementAttributes>>;

export type HTMLColElementAttributes = HTMLElementAttributes & {
  span: number;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/col */
export const col = (document: Document) =>
  (attributes?: Partial<HTMLCodeElementAttributes>) =>
    element.html(document)('col')(attributes)();

export type HTMLColgroupElementAttributes = HTMLElementAttributes & {
  span: number;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/colgroup */
export const colgroup = (document: Document) =>
  element.html(document)('colgroup')<Partial<HTMLColgroupElementAttributes>>;

export type HTMLDataElementAttributes = HTMLElementAttributes & {
  value: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/data */
export const data = (document: Document) =>
  element.html(document)('data')<Partial<HTMLDataElementAttributes>>;

export type HTMLDatalistElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist */
export const datalist = (document: Document) =>
  element.html(document)('datalist')<Partial<HTMLDatalistElementAttributes>>;

export type HTMLDdElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dd */
export const dd = (document: Document) =>
  element.html(document)('dd')<Partial<HTMLDdElementAttributes>>;

export type HTMLDelElementAttributes = HTMLElementAttributes & {
  cite: string;
  datetime: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/del */
export const del = (document: Document) =>
  element.html(document)('del')<Partial<HTMLDelElementAttributes>>;

export type HTMLDetailsElementAttributes = HTMLElementAttributes & {
  open: boolean;
  name: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details */
export const details = (document: Document) =>
  element.html(document)('details')<Partial<HTMLDetailsElementAttributes>>;

export type HTMLDfnElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dfn */
export const dfn = (document: Document) =>
  element.html(document)('dfn')<Partial<HTMLDfnElementAttributes>>;

export type HTMLDialogElementAttributes = HTMLElementAttributes & {
  closedby: 'any' | 'closerequest' | 'none';
  open: boolean;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog */
export const dialog = (document: Document) =>
  element.html(document)('dialog')<Partial<HTMLDialogElementAttributes>>;

export type HTMLDivElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div */
export const div = (document: Document) =>
  element.html(document)('div')<Partial<HTMLDivElementAttributes>>;

export type HTMLDlElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dl */
export const dl = (document: Document) =>
  element.html(document)('dl')<Partial<HTMLDlElementAttributes>>;

export type HTMLDtElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dt */
export const dt = (document: Document) =>
  element.html(document)('dt')<Partial<HTMLDtElementAttributes>>;

export type HTMLEmElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/em */
export const em = (document: Document) =>
  element.html(document)('em')<Partial<HTMLEmElementAttributes>>;

export type HTMLEmbedElementAttributes = HTMLElementAttributes & {
  width: number;
  height: number;
  src: string;
  type: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/embed */
export const embed = (document: Document) =>
  (attributes?: Partial<HTMLEmbedElementAttributes>) =>
    element.html(document)('embed')(attributes)();

export type HTMLFieldsetElementAttributes = HTMLElementAttributes & {
  disabled: boolean;
  form: string;
  name: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset */
export const fieldset = (document: Document) =>
  element.html(document)('fieldset')<Partial<HTMLFieldsetElementAttributes>>;

export type HTMLFigcaptionElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figcaption */
export const figcaption = (document: Document) =>
  element.html(document)('figcaption')<Partial<HTMLFigcaptionElementAttributes>>;

export type HTMLFigureElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figure */
export const figure = (document: Document) =>
  element.html(document)('figure')<Partial<HTMLFigureElementAttributes>>;

export type HTMLFooterElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer */
export const footer = (document: Document) =>
  element.html(document)('footer')<Partial<HTMLFooterElementAttributes>>;

export type HTMLFormElementAttributes = HTMLElementAttributes & {
  'accept-charset': string;
  'autocapitalize': string;
  'autocomplete': 'on' | 'off';
  'name': string;
  'rel': RelAttribute | 'external' | 'nofollow' | 'opener' | 'noopener' | 'noreferrer';
  'action': string;
  'enctype': 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
  'method': 'post' | 'get' | 'dialog';
  'novalidate': boolean;
  'target': '_self' | '_blank' | '_parent' | '_top' | '_unfencedTop';
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form */
export const form = (document: Document) =>
  element.html(document)('form')<Partial<HTMLFormElementAttributes>>;

export type HTMLHElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements */
export const h = (document: Document) =>
  (n: number) =>
    element.html(document)(`h${clamp(1)(6)(n)}` as keyof HTMLElementTagNameMap)<Partial<HTMLHElementAttributes>>;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements */
export const h1 = (document: Document) => h(document)(1);

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements */
export const h2 = (document: Document) => h(document)(2);

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements */
export const h3 = (document: Document) => h(document)(3);

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements */
export const h4 = (document: Document) => h(document)(4);

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements */
export const h5 = (document: Document) => h(document)(5);

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements */
export const h6 = (document: Document) => h(document)(6);

export type HTMLHeadElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head */
export const head = (document: Document) =>
  element.html(document)('head')<Partial<HTMLHeadElementAttributes>>;

export type HTMLHeaderElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header */
export const header = (document: Document) =>
  element.html(document)('header')<Partial<HTMLHeaderElementAttributes>>;

export type HTMLHgroupElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hgroup */
export const hgroup = (document: Document) =>
  element.html(document)('hgroup')<Partial<HTMLHgroupElementAttributes>>;

export type HTMLHrElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hr */
export const hr = (document: Document) =>
  (attributes?: Partial<HTMLHrElementAttributes>) =>
    element.html(document)('hr')(attributes)();

export type HTMLHtmlElementAttributes = HTMLElementAttributes & {
  xmlns: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/html */
export const html = (document: Document) =>
  element.html(document)('html')<Partial<HTMLHtmlElementAttributes>>;

export type HTMLIElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/i */
export const i = (document: Document) =>
  element.html(document)('i')<Partial<HTMLIElementAttributes>>;

export type HTMLIframeElementAttributes = HTMLElementAttributes & {
  allow: string;
  allowfullscreen: 'true';
  browsingtopics: boolean;
  credentialles: boolean;
  csp: string;
  width: number;
  height: number;
  loading: LoadingAttribute;
  name: string;
  referrerpolicy: ReferrerAttribute;
  sandbox: 'allow-downloads' | 'allow-forms' | 'allow-modals' | 'allow-orientation-lock' | 'allow-pointer-lock' | 'allow-popups' | 'allow-popups-to-escape-sandbox' | 'allow-presentation' | 'allow-same-origin' | 'allow-scripts' | 'allow-storage-access-by-user-activation' | 'allow-top-navigation' | 'allow-top-navigation-by-user-activation' | 'allow-top-navigation-to-custom-protocols';
  src: string;
  srcdoc: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe */
export const iframe = (document: Document) =>
  element.html(document)('iframe')<Partial<HTMLIframeElementAttributes>>;

export type HTMLImgElementAttributes = HTMLElementAttributes & {
  alt: string;
  attributionsrc: boolean | string;
  crossorigin: 'anonymous' | 'use-credentials';
  decoding: 'sync' | 'async' | 'auto';
  elementtiming: string;
  fetchpriority: FetchPriorityAttribute;
  width: number;
  height: number;
  ismap: boolean;
  loading: 'eager' | 'lazy';
  referrerpolicy: ReferrerAttribute;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img */
export const img = (document: Document) =>
  (attributes?: Partial<HTMLImgElementAttributes>) =>
    element.html(document)('img')(attributes)();

export type HTMLInputCommonElementAttributes = {
  disabled: boolean;
  form: string;
  name: string;
  type: 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';
};

export type HTMLInputElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & {
  accept: string;
  alt: string;
  autocapitalize: 'none' | 'off' | 'sentences' | 'on' | 'words' | 'characters';
  autofocus: boolean;
  capture: 'user' | 'environment';
  checked: boolean;
  dirname: 'rtl' | 'ltr';
  formaction: string;
  formenctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
  formmethod: 'get' | 'post' | 'dialog';
  formnovalidate: boolean;
  formtarget: TargetAttribute;
  height: number;
  id: string;
  inputmode: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  list: string;
  max: number;
  maxlength: number;
  min: number;
  minlength: number;
  multiple: boolean;
  pattern: string;
  placeholder: string;
  popovertarget: string;
  popovertargetaction: 'hide' | 'show' | 'toggle';
  readonly: boolean;
  required: boolean;
  size: number;
  src: string;
  step: number;
  tabindex: number;
  title: string;
  value: string | number;
  width: number;
};

export type HTMLInputButtonElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'popovertarget' | 'popovertargetaction' | 'value'
> & { type: 'button' };

export type HTMLInputCheckboxElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'checked' | 'required' | 'value'
> & { type: 'checkbox' };

export type HTMLInputColorElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'list' | 'value'
> & { type: 'color' };

export type HTMLInputDateElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'list' | 'max' | 'min' | 'readonly' | 'required' | 'step' | 'value'
> & { type: 'date' };

export type HTMLInputDatetimeLocalElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'max' | 'min' | 'readonly' | 'required' | 'step' | 'value'
> & { type: 'datetime-local' };

export type HTMLInputEmailElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocomplete' | 'dirname' | 'list' | 'maxlength' | 'minlength' | 'multiple' | 'pattern' | 'placeholder' | 'readonly' | 'required' | 'size' | 'value'
> & { type: 'email' };

export type HTMLInputFileElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'accept' | 'autocapitalize' | 'autocomplete' | 'capture' | 'list' | 'multiple' | 'readonly' | 'required' | 'value'
> & { type: 'file' };

export type HTMLInputHiddenElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'dirname' | 'value'
> & { type: 'hidden' };

export type HTMLInputImageElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'alt' | 'autocapitalize' | 'autocomplete' | 'formaction' | 'formenctype' | 'formmethod' | 'formnovalidate' | 'formtarget' | 'height' | 'list' | 'readonly' | 'required' | 'src' | 'width'
> & { type: 'image' };

export type HTMLInputMonthElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'list' | 'max' | 'min' | 'readonly' | 'required' | 'step' | 'value'
> & { type: 'month' };

export type HTMLInputNumberElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'list' | 'max' | 'min' | 'placeholder' | 'readonly' | 'required' | 'step' | 'value'
> & { type: 'number' };

export type HTMLInputPasswordElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocomplete' | 'minlength' | 'maxlength' | 'pattern' | 'placeholder' | 'readonly' | 'required' | 'size' | 'value'
> & { type: 'password' };

export type HTMLInputRadioElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'checked' | 'required' | 'value'
> & { type: 'radio' };

export type HTMLInputRangeElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'max' | 'min' | 'step' | 'value'
> & { type: 'range' };

export type HTMLInputResetElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'list' | 'readonly' | 'required' | 'value'
> & { type: 'reset' };

export type HTMLInputSearchElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'list' | 'maxlength' | 'minlength' | 'pattern' | 'placeholder' | 'size' | 'value'
> & { type: 'search' };

export type HTMLInputSubmitElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'formaction' | 'formenctype' | 'formmethod' | 'formnovalidate' | 'formtarget' | 'list' | 'readonly' | 'required' | 'value'
> & { type: 'submit' };

export type HTMLInputTelElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'dirname' | 'list' | 'maxlength' | 'minlength' | 'pattern' | 'placeholder' | 'readonly' | 'required' | 'size' | 'value'
> & { type: 'tel' };

export type HTMLInputTextElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'list' | 'maxlength' | 'minlength' | 'pattern' | 'placeholder' | 'readonly' | 'required' | 'size' | 'value'
> & { type: 'text' };

export type HTMLInputTimeElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'list' | 'max' | 'min' | 'readonly' | 'required' | 'step' | 'value'
> & { type: 'time' };

export type HTMLInputUrlElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocomplete' | 'dirname' | 'list' | 'maxlength' | 'minlength' | 'pattern' | 'placeholder' | 'size' | 'value'
> & { type: 'url' };

export type HTMLInputWeekElementAttributes = HTMLElementAttributes & HTMLInputCommonElementAttributes & Pick<
  HTMLInputElementAttributes,
  'autocapitalize' | 'autocomplete' | 'list' | 'max' | 'min' | 'readonly' | 'required' | 'step' | 'value'
> & { type: 'week' };

export type HTMLInputElementAttributesTypeMap = {
  'button': HTMLInputButtonElementAttributes;
  'checkbox': HTMLInputCheckboxElementAttributes;
  'color': HTMLInputColorElementAttributes;
  'date': HTMLInputDateElementAttributes;
  'datetime-local': HTMLInputDatetimeLocalElementAttributes;
  'email': HTMLInputEmailElementAttributes;
  'file': HTMLInputFileElementAttributes;
  'hidden': HTMLInputHiddenElementAttributes;
  'image': HTMLInputImageElementAttributes;
  'month': HTMLInputMonthElementAttributes;
  'number': HTMLInputNumberElementAttributes;
  'password': HTMLInputPasswordElementAttributes;
  'radio': HTMLInputRadioElementAttributes;
  'range': HTMLInputRangeElementAttributes;
  'reset': HTMLInputResetElementAttributes;
  'search': HTMLInputSearchElementAttributes;
  'submit': HTMLInputSubmitElementAttributes;
  'tel': HTMLInputTelElementAttributes;
  'text': HTMLInputTextElementAttributes;
  'time': HTMLInputTimeElementAttributes;
  'url': HTMLInputUrlElementAttributes;
  'week': HTMLInputWeekElementAttributes;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input */
export const input = (document: Document) =>
  <T extends keyof HTMLInputElementAttributesTypeMap>(type: T) =>
    (attributes?: Omit<Partial<HTMLInputElementAttributesTypeMap[T]>, 'type'>) =>
      element.html(document)('input')({ type, ...attributes })();

export type HTMLInsElementAttributes = HTMLElementAttributes & {
  cite: string;
  datetime: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ins */
export const ins = (document: Document) =>
  element.html(document)('ins')<Partial<HTMLInsElementAttributes>>;

export type HTMLKbdElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/kbd */
export const kbd = (document: Document) =>
  element.html(document)('kbd')<Partial<HTMLKbdElementAttributes>>;

export type HTMLLabelElementAttributes = HTMLElementAttributes & {
  for: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label */
export const label = (document: Document) =>
  element.html(document)('label')<Partial<HTMLLabelElementAttributes>>;

export type HTMLLegendElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend */
export const legend = (document: Document) =>
  element.html(document)('legend')<Partial<HTMLLegendElementAttributes>>;

export type HTMLLiElementAttributes = HTMLElementAttributes & {
  value: number;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/li */
export const li = (document: Document) =>
  element.html(document)('li')<Partial<HTMLLiElementAttributes>>;

export type HTMLLinkElementAttributes = HTMLElementAttributes & {
  as: 'audio' | 'document' | 'embed' | 'fetch' | 'font' | 'image' | 'object' | 'script' | 'style' | 'track' | 'video' | 'worker';
  blocking: 'render';
  crossorigin: 'anonymous' | 'use-credentials';
  disabled: boolean;
  fetchpriority: FetchPriorityAttribute;
  href: string;
  hreflang: string;
  imagesizes: string;
  imagesrcset: string;
  integrity: string;
  media: string;
  referrerpolicy: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url';
  rel: string;
  sizes: string;
  title: string;
  type: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link */
export const link = (document: Document) =>
  (attributes?: Partial<HTMLLinkElementAttributes>) =>
    element.html(document)('link')(attributes)();

export type HTMLMainElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main */
export const main = (document: Document) =>
  element.html(document)('main')<Partial<HTMLMainElementAttributes>>;

export type HTMLMapElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/map */
export const map = (document: Document) =>
  element.html(document)('map')<Partial<HTMLMapElementAttributes>>;

export type HTMLMarkElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/mark */
export const mark = (document: Document) =>
  element.html(document)('mark')<Partial<HTMLMarkElementAttributes>>;

export type HTMLMenuElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/menu */
export const menu = (document: Document) =>
  element.html(document)('menu')<Partial<HTMLMenuElementAttributes>>;

export type HTMLMetaElementAttributes = HTMLElementAttributes & {
  'charset': string;
  'content': string;
  'http-equiv': 'content-security-policy' | 'content-type' | 'default-style' | 'x-ua-compatible' | 'refresh';
  'media': string;
  'name': string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta */
export const meta = (document: Document) =>
  (attributes?: Partial<HTMLMetaElementAttributes>) =>
    element.html(document)('meta')(attributes)();

export type HTMLMeterElementAttributes = HTMLElementAttributes & {
  value: number;
  min: number;
  max: number;
  low: number;
  high: number;
  optimum: number;
  form: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter */
export const meter = (document: Document) =>
  element.html(document)('meter')<Partial<HTMLMeterElementAttributes>>;

export type HTMLNavElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav */
export const nav = (document: Document) =>
  element.html(document)('nav')<Partial<HTMLNavElementAttributes>>;

export type HTMLNoscriptElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/noscript */
export const noscript = (document: Document) =>
  element.html(document)('noscript')<Partial<HTMLNoscriptElementAttributes>>;

export type HTMLObjectElementAttributes = HTMLElementAttributes & {
  data: string;
  form: string;
  height: number;
  name: string;
  type: string;
  width: number;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/object */
export const object = (document: Document) =>
  element.html(document)('object')<Partial<HTMLObjectElementAttributes>>;

export type HTMLOlElementAttributes = HTMLElementAttributes & {
  reversed: boolean;
  start: number;
  type: 'a' | 'A' | 'i' | 'I' | '1';
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol */
export const ol = (document: Document) =>
  element.html(document)('ol')<Partial<HTMLOlElementAttributes>>;

export type HTMLOptgroupElementAttributes = HTMLElementAttributes & {
  disabled: boolean;
  label: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/optgroup */
export const optgroup = (document: Document) =>
  element.html(document)('optgroup')<Partial<HTMLOptgroupElementAttributes>>;

export type HTMLOptionElementAttributes = HTMLElementAttributes & {
  disabled: boolean;
  label: string;
  selected: boolean;
  value: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option */
export const option = (document: Document) =>
  element.html(document)('option')<Partial<HTMLOptionElementAttributes>>;

export type HTMLOutputElementAttributes = HTMLElementAttributes & {
  for: string;
  form: string;
  name: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/output */
export const output = (document: Document) =>
  element.html(document)('output')<Partial<HTMLOutputElementAttributes>>;

export type HTMLPElementAttributes = HTMLElementAttributes & {
  for: string;
  form: string;
  name: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/p */
export const p = (document: Document) =>
  element.html(document)('p')<Partial<HTMLPElementAttributes>>;

export type HTMLPictureElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture */
export const picture = (document: Document) =>
  element.html(document)('picture')<Partial<HTMLPictureElementAttributes>>;

export type HTMLPreElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/pre */
export const pre = (document: Document) =>
  element.html(document)('pre')<Partial<HTMLPreElementAttributes>>;

export type HTMLProgressElementAttributes = HTMLElementAttributes & {
  max: number;
  value: number;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress */
export const progress = (document: Document) =>
  element.html(document)('progress')<Partial<HTMLProgressElementAttributes>>;

export type HTMLQElementAttributes = HTMLElementAttributes & {
  cite: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/q */
export const q = (document: Document) =>
  element.html(document)('q')<Partial<HTMLQElementAttributes>>;

export type HTMLRpElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/rp */
export const rp = (document: Document) =>
  element.html(document)('rp')<Partial<HTMLRpElementAttributes>>;

export type HTMLRtElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/rt */
export const rt = (document: Document) =>
  element.html(document)('rt')<Partial<HTMLRtElementAttributes>>;

export type HTMLRubyElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ruby */
export const ruby = (document: Document) =>
  element.html(document)('ruby')<Partial<HTMLRubyElementAttributes>>;

export type HTMLSElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/s */
export const s = (document: Document) =>
  element.html(document)('s')<Partial<HTMLSElementAttributes>>;

export type HTMLSampElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/samp */
export const samp = (document: Document) =>
  element.html(document)('samp')<Partial<HTMLSampElementAttributes>>;

export type HTMLScriptElementAttributes = HTMLElementAttributes & {
  async: boolean;
  blocking: 'render';
  crossorigin: string;
  defer: boolean;
  fetchpriority: FetchPriorityAttribute;
  integrity: string;
  nomodule: boolean;
  nonce: string;
  referrerpolicy: ReferrerAttribute;
  src: string;
  type: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script */
export const script = (document: Document) =>
  element.html(document)('script')<Partial<HTMLScriptElementAttributes>>;

export type HTMLSearchElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search */
export const search = (document: Document) =>
  element.html(document)('search')<Partial<HTMLSearchElementAttributes>>;

export type HTMLSectionElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section */
export const section = (document: Document) =>
  element.html(document)('section')<Partial<HTMLSectionElementAttributes>>;

export type HTMLSelectElementAttributes = HTMLElementAttributes & {
  autocomplete: string;
  autofocus: boolean;
  disabled: boolean;
  form: string;
  multiple: boolean;
  name: string;
  required: boolean;
  size: number;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select */
export const select = (document: Document) =>
  element.html(document)('select')<Partial<HTMLSelectElementAttributes>>;

export type HTMLSlotElementAttributes = HTMLElementAttributes & {
  name: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot */
export const slot = (document: Document) =>
  element.html(document)('slot')<Partial<HTMLSlotElementAttributes>>;

export type HTMLSmallElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/small */
export const small = (document: Document) =>
  element.html(document)('small')<Partial<HTMLSmallElementAttributes>>;

export type HTMLSourceElementAttributes = HTMLElementAttributes & {
  type: string;
  src: string;
  srcset: string;
  sizes: string;
  media: string;
  height: number;
  width: number;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source */
export const source = (document: Document) =>
  (attributes?: Partial<HTMLSourceElementAttributes>) =>
    element.html(document)('source')(attributes)();

export type HTMLSpanElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/span */
export const span = (document: Document) =>
  element.html(document)('span')<Partial<HTMLSpanElementAttributes>>;

export type HTMLStrongElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/strong */
export const strong = (document: Document) =>
  element.html(document)('strong')<Partial<HTMLStrongElementAttributes>>;

export type HTMLStyleElementAttributes = HTMLElementAttributes & {
  blocking: 'render';
  media: string;
  nonce: string;
  title: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/style */
export const style = (document: Document) =>
  element.html(document)('style')<Partial<HTMLStyleElementAttributes>>;

export type HTMLSubElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/sub */
export const sub = (document: Document) =>
  element.html(document)('sub')<Partial<HTMLSubElementAttributes>>;

export type HTMLSummaryElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary */
export const summary = (document: Document) =>
  element.html(document)('summary')<Partial<HTMLSummaryElementAttributes>>;

export type HTMLSupElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/sup */
export const sup = (document: Document) =>
  element.html(document)('sup')<Partial<HTMLSupElementAttributes>>;

export type HTMLTableElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table */
export const table = (document: Document) =>
  element.html(document)('table')<Partial<HTMLTableElementAttributes>>;

export type HTMLTbodyElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tbody */
export const tbody = (document: Document) =>
  element.html(document)('tbody')<Partial<HTMLTbodyElementAttributes>>;

export type HTMLTdElementAttributes = HTMLElementAttributes & {
  colspan: number;
  headers: string;
  rowspan: number;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/td */
export const td = (document: Document) =>
  element.html(document)('td')<Partial<HTMLTdElementAttributes>>;

export type HTMLTemplateElementAttributes = HTMLElementAttributes & {
  shadowrootmode: 'open' | 'closed';
  shadowrootclonable: 'true';
  showrootdelegatesfocus: 'true' | 'false';
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template */
export const template = (document: Document) =>
  element.html(document)('template')<Partial<HTMLTemplateElementAttributes>>;

export type HTMLTextareaElementAttributes = HTMLElementAttributes & {
  autocapitalize: string;
  autocomplete: string;
  autocorrect: 'on' | 'off';
  autofocus: boolean;
  cols: number;
  dirname: string;
  disabled: boolean;
  form: string;
  maxlength: number;
  minlength: number;
  name: string;
  placeholder: string;
  readonly: boolean;
  required: boolean;
  rows: number;
  spellcheck: 'true' | 'default' | 'false';
  wrap: 'hard' | 'soft' | 'off';
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea */
export const textarea = (document: Document) =>
  element.html(document)('textarea')<Partial<HTMLTextareaElementAttributes>>;

export type HTMLTfootElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tfoot */
export const tfoot = (document: Document) =>
  element.html(document)('tfoot')<Partial<HTMLTfootElementAttributes>>;

export type HTMLThElementAttributes = HTMLElementAttributes & {
  abbr: string;
  colspan: number;
  headers: string;
  rowspan: number;
  scope: 'row' | 'col' | 'rowgroup' | 'colgroup';
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th */
export const th = (document: Document) =>
  element.html(document)('th')<Partial<HTMLThElementAttributes>>;

export type HTMLTheadElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/thead */
export const thead = (document: Document) =>
  element.html(document)('thead')<Partial<HTMLTheadElementAttributes>>;

export type HTMLTimeElementAttributes = HTMLElementAttributes & {
  datetime: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time */
export const time = (document: Document) =>
  element.html(document)('time')<Partial<HTMLTimeElementAttributes>>;

export type HTMLTitleElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title */
export const title = (document: Document) =>
  element.html(document)('title')<Partial<HTMLTitleElementAttributes>>;

export type HTMLTrElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tr */
export const tr = (document: Document) =>
  element.html(document)('tr')<Partial<HTMLTrElementAttributes>>;

export type HTMLTrackElementAttributes = HTMLElementAttributes & {
  default: string;
  kind: 'subtitles' | 'captions' | 'chapters' | 'metadata';
  label: string;
  src: string;
  srclang: string;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/track */
export const track = (document: Document) =>
  (attributes?: Partial<HTMLTrackElementAttributes>) =>
    element.html(document)('track')(attributes)();

export type HTMLUElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/u */
export const u = (document: Document) =>
  element.html(document)('u')<Partial<HTMLUElementAttributes>>;

export type HTMLUlElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul */
export const ul = (document: Document) =>
  element.html(document)('ul')<Partial<HTMLUlElementAttributes>>;

export type HTMLVarElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/var */
export const vr = (document: Document) =>
  element.html(document)('var')<Partial<HTMLVarElementAttributes>>;

export type HTMLVideoElementAttributes = HTMLElementAttributes & {
  autoplay: boolean;
  controls: boolean;
  controlslist: string;
  crossorigin: 'anonymous' | 'use-credentials';
  disablepictureinpicture: boolean;
  disableremoteplayback: boolean;
  height: number;
  loop: boolean;
  muted: boolean;
  playsinline: boolean;
  poster: string;
  preload: 'none' | 'metadata' | 'auto';
  src: string;
  width: number;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video */
export const video = (document: Document) =>
  element.html(document)('video')<Partial<HTMLVideoElementAttributes>>;

export type HTMLWbrElementAttributes = HTMLElementAttributes;

/** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/wbr */
export const wbr = (document: Document) =>
  element.html(document)('wbr')<Partial<HTMLWbrElementAttributes>>;
