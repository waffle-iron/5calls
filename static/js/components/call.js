const html = require('choo/html');
const find = require('lodash/find');

module.exports = (state, prev, send) => {
  const issue = find(state.issues, ['id', state.activeIssue]);

  console.log(issue);

  return html`
    <section class="call">
      <header class="call__header">
        <h2 class="call__title">${issue.name}</h2>
        <h3 class="call__reason">REASON</h2>
      </header>

      <div class="call__contact">
        <img src="http://paulryan.house.gov/images/img12.jpg"/>
        <p class="call__contact__type">Call this guy's office:</p>
        <p class="call__contact__name">Paul Ryan, WI-R</p>
        <p class="call__contact__phone">666-666-666</p>
        <p class="call__contact__reason">He's the speaker of the house. He's on the comittee for bullshit.</p>
      </div>

      <div class="call__script">
        <h3 class="call__script__header">Say this:</h3>
        <p class="call__script__body">${issue.script}</p>
      </div>

      <menu class="call__outcomes">

      </menu>
    </section>
  `;
}
