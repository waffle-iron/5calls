const html = require('choo/html');
const find = require('lodash/find');

module.exports = (state, prev, send) => {
  const issue = find(state.issues, ['id', state.location.params.issueid]);
  const currentContact = issue.contacts[state.contactIndex];

  const contactsLeft = issue.contacts.length - (state.contactIndex + 1);
  const callsPluralization = contactsLeft > 1 ? "people" : "person";

  const contactsLeftText = contactsLeft > 0 ? contactsLeft + " more " + callsPluralization +" to call for this issue." : "You've made all the calls for this issue.";

  function outcome(result) {
    if (result == null) {
      send('skipCall', { issueid: issue.id });
    } else {
      send('callComplete', { result: result, contactid: currentContact.id, issueid: issue.id });
    }
  }

  if (currentContact != null) {
    return html`<div class="call__outcomes">
      <h3 class="call__outcomes__header">Enter your call result to get the next call:</h3>
      <div class="call__outcomes__items">
        <button onclick=${() => outcome('unavailable')}>Unavailable</button>
        <button onclick=${() => outcome('vm')}>Left Voicemail</button>
        <button onclick=${() => outcome('contacted')}>Made Contact</button>
        <button onclick=${() => outcome()}>Skip</button>
      </div>

      <h3 class="call__contacts__left">${contactsLeftText}</h3>
    </div>`
  } else {
    return html``
  }
}
