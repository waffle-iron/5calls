const html = require('choo/html');
const script = require('./script.js');
const chai = require('chai');
const expect = chai.expect;

describe('script component', () => {
  it('should NOT display a script section if current contact is NOT found', () => {
    let id = 1;
    let location = {params: {issueid: id}};
    let issue = {id: id, name: 'Bozo the nominee', reason: 'crazy', script: 'Please vote against everything'};
    issue.contacts = [null];
    let issues = [issue];
    let state = {issues, location};
    let result = script(state);
    // console.log('script result', result);
    expect(result).to.be.undefined;
  });

  it('should display a script section if current contact is found', () => {
    let id = 1;
    let location = {params: {issueid: id}};
    let issue = {id: id, name: 'Bozo the nominee', reason: 'crazy', script: 'Please vote against everything'};
    issue.contacts = [{name:'collins'}, {name:'franken'}];
    let issues = [issue];
    let state = {issues, location, contactIndex: 1};
    let result = script(state);
    // should contain an h3 with 'Your Script'
    expect(result.getElementsByTagName('h3')[0].childNodes[0].data).to.contain('Your script');
  });
});