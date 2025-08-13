import { test } from 'node:test';
import assert from 'node:assert/strict';

import dom from '../../../test/dom.ts';

import { html } from './element.ts';
import list from './list.ts';

const struct = () => {
  const { document } = dom();
  const h = html(document);

  const ul = h('ul')()();
  const update = list<number>(n => `${n}`)(n => h('li')()(`${n}`))(ul);
  update([1, 2, 3]);

  return { ul, update };
};

test('[list] creates list', () => {
  const { ul } = struct();

  assert.equal(
    ul.children.length,
    3,
    'has children'
  );

  assert.equal(
    ul.children.item(0)?.textContent,
    '1',
    'renders child'
  );
});

test('[list] throws if keys are not unique', () => {
  const { update } = struct();

  assert.throws(() => update([1, 1, 1]));
});

test('[list] adds children on update', () => {
  const { ul, update } = struct();

  update([1, 2, 3, 4]);
  assert.equal(ul.children.length, 4, 'end size');

  update([5, 1, 2, 3, 4]);
  assert.equal(ul.children[0].textContent, '5', 'start');
});

test('[list] removes children on update', () => {
  const { ul, update } = struct();

  update([2, 3]);
  assert.equal(ul.children.length, 2, 'start size');
  assert.equal(ul.children[0].textContent, '2', 'start');

  update([2]);
  assert.equal(ul.children.length, 1, 'end size');
  assert.equal(ul.children[0].textContent, '2', 'end');
});

test('[list] caches children', () => {
  const { ul, update } = struct();
  const { children } = ul;

  update([1, 2, 3, 4]);
  assert.equal(children[0], ul.children[0], 'add');

  update([1, 2]);
  assert.equal(children[0], ul.children[0], 'remove');
});

test('[list] orders children', () => {
  const { ul, update } = struct();

  update([3, 2, 1]);

  assert.equal(ul.children[0].textContent, '3', 'shuffle');
});
