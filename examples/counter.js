import h from '../dist/hyper.js';

const button = h('button')({ type: 'button' })('0');
button.addEventListener('click', () => {
  button.textContent = +button.textContent + 1;
}, { passive: true });

document.body.append(button);
