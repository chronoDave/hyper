import test from 'node:test';
import assert from 'node:assert/strict';

import * as virtual from './virtual.ts';

test('[virtual.cells]', t => {
  t.test('list', () => {
    const cells = virtual.cells({ height: 25 })({ width: 50 })(Array.from({ length: 100 }));

    assert.equal(cells.length, 100, 'size');
    assert.deepEqual(
      cells[0],
      { i: 0, width: 50, height: 25, x: 0, y: 0 },
      'first'
    );
    assert.deepEqual(
      cells[cells.length - 1],
      { i: 99, width: 50, height: 25, x: 0, y: 25 * 100 - 25 },
      'last'
    );
    assert.deepEqual(
      cells[13],
      { i: 13, width: 50, height: 25, x: 0, y: 13 * 25 },
      'random'
    );
  });

  t.test('grid', () => {
    const cells = virtual.cells({
      width: 20,
      height: 25
    })({ width: 50 })(Array.from({ length: 100 }));

    assert.equal(cells.length, 100, 'size');
    assert.deepEqual(
      cells[0],
      { i: 0, width: 25, height: 25, x: 0, y: 0 },
      'first'
    );
    assert.deepEqual(
      cells[cells.length - 1],
      { i: 99, width: 25, height: 25, x: 25, y: 1225 },
      'last'
    );
    assert.deepEqual(
      cells[13],
      { i: 13, width: 25, height: 25, x: 25, y: 6 * 25 },
      'random'
    );
  });

  t.test('dynamic', () => {
    const cells = virtual.cells({
      width: (_, i) => i % 2 === 0 ? null : 15,
      height: (_, i) => i % 2 === 0 ? 25 : null
    })({ width: 50 })(Array.from({ length: 100 }));

    assert.equal(cells.length, 100, 'size');
    assert.deepEqual(
      cells[0],
      { i: 0, width: 50, height: 25, x: 0, y: 0 },
      'first'
    );
    assert.deepEqual(
      cells[cells.length - 1],
      { i: 99, width: 16, height: 16, x: 0, y: 2034 },
      'last'
    );
    assert.deepEqual(
      cells[13],
      { i: 13, width: 16, height: 16, x: 0, y: 271 },
      'random'
    );
  });
});

test('[virtual.height]', () => {
  assert.equal(
    virtual.height(virtual.cells({ height: 25 })({ width: 50 })(Array.from({ length: 100 }))),
    100 * 25,
    'filled'
  );

  assert.equal(
    virtual.height(virtual.cells({ height: 25 })({ width: 50 })(Array.from({ length: 0 }))),
    0,
    'empty'
  );
});

test('[virtual.view]', () => {
  /** 2x2 grid => Min 4 */
  const cells = virtual.cells({ width: 25, height: 25 })({ width: 50 })(Array.from({ length: 100 }));

  /**
   * Min: 0
   * Max: 4 + row => 6 - 1 = 5
   */
  assert.deepEqual(virtual.view({ height: 50, y: 0 })(cells), [0, 5], 'bottom');
  /**
   * Min: 79 - 50 => 29 => 25 => 25 / 25 = 1 => 1 * 2 => 2
   * Max: 79 + 50 => 129 => 150 => 150 / 25 = 6 => 6 * 2 + min => 14 - 1 => 3
   */
  assert.deepEqual(virtual.view({ height: 50, y: 79 })(cells), [2, 13], 'scroll');
  assert.deepEqual(virtual.view({ height: 50, y: virtual.height(cells) - 25 })(cells), [94, 99], 'top');
});
