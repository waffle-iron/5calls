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

describe('translation', () => {
  it('should return the "1000" when given 1000 showing that we have not implement number formatting', () => {
    let key = 'common.callWithCount'
    let options = {'count': 1000};
    let expected = '1000 calls';
    let result = t.getText(key, options, true);
    expect(result).to.equal(expected);
  });
});