import h, { list } from '../dist/hyper.js';

const random = arr => arr[Math.round(Math.random() * arr.length) % arr.length];

const adjectives = [
  'pretty',
  'large',
  'big',
  'small',
  'tall',
  'short',
  'long',
  'handsome',
  'plain',
  'quaint',
  'clean',
  'elegant',
  'easy',
  'angry',
  'crazy',
  'helpful',
  'mushy',
  'odd',
  'unsightly',
  'adorable',
  'important',
  'inexpensive',
  'cheap',
  'expensive',
  'fancy'
];

const colours = [
  'red',
  'yellow',
  'blue',
  'green',
  'pink',
  'brown',
  'purple',
  'brown',
  'white',
  'black',
  'orange'
];

const nouns = [
  'table',
  'chair',
  'house',
  'bbq',
  'desk',
  'car',
  'pony',
  'cookie',
  'sandwich',
  'burger',
  'pizza',
  'mouse',
  'keyboard'
];

const label = () => `${random(adjectives)} ${random(colours)} ${random(nouns)}`;

const data = Array
  .from({ length: 1000 })
  .map(label);

const ul = h('ul')()();
const update = list((x, i) => `${i}-${x}`)(h('li')())(ul);
update(data);

const button = h('button')({ type: 'button' })('Update every 10th row');
button.addEventListener('click', () => {
  for (let i = 0; i < 1000; i += 10) {
    data[i] = label();
  }

  update(data);
}, { passive: true });

document.body.append(button, ul);
