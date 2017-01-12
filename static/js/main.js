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
initialZip = '';
store.getAll('org.5calls.location', (location) => {
  if (location.length > 0) {
   initialZip = location[0]
  }
});

// get the stored geo location
initialGeo = '';
store.getAll('org.5calls.geolocation', (geo) => {
  if (geo.length > 0) {
    // console.log("geo get",geo[0]);
    // initialGeo = geo[0]
  }
});

// get the stored completed issues
completedIssues = [];
store.getAll('org.5calls.completed', (completed) => {
  completedIssues = completed == null ? [] : completed;
});

app.model({
  state: {
    issues: [],
    splitDistrict: false,
    totalCalls: 0,
    askingLocation: false,
    askingLocationError: false,    
    zip: initialZip,
    geolocation: initialGeo,
    getInfo: false,
    activeIssue: false,
    completeIssue: false,
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
    setZip: (zip, state) => {
      store.replace("org.5calls.location", 0, zip, () => {});
      
      return { zip: zip, askingLocation: false, askingLocationError: false }
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
      return { zip: '', geolocation: '' }
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
      address = ""
      if (state.geolocation !== "") {
        address = "?address="+state.geolocation
      }

      http(appURL+'/issues/'+state.zip+address, (err, res, body) => {
        send('receiveIssues', body, done)
      })
    },
    getTotals: (data, state, send, done) => {
      http(appURL+'/report/', (err, res, body) => {
        send('receiveTotals', body, done)
      })
    },
    geolocation: (data, state, send, done) => {
      // if ("geolocation" in navigator) {
      //   navigator.geolocation.getCurrentPosition((position) => {
      //     geolocation = position.coords.latitude + "," + position.coords.longitude

      //     // TODO: is this close to the stored geolocation? don't change it

      //     console.log("got geo",geolocation);
      //     send('setGeolocation', geolocation, done);
      //     // store.replace("org.5calls.geolocation", 0, geolocation, () => {});
      //     // return { geolocation: geolocation };
      //   }, (error) => {
      //     console.log("error",error);
      //   })
      // }
    },
    setLocation: (data, state, send, done) => {
      send('setZip', data, done);
      send('fetch', {}, done);
    },
    skipCall: (data, state, send, done) => {
      send('incrementContact', data, done);
    },
    callComplete: (data, state, send, done) => {
      const body = queryString.stringify({ location: state.zip, result: data.result, contactid: data.contactid, issueid: data.issueid })
      http.post(appURL+'/report', { body: body, headers: {"Content-Type": "application/x-www-form-urlencoded"} }, (err, res, body) => {
        // don't really care about the result
      })
      send('incrementContact', data, done);
    },
  },
});

app.router((route) => [
  route('/', require('./pages/mainView.js'))
]);

const tree = app.start('#root');
