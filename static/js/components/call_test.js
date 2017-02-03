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
    // use toString() for simplicity
    expect(result.toString()).to.contain(expectSubstr);
  });

  describe('contactArea section', () => {

    it('should display contact if contact data is present in state', () => {
      let cname = 'Senator Blowhart';
      let id = 1;
      let location = {params: {issueid: id}};
      let issue = {
        id: id,
        name: 'Bozo the nominee',
        reason: 'crazy',
        script: 'Please vote against everything'
      };
      let contact = {name: cname, party: 'Dem'};
      issue.contacts = [contact];
      let issues = [issue];
      let state = {issues, location, contactIndex: 0};
      let result = call(state);
      let h3s = result.getElementsByTagName('h3');
      // First h3 should contain 'Call this office'
      expect(h3s[0].childNodes[0].data).to.contain('Call this office');
    });

    it('should display "Set your location" link if contact data is NOT present in state', () => {
      let id = 1;
      let location = {params: {issueid: id}};
      let issue = {
        id: id,
        name: 'Bozo the nominee',
        reason: 'crazy',
        script: 'Please vote against everything'
      };
      issue.contacts = [null];
      let issues = [issue];
      let state = {issues, location, contactIndex: 0};
      let result = call(state);
      let as = result.getElementsByTagName('a');
      // First anchor should contain 'Set your location' text content
      expect(as[0].childNodes[0].data).to.contain('Set your location');
    });
  });
});