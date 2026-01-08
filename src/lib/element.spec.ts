import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

import dom from '../../test/dom.ts';

import {
  setAttributes,
  html,
  mathml,
  svg,
  xml
} from './element.ts';
import struct from './element.struct.ts';

test('[element.setAttributes] sets attributes', () => {
  const { window } = new JSDOM();

  const a = window.document.createElement('div');
  setAttributes(a)({ class: 'body' });
  assert.equal(a.classList.contains('body'), true, 'class');

  const b = window.document.createElement('div');
  setAttributes(b)({ 'aria-hidden': 'true' });
  assert.equal(b.getAttribute('aria-hidden'), 'true', 'string (true)');

  const c = window.document.createElement('div');
  setAttributes(c)({ 'aria-hidden': 'false' });
  assert.equal(c.getAttribute('aria-hidden'), 'false', 'string (false)');

  const h = window.document.createElement('div');
  setAttributes(h)({ disabled: true });
  assert.equal(h.getAttribute('disabled'), '', 'boolean (true)');

  const i = window.document.createElement('div');
  setAttributes(i)({ disabled: false });
  assert.equal(i.getAttribute('disabled'), null, 'boolean (false)');

  const d = window.document.createElement('div');
  setAttributes(d)({ height: 80 });
  assert.equal(d.getAttribute('height'), '80', 'number');

  const e = window.document.createElement('div');
  setAttributes(e)({ width: 32, height: 32 });
  assert.equal(e.attributes.length, 2, 'multiple');

  const f = window.document.createElement('div');
  setAttributes(f)({ x: null });
  assert.notEqual(f.getAttribute('x'), 'null', 'null');

  const g = window.document.createElement('div');
  setAttributes(g)({ x: undefined });
  assert.notEqual(g.getAttribute('x'), 'undefined', 'undefined');
});

test('[element.html] creates HTML element', () => {
  const { document, window } = dom();

  const a = html(document)('a')({ href: '/' })('a');

  assert.ok(a instanceof window.HTMLElement);
  assert.equal(a.tagName, 'A', 'tag');
  assert.equal(a.getAttribute('href'), '/', 'attribute');
  assert.equal(a.textContent, 'a', 'children');
});

test('[element.svg] creates SVG element', () => {
  const { document, window } = dom();

  const a = svg(document)('a')({ href: '/' })('a');

  assert.ok(a instanceof window.SVGElement);
  assert.equal(a.namespaceURI, 'http://www.w3.org/2000/svg');
  assert.equal(a.tagName, 'a', 'tag');
  assert.equal(a.getAttribute('href'), '/', 'attribute');
  assert.equal(a.textContent, 'a', 'children');
});

test('[element.mathml] creates MathML element', () => {
  const { document } = dom();

  const a = mathml(document)('blur')({ href: '/' })('a');

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

test('[element.xml] creates XML element', () => {
  const { document, window } = dom();

  const a = xml(document)('a')({ href: '/' })('a');

  assert.ok(a instanceof window.HTMLElement);
  assert.equal(a.namespaceURI, 'http://www.w3.org/1999/xhtml');
  assert.equal(a.tagName, 'A', 'tag');
  assert.equal(a.getAttribute('href'), '/', 'attribute');
  assert.equal(a.textContent, 'a', 'children');
});

test('[element.list] creates list', () => {
  const { ul } = struct();

  assert.equal(ul.children.length, 4, 'has children');
  assert.equal(ul.children.item(0)?.textContent, '1', 'renders child');
});

test('[element.list] adds children on update', () => {
  const { ul, update } = struct();

  update([1, 2, 3, 4]);
  assert.equal(ul.children.length, 4, 'end size');

  update([5, 1, 2, 3, 4]);
  assert.equal(ul.children[0].textContent, '5', 'start');
});

test('[element.list] removes children on update', () => {
  const { ul, update } = struct();

  update([2, 3]);
  assert.equal(ul.children.length, 2, 'start size');
  assert.equal(ul.children[0].textContent, '2', 'start');

  update([]);
  assert.equal(ul.children.length, 0, 'remove');
});

test('[element.list] caches children', () => {
  const { ul, update } = struct();
  const children = Array.from(ul.children);

  update([1, 2, 3, 4]);
  assert.equal(children[1], ul.children[1], 'add');

  update([1, 2]);
  assert.equal(children[1], ul.children[1], 'remove');

  update([2, 1]);
  assert.equal(children[0], ul.children[1], 'shuffle');
});
