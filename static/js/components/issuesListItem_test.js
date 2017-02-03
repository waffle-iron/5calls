const html = require('choo/html');
const issuesListItem = require('./issuesListItem.js');
const chai = require('chai');
const expect = chai.expect;

describe('issuesListItem component', () => {

  it('should display an issue', () => {
    let issue = {id: 99, contacts:[{id:88,name:'mccain'}], name: 'Trump'};
    let location = {params:[{issueId:100}]};
    let state = {completedIssues: [], location};
    let sendCalled = false;
    let send = (name, objWithId) =>  sendCalled = true;
    let results = issuesListItem(issue, state, null, send);
    let paras = results.getElementsByTagName('p');
    // console.log('all P elements', paras);
    // Find content of P elements
    let pContent = [];
    paras.forEach(node => {
      if (node.childNodes) {
        node.childNodes.forEach( child => {
         if (child.data && child.data !== '') {
          pContent.push(child.data);
         }
        });
      }
    });
    expect(pContent.length).to.not.equal(0);
    expect(pContent[0]).to.contain(issue.name);
    expect(pContent[1]).to.contain(issue.contacts.length);
  });
});