<div align="center">
  <h1>@chronocide/hyper</h1>
  <p>Tiny DOM library</p>
</div>

<div align="center">
  <a href="/LICENSE">
    <img alt="License AGPLv3" src="https://img.shields.io/badge/license-AGPLv3-blue.svg" />
  </a>
  <img alt="Bundle size" src="https://deno.bundlejs.com/?q=@chronocide/hyper&badge">
  <a href="https://www.npmjs.com/package/@chronocide/hyper">
    <img alt="NPM" src="https://img.shields.io/npm/v/@chronocide/hyper?label=npm">
  </a>
</div>

---

`hyper` is a tiny TypeScript library designed to ease working with the DOM. `hyper` tries to be as simple as possible whilst maintaining good developer experience.

## Features

- Simple wrapper around native [Document API](https://developer.mozilla.org/en-US/docs/Web/API/Document)
- No vDOM, all state is stored within the DOM[*](#exception)
- List caching
- Virtualisation

<p id="exception">* <code>document</code> and <code>window</code> are stored internally, this prevents binding it for every single call.</p>

## Installation

```sh
npm i @chronocide/hyper
```

## Usage

- [`h`](#h)
- [`svg`](#svg)
- [`mathml`](#mathml)
- [`xml`](#xml)
- [`set`](#set)
- [`style`](#style)
- [`list`](#list)
- [`virtual`](#virtual)

### `h`

Creates [HTML element](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement).

```ts
import h from '@chronocide/hyper';

const img = h('img')({ src: '/cat.png' })(); // <img src="/cat.png">
```

### `svg`

Creates [SVG element](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#namespaceuri).

```ts
import { svg } from '@chronocide/hyper';

/** @see https://fontawesome.com/icons/bars */
const icon = svg('svg')({ xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 640 640' })(
  svg('path')({ d: 'M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z' })()
); // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
```

### `mathml`

Creates [MathML element](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#namespaceuri).

```ts
import { mathml } from '@chronocide/hyper';

const fraction = mathml('math')()(
  mathml('mfrac')()(
    mathml('mn')()(1),
    mathml('mn')()(3)
  )
); // <math><mfrac><mn>1</mn><mn>3</mn></mfrac></math>
```

### `xml`

Creates [XML element](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#namespaceuri).

```ts
import { xml } from '@chronocide/hyper';

const feed = xml('feed')({ 'xml:lang': 'en-GB' })(); // <feed xml:lang="en-GB"></feed>
```

### `set`

Set [element attributes](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute).

```ts
import { set } from '@chronocide/hyper';

set(img)({ width: 500, height: 500 }); // <img width="500" height="500">
```

### `style`

Set [element styles](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty).

```ts
import { style } from '@chronocide/hyper';

style(img)({ display: "block" }); // <img style="display: block;">
```

### `list`

Keeping track of children within a list can be tedious. `list` caches state and compares each entry, only updating children if the data has changed.

**Note**: `list` only supports the following types:
- `string`
- `number`
- `boolean`
- `null`
- `array`
- `object`

Where `array` and `object` can only contain aforementioned types.

```ts
import h, { list } from '@chronocide/hyper';

const ul = h('ul')()(); // <ul></ul>
const li = (x: string) => h('li')()(x);
const update = list(li)(ul);

/**
 * <ul>
 *  <li>a</li> (render)
 *  <li>b</li> (render)
 *  <li>c</li> (render)
 * </ul>
 */
update(['a', 'b', 'c']);

/**
 * <ul>
 *  <li>a</li>
 *  <li>b</li>
 *  <li>c</li>
 *  <li>d</li> (render)
 * </ul>
 */
update(['a', 'b', 'c', 'd']);

/**
 * <ul>
 *  <li>a</li>
 *  <li>b</li> (render)
 *  <li>c</li>
 * </ul>
 */
update(['a', 'c', 'c']);
```

### `virtual`

Virtualisation is a technique that improves list performance by limiting the amount of children rendered. By only rendering elements that are visible within a defined viewport, the size of the DOM can be significantly decreased.

`virtual` adds the neccesary inline styles and even listeners to make virtualisation possible, but does not add `aria` properties.

```ts
import h, { virtual } from '@chronocide/hyper';

type Planet = { id: string; name: string };

const ul = h('ul')()(); // <ul></ul>
const render = (planet: Planet) => h('li')({ id: planet.id })(planet.name);
const { update, scrollTo } = virtual(render)(ul);

const planets: Planet[] = [
  { id: 'jupiter', name: 'Jupiter' },
  { id: 'mars', name: 'Mars' },
  { id: 'pluto', name: 'Pluto' },
  // ...
];

update(planets); // <ul><li id="jupiter">Jupiter</li><li id="mars">Mars</li><li id="pluto">Pluto</li></ul>
scrollTo(30); // Scroll to 30th item
```

## Testing

`hyper` relies on the DOM, which may not always be available. In those cases, it's possible to set a custom DOM using `env`:

```TS
import { env } from '@chronocide/hyper';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();
env.document = dom.window.document;
```

Examples can be found in the test files, such as [hyper.spec.ts](/src/hyper.spec.ts).

## Development

`hyper` uses `puppeteer` for browser testing and does not install Chrome by default. To run tests, create an `.env` file using:

```sh
npm run env
```

**Note:** If you're running Linux, have Chrome installed in a non-standard location or wish to use a different browser, you can create the `.env` file yourself:

```env
BROWSER_PATH=<path_to_browser>
```
