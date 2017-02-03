const html = require('choo/html');
const issuesListItem = require('./issuesListItem.js');
const chai = require('chai');
const expect = chai.expect;

describe('issuesListItem component', () => {

  it('should display an issue', () => {
    let issue = {
      id: 99,
      contacts:
        [{id:88,name:'mccain'}],
        name: 'Impeach Trump'
    };
    let location = {params:[{issueId:100}]};
    let state = {completedIssues: [], location};
    let sendCalled = false;
    let send = (name, objWithId) =>  sendCalled = true;
    let results = issuesListItem(issue, state, null, send);
    let paras = results.getElementsByTagName('p');
    // Array holds non-empty P element content
    let pContent = [];
    // TODO: Simplify this
    // We are looping through the 'p' child Nodes
    // and finding ones that contain text content
    paras.forEach(node => {
      if (node.childNodes) {
        node.childNodes.forEach( child => {
         // ignore ones with no text content
         if (child.data && child.data !== '') {
          pContent.push(child.data);
         }
        });
      }
    });
    console.log('issuesListItem paragraph content: ', pContent);
    // there are 4 items in pContent
    expect(pContent.length).to.not.equal(0);
    expect(pContent[0]).to.contain(issue.name);
    // the last three are displayed in the last 'p' node
    expect(pContent[1]).to.contain(issue.contacts.length);
    expect(pContent[2]).to.contain('call'); // or 'calls'
    expect(pContent[3]).to.contain('to make');
  });
});