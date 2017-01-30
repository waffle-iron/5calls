const html = require('choo/html');

module.exports = (issue, state, prev, send) => {

  function classString(state, baseAddition) {
    const BASE_CLASS = 'issues-list__item' + baseAddition;
    const ACTIVE_CLASS = 'is-active';
    const COMPLETE_CLASS = 'is-complete';

    let classes = [BASE_CLASS];

    state.location.params.issueid === issue.id && classes.push(ACTIVE_CLASS);

    if (state.completedIssues.indexOf(issue.id) != -1) {
      classes.push(COMPLETE_CLASS);
    }

    return classes.join(' ');
  }

  function handleClick(e) {
    send("activateIssue", { id: issue.id });
  }

  return html`
    <li class="${classString(state, '')}" onclick=${handleClick} href="#issue/${issue.id}">
      <p class="${classString(state, '__status')}"></p>
      <p class="${classString(state, '__title')}">${issue.name}</p>
      <p class="${classString(state, '__summary')}">${issue.contacts.length} call${ issue.contacts.length > 1 ? "s" : "" } to make</p>
    </li>
  `;
}
