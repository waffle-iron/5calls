const html = require('choo/html');
const t = require('../utils/translation');

module.exports = (state, prev, send) => {
  function initializeFragment(targetId) {
    let el = document.getElementById(`${targetId}`);
    if (el) {
      el.addEventListener("click", (e)=>enterLocation(e), false);
    }
  }

  function enterLocation(e) {
    e.preventDefault();
    send('enterLocation');
  }

  function noContactsMessage(state) {
    if (state.splitDistrict && (state.address || state.cachedCity)) {
      const targetId = 'lnkEnterAddress';
      return html`<div onload=${() => initializeFragment(targetId)}>
                    <p>${t("noContact.oneOfTwoDistricts")}</p>
                    <p>${t("noContact.enterYourLocation", {anchorId: targetId})}</p>
                  </div>`
    }
    else {
      const targetId = 'lnkSetYourLocation';
      return html`<h2 onload=${() => initializeFragment(targetId)}>${t("noContact.setYourLocation", {anchorId: targetId})}</h2>`
    }
  }

  return html`
    <div class="call__nocontact">
		  ${noContactsMessage(state)}
	  </div>`
}