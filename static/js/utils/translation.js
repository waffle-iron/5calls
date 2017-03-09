const i18n = require('i18next');
const h = require('choo/html');

module.exports = {
    getText : (key, variableObject) => {
        const template = i18n.t(key, variableObject);
        if (template.indexOf('h`')>-1){
            return eval(template);
        }
        else return template;
    }
}