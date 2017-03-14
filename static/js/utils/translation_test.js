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

  it('should return the "1000 Calls" when given 1000 showing that we have not implement number formatting', () => {
    let key = 'common.callWithCount'
    let options = {'count': 1000};
    let expected = '1000 calls';
    let result = t.getText(key, options, true);
    expect(result).to.equal(expected);
  });

  it('should return the singular version of person based on the option provided', () => {
    let key = 'outcomes.contactsLeft'
    let options = {'count': 1};
    let expected = 'person';
    let result = t.getText(key, options, true);
    expect(result).to.contain(expected);
  });

  it('should return the pluralized version of person based on the option provided', () => {
    let key = 'outcomes.contactsLeft'
    let options = {'count': 2};
    let expected = 'people';
    let result = t.getText(key, options, true);
    expect(result).to.contain(expected);
  });

  it('should return the pluralized version of person for "0" people', () => {
    let key = 'outcomes.contactsLeft'
    let options = {'count': 0};
    let expected = 'people';
    let result = t.getText(key, options, true);
    expect(result).to.contain(expected);
  });

});



