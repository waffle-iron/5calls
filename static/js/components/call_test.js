const html = require('choo/html');
const call = require('./call.js');
const chai = require('chai');
const expect = chai.expect;

describe('call component', () => {
  it('should return "No calls to make" if issue cannot be found', () => {
    let expectSubstr = 'No calls to make';
    let location = {params: {issueid: undefined}};
    let issues = [];
    let state = {issues, location};
    let result = call(state);
    // console.log('html: ', result.toString());
    expect(result.toString()).to.contain(expectSubstr);
  });

  it('should return contact information', () => {
    // For simplicity, we're setting up one issue and contact
    let expectSubstr = 'Senator Blowhart';
    let id = 1;
    let location = {params: {issueid: id}};
    let issue = {id: id, name: 'Bozo the nominee', reason: 'crazy', script: 'Please vote against everything'};
    let contact = {name: expectSubstr, party: 'Dem'};
    issue.contacts = [contact];
    let issues = [issue];
    let state = {issues, location, contactIndex: 0};
    let result = call(state);
    let el = result.toString();
    // console.log('html: ', el);
    expect(el).to.contain(expectSubstr);
  });
});