const html = require('choo/html');
const find = require('lodash/find');
const contact = require('./contact.js');
const scriptLine = require('./scriptLine.js');
const promote = require('./promote.js');

module.exports = (state, prev, send) => {
  const issue = find(state.issues, ['id', state.location.params.issueid]);

  if (issue == null) {
    return html`<section class="call">
      <div class="call_complete">
        <h2 class="call__title">No calls to make</h2>
        <p class="call__text">
          This issue is no longer relevant, or the URL you used to get here was wrong. If you clicked a link on this site to get here, <a href="mailto:make5calls@gmail.com">please tell us</a> so we can fix it!
        </p>
        <p class="call__text">
          Next choose a different issue from the list to make calls about.
        </p>
      </div>
    </section>`;
  }
  const currentContact = issue.contacts[state.contactIndex];

  const contactsLeft = issue.contacts.length - (state.contactIndex + 1);
  const callsPluralization = contactsLeft > 1 ? "s" : "";

  const contactsLeftText = contactsLeft > 0 ? contactsLeft + " call"+ callsPluralization +" left" : "This is the last contact";

  function outcome(result) {
    if (result == null) {
      send('skipCall', { issueid: issue.id });
    } else {
      send('callComplete', { result: result, contactid: currentContact.id, issueid: issue.id });
    }
  }

  return html`
  <section class="call">
    <header class="call__header">
      <h2 class="call__title">${issue.name}</h2>
      <div class="call__reason">${issue.reason.split('\n').map((line) => scriptLine(line, state, prev, send))}</div>
    </header>

    ${contact(currentContact, state, prev, send)}

    <div class="call__script">
      <h3 class="call__script__header">Your script:</h3>
      <div class="call__script__body">${issue.script.split('\n').map((line) => scriptLine(line, state, prev, send))}</div>
    </div>

    <div class="call__outcomes">
      <h3 class="call__outcomes__header">Enter your call result to get the next call:</h3>
      <div class="call__outcomes__items">
        <button onclick=${() => outcome('unavailable')}>Unavailable</button>
        <button onclick=${() => outcome('vm')}>Left Voicemail</button>
        <button onclick=${() => outcome('contacted')}>Made Contact</button>
        <button onclick=${() => outcome()}>Skip</button>
      </div>
    </div>

    ${promote(state, prev, send)}

  </section>
  `;
}
