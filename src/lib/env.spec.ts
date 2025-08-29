import test from 'node:test';
import assert from 'node:assert/strict';

import dom from '../../test/dom.ts';

import Env from './env.ts';

test('[env] does not throw if document is set manually', () => {
  const env = new Env();
  const { document } = dom();
  env.document = document;

  assert.doesNotThrow(() => env.document);
});
