# Hyper

TypeScript DOM library

```TS
import h from '@chronocide/hyper';

const img = h(document)('img')({ src: '/cat.png' })(); // HTMLImageElement

document.body.appendChild(img);
```
