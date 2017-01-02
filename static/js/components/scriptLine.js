const html = require('choo/html');
const find = require('lodash/find');

module.exports = (scriptLine, state, prev, send) => {
  return html`
  	<p>${scriptLine}</p>
  `;
}