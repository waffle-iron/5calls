const html = require('choo/html');

const issuesLocation = require('./issuesLocation.js');

module.exports = (state, prev, send) => {
  return html`
    <header class="${classString(state)}" role="banner">
      <h1 class="issues__title">
        <a href="/" onclick=${() => send('home')}><img class="issues__logo" src="/img/5calls-logo.png" alt="5 Calls" />5 Calls</a>
      </h1>      
      ${issuesLocation(state, prev, send)} 
    </header>
  `;

  function classString(state) {
    const BASE_CLASS = 'issues__header';
    const ACTIVE_CLASS = 'is-active';

    let classes = [BASE_CLASS];

    state.location.params.issueid == null && classes.push(ACTIVE_CLASS);

    return classes.join(' ');
  }
}
