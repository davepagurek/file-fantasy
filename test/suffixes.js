const assert = require('assert');

const { parts, dec, inc } = require('../suffixes');

describe('inc', function() {
  it('works', function() {
    assert.equal(inc('test_1.txt'), 'test_2.txt');
  });
  it('carries', function() {
    assert.equal(inc('test_9.txt'), 'test_1_0.txt');
  });
});
