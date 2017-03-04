const html = require('choo/html');
const about = require('./about.js');
const chai = require('chai');
const expect = chai.expect;
const i18n = require('i18next');
const XHR = require('i18next-xhr-backend');

i18n.use(XHR)
    .init({
    'debug': true,
    'lng': 'en',
    'backend': {
      'loadPath': '/locales/{{lng}}.json'
    },
    'fallbackLng' : 'en'
}, function (t) {
  var x =i18n.t('about.title')
});

describe('about component', () => {
  it('should return "About 5 Calls"', () => {
    let expectSubstr = 'About 5 Calls';
    let location = {params: {issueid: undefined}};
    let issues = [];
    let state = {issues, location};
    let result = about(state);
    expect(result.querySelector('h2.about__title').textContent).to.contain(expectSubstr);
  });
});