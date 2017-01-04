const html = require('choo/html');

module.exports = (state, prev, send) => {
  return html`
    <p class="issues__subtitle">
    ${pretext(state)}
    </p>
  `;

  function pretext(state) {
    if (state.askingLocation) {
      zipText = html`Zip code:`;
      if (state.askingLocationError != false) {
        zipText = html`${state.askingLocationError}`
      }

      return html`<p><form onsubmit=${submitZip}>${zipText} <input autofocus="true" name="zip" maxlength="5" /><button>Go</button></form></p>`;
    } else {
      if (state.zip != "") {
        return html`<p>You’re at <strong class="issues__zip-code">${state.zip}</strong>, <a href="#" onclick=${enterLocation}>Change?</a> ${debugText(state.debug)}</p>`;
      } else if (state.geolocation != "") {
        return html`<p>We've got your location. ${debugText(state.debug)}</p>`
      } else {
        return html`<p>Get your local reps by setting <a href="#" onclick=${enterLocation}>your location</a></p>`;
      }
    }
  }

  function debugText(debug) {
    return debug ? html`<a href="#" onclick=${resetLocation}>reset</a>` : html``;
  }

  function submitZip(e) {
    e.preventDefault();
    zip = this.elements["zip"].value;

    if (zip.length != 5) {
      send('locationError', "Please enter a 5-digit zip:");
      return;
    }

    send('setLocation', zip);
  }

  function enterLocation(e) {
    send('enterLocation');
  }

  function resetLocation() {
    send('resetLocation');
  }
}