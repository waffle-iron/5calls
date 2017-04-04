const html = require('choo/html');
const t = require('../utils/translation');

module.exports = (state, prev, send) => {
  if (state.askingLocation && !state.fetchingLocation) {
    send('focusLocation');
  }

  return html`
    <div class="issues__location">
    ${pretext(state)}
    ${addressForm(state)}
    </div>
  `;

  function pretext(state) {
    if (state.fetchingLocation) {
      return html`<p class="loadingAnimation">${t("location.gettingYourLocation")}</p>`;
    } else if (state.askingLocation) {
      return html``;
    } else if (state.invalidAddress) {
      return html`<p><button class="subtle-button" onclick=${enterLocation}>${t("location.invalidAddress")}</button></p>`;
    } else if (state.address) {
      return html`<p>for <button class="subtle-button" onclick=${enterLocation}>${state.address}</button></p>`;
    } else if (state.cachedCity) {
      return html`<p>for <button class="subtle-button" onclick=${enterLocation}> ${state.cachedCity}</button> ${debugText(state.debug)}</p>`;
    } else {
      return html`<p><button class="subtle-button" onclick=${enterLocation}>${t("location.chooseALocation")}</button></p>`;
    }
  }

  function addressForm(state) {
    const className = (state.askingLocation && !state.fetchingLocation) ? '' : 'hidden';
    return html`<p><form onsubmit=${submitAddress} class=${className}><input type="text" autofocus="true" id="address" name="address" placeholder="${t("location.enterAnAddressOrZipCode", null, true)}" /> <button>${t("common.go", null, true)}</button></form></p>`;
  }

  function debugText(debug) {
    return debug ? html`<button onclick=${unsetLocation}>reset</button>` : html``;
  }

  function submitAddress(e) {
    e.preventDefault();
    const address = this.elements["address"].value;

    send('setLocation', address);
  }

  function enterLocation(e) {
    e.preventDefault();
    send('enterLocation');
  }

  function unsetLocation() {
    send('unsetLocation');
  }
}
