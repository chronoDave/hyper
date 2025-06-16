import test from 'node:test';
import { JSDOM } from 'jsdom';

import html, { mathml, svg, xml } from './index.ts';

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
