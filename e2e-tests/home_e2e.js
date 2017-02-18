const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const By = webdriver.By;
const until = webdriver.until;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var test = require('selenium-webdriver/testing');

const mochaTimeOut = 30000; //ms

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
//   // console.log('TIMEOUT', timeout);
//   // timeout = 10000;
//   driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();
});

test.after(() => {
  // if (driver) {
    driver.quit();
  // }
  // done();
});

test.describe('home page', () => {
  // this.timeout(mochaTimeOut);
  let expected = '5 Calls: Make your voice heard';
  // test.beforeEach(() => {
  //   // driver.get(url).then((resolve) => resolve());
  //     // .then(() => {
  //     // console.log('URL opened: ' + url);
  //     // done();
  //   });
  // });

  // afterEach(() => done());

  test.it('should have correct page title', (done) => {
    driver.get(url);
    return driver.getTitle().then((title)=> {
      console.log('TITLE', title);
      expect(title).to.equal(expected);
      done();
    });
    // return expect(driver.getTitle()).to.eventually.equal('foobar');
    // let about = driver.findElement(By.css('a[href="#privacy"'));

    // driver.findElement(By.css('a[href="https://5calls.org/privacy.html"')).click()
      // .then(() => done());
      // .then((result) => {
      //   console.log('about link', result);
      //   done();
      // },
      //   () => {
      //     done ()
      // });
    //  about.click();
    //  done();
    // let title = driver.getTitle();
    // return title.then((title) => {
    //   console.log('TITLE', title);
    //   expect(title).to.equal(expected);
    //   // expect(title).to.equal('foobar');
    // })
    // .then(() => title.resolve());
  });
});