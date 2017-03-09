const i18n = require('i18next');
const h = require('choo/html');

module.exports = {
    getText : (key, variableObject) => {
        let template = i18n.t(key, variableObject);
        template = "h`<span>" + template + "</span>`";    
        return eval(template);
    }
}