const html = require('choo/html');

module.exports = (state, prev, send) => {
  return html`
    <p class="issues__subtitle">
    ${pretext(state)}
    </p>
  `;

  function pretext(state) {
    if (state.askingLocation) {
      return html`<p>Zip code: <input name="zip" /><button>Go</button></p>`;
    } else {
      if (state.zip != "") {
        return html`<p>You’re at <strong class="issues__zip-code">${state.zip}</strong>, <a href="#" onclick=${changeLocation}>Change?</a> ${debugText(state.debug)}</p>`;
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

  function enterLocation(e) {
    send('enterLocation');
  }

  function changeLocation(e) {
    zip = prompt("What's your zip code?")

    send('setLocation', zip);
  }

  function resetLocation() {
    send('resetLocation');
  }
}