/**
 * Sets up mocha webdriver end-to-end tests.
 *
 * The beforeTests() function should be run inside a before() block
 * with the return value assigned to a local variable.
 *
 * The afterTests() function should be run inside an after() block
 * with its argument being the assigned value that was returned by
 * beforeTests().
 */
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

test.before(function() {
  this.driver = new webdriver.Builder()
    .withCapabilities({
      'browserName': 'chrome',
      'timeout': '20000',
      'chromeOptions': {
        prefs: {
          'profile.managed_default_content_settings.notifications': 2
        }
      }
    })
    .build();
});

test.after(function() {
  if (this.driver) {
    this.driver.quit();
  }
});
