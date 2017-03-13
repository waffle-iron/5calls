/**
 * Setup script for unit testing. Any configuration specific to test
 * environments should be included here.
 */

const logger = require('loglevel');
logger.setLevel(logger.levels.TRACE, false);

// This is to allow the i18n cache to initialize before starting the tests.
// Once they are initialized, we'll call the Karma start method in the i18n callback.
window.__karma__.loaded = function() {};

(function () {
    // initialize i18n cache
    const i18n = require('i18next');
    const en_locale = require('../locales/en.json')
    const XHR = require('i18next-xhr-backend');

    i18n.use(XHR)
        .init({
        'debug': true,
        'lng': 'en',
        'backend': {
            'loadPath': 'base/static/locales/{{lng}}.json'
        },
        'fallbackLng' : 'en'
    }, function (t) {
        // i18n cache is initialized, Start the Karma tests
        window.__karma__.start();
    });
})();
