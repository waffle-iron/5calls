const html = require('choo/html');
const find = require('lodash/find');

module.exports = (state, prev, send) => {
  const issue = find(state.issues, ['id', state.activeIssue]);

  console.log(issue);

  return html`
    <section class="call">
      <header class="call__header">
        <h2 class="call__title">${issue.name}</h2>
      </header>

      <div class="call__contacts">

      </div>

      <div class="call__script">

      </div>

      <menu class="call__outcomes">

      </menu>
    </section>
  `;
}
