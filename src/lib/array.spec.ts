import test from 'node:test';
import assert from 'node:assert/strict';

import * as array from './array.ts';

test('[array.get]', () => {
  assert.equal(array.get([1, 2, 0])(2), 0, 'within bounds');
  assert.equal(array.get([1, 2, 3])(-1), null, 'out of bounds (left)');
  assert.equal(array.get([1, 2, 3])(3), null, 'out of bounds (right)');
});

test('[array.fill] returns filled array', () => {
  assert.deepEqual(
    array.fill(3)<number>((i, arr) => i - (array.get(arr)(i - 1) ?? 0)),
    [0, 1, 1],
    'fills array'
  );
});

test('[array.bisectLeft] finds leftmost element', () => {
  assert.equal(
    array.bisectLeft([1, 2, 3, 5, 7, 9, 10])(3),
    2,
    'unique'
  );

  assert.equal(
    array.bisectLeft([0, 0, 0, 0, 25, 25, 25, 25, 50, 50])(25),
    4,
    'duplicate'
  );

  assert.equal(
    array.bisectLeft([0, 0, 0, 0, 25, 25, 25, 25, 50, 50])(30),
    4,
    'round down'
  );

  assert.equal(
    array.bisectLeft([0, 0, 0, 0, 25, 25, 25, 25, 50, 50])(-1),
    0,
    'out of bounds (left)'
  );

  assert.equal(
    array.bisectLeft([0, 0, 0, 0, 25, 25, 25, 25, 50, 50])(51),
    9,
    'out of bounds (right)'
  );
});

test('[array.bisectRight] finds rightmost element', () => {
  assert.equal(
    array.bisectRight([1, 2, 3, 5, 7, 9, 10])(3),
    2,
    'unique'
  );

  assert.equal(
    array.bisectRight([0, 0, 0, 0, 25, 25, 25, 25, 50, 50])(25),
    7,
    'duplicate'
  );

  assert.equal(
    array.bisectRight([0, 0, 0, 0, 25, 25, 25, 25, 50, 50])(20),
    7,
    'round up'
  );

  assert.equal(
    array.bisectRight([0, 0, 0, 0, 25, 25, 25, 25, 50, 50])(-1),
    0,
    'out of bounds (left)'
  );

  assert.equal(
    array.bisectRight([0, 0, 0, 0, 25, 25, 25, 25, 50, 50])(51),
    9,
    'out of bounds (right)'
  );
});
