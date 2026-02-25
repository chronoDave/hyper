import h, { virtual } from '../dist/hyper.js';

const list = h('ul')({
  style: {
    width: '500px',
    height: '500px',
    padding: 0
  }
})();

document.body.append(list);

const { update, scrollTo } = virtual({
  width: 200,
  height: 250
})((_, i) => h('li')({ 'data-index': i.real })(`${i.virtual} (${i.real})`))(list);

update(Array.from({ length: 100 }));

const button = h('button')({ type: 'button' })('Scroll to random item');
button.addEventListener('click', () => {
  scrollTo(Math.round(Math.random() * 100));
});

document.body.append(button);
