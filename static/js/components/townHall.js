const html = require('choo/html');

let renderLink = (e) => {
  let linkExists = !!e.link;
  if (linkExists){
    return html`<li><a href="${e.link}" target="_new">More Info</a></li>`;
  }
};
let renderNotes = (e) => {
  let notesExist = !!e.Notes;
  if (notesExist){
    let ret = html`<li></li>`;
    ret.innerHTML = e.Notes;
    return ret;
  }
};

module.exports = (state) => {
  if (state.localEvents.length > 0){
    return html`
      <div class="town-hall">
        <h2>Find an upcoming event near you</h2>
        <p>
          <ul class="list-group">
            ${state.localEvents.map(function(e){
              return html`<li class="event-row list-group-item">
                <span class="member">
                  <h4>
                    ${e.Member}
                    <small>(${e.Party})  ${e.State},   ${e.District}
                    </small>
                  </h4>
                  <span class="badge badge-default badge-pill pull-right">  ${e.meetingType}</span>
                </span>
                <ul class="list-inline list-inline-separated">
                  <li>${e.Date} - ${e.Time}, ${e.timeZone}</li>
                  <li>${e.eventName}</li>
                  <li>${e.Location}</li>
                  <li>${e.address}</li>
                  ${renderLink(e)}
                  ${renderNotes(e)}
                </ul>
              </li>`
            })}
          </ul>
          <small>* Sourced from <a href="https://townhallproject.com" target="_new">Town Hall Project</a></small>
        </p>
      </div>`
  }else{
    return ` `;
  }
} 