const choo = require('choo');
const html = require('choo/html');
const http = require('choo/http');
const extend = require('xtend');
const { getIssues } = require('./data.js');

const app = choo();

app.model({
  // extremely hackily shoving sample data into state
  state: {
    issues: [],
    zip: '',
    activeIssue: false
  },

  effects: {
    fetch: (data, state, send, done) => {
      http('https://5calls.org/issues/'+state.zip, (err, res, body) => {
      // http('http://localhost:8090/issues/', (err, res, body) => {
        send('receive', body, done)
      })
    }
  },

  reducers: {
    receive: (data, state) => {
      return extend(state, { issues: JSON.parse(data) });
    },
    changeActiveIssue: (issueId, state) => {
      return extend(state, { activeIssue: issueId });
    }
  },

});

app.router((route) => [
  route('/', require('./pages/mainView.js'))
]);

const tree = app.start('#root');
