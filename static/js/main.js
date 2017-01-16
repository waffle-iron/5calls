const choo = require('choo');
const html = require('choo/html');
const http = require('choo/http');
const find = require('lodash/find');
const queryString = require('query-string');
const store = require('./utils/localstorage.js');

const app = choo();
const appURL = 'https://5calls.org';
const debug = false;
// const appURL = 'http://localhost:8090';

// get the stored zip location
cachedAddress = '';
store.getAll('org.5calls.location', (location) => {
  if (location.length > 0) {
   cachedAddress = location[0]
  }
});

// get the stored geo location
cachedGeo = '';
store.getAll('org.5calls.geolocation', (geo) => {
  if (geo.length > 0) {
    console.log("geo get",geo[0]);
    cachedGeo = geo[0]
  }
});

// get the time the geo was last fetched
cachedGeoTime = '';
store.getAll('org.5calls.geolocation_time', (geo) => {
  if (geo.length > 0) {
    console.log("geo time get",geo[0]);
    cachedGeoTime = geo[0]
  }
});

cachedCity = '';
store.getAll('org.5calls.geolocation_city', (city) => {
  if (city.length > 0) {
    console.log("city get",city[0]);
    cachedCity = city[0]
  }
});

// get the stored completed issues
completedIssues = [];
store.getAll('org.5calls.completed', (completed) => {
  completedIssues = completed == null ? [] : completed;
});

app.model({
  state: {
    // remote data
    issues: [],
    totalCalls: 0,
    splitDistrict: false,

    // manual input address
    address: cachedAddress,

    // automatically geolocating
    geolocation: cachedGeo,
    geoCacheTime: cachedGeoTime,
    cachedCity: cachedCity,

    // view state
    getInfo: false,
    activeIssue: false,
    completeIssue: false,
    askingLocation: false,
    contactIndex: 0,
    completedIssues: completedIssues,

    debug: debug,
  },

  reducers: {
    receiveIssues: (data, state) => {
      response = JSON.parse(data)
      issues = response.issues.filter((v) => { return v.contacts.length > 0 });
      return { issues: issues, splitDistrict: response.splitDistrict }
    },
    receiveTotals: (data, state) => {
      totals = JSON.parse(data);
      return { totalCalls: totals.count }
    },
    receiveLoc: (data, state) => {
      response = JSON.parse(data)
      geo = response.loc
      city = response.city
      time = new Date().valueOf()
      store.replace("org.5calls.geolocation", 0, geo, () => {});
      store.replace("org.5calls.geolocation_city", 0, city, () => {});
      store.replace("org.5calls.geolocation_time", 0, time, () => {});
      return { geolocation: geo, cachedCity: city, geoCacheTime: time }
    },
    changeActiveIssue: (issueId, state) => {
      return { activeIssue: issueId, completeIssue: false, getInfo: false, contactIndex: 0 }
    },
    incrementContact: (data, state) => {
      const issue = find(state.issues, ['id', state.activeIssue]);

      if (state.contactIndex < issue.contacts.length - 1) {
        return { contactIndex: state.contactIndex + 1 }
      } else {
        store.add("org.5calls.completed", issue.id, () => {})
        return { contactIndex: 0, completeIssue: true, completedIssues: state.completedIssues.concat(issue.id) }
      }
    },
    getInfo: (data, state) => ({ activeIssue: false, getInfo: true }),    
    // locationError: (error, state) => {
    //   return { askingLocationError: error }
    // },
    setAddress: (address, state) => {
      store.replace("org.5calls.location", 0, address, () => {});
      
      return { address: address, askingLocation: false }
    },
    setGeolocation: (data, state) => {
      store.replace("org.5calls.geolocation", 0, data, () => {});
      return { geolocation: data }
    },
    enterLocation: (data, state) => {
      return { askingLocation: true }
    },
    resetLocation: (data, state) => {
      store.remove("org.5calls.location", () => {});
      store.remove("org.5calls.geolocation", () => {});
      store.remove("org.5calls.geolocation_city", () => {});
      store.remove("org.5calls.geolocation_time", () => {});
      return { address: '', geolocation: '', cachedCity: '', geoCacheTime: '' }
    },
    resetCompletedIssues: (data, state) => {
      store.remove("org.5calls.completed", () => {});
      return { completedIssues: [] }
    },
    home: (data, state) => {
      return { activeIssue: false, getInfo: false }
    }
  },

  effects: {
    fetch: (data, state, send, done) => {
      address = "?address="
      if (state.address !== '') {
        address += state.address        
      } else if (state.geolocation !== "") {
        address += state.geolocation
      }

      const issueURL = appURL+'/issues/'+address
      // console.log("fetching url",issueURL);
      http(issueURL, (err, res, body) => {
        send('receiveIssues', body, done)
      })
    },
    getTotals: (data, state, send, done) => {
      http(appURL+'/report/', (err, res, body) => {
        send('receiveTotals', body, done)
      })
    },
    setLocation: (data, state, send, done) => {
      send('setAddress', data, done);
      send('fetch', {}, done);
    },
    unsetLocation: (data, state, send, done) => {
      send('resetLocation', data, done)
      send('startup', data, done)
    },
    startup: (data, state, send, done) => {
      geoFetchTime = state.geoCacheTime
      cachePlusHours = new Date(geoFetchTime)
      cachePlusHours.setHours(cachePlusHours.getHours() + 24)
      // console.log("geo fetch time",geoFetchTime, cachePlusHours)
      now = new Date()

      // only fetch geo if it's 24 hours old
      if (state.geolocation == '' || now.valueOf() > cachePlusHours.valueOf()) {
        http('https://ipinfo.io/json', (err, res, body) => {
          send('receiveLoc', body, done)
          send('fetch', {}, done)
        })        
      } else {
        send('fetch', {}, done)
      }
    },
    callComplete: (data, state, send, done) => {
      const body = queryString.stringify({ location: state.zip, result: data.result, contactid: data.contactid, issueid: data.issueid })
      http.post(appURL+'/report', { body: body, headers: {"Content-Type": "application/x-www-form-urlencoded"} }, (err, res, body) => {
        // don't really care about the result
      })
      send('incrementContact', data, done);
    },
    skipCall: (data, state, send, done) => {
      send('incrementContact', data, done);
    },
  },
});

app.router((route) => [
  route('/', require('./pages/mainView.js'))
]);

const tree = app.start('#root');
