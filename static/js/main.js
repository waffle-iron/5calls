const choo = require('choo');
const html = require('choo/html');
const extend = require('xtend');
const { getIssues } = require('./data.js');

const app = choo();

app.model({
  // extremely hackily shoving sample data into state
  state: extend(getIssues(), {
    zip: false,
    activeIssue: false
  }),

  reducers: {
    changeActiveIssue: (issueId, state) => {
      return extend(state, { activeIssue: issueId });
    }
  },

  effects: {}
});

app.router((route) => [
  route('/', require('./pages/mainView.js'))
]);

const tree = app.start('#root');
