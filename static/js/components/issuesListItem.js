const html = require('choo/html');

module.exports = (issue, state, prev, send) => {
  const ACTIVE_CLASS = 'is-active';
  const COMPLETE_CLASS = 'is-complete';

  return html`
    <li class="issues-list__item">
      <p>This is the short description of the issue.</p>
    </li>
  `;
}
