const html = require('choo/html');
const done = require('./done');
const chai = require('chai');
const expect = chai.expect;

describe('done component', () => {
  describe('promote include', () => {

    it('should display twitter and facebook links when issue is found', () => {
      let issue = {id: 88, name: 'impeach trump'};
      let issues = [issue];
      let val = '123';
      let totalCalls = {
        toLocaleString: () => val
      };
      let location = {params: {issueid: 88}};
      let state = {totalCalls, location, issues};
      let result = done(state);
      let a = result.getElementsByTagName('a');
      // expect an three anchors
      expect(a.length).to.equal(3);
    });

    it('should NOT display twitter and facebook links when issue is NOT found', () => {
      let issue = {id: 88, name: 'impeach trump'};
      let issues = [issue];
      let val = '123';
      let totalCalls = {
        toLocaleString: () => val
      };
      // 0 is not a real ids
      let location = {params: {issueid: 0}};
      let state = {totalCalls, location, issues};
      let result = done(state);
      let a = result.getElementsByTagName('a');
      // Only 'Learn why calling' link is present
      expect(a.length).to.equal(1);
    });
  });

  describe('callcount include', () => {
    it('should display call count total', () => {
      let val = '123';
      let totalCalls = {
        toLocaleString: () => val
      };
      let location = {params: {issueId: 88}};
      let state = {totalCalls, location};
      let result = done(state);
      // call total value should be displated in call count comp
      let h2 = result.getElementsByTagName('h2');
      expect(h2).to.be.defined;
      // "Together we've made" is first child node, call total is second
      expect(h2[1].childNodes[1].data).to.contain(val);
    });
  });
});