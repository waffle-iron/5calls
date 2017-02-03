const html = require('choo/html');
const done = require('./done');
const chai = require('chai');
const expect = chai.expect;

describe('done component', () => {
  it('should display call count total', () => {
    let val = '123';
    let totalCalls = {
      toLocaleString: () => val
    };
    let state = {totalCalls};
    let result = done(state);
    // "Together we've made" is first child node, call total is second
    // console.log('result', result.getElementsByTagName('h2')[1].childNodes[1].data);
    expect(result.getElementsByTagName('h2')[1].childNodes[1].data).to.contain(val);
  });
});