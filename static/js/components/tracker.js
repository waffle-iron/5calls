const html = require('choo/html');
const t = require('../utils/translation');
const isEmptyObject = require('is-empty-object')

module.exports = (state, prev, send) => {
  console.log("trumpcare",state.ahcaCounts);

  function normalizeName(name) {
    // should turn something like "TX-TedCruz" into "Ted Cruz (TX)"
    var stateRegex = /([A-Z]{2})-(.*)/;
    var nameRegex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
    var match = stateRegex.exec(name);
    var nameMatch = nameRegex.exec(match[2]);

    return match[2].replace(/([A-Z])/g, ' $1')+" ("+match[1]+")";
  }

  if (isEmptyObject(state.ahcaCounts)) {
    return html`Nah`;
  } else {
    var noCount = state.ahcaCounts.vm.length;
    var yesCount = state.ahcaCounts.contacted.length;
    var undecidedCount = state.ahcaCounts.unavailable.length;

    return html`
    <div class="tracker">
      <p>Trumpcare is in the Senate and worse than ever. Id unum natum consul has, pri constituto efficiantur ut. Et harum officiis recteque vis, ut nec similique comprehensam, sed mazim denique definitiones ea. Help us keep this up-to-date by calling your representatives!</p>
      <h3>Trumpcare Votezzz</h3>
      <div class="tracker__votes">
        <div class="tracker__votes__no" style="width:${noCount}%">No</div>
        <div class="tracker__votes__yes" style="width:${yesCount}%">Yes</div>
        <div class="tracker__votes__pass"></div>
      </div>
      <div class="tracker__lists">
        <ul class="tracker__lists__no">
          <li class="header">No Votes (${noCount})</li>
          ${state.ahcaCounts.vm.map((senator) => {return html`<li>${normalizeName(senator)}</li>`})}
        </ul>
        <ul class="tracker__lists__yes">
          <li class="header">Yes Votes (${yesCount})</li>
          ${state.ahcaCounts.contacted.map((senator) => {return html`<li>${normalizeName(senator)}</li>`})}
        </ul>
        <ul class="tracker__lists__undecided">
          <li class="header">Unknown (${undecidedCount})</li>
          ${state.ahcaCounts.unavailable.map((senator) => {return html`<li>${normalizeName(senator)}</li>`})}
        </ul>
      </div>
    </div>
    `;
  }

}