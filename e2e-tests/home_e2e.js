/**
 * End-to-end tests for home page
 *
 * To run tests:
 * 1. In a command window:
 *    cd go
 *    make run
 * 2. In a second command window:
 *    gulp
 * 3. In a third command window:
 *    npm run test:e2e
 */
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const chai = require('chai');
const expect = chai.expect;
const By = webdriver.By;
const until = webdriver.until;

const url = 'http://localhost:8000/';

let driver;

test.before(() => {
  driver = new webdriver.Builder()
    .withCapabilities({
          'browserName': 'chrome',
          'timeout': '20000',
          'chromeOptions': {
            prefs: {
              'profile.managed_default_content_settings.notifications': 2
            }
          }
      }).build();
});

test.after(() => {
  if (driver) {
    driver.quit();
  }
});

test.describe('home page', () => {

  test.beforeEach(() =>{
    driver.get(url);
  });

  test.it('should show correct page title', (done) => {
    let expected = '5 Calls: Make your voice heard';
    return driver.getTitle().then((title)=> {
      expect(title).to.equal(expected);
      done();
    });
  });
});