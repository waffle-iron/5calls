const html = require('choo/html');
const contact = require('./contact');
const chai = require('chai');
const expect = chai.expect;

describe('contact component', () => {
  it('should render contact name', () => {
    let rep = {
      name: 'Big Whig',
      state: 'NZ',
      phone: '202-123-1234',
      party: 'Dem',
      photoURL: '',
      reason: ''
    };
    let result = contact(rep);
    expect(result.toString()).to.contain(contact.name);
  });

  it('should render first initial of party name', () => {
    let expected = 'R';
    let rep = {
      name: 'Big Whig',
      state: 'QZ',
      phone: '202-123-1234',
      party: expected + 'ep',
      photoURL: '',
      reason: ''
    };
    let result = contact(rep);
    expect(result.toString()).to.contain(expected + '-' + rep.state);
  });

  it('should not render state if party is missing', () => {
    let rep = {
      name: 'Big Whig',
      state: 'PZ',
      phone: '202-123-1234',
      party: '',
      photoURL: '',
      reason: ''
    };
    let result = contact(rep);
    expect(result.toString()).to.not.contain(contact.state);
  });
});