const html = require('choo/html');
const outcomes = require('./outcomes');
const chai = require('chai');
const expect = chai.expect;

describe('outcomes component', () => {
  it('should display outcomes div if current contact exists', () => {
      let cname = 'Senator Blowhart';
      let id = 1;
      let location = {params: {issueid: id}};
      let issue = {
        id: id,
        name: 'Bozo the nominee',
        reason: 'crazy',
        script: 'Please vote against nominee Bozo'
      };
      let contact = {name: cname, party: 'Dem'};
      issue.contacts = [contact];
      let issues = [issue];
      let state = {
        issues,
        location,
        contactIndex: 0,
      };
      let result = outcomes(state);
      let content = result.querySelector('div.call__outcomes');
      expect(content).to.be.defined;
  });

  it('should NOT display outcomes div if current contact does not exists', () => {
      let cname = 'Senator Blowhart';
      let id = 1;
      let location = {params: {issueid: id}};
      let issue = {
        id: id, // does not match location issue id
        name: 'Bozo the nominee',
        reason: 'crazy',
        script: 'Please vote against nominee Bozo'
      };
      let contact = {name: cname, party: 'Dem'};
      issue.contacts = [contact];
      let issues = [issue];
      let state = {
        issues,
        location,
        // contactIndex 1 does not exist
        contactIndex: 1
      };
      let result = outcomes(state);
      expect(result).to.be.undefined;
  });

});