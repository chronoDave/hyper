import test from 'node:test';
import assert from 'node:assert/strict';

import dom from '../test/dom.ts';
import browser from '../test/browser.ts';

import h, { env } from './hyper.ts';

test('[hyper] does not error if document is set manually', () => {
  const { document } = dom();
  env.document = document;

  assert.doesNotThrow(h('div')());
});

test('[hyper] does not error if document is set automatically', async () => {
  const { page, close } = await browser([
    'const h = window.hyper.default;',
    'document.body.append(h("h1")()("Hyper"));'
  ].join(''));

  try {
    await assert.doesNotReject(page.waitForSelector('h1'));
  } finally {
    await close();
  }
});
