import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import fsp from 'fs/promises';

import dom from '../../test/dom.ts';
import puppeteer from '../../test/browser.ts';

import Env from './env.ts';
import * as element from './element.ts';

test('[element.set] sets attributes', () => {
  const { window } = new JSDOM();

  const a = window.document.createElement('div');
  element.set(a)({ class: 'body' });
  assert.equal(a.classList.contains('body'), true, 'class');

  const b = window.document.createElement('div');
  element.set(b)({ 'aria-hidden': 'true' });
  assert.equal(b.getAttribute('aria-hidden'), 'true', 'string (true)');

  const c = window.document.createElement('div');
  element.set(c)({ 'aria-hidden': 'false' });
  assert.equal(c.getAttribute('aria-hidden'), 'false', 'string (false)');

  const h = window.document.createElement('div');
  element.set(h)({ disabled: true });
  assert.equal(h.getAttribute('disabled'), '', 'boolean (true)');

  const i = window.document.createElement('div');
  element.set(i)({ disabled: false });
  assert.equal(i.getAttribute('disabled'), null, 'boolean (false)');

  const d = window.document.createElement('div');
  element.set(d)({ height: 80 });
  assert.equal(d.getAttribute('height'), '80', 'number');

  const e = window.document.createElement('div');
  element.set(e)({ width: 32, height: 32 });
  assert.equal(e.attributes.length, 2, 'multiple');

  const f = window.document.createElement('div');
  element.set(f)({ x: null });
  assert.notEqual(f.getAttribute('x'), 'null', 'null');

  const g = window.document.createElement('div');
  element.set(g)({ x: undefined });
  assert.notEqual(g.getAttribute('x'), 'undefined', 'undefined');
});

test('[element.style] sets style', () => {
  const { window } = new JSDOM();

  const b = window.document.createElement('div');
  element.style(b)({ overflow: 'hidden' });
  assert.equal(b.style.overflow, 'hidden', 'string');

  const e = window.document.createElement('div');
  element.style(e)({ width: '32px', height: '32px' });
  assert.equal(e.style.width, '32px', 'multiple');
  assert.equal(e.style.height, '32px', 'multiple');
});

test('[element.create]', t => {
  const { document, window } = dom();
  const env = new Env();
  env.window = window;
  env.document = document;

  t.test('[element.html] creates HTML element', () => {  
    const a = element.html(env)('a')({ href: '/' })('a');
  
    assert.equal(a.tagName, 'A', 'tag');
    assert.equal(a.getAttribute('href'), '/', 'attribute');
    assert.equal(a.textContent, 'a', 'children');
  });
  
  t.test('[element.svg] creates SVG element', () => {
    const a = element.svg(env)('a')({ href: '/' })('a');
  
    assert.equal(a.namespaceURI, 'http://www.w3.org/2000/svg');
    assert.equal(a.tagName, 'a', 'tag');
    assert.equal(a.getAttribute('href'), '/', 'attribute');
    assert.equal(a.textContent, 'a', 'children');
  });
  
  t.test('[element.mathml] creates MathML element', () => {  
    const a = element.mathml(env)('blur')({ href: '/' })('a');
  
    assert.equal(a.namespaceURI, 'http://www.w3.org/1998/Math/MathML');
    assert.equal(a.tagName, 'blur', 'tag');
    assert.equal(a.getAttribute('href'), '/', 'attribute');
    assert.equal(a.textContent, 'a', 'children');
  });
  
  t.test('[element.xml] creates XML element', () => { 
    const a = element.xml(env)('a')({ href: '/' })('a');
  
    assert.equal(a.namespaceURI, 'http://www.w3.org/1999/xhtml');
    assert.equal(a.tagName, 'A', 'tag');
    assert.equal(a.getAttribute('href'), '/', 'attribute');
    assert.equal(a.textContent, 'a', 'children');
  });
});

test('[element.list]', t => {
  const env = () => {
    const { document, window } = dom();
    const env = new Env();
    env.window = window;
    env.document = document;

    return env;
  };

  const struct = () => {
    const context = env();
    const h = element.html(context);

    const ul = h('ul')()();
    const update = element.list<number>(n => h('li')()(`${n}`))(ul);

    return { ul, update };
  };
  
  t.test('adds children on update', () => {
    const { ul, update } = struct();
    
    update([1, 2, 3, 4]);
    assert.equal(ul.children.item(0)?.textContent, '1', 'renders child');
    assert.equal(ul.children.length, 4, 'append');

    update([5, 1, 2, 3, 4]);
    assert.equal(ul.children[0].textContent, '5', 'prepend');
  });

  t.test('removes children on update', () => {
    const { ul, update } = struct();

    update([2, 3]);
    assert.equal(ul.children.length, 2, 'start size');
    assert.equal(ul.children[0].textContent, '2', 'start');

    update([]);
    assert.equal(ul.children.length, 0, 'remove');
  });

  t.test('caches children', () => {
    const { ul, update } = struct();
    update([1, 2, 3, 4]);
    const children = Array.from(ul.children);

    update([1, 2, 3, 4]);
    assert.equal(children[1], ul.children[1], 'add');

    update([1, 2]);
    assert.equal(children[1], ul.children[1], 'remove');
  });
});

test('[element.virtual]', async t => {
  const script = await fsp.readFile(new URL('element.struct.js', import.meta.url), 'utf-8');
  const { page, close } = await puppeteer(script);
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    await t.test('sets list attributes', async () => {
      const properties = await page.$eval('ul', x => ({
        'position': x.style.getPropertyValue('position'),
        'max-height': x.style.getPropertyValue('max-height'),
        'overflow-y': x.style.getPropertyValue('overflow-y')
      }));

      assert.equal(properties.position, 'relative');
      assert.equal(properties['max-height'], '100%');
      assert.equal(properties['overflow-y'], 'scroll');
    });

    await t.test('sets child attributes', async () => {
      const properties = await page.$eval('li', x => ({
        index: x.getAttribute('data-index'),
        position: x.style.getPropertyValue('position'),
        transform: x.style.getPropertyValue('transform'),
        width: x.style.getPropertyValue('width'),
        height: x.style.getPropertyValue('height')
      }));

      assert.equal(properties.index, '0');
      assert.equal(properties.position, 'absolute');
      assert.equal(properties.transform, 'translate(0px, 0px)');
      assert.equal(properties.width, '250px'); // Puppeteer reports 250px whilst visually it's 242px?
      assert.equal(properties.height, '250px');
    });

    await t.test('renders spacer', async () => {
      const properties = await page.$eval('ul div', x => ({
        'aria-hidden': x.getAttribute('aria-hidden'),
        'width': x.style.getPropertyValue('width'),
        'height': x.style.getPropertyValue('height'),
        'z-index': x.style.getPropertyValue('z-index')
      }));

      assert.equal(properties['aria-hidden'], 'true');
      assert.equal(properties.width, '100%');
      assert.equal(properties.height, '12500px');
      assert.equal(properties['z-index'], '-1');
    });

    await t.test('renders children', async () => {
      const lis = await page.$$('li');

      // 2*2 + 2
      assert.equal(lis.length, 6, 'bottom');
    });

    await t.test('renders children on scroll', async () => {
      const lis = await page.$$('li');
      await lis[5].scrollIntoView();
      await page.waitForSelector('ul li:nth-child(7)');
      const next = await page.$$('li');

      // 2 + 2*3 + 2
      assert.equal(next.length, 10, 'scroll');
    });

    await t.test('scrollTo scrolls to child', async () => {
      await page.evaluate(() => {
        // @ts-expect-error: TS2559, element.struct.js window.scrollTo
        window.scrollTo(30);
      });

      const li = await page.waitForSelector('li[data-index="30"]');
      assert.ok(li);
    });

    await t.test('renders children on resize', async () => {
      let before = await page.$$eval('li', lis => lis.length);
      await page.setViewport({ width: 1000, height: 500 });
      await new Promise(resolve => setTimeout(resolve, 100));
      let after = await page.$$eval('li', lis => lis.length);

      assert.notEqual(before, after, 'wide');

      before = after;
      await page.setViewport({ width: 500, height: 500 });
      await new Promise(resolve => setTimeout(resolve, 100));
      after = await page.$$eval('li', lis => lis.length);

      assert.notEqual(before, after, 'small');
    });
  } finally {
    await close();
  }
});
