import { test } from 'node:test';
import assert from 'node:assert/strict';

import dom from '../test/dom.ts';

import html, { mathml, svg, xml, env } from './hyper.ts';

test('[hyper.html] creates HTML element', () => {
  const { window } = dom();
  env(window.document);

  const a = html('a')({ href: '/' })('a');

  assert.ok(a instanceof window.HTMLElement);
  assert.equal(a.tagName, 'A', 'tag');
  assert.equal(a.getAttribute('href'), '/', 'attribute');
  assert.equal(a.text, 'a', 'children');
});

test('[hyper.svg] creates SVG element', () => {
  const { window } = dom();
  env(window.document);

  const a = svg('a')({ href: '/' })('a');

  assert.ok(a instanceof window.SVGElement);
  assert.equal(a.namespaceURI, 'http://www.w3.org/2000/svg');
  assert.equal(a.tagName, 'a', 'tag');
  assert.equal(a.getAttribute('href'), '/', 'attribute');
  assert.equal(a.textContent, 'a', 'children');
});

test('[hyper.mathml] creates MathML element', () => {
  const { window } = dom();
  env(window.document);

  const a = mathml('blur')({ href: '/' })('a');

  /**
   * `MathMLElement` is currently not supported by `jsdom`
   * 
   * @see https://github.com/jsdom/jsdom/issues/3515
   */
  // assert.ok(a instanceof window.MathMLElement);
  assert.equal(a.namespaceURI, 'http://www.w3.org/1998/Math/MathML');
  assert.equal(a.tagName, 'blur', 'tag');
  assert.equal(a.getAttribute('href'), '/', 'attribute');
  assert.equal(a.textContent, 'a', 'children');
});

test('[hyper.xml] creates XML element', () => {
  const { window } = dom();
  env(window.document);

  const a = xml('a')({ href: '/' })('a');

  assert.ok(a instanceof window.HTMLElement);
  assert.equal(a.namespaceURI, 'http://www.w3.org/1999/xhtml');
  assert.equal(a.tagName, 'A', 'tag');
  assert.equal(a.getAttribute('href'), '/', 'attribute');
  assert.equal(a.textContent, 'a', 'children');
});
