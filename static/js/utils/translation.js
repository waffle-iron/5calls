const i18n = require('i18next');
const html = require('choo/html');

module.exports = {
    getText : (key, variableObject) => {
        // get the localized string from the i18n cache
        let template = i18n.t(key, variableObject);

        // wrap it in the choo literal.  It also needs to be in a single node.
        //  Using span here.  Could also be div.
        template = "return html`<span>" + template + "</span>`";    

        // Create a function from this string.  It will compile the string into code.
        const func = new Function("html", template);

        // evaluate/run the code.  Choo will render the text/html into dom nodes
        return func(html);
    }
}