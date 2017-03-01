/**
 * End-to-end tests for home page
 *
 * See Readme.md for instructions on running the test
 */
const test = require('selenium-webdriver/testing');
const chai = require('chai');
const setup = require('../static/test/setupEndToEndTests');

const expect = chai.expect;

const url = setup.BASE_URL;

test.describe('home page', () => {
  let driver;

  test.before(() => {
    driver = setup.beforeTests();
  });

  test.after(() => {
    setup.afterTests(driver);
  });

  test.beforeEach(() => {
    driver.get(url);
  });

  test.it('should show correct page title', (done) => {
    let expected = '5 Calls: Make your voice heard';
    return driver.getTitle().then((title) => {
      expect(title).to.equal(expected);
      done();
    });
  });

});