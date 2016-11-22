const html = require('choo/html');

module.exports = (state, prev, send) => {
  return html`
    <header class="issues__header" role="banner">
      <h1 class="issues__title"><a href="/">5 Calls</a></h1>
      <p class="issues__subtitle">
        You’re at <strong class="issues__zip-code">12345</strong>. 
        <a href="#">Change?</a>
      </p>
    </header>
  `;
}
