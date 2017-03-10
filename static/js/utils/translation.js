const i18n = require('i18next');
const html = require('choo/html');

const find = require('lodash/find');


module.exports = {
    // key - the localization key in the locale file
    // variableObject - a json object having variables that will be interpolated into the localized string
    // justText - if true, the object will be returned as just a text string and not turned into a choo fragment.
    //      there is at least one use case where this is required(a placeholder in a text input cannot have text within a span)
    getText : (key, variableObject, justText) => {
        variableObject = variableObject || {};
        justText = justText || false;

        // get the localized string from the i18n cache
        let template = i18n.t(key, variableObject);

        if (justText){
            return template;
        }    

        // wrap it in the choo literal.  It also needs to be in a single node.
        //  Using span here.  Could also be div.
        template = "return html`<span>" + template + "</span>`";    

        // Create a function from this string.  It will compile the string into code.
        const func = new Function("html", template);

        // evaluate/run the code.  Choo will render the text/html into dom nodes
        return func(html);
    },

    getLocaleFromBrowserLanguage : (browserLanguage) => {
        const acceptedLocales = ['en', 'es'];
        const fallbackLocale = 'en';
        let locale = find(acceptedLocales, (l) => l === browserLanguage.substring(0,2))
        if (!locale){
            locale = fallbackLocale;
        }    

        return locale;
    }
}