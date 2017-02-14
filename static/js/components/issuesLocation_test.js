const html = require('choo/html');
const issuesLocation = require('./issuesLocation');
const chai = require('chai');
const expect = chai.expect;

describe('issuesLocation component', () => {
  it('should send "focusLocation" action when askingLocation is true and ' +
    'fetchingLocation is false', () => {
    const expected = 'focusLocation';
    let actual = undefined;
    // mock impl to test that it is being called in component
    let send = (msg) => actual = msg;
    let state = {
      askingLocation: true,
      fetchingLocation: false
    };
    issuesLocation(state, null, send);
    expect(actual).to.equal(expected);
  });
  it('should NOT send "focusLocation" action when askingLocation is true and ' +
    'fetchingLocation is true', () => {
    const expected = 'focusLocation';
    let actual = undefined;
    let send = (msg) => actual = msg;
    let state = {
      askingLocation: true,
      fetchingLocation: true
    };
    issuesLocation(state, null, send);
    expect(actual).to.not.equal(expected);
  });
  it('should NOT send "focusLocation" action when askingLocation is false and ' +
    'fetchingLocation is false', () => {
    const expected = 'focusLocation';
    let actual = undefined;
    let send = (msg) => actual = msg;
    let state = {
      askingLocation: false,
      fetchingLocation: false
    };
    issuesLocation(state, null, send);
    expect(actual).to.not.equal(expected);
  });
});
