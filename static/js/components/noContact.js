const html = require('choo/html');
const find = require('lodash/find');

module.exports = (state, prev, send) => {
  function enterLocation(e) {
    e.preventDefault();
    send('enterLocation');
  }

	return html`<div class="call__nocontact">
		<h2><a onclick=${(e) => enterLocation(e)}>Set your location</a> to find your representatives</h2>
	</div>`
}