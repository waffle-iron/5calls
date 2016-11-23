const html = require('choo/html');

module.exports = (issue, state, prev, send) => {
  function classString(state) {
    const BASE_CLASS = 'issues-list__item';
    const ACTIVE_CLASS = 'is-active';
    const COMPLETE_CLASS = 'is-complete';

    let classes = [BASE_CLASS];

    state.activeIssue === issue.id && classes.push(ACTIVE_CLASS);

    return classes.join(' ');
  }

  function handleClick(e) {
    send('changeActiveIssue', issue.id);
  }

  return html`
    <li class="${classString(state)}" onclick=${handleClick}>
      <p>${issue.name}</p>
    </li>
  `;
}
