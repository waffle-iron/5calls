const html = require('choo/html');

module.exports = (issue, state, prev, send) => {
  const completeDisplay =  state.completedIssues.indexOf(issue.id) == -1 ? "none" : "block";

  function classString(state, baseAddition) {
    const BASE_CLASS = 'issues-list__item' + baseAddition;
    const ACTIVE_CLASS = 'is-active';
    const COMPLETE_CLASS = 'is-complete';

    let classes = [BASE_CLASS];

    state.location.params.issueid === issue.id && classes.push(ACTIVE_CLASS);

    return classes.join(' ');
  }

  function handleClick(e) {
    location.hash = "issue/"+issue.id
  }

  return html`
    <li class="${classString(state, '')}" onclick=${handleClick} href="#issue/${issue.id}">
      <p class="${classString(state, '__title')}">${issue.name}</p>
      <p class="${classString(state, '__summary')}">${issue.contacts.length} call${ issue.contacts.length > 1 ? "s" : "" } to make</p>
      <img style="display:${completeDisplay}" src="/img/done.png" width="83" />
    </li>
  `;
}
