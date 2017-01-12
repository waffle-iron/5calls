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
        <h2 class="hypothesis__title">Make your voice heard</h2>
        <p>Turn your passive participation into active resistance. Facebook likes and Twitter retweets don't create the change you want to see.</p>
        <p><strong>Spend 5 minutes, make 5 calls, every day.</strong></p>
      </header>
      <div class="hypothesis__text">
        <p>There's one simple and straightforward way to influence the Government that is supposed to represent you: <strong>Call them on the phone</strong>.</p>
        <p>Calling is the most effective way to influence your representative. 5 Calls gives you <strong>contacts and scripts</strong> so calling is quick and easy. We use your location to give you your local representatives so <strong>your calls are more impactful</strong>.</p>
        <p>Want to know more? Read about <a href="#" onclick=${(e) => about(e)}>why calling works</a> or <a href="#" onclick=${(e) => about(e)}>more about us</a></p>
      </div>
      <dl class="hypothesis__stats">
        <li class="hypothesis__stat">
          <dt class="hypothesis__stat-value">${state.totalCalls.toLocaleString()}</dt>
          <dd class="hypothesis__stat-dd">calls to date</dd>
        </li>
      </dl>
    </div>
  `;
}
