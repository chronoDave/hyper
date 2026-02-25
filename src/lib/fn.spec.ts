import test from 'node:test';

import dom from '../../test/dom.ts';

import * as fn from './fn.ts';
import Env from './env.ts';

test('[fn.maybe]', t => {
  const x = (i: number) => i;

  t.assert.equal(fn.maybe(x)(1), 1, 'value');
  t.assert.equal(fn.maybe(x)(null), null, 'null');
  t.assert.equal(fn.maybe(x)(undefined), null, 'undefined');
});

test('[fn.debounce]', async t => {
  const wait = async () => new Promise(resolve => setTimeout(resolve, 1000 / 60));
  const { document, window } = dom({ visual: true });

  const env = new Env();
  env.document = document;
  env.window = window;

  let i = 0;
  const x = fn.debounce(env)(() => {
    i += 1;
  });

  x();
  x();
  await wait();

  t.assert.equal(i, 1);

  x();
  x();
  await wait();

  t.assert.equal(i, 2);
});
