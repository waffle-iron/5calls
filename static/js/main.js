const choo = require('choo');
const html = require('choo/html');
const http = require('choo/http');
const find = require('lodash/find');
const queryString = require('query-string');
const store = require('./utils/localstorage.js');

const app = choo();
// const appURL = 'https://5calls.org';
const appURL = 'http://localhost:8090';
const debug = true;

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
   initialGeo = geo[0]
  }
});

// get the stored completed issues
completedIssues = [];
store.getAll('org.5calls.completed', (completed) => {
  completedIssues = completed == null ? [] : completed;
  console.log("complete",completed);
});

app.model({
  state: {
    issues: [],
    totalCalls: 0,
    askingLocation: false,
    askingLocationError: false,    
    zip: initialZip,
    geolocation: initialGeo,
    activeIssue: false,
    completeIssue: false,
    contactIndex: 0,
    completedIssues: completedIssues,
    debug: debug,
  },

  reducers: {
    receiveIssues: (data, state) => {
      issues = JSON.parse(data).filter((v) => { return v.contacts.length > 0 });
      return { issues: issues }
    },
    receiveTotals: (data, state) => {
      totals = JSON.parse(data);
      return { totalCalls: totals.count }
    },
    locationState: (zip, state) => {
      store.replace("org.5calls.location", 0, zip, () => {});
      
      return { zip: zip, askingLocation: false, askingLocationError: false }
    },
    changeActiveIssue: (issueId, state) => {
      return { activeIssue: issueId, completeIssue: false, contactIndex: 0 }
    },
    incrementContact: (data, state) => {
      const issue = find(state.issues, ['id', state.activeIssue]);

      if (state.contactIndex < issue.contacts.length - 1) {
        return { contactIndex: state.contactIndex + 1 }
      } else {
        store.add("org.5calls.completed", issue.id, () => {})
        console.log("DONE CONTACTS");
        return { contactIndex: 0, completeIssue: true, completedIssues: state.completedIssues.concat(issue.id) }
      }
    },
    locationError: (error, state) => {
      return { askingLocationError: error }
    },
    enterLocation: (data, state) => {
      // if ("geolocation" in navigator) {
      //   navigator.geolocation.getCurrentPosition((position) => {
      //     geolocation = position.coords.latitude + "," + position.coords.longitude

      //     store.replace("org.5calls.geolocation", 0, geolocation, () => {});
      //     return { geolocation: geolocation };
      //   }, (error) => {
      //     console.log("error",error);
      //   })
      // }

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
  },

  effects: {
    fetch: (data, state, send, done) => {
      http(appURL+'/issues/'+state.zip, (err, res, body) => {
        send('receiveIssues', body, done)
      })
    },
    getTotals: (data, state, send, done) => {
      http(appURL+'/report/', (err, res, body) => {
        send('receiveTotals', body, done)
      })
    },
    setLocation: (data, state, send, done) => {
      send('locationState', data, done);
      send('fetch', {}, done);
    },
    callComplete: (data, state, send, done) => {
      const body = queryString.stringify({ location: state.zip, result: data.result })
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
