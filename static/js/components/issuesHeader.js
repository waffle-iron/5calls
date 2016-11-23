const html = require('choo/html');

module.exports = (state, prev, send) => {
  function classString(state) {
    const BASE_CLASS = 'issues__header';
    const ACTIVE_CLASS = 'is-active';

    let classes = [BASE_CLASS];

    if(state.activeIssue === false) { 
      classes.push(ACTIVE_CLASS);
    }

    return classes.join(' ');
  }

  return html`
    <header class="${classString(state)}" role="banner">
      <h1 class="issues__title"><a href="/">5 Calls</a></h1>
      <p class="issues__subtitle">
        You’re at <strong class="issues__zip-code">12345</strong>. 
        <a href="#">Change?</a>
      </p>
    </header>
  `;
}
