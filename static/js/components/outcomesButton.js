const html = require('choo/html');
const find = require('lodash/find');

module.exports = (outcome, state, prev, send) => {
  const issue = find(state.issues, ['id', state.location.params.issueid]);
  const currentIndex = state.contactIndices[issue.id];
  const currentContact = issue.contacts[currentIndex];

  function sendOutcome(e, result) {
    e.target.blur();

    if (result == null) {
      send('skipCall', { issueid: issue.id });
    } else {
      send('callComplete', { result: result, contactid: currentContact.id, issueid: issue.id });
    }

    return true;
  }

  return html`<button onclick=${(e) => sendOutcome(e, outcome.value)}>${outcome.label}</button>`;
};
