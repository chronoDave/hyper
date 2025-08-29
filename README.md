<div style="text-align: center">
  <h1>@chronocide/hyper</h1>
  <p>Tiny <b>TSX</b> DOM library.</p>
</div>

<div style="text-align: center">
  <a href="/LICENSE">
    <img alt="License AGPLv3" src="https://img.shields.io/badge/license-AGPLv3-blue.svg" />
  </a>
  <img alt="Bundle size" src="https://img.shields.io/bundlejs/size/%40chronocide%2Fhyper">
  <a href="https://www.npmjs.com/package/@chronocide/hyper">
    <img alt="NPM" src="https://img.shields.io/npm/v/@chronocide/hyper?label=npm">
  </a>
</div>

Hyper is a tiny TypeScript library designed to ease working with the DOM. Hyper tries to be as simple as possible whilst maintaining good developer experience and currently features:

 - Relies on native API's (DOM)
 - All state is stored within the DOM[*](#exception), no vDOM

<p id="exception"><code>document</code> is stored internally, this prevents binding it for every single call.</p>

## Installation

```sh
npm i @chronocide/hyper
```

## Usage

```TS
import h from '@chronocide/hyper';

const img = h('img')({ src: '/cat.png' })(); // HTMLImageElement

document.body.appendChild(img);
```

### List

Components are cached and only updated if the data is changed, order does not matter. Data does not need to be unique, duplicate nodes are cloned.

```TS
import type { Component } from '@chronocide/hyper';
import { list } from '@chronocide/hyper';

type Planet = { id: string; name: string };

const data: Planet[] = [
  { id: 'jupiter', name: 'Jupiter' },
  { id: 'mars', name: 'Mars' },
  { id: 'pluto', name: 'Pluto' }
];

const ul = h('ul')()();
const component: Component<Planet> = planet => h('li')()(planet.name);

const update = list<Planet>(component)(ul);
update(data);
```

### Testing

Hyper relies on the DOM, which may not always be available. In those cases, it's possible to set a custom DOM using `env`:

```TS
import { env } from '@chronocide/hyper';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();
env.document = dom.window.document;
```

Examples can be found in the test files, such as [hyper.spec.ts](/src/hyper.spec.ts).

## Development

Hyper uses `puppeteer` for browser testing and does not install Chrome by default. To run tests, create an `.env` file by running

```sh
npm run env
```

**Note:** If you're running Linux, have Chrome installed in a non-standard location or wish to use a different browser, you can create the `.env` file yourself:

```env
BROWSER_PATH=<path_to_browser>
```
