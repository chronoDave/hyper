<div align="center">
  <h1>@chronocide/hyper</h1>
  <p>Tiny DOM library</p>
</div>

<div align="center">
  <a href="/LICENSE">
    <img alt="License AGPLv3" src="https://img.shields.io/badge/license-AGPLv3-blue.svg" />
  </a>
  <img alt="Bundle size" src="https://img.shields.io/bundlejs/size/%40chronocide%2Fhyper">
  <a href="https://www.npmjs.com/package/@chronocide/hyper">
    <img alt="NPM" src="https://img.shields.io/npm/v/@chronocide/hyper?label=npm">
  </a>
</div>

---

`hyper` is a tiny TypeScript library designed to ease working with the DOM. `hyper` tries to be as simple as possible whilst maintaining good developer experience and currently features:

- Simple wrapper around native API's (DOM)
- No vDOM, all state is stored within the DOM[*](#exception)
- List caching

<p id="exception"><code>document</code> is stored internally, this prevents binding it for every single call.</p>

## Installation

```sh
npm i @chronocide/hyper
```

## Usage

```ts
import h from '@chronocide/hyper';

const img = h('img')({ src: '/cat.png' })(); // HTMLImageElement

document.body.appendChild(img);
```

### List

Keeping track of children within a list can be tedious, especially if using immutable data. `list` caches elements based on keys and compares each data entry, only updating the child i the data has changed. Keys do not need to be unique, duplicate elements are cloned.

```ts
import h, { list } from '@chronocide/hyper';

type Planet = { id: string; name: string };

const ul = h('ul')()(); // <ul></ul>
const render = (planet: Planet) => h('li')({ id: planet.id })(planet.name);
const key = (planet: Planet) => planet.id;
const update = list<Planet>(render)(key)(ul);

const planets: Planet[] = [
  { id: 'jupiter', name: 'Jupiter' },
  { id: 'mars', name: 'Mars' },
  { id: 'pluto', name: 'Pluto' }
];

update(planets); // <ul><li id="jupiter">Jupiter</li><li id="mars">Mars</li><li id="pluto">Pluto</li></ul>
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
