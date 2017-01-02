const choo = require('choo');
const html = require('choo/html');
const http = require('choo/http');
const queryString = require('query-string');

const app = choo();
// const appURL = 'https://5calls.org';
const appURL = 'http://localhost:8090';

app.model({
  state: {
    issues: [],
    zip: '',
    activeIssue: false,
    contactIndex: 0,
    completedIssues: [],
  },

  reducers: {
    receive: (data, state) => {
      issues = JSON.parse(data).filter((v) => { return v.contacts.length > 0 });
      return { issues: issues }
    },
    locationState: (zip, state) => ({ zip: zip }),
    changeActiveIssue: (issueId, state) => ({ activeIssue: issueId, contactIndex: 0 }),
    incrementContact: (data, state) => {
      if (true) {
        return { contactIndex: state.contactIndex + 1 }
      }
    },
  },

  effects: {
    fetch: (data, state, send, done) => {
      http(appURL+'/issues/'+state.zip, (err, res, body) => {
        send('receive', body, done)
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
