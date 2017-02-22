const html = require('choo/html');

module.exports = (state, prev, send) => {
  return html`
  <h2 class="callcount" onload=${(e) => send('getTotals')}>
    Together we’ve made ${callCount(state)} calls
  </h2>
  `;

  function callCount(state) {
    const calls = Number(state.totalCalls);
    // Number.toLocaleString() doesn't work on Safari 9 (see https://github.com/5calls/5calls/issues/197)
    if (!!window.Intl && typeof Intl.NumberFormat == 'function') {
      return calls.toLocaleString();
    } else {
      // As a fallback, use a quick-and-dirty regex to insert commas.
      // When in doubt, get code from stackoverflow: http://stackoverflow.com/a/2901298/7542666
      return calls.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
