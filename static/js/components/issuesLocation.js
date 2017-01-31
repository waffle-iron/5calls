const html = require('choo/html');

module.exports = (state, prev, send) => {
  if (state.askingLocation && !state.fetchingLocation && state.geolocation === '') {
    fetchBrowserLocation(null);
  }
  return html`
    <div class="issues__location">
    ${pretext(state)}
    </div>
  `;

  function pretext(state) {
    if (state.fetchingLocation) {
      return html`<p class="loadingAnimation">Getting your location</p>`;
    }
    else if (state.askingLocation) {
      return html`<p><form onsubmit=${submitAddress}><input type="text" autofocus="true" name="address" placeholder="Enter an address or zip code" /> <button>Go</button></form></p>`;
    } else {
      if (state.address != '') {
        return html`<p>for <a href="#" onclick=${enterLocation}>${state.address}</a></p>`
      } else if (state.cachedCity != '') {
        return html`<p>for <a href="#" onclick=${enterLocation}>${state.cachedCity}</a> ${debugText(state.debug)}</p>`
      } else if (state.geolocation != '') {
        return html`<p>for <a href="#" onclick=${enterLocation}>browser location</a></p>`
      } else {
        return html`<p><a href="#" onclick=${enterLocation}>Couldn't find your location</a></p>`
      }
    }
  }

  function fetchLocationBy(e) {
    send('fetchLocationBy', e.target.dataset.by);
  }

  // TODO: Set geolocation cache time in case we want to bring it back
  // TODO: Handle when a user blocks browser geolocation, but tries to reenable in a new session
  function fetchBrowserLocation(e) {
    let pos;
    let nudgeTimeoutId = setTimeout(showNudgeAlert, 5000);

    let showNudgeAlert = function() {
      window.alert('Too slow');
    }

    let geoSuccess = function(position) {
      clearTimeout(nudgeTimeoutId);
      send('fetchingLocation', false);

      if (typeof position.coords !== 'undefined') {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        if (lat && long) {
          let geo = Math.floor(lat*10000)/10000 + ',' + Math.floor(long*10000)/10000;
          send('allowBrowserGeolocation', true);
          send('setBrowserGeolocation', geo);
        } else {
          console.log("Error: bad browser location results");
          send('fetchLocationBy', null);
        }
      } else {
        console.log("Error: bad browser location results");
        send('fetchLocationBy', null);
      }
    }

    let geoError = function(error) {
      send('fetchingLocation', false);

      if (error.code === 1) {
        send('allowBrowserGeolocation', false);
      }
      send('fetchLocationBy', null);
      console.log("Error with browser location (code: " + error.code + ")");
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    send('fetchingLocation', true);
  }

  function debugText(debug) {
    return debug ? html`<a href="#" onclick=${unsetLocation}>reset</a>` : html``;
  }

  function submitAddress(e) {
    e.preventDefault();
    address = this.elements["address"].value;

    send('setLocation', address);
  }

  function enterLocation(e) {
    e.preventDefault();
    send('enterLocation');
  }

  function unsetLocation() {
    send('unsetLocation');
  }
}
