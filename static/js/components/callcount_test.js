const html = require('choo/html');
const callcount = require('./callcount.js');
const chai = require('chai');
const expect = chai.expect;

// Skip a test if the browser does not support locale-based number formatting
function ifLocaleSupportedIt (name, test) {
  if (window.Intl && window.Intl.NumberFormat) {
    it(name, test);
  }
  else {
    it.skip(name, test);
  }
}

describe('callcount component', () => {
  ifLocaleSupportedIt('should properly format call total >=1000 with commas', () => {
    let state = {totalCalls: '123456789'};
    let result = callcount(state);
    expect(result.textContent).to.contain('123,456,789');
  });

  ifLocaleSupportedIt('should properly format call total < 1000 without commas', () => {
    const totals = '123';
    let state = {totalCalls: totals};
    let result = callcount(state);
    expect(result.textContent).to.contain(totals);
    expect(result.textContent).to.not.contain(',');
  });

  ifLocaleSupportedIt('should not format zero call total', () => {
    const totals = '0';
    let state = {totalCalls: totals};
    let result = callcount(state);
    expect(result.textContent).to.contain(totals);
    expect(result.textContent).to.not.contain(',');
  });

});
