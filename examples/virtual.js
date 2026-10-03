import h, { virtual } from '../dist/dom.js';

const container = h('div')({
  style: {
    width: '500px',
    height: '500px',
    padding: 0
  }
})();

document.body.append(container);

const { update, scrollTo } = virtual({
  width: 200,
  height: 250,
  render: (_, i) => h('li')({ 'data-index': i.real })(`${i.virtual} (${i.real})`)
})(container, h('ul')({ style: { padding: 0 } })());

update(Array.from({ length: 100 }));

const button = h('button')({ type: 'button' })('Scroll to random item');
button.addEventListener('click', () => {
  scrollTo(Math.round(Math.random() * 100));
});

document.body.append(button);
