const html = require('choo/html');

module.exports = (issue, state, prev, send) => {
  const ACTIVE_CLASS = 'is-active';
  const COMPLETE_CLASS = 'is-complete';

  // TODO: if issue id is the same as `state.activeIssue` apply ACTIVE_CLASS
  // TODO: if issue has `complete` flag, apply COMPLETE_CLASS

  return html`
    <li class="issues-list__item">
      <p>${issue.name}</p>
    </li>
  `;
}
