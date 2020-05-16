const assert = require('assert');

const { settings, parts, dec, inc } = require('../suffixes');

settings.suffixes = "0123456789".split('');

describe('inc', function() {
  it('works', function() {
    assert.equal(inc('test_1.txt'), 'test_2.txt');
  });
  it('carries', function() {
    assert.equal(inc('test_9.txt'), 'test_1_0.txt');
  });
  it('starts from 0', function() {
    assert.equal(inc('test.txt'), 'test_1.txt');
  });
});

describe('dec', function() {
  it('works', function() {
    assert.equal(dec('test_9.txt'), 'test_8.txt');
  });
  it('borrows', function() {
    assert.equal(dec('test_2_0.txt'), 'test_1_9.txt');
  });
  it('stops at 0', function() {
    assert.equal(dec('test_1.txt'), 'test.txt');
  });
});
