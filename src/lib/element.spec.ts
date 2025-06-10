import test from 'node:test';
import { JSDOM } from 'jsdom';

import { set, html, svg, mathml, xml } from './element.ts';

test('[element.set] sets attributes', t => {
  const { window } = new JSDOM();

  const a = window.document.createElement('div');
  set(a)({ class: 'body' });
  t.assert.equal(a.classList.contains('body'), true, 'class');

  const b = window.document.createElement('div');
  set(b)({ 'aria-hidden': true });
  t.assert.equal(b.getAttribute('aria-hidden'), 'true', 'true');

  const c = window.document.createElement('div');
  set(c)({ 'aria-hidden': false });
  t.assert.equal(c.getAttribute('aria-hidden'), 'false', 'false');

  const d = window.document.createElement('div');
  set(d)({ height: 80 });
  t.assert.equal(d.getAttribute('height'), '80', 'number');

  const e = window.document.createElement('div');
  set(e)({ width: 32, height: 32 });
  t.assert.equal(e.attributes.length, 2, 'multiple');

  const f = window.document.createElement('div');
  set(f)({ x: null });
  t.assert.notEqual(f.getAttribute('x'), 'null', 'null');

  const g = window.document.createElement('div');
  set(g)({ x: undefined });
  t.assert.notEqual(g.getAttribute('x'), 'undefined', 'undefined');
});

test('[element.html] creates element', t => {
  const { window } = new JSDOM();

  const a = html(window.document)('a')({ href: '/' })('a');
  t.assert.equal(a.tagName, 'A', 'tag');
  t.assert.equal(a.getAttribute('href'), '/', 'attribute');
  t.assert.equal(a.text, 'a', 'children');
});

test('[element.svg] creates element', t => {
  const { window } = new JSDOM();

  const a = svg(window.document)('a')({ href: '/' })('a');
  t.assert.equal(a.tagName, 'a', 'tag');
  t.assert.equal(a.getAttribute('href'), '/', 'attribute');
  t.assert.equal(a.textContent, 'a', 'children');
});

test('[element.mathml] creates element', t => {
  const { window } = new JSDOM();

  const a = mathml(window.document)('blur')({ href: '/' })('a');
  t.assert.equal(a.tagName, 'blur', 'tag');
  t.assert.equal(a.getAttribute('href'), '/', 'attribute');
  t.assert.equal(a.textContent, 'a', 'children');
});

test('[element.xml] creates element', t => {
  const { window } = new JSDOM();

  const a = xml(window.document)('a')({ href: '/' })('a');
  t.assert.equal(a.tagName, 'A', 'tag');
  t.assert.equal(a.getAttribute('href'), '/', 'attribute');
  t.assert.equal(a.textContent, 'a', 'children');
});
