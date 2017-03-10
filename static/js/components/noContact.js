const html = require('choo/html');
const t = require('../utils/translation');

const find = require('lodash/find');

module.exports = (state, prev, send) => {
  function enterLocation(e) {
    e.preventDefault();
    send('enterLocation');
  }

  function noContactsMessage(state) {
    if (state.splitDistrict && (state.address || state.cachedCity)) {
      return html`<div>
                    <p>${t.getText("noContact.oneOfTwoDistricts")}</p>
                    <p>${t.getText("noContact.enterYourLocation")}</p>
                  </div>`
    }
    else {
      return html`<h2>${t.getText("noContact.setYourLocation")}</h2>`
    }
  }

	return html`
    <div class="call__nocontact">
		  ${noContactsMessage(state)}
	  </div>`
}