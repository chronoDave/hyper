import test from 'node:test';
import { JSDOM } from 'jsdom';

import * as set from './set.ts';

test('[set.attributes] sets attributes', t => {
  const { window } = new JSDOM();

  const a = window.document.createElement('div');
  set.attributes(a)({ class: 'body' });
  t.assert.equal(a.classList.contains('body'), true, 'class');

  const b = window.document.createElement('div');
  set.attributes(b)({ 'aria-hidden': 'true' });
  t.assert.equal(b.getAttribute('aria-hidden'), 'true', 'string (true)');

  const c = window.document.createElement('div');
  set.attributes(c)({ 'aria-hidden': 'false' });
  t.assert.equal(c.getAttribute('aria-hidden'), 'false', 'string (false)');

  const h = window.document.createElement('div');
  set.attributes(h)({ disabled: true });
  t.assert.equal(h.getAttribute('disabled'), '', 'boolean (true)');

  const i = window.document.createElement('div');
  set.attributes(i)({ disabled: false });
  t.assert.equal(i.getAttribute('disabled'), null, 'boolean (false)');

  const d = window.document.createElement('div');
  set.attributes(d)({ height: 80 });
  t.assert.equal(d.getAttribute('height'), '80', 'number');

  const e = window.document.createElement('div');
  set.attributes(e)({ width: 32, height: 32 });
  t.assert.equal(e.attributes.length, 2, 'multiple');

  const f = window.document.createElement('div');
  set.attributes(f)({ x: null });
  t.assert.notEqual(f.getAttribute('x'), 'null', 'null');

  const g = window.document.createElement('div');
  set.attributes(g)({ x: undefined });
  t.assert.notEqual(g.getAttribute('x'), 'undefined', 'undefined');
});
