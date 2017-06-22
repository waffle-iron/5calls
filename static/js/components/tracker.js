const html = require('choo/html');
const t = require('../utils/translation');

module.exports = (state, prev, send) => {

  function normalizeName(name) {
    // should turn something like "TX-TedCruz" into "Ted Cruz (TX)"
    var stateRegex = /([A-Z]{2})-(.*)/;
    var match = stateRegex.exec(name);

    return match[2].replace(/([A-Z])/g, ' $1')+" ("+match[1]+")";
  }

  if (!state.ahcaCounts || Object.keys(state.ahcaCounts).length === 0) {
    return html`
    <div class="tracker">
      <h3>${t("tracker.title")}</h3>
      <p><strong>${t("tracker.noTracker")}</strong></p>
    </div>
    `;
  } else {
    var noVotes = [];
    if (state.ahcaCounts.no) {
      noVotes = state.ahcaCounts.no;
    }
    var yesVotes = [];
    if (state.ahcaCounts.yes) {
      yesVotes = state.ahcaCounts.yes;
    }
    var unknownVotes = [];
    if (state.ahcaCounts.unknown) {
      unknownVotes = state.ahcaCounts.unknown;
    }

    return html`
    <div class="tracker">
      <h2>${t("tracker.header")}</h2>
      <p>${t("tracker.intro")}</p>
      <p>It's crucial that constituents know where their legislators stand on this - help us crowdsource our Senate Vote tally by <a href="/issue/rec2cBigI4Dl9vT4M">calling your Senator and adding their stated position on the AHCA/Trumpcare bill</a>.</p>
      <h3>${t("tracker.title")}</h3>
      <p class="tracker__required">${t("tracker.required")}</p>
      <div class="tracker__votes">
        <div class="tracker__votes__no" style="width:${noVotes.length}%">${t("tracker.no")}</div>
        <div class="tracker__votes__yes" style="width:${yesVotes.length}%">${t("tracker.yes")}</div>
        <div class="tracker__votes__pass"></div>
      </div>
      <div class="tracker__lists">
        <ul class="tracker__lists__no">
          <li class="header">${t("tracker.noVotes",{'count': noVotes.length})}</li>
          ${noVotes.map((senator) => {return html`<li>${normalizeName(senator)}</li>`})}
        </ul>
        <ul class="tracker__lists__yes">
          <li class="header">${t("tracker.yesVotes",{'count': yesVotes.length})}</li>
          ${yesVotes.map((senator) => {return html`<li>${normalizeName(senator)}</li>`})}
        </ul>
        <ul class="tracker__lists__undecided">
          <li class="header">${t("tracker.unknownVotes",{'count': unknownVotes.length})}</li>
          ${unknownVotes.map((senator) => {return html`<li>${normalizeName(senator)}</li>`})}
        </ul>
      </div>
    </div>
    `;
  }

}