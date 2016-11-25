const html = require('choo/html');

module.exports = (state, prev, send) => {
  // TODO: separate this out into straight up content and stats

  return html`
    <div class="hypothesis">
      <header class="hypothesis__header">
        <h2 class="hypothesis__title">Let’s Save Democracy</h2>
        <p>Set up the premise here. What are we doing. Why are we doing it. Yadda, yadda, blah, blah. Set up the premise here. What are we doing.</p>
        <p>You only need you to make five calls. today.</p>
      </header>
      <dl class="hypothesis__stats">
        <li class="hypothesis__stat">
          <dt class="hypothesis__stat-value">5,301,000</dt>
          <dd class="hypothesis__stat-dd">calls to date</dd>
        </li>
        <li class="hypothesis__stat">
          <dt class="hypothesis__stat-value">54,291</dt>
          <dd class="hypothesis__stat-dd">calls today</dd>
        </li>
      </dl>
    </div>
  `;
}
