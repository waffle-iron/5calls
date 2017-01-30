const html = require('choo/html');

module.exports = (state, prev, send) => {
  return html`
    <div class="issues__location">
    ${pretext(state)}
    </div>
  `;

  function pretext(state) {
    if (state.askingLocation) {
      return html`<p><form onsubmit=${submitAddress}><input type="text" autofocus="true" name="address" placeholder="Enter an address or zip code" /> <button>Go</button></form></p>`
    } else {
      if (state.address != '') {
        return html`<p>for <a href="#" onclick=${enterLocation}>${state.address}</a></p>`
      } else if (state.cachedCity != '') {
        return html`<p>for <a href="#" onclick=${enterLocation}> ${state.cachedCity}</a> ${debugText(state.debug)}</p>`
      } else {
        return html`<p><a href="#" onclick=${enterLocation}>Choose a location</a></p>`
      }
    }
  }

  function debugText(debug) {
    return debug ? html`<a href="#" onclick=${unsetLocation}>reset</a>` : html``;
  }

  function submitAddress(e) {
    e.preventDefault();
    address = this.elements["address"].value;

    send('setLocation', address);
  }

  function enterLocation(e) {
    send('enterLocation');
  }

  function unsetLocation() {
    send('unsetLocation');
  }
}
