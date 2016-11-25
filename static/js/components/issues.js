const html = require('choo/html');

const issuesHeader = require('./issuesHeader.js');
const issuesList = require('./issuesList.js');

module.exports = (state, prev, send) => {
  return html`
    <div class="issues">
      ${issuesHeader(state, prev, send)}
      ${issuesList(state, prev, send)}
    </div>
  `;
}
