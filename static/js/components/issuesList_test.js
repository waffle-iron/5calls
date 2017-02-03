const html = require('choo/html');
const issuesList = require('./issuesList.js');
const chai = require('chai');
const expect = chai.expect;

describe('issues list component', () => {
  it('should display no issues', () => {
    let state = {issues: []};
    let results = issuesList(state);
    console.log('result', results.getElementsByTagName('ul'));
    // console.log('result', results);

  });
});