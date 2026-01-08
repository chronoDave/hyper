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

List items can be cached using `list`, only updated if the data is changed; order does not matter. Data does not need to be unique, as duplicate nodes are cloned.

**Note**, `list` only supports `string` and `number` type.

```ts
import h, { list } from '@chronocide/hyper';

type Planet = { id: string; name: string };

const planets = new Map<string, Planet>();
planets.add('jupiter', { id: 'jupiter', name: 'Jupiter' });
planets.add('mars', { id: 'mars', name: 'Mars' });
planets.add('pluto', { id: 'pluto', name: 'Pluto' });

const ul = h('ul')()(); // <ul></ul>
const render = (id: string) => h('li')()(planets.get(id)?.name ?? '-');

const update = list(render)(ul);
update(planets); // <ul><li>Jupiter</li><li>Mars</li><li>Pluto</li></ul>
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
