const html = require('choo/html');

module.exports = (state, prev, send) => {
  // TODO: separate this out into straight up content and stats

  function about(e) {
    e.preventDefault();

    send('getInfo');
  }

  return html`
    <div class="hypothesis" onload=${(e) => send('getTotals')}>
      <header class="hypothesis__header">
        <h2 class="hypothesis__title">Help Save Democracy</h2>
        <p>This government <i>for the people</i>. They need to hear your opinions. Facebook likes don't count.</p>
        <p>You can do your part by making five calls, today. <a href="#" onclick=${(e) => about(e)}>Read more</a> about what we're doing and why this works for you.</p>
      </header>
      <dl class="hypothesis__stats">
        <li class="hypothesis__stat">
          <dt class="hypothesis__stat-value">${state.totalCalls.toLocaleString()}</dt>
          <dd class="hypothesis__stat-dd">calls to date</dd>
        </li>
      </dl>
    </div>
  `;
}
