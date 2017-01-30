const html = require('choo/html');

module.exports = (state, prev, send) => {
  return html`
    <div class="issues__location">
    ${pretext(state)}
    </div>
  `;

  function pretext(state) {
    if (state.askingLocation) {
      return html`
        <p>
          <form onsubmit=${submitAddress}>
            <input type="text" autofocus="true" name="address" placeholder="Enter an address or zip code" /> 
            <button>Go</button>
          </form>
        </p>`
    } else {
      if (state.address != '') {
        return html`<p>for <button class="subtle-button" onclick=${enterLocation}>${state.address}</button></p>`
      } else if (state.cachedCity != '') {
        return html`<p>for <button class="subtle-button" onclick=${enterLocation}> ${state.cachedCity}</button> ${debugText(state.debug)}</p>`
      } else {
        return html`<p><button class="subtle-button" onclick=${enterLocation}>Choose a location</button></p>`
      }
    }
  }

  function debugText(debug) {
    return debug ? html`<button onclick=${unsetLocation}>reset</button>` : html``;
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
