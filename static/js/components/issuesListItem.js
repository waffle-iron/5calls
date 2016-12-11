const html = require('choo/html');

module.exports = (issue, state, prev, send) => {
  function classString(state, baseAddition) {
    const BASE_CLASS = 'issues-list__item' + baseAddition;
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
    <li class="${classString(state, '')}" onclick=${handleClick}>
      <p class="${classString(state, '__title')}">${issue.name}</p>
      <p class="${classString(state, '__summary')}">4 calls to make</p>
    </li>
  `;
}
