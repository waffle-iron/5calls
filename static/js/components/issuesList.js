const html = require('choo/html');

const issuesListItem = require('./issueListItem.js');

module.exports = (state, prev, send) => {
  return html`
    <ul class="issues-list" role="navigation">
      ${state.issues.map((issue) => issuesListItem(issue, prev, send))}
    </ul>
  `;
}
