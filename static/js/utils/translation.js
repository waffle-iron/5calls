const i18n = require('i18next');

const VNode = require('virtual-dom/vnode/vnode');
const VText = require('virtual-dom/vnode/vtext');
const createElement = require('virtual-dom/create-element');

module.exports = {
    getText : (key, variableObject) => {
        var htmlString = i18n.t(key, variableObject);
        return createFragment(htmlString);
    }
}

function createFragment(htmlString){
  var convertHTML = require('html-to-vdom')({
      VNode: VNode,
      VText: VText
  });

  var fragment = `<span>${htmlString}</span>`;

  var vtree = convertHTML(fragment);
  return createElement(vtree);
}