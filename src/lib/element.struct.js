/* eslint-disable import-x/unambiguous */
const { default: h, virtual } = window.hyper;

const list = h('ul')({
  style: {
    width: '500px',
    height: '500px'
  }
})();

document.body.append(list);

const { update, scrollTo } = virtual({
  width: 200,
  height: 250
})(i => h('li')({ 'data-index': i })(`${i}`))(list);

update(Array.from({ length: 100 }));

window.scrollTo = scrollTo;
window.update = update;
