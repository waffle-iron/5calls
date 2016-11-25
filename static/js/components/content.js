const html = require('choo/html');

const hypothesis = require('./hypothesis.js');
const call       = require('./call.js');

module.exports = (state, prev, send) => {
  const currentView = state.activeIssue !== false ? call : hypothesis;

  return html`
    <main role="main" class="layout__main">
      ${currentView(state, prev, send)}
    </main>
  `;
}
