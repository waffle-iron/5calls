const html = require('choo/html');
const callcount = require('./callcount.js');

module.exports = (state, prev, send) => {
  // TODO: separate this out into straight up content and stats
  return html`
    <div class="hypothesis" onload=${(e) => send('getTotals')}>
      <header class="hypothesis__header">
        <h2 class="hypothesis__title">Make your voice heard</h2>
        <p>Turn your passive participation into active resistance. Facebook likes and Twitter retweets can’t create the change you want to see. Calling your Government on the phone can.</p>

        <p><strong>Spend 5 minutes, make 5 calls.</strong></p>
      </header>

      <div class="hypothesis__text">
        <p>Calling is the most effective way to influence your representative. Read more about <a href="#about">why calling works.</a>
        </p>

        <h3 class="hypothesis__subtitle">5 Calls:</h3>

        <ul class="hypothesis__list">
        <li>provides phone numbers and scripts so calling is quick and easy</li>
        <li>uses your location to find your local representatives so your calls have more impact</li>
      </div>
      
      ${callcount(state, prev, send)}

    </div>
  `;
}
