/* eslint-disable no-undef */
/* eslint-disable import-x/unambiguous */
const { default: h, virtual } = window.dom;

const container = h('div')({
  style: {
    width: '100vw',
    height: '500px'
  }
})();

document.body.append(container);

const { update, scrollTo } = virtual({
  width: 200,
  height: 250,
  render: (_, i) => h('li')({ 'data-index': i.real })(`${i.virtual} (${i.real})`)
})(container, h('ul')()());

update(Array.from({ length: 100 }));

window.scrollTo = scrollTo;
window.update = update;
