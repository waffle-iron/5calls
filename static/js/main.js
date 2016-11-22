const choo = require('choo');
const html = require('choo/html');

const app = choo();

app.model({
  state: {
    zip: false,
    activeIssue: false,
    issues: [],
  },
  reducers: {

  },
  effects: {

  }
});

app.router((route) => [
  route('/', require('./pages/mainView.js'))
]);

const tree = app.start('#root');
