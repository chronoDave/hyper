import test from 'node:test';

import * as math from './math.ts';

test('[math.clamp] clamps number', t => {
  t.assert.equal(math.clamp(-3)(3)(-4), -3, 'min');
  t.assert.equal(math.clamp(-3)(3)(4), 3, 'max');
  t.assert.equal(math.clamp(0)(3)(1), 1, 'n');
});
