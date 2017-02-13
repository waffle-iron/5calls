const html = require('choo/html');
const promote = require('./promote');
const chai = require('chai');
const expect = chai.expect;

describe('promote component', () => {
  it('should NOT display tweet link if issue does not exist', () => {
    let issue = undefined;
    let state = {};
    let result = promote(state, null, null, issue);
    expect(result).to.be.undefined;
  });

  it('should display tweet link if issue is defined', () => {
    let issue = {id: 1, name: 'Save ACA'};
    let state = {};
    let result = promote(state, null, null, issue);
    let element = result.querySelector('a');
    expect(element).to.be.defined;
  });
});