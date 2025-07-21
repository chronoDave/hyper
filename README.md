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

const img = h(document)('img')({ src: '/cat.png' })(); // HTMLImageElement

document.body.appendChild(img);
```
