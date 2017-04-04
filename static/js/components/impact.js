const html = require('choo/html');
const impactTotal = require('./impactTotal.js');
const impactResult= require('./impactResult.js');
const callcount = require('./callcount.js');
const scrollIntoView = require('../utils/scrollIntoView.js');

module.exports = (state, prev, send) => {

  function load() {
    scrollIntoView(document.querySelector('#content'));
    send('startup');
  }

  return html`
    <main id="content" role="main" aria-live="polite" class="layout__main" onload=${load}>
    <section class="impact">
      <h2 class="impact__title">My Impact</h2>

      ${impactTotal(state, prev, send)}
      <p class="impact__text">
        You're making a difference! Calling is the most effective way to
        influence your representatives, and here is what you've achieved:
      </p>
      ${impactResult(state, prev, send)}
      ${callcount(state, prev, send)}

    </section>
    </main>
  `;
}
