const html = require('choo/html');
const contact = require('./contact');
const chai = require('chai');
const expect = chai.expect;

describe('contact component', () => {
  it('should render contact name', () => {
    let contactData = {
      name: 'Big Whig',
      state: 'NZ',
      phone: '202-123-1234',
      party: 'Dem',
      photoURL: '',
      reason: ''
    };
    let result = contact(contactData);
    expect(result.toString()).to.contain(contactData.name);
  });

  it('should render party first initial and state abbrev', () => {
    let expected = 'R';
    let contactData = {
      name: 'Big Whig',
      state: 'QZ',
      phone: '202-123-1234',
      party: expected + 'ep',
      photoURL: '',
      reason: ''
    };
    let result = contact(contactData);
    expect(result.toString()).to.contain(expected + '-' + contactData.state);
  });

  it('should not render state abbrev if party is missing', () => {
    let contactData = {
      name: 'Big Whig',
      state: 'PZ',
      phone: '202-123-1234',
      party: '',
      photoURL: '',
      reason: ''
    };
    let result = contact(contactData);
    expect(result.toString()).to.not.contain(contactData.state);
  });
});