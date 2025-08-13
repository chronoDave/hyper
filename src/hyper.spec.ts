import test from 'node:test';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import fsp from 'fs/promises';
import path from 'path';

import dom from '../test/dom.ts';

import h, { env } from './hyper.ts';

test('[hyper] does not error if document is set manually', () => {
  const { document } = dom();
  env(document);

  assert.doesNotThrow(h('div')());
});

test('[hyper] does not error if document is set automatically', async () => {
  const browser = await puppeteer.launch({ executablePath: process.env.BROWSER_PATH });
  const page = await browser.newPage();
  const hyper = await fsp.readFile(path.join(process.cwd(), 'dist/hyper.js'), 'utf-8');

  const match = /export { (.*) as \w+.*;/.exec(hyper);
  await page.setContent(`<body><script>${hyper.replace(/export.*;/, '')}document.body.append(${match?.[1]}('h1')()('Hyper'));</script></body>`);

  try {
    await assert.doesNotReject(page.waitForSelector('h1'));
  } catch (err) {
    assert.fail(err as Error);
  } finally {
    await browser.close();
  }
});
