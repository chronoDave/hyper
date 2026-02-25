/* eslint-disable import-x/unambiguous */
const { default: h, virtual } = window.hyper;

const list = h('ul')({ style: { width: '100vw', height: '100vh' } })();

document.body.append(list);

const { update, scrollTo } = virtual({
  width: 200,
  height: 250
})((_, i) => h('li')({ 'data-index': i.real })(`${i.virtual} (${i.real})`))(list);

update(Array.from({ length: 100 }));

window.scrollTo = scrollTo;
window.update = update;
