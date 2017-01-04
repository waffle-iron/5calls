const html = require('choo/html');

module.exports = (scriptLine, state, prev, send) => {
  return html`
  	<p>${scriptLine}</p>
  `;
}