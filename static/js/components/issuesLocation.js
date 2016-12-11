const html = require('choo/html');

module.exports = (state, prev, send) => {
  return html`
    <p class="issues__subtitle">
    ${pretext(state)}
    </p>
  `;

  function pretext(state) {
    if (state.zip == "") {
      return html`<p>Get your local reps by setting <a href="#" onclick=${changeLocation}>your location</a></p>`;
    } else {
      return html`<p>You’re at <strong class="issues__zip-code">${state.zip}</strong>, <a href="#" onclick=${changeLocation}>Change?</a></p>`;
    }
  }

  function changeLocation(e) {
    console.log("change zip");
    zip = prompt("What's your zip code?")

    send('setLocation', zip);
    // refetch data after the new location is set
    send('fetch');
  }
}