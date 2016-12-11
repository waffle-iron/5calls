const html = require('choo/html');
const find = require('lodash/find');

module.exports = (state, prev, send) => {
	const issue = find(state.issues, ['id', state.activeIssue]);
	const contact = issue.contacts[state.contactIndex];

	return html`
      <div class="call__contact">
        <div class="call__contact__image"><div class="crop"><img src="${contact.photoURL}"/></div></div>
        <p class="call__contact__type">Call this office:</p>
        <p class="call__contact__name">${contact.name}</p>
        <p class="call__contact__phone">${contact.phone}</p>
        <p class="call__contact__reason"><strong>Why we're calling:</strong> He's the speaker of the house. He's on the comittee for bullshit.</p>
      </div>
	`;
}