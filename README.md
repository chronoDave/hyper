# hyper

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

const update = list<Planet>(planet => planet.id)(component)(ul);
update(data);
```

### Testing

Hyper relies on the DOM, which may not always be available. In those cases, it's possible to set a custom DOM using `env`:

```TS
import { env } from '@chronocide/hyper';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();

env(dom.window.document);
```

Examples can be found in the test files, such as [hyper.spec.ts](/src/hyper.spec.ts).

## Testing

Hyper uses `puppeteer` for browser testing and does not install Chrome by default. To run tests, create a `.env` file with `BROWSER_PATH` pointing to a browser executable:

```env
BROWSER_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
```

Run the tests using

```sh
npm test
```
