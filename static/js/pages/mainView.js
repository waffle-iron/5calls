const html = require('choo/html');
const store = require('../utils/localstorage.js');

const sidebar = require('../components/sidebar.js');
const content = require('../components/content.js');

module.exports = (state, prev, send) => {
	store.getAll('5calls-complete', (completed) => { state.completedIssues = completed; } );

  return html`
    <div id="root" class="layout">
      ${sidebar(state, prev, send)} 
      ${content(state, prev, send)}
    </div>
  `;
}
