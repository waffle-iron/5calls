const t = require('./translation.js');
const chai = require('chai');
const expect = chai.expect;

describe('translation', () => {
  it('should return the english localized string when given the key', () => {
    let key = 'common.reset'
    let expected = 'reset';
    let result = t.getText(key, null, true);
    expect(result).to.equal(expected);
  });
});