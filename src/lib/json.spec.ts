import test from 'node:test';
import assert from 'node:assert';

import * as json from './json.ts';

test('[json.equals]', t => {
  t.test('primitives', () => {
    assert.ok(json.equals(true)(true), 'boolean');
    assert.ok(json.equals(null)(null), 'null');
    assert.ok(json.equals(1)(1), 'number');
    assert.ok(json.equals('string')('string'), 'string');

    assert.ok(!json.equals(true)(false), 'boolean');
    assert.ok(!json.equals(1)(-1), 'number');
    assert.ok(!json.equals('string')('gnirts'), 'string');

    assert.ok(!json.equals(null)(false), 'falsy');
    assert.ok(!json.equals(1)(true), 'truthy');
    assert.ok(!json.equals('1')(1), 'type');
  });

  t.test('array', () => {
    assert.ok(json.equals([1, true, null, 'string'])([1, true, null, 'string']), 'shallow');
    assert.ok(json.equals([1, true, null, 'string', [1, true, null, 'string']])([1, true, null, 'string', [1, true, null, 'string']]), 'deep');

    assert.ok(!json.equals([1, 2, 3])([1, 3, 2]), 'key order');
    assert.ok(!json.equals([1])(['1']), 'shallow');
    assert.ok(!json.equals([1, [2]])([1, [3]]), 'deep');
  });

  t.test('object', () => {
    assert.ok(json.equals({ 1: 'true', b: null, c: [1, false] })({ 1: 'true', b: null, c: [1, false] }), 'shallow');
    assert.ok(json.equals({ 1: 'true', b: null, c: [1, false], d: { 1: 'true', b: null, c: [1, false] } })({ 1: 'true', b: null, c: [1, false], d: { 1: 'true', b: null, c: [1, false] } }), 'deep');
    assert.ok(json.equals({ 1: true, 2: false })({ 2: false, 1: true }), 'key order');

    assert.ok(!json.equals({ 1: 'true', b: null, c: [1, false] })({ 1: 'true', b: 2, c: [1, false] }), 'shallow');
    assert.ok(!json.equals({ 1: 'true', b: null, c: [1, false], d: { 1: 'true', b: null, c: [1, false] } })({ 1: 'true', b: null, c: [1, false], d: { 1: false, b: null, c: [1, false] } }), 'deep');
  });
});

test('[json.clone]', t => {
  t.test('primitives', () => {
    assert.equal(json.clone(true), true, 'boolean');
    assert.equal(json.clone(null), null, 'null');
    assert.equal(json.clone(1), 1, 'number');
    assert.equal(json.clone('string'), 'string', 'string');
  });

  t.test('array', () => {
    const shallow = [1, true, null, 'string'];
    const deep = [1, true, null, 'string', [1, true, null, 'string']];

    assert.notEqual(json.clone(shallow), shallow, 'shallow ref');
    assert.ok(json.equals(json.clone(shallow))(shallow), 'shallow equal');
    assert.notEqual(json.clone(deep), deep, 'deep ref');
    assert.ok(json.equals(json.clone(deep))(deep), 'deep equal');
  });

  t.test('object', () => {
    const shallow = { 1: 'true', b: null, c: [1, false] };
    const deep = { 1: 'true', b: null, c: [1, false], d: { 1: 'true', b: null, c: [1, false] } };

    assert.notEqual(json.clone(shallow), shallow, 'shallow ref');
    assert.ok(json.equals(json.clone(shallow))(shallow), 'shallow equal');
    assert.notEqual(json.clone(deep), deep, 'deep ref');
    assert.ok(json.equals(json.clone(deep))(deep), 'deep equal');
  });
});
