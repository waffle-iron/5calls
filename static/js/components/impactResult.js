const html = require('choo/html');
const t = require('../utils/translation');

module.exports = (state) => {
  const contactedCalls = state.userStats.contacted;
  const vmCalls = state.userStats.vm;
  const unavailableCalls = state.userStats.unavailable;
  // Jeremy- TODO, when bernard has finalized his styling, need to handle clash with styling of span because I'm
  // wrapping the localized text also in a span.
  return html`
    <p class="impact_result">
     ${t('impact.callSummaryText', {contactedCalls: contactedCalls, vmCalls: vmCalls, unavailableCalls: unavailableCalls})}
    </p>
  `;
}
