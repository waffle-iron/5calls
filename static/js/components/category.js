const html = require('choo/html');
const t = require('../utils/translation');
const constants = require('../constants');
const issuesListItem = require('./issuesListItem.js');

module.exports = (state, prev, send) => {
  const urlCategory = state.location.params.category;

  function load() {
    send('startup');
    send('fetchInactiveIssues');
  }

  return html`
    <main id="content" role="main" class="layout__main" onload=${load}>
    <section class="category">
        ${state.issueCategories.filter(category => category.toLowerCase() == urlCategory).map(categoryName => html`
        <div>
          <h2 class="about__title">${categoryName}</h2>
          <ul class="issues-list" role="navigation">
          ${state.issues
              .filter(issue => issue.categories[0].name === categoryName)
              .map((issue) => issuesListItem(issue, state, prev, send))
          }
          </ul>
        </div>
        `)}
    </section>
    </main>
  `;
};
