const html = require('choo/html');
const t = require('../utils/translation');

const issuesHeader = require('./issuesHeader.js');
const issuesList = require('./issuesList.js');

module.exports = (state, prev, send) => {
	function debugText(debug) {
    return debug ? html`<a href="#" onclick=${resetCompletedIssues}>${t.getText("common.reset")}</a>` : html``;
  }

  function resetCompletedIssues() {
    send('resetCompletedIssues');
  }

  return html`
    <div class="issues">
      ${issuesHeader(state, prev, send)}
      ${issuesList(state, prev, send)}
      ${debugText(state.debug)}
    </div>
  `;
}
