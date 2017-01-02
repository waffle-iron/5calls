const html = require('choo/html');
const find = require('lodash/find');

module.exports = (c, state, prev, send) => {
  const photoURL = c.photoURL == "" ? "/img/generic-small.png" : c.photoURL;

	return html`
      <div class="call__contact">
        <div class="call__contact__image"><div class="crop"><img src="${photoURL}"/></div></div>
        <p class="call__contact__type">Call this office:</p>
        <p class="call__contact__name">${c.name}</p>
        <p class="call__contact__phone">${c.phone}</p>
        <p class="call__contact__reason"><strong>Why we're calling:</strong> He's the speaker of the house. He's on the comittee for bullshit.</p>
      </div>
	`;
}