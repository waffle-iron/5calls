const choo = require('choo');
const html = require('choo/html');
const http = require('choo/http');

const app = choo();

app.model({
  state: {
    issues: [],
    zip: '',
    activeIssue: false,
    contactIndex: 0,
  },

  reducers: {
    receive: (data, state) => {
      issues = JSON.parse(data).filter((v) => { return v.contacts.length > 0 });
      return { issues: issues }
    },
    locationState: (zip, state) => ({ zip: zip }),
    changeActiveIssue: (issueId, state) => ({ activeIssue: issueId, contactIndex: 0 }),
    callComplete: (data, state) => ({ contactIndex: state.contactIndex + 1 }),
  },

  effects: {
    fetch: (data, state, send, done) => {
      // http('https://5calls.org/issues/'+state.zip, (err, res, body) => {
      http('http://localhost:8090/issues/'+state.zip, (err, res, body) => {
        send('receive', body, done)
      })
    },
    setLocation: (data, state, send, done) => {
      send('locationState', data, done);
      send('fetch', {}, done);
    }
  },
});

app.router((route) => [
  route('/', require('./pages/mainView.js'))
]);

const tree = app.start('#root');

// localStorage wrapper
const store = {
  getAll: (storeName, cb) => {
    try {
      cb(JSON.parse(window.localStorage[storeName]))
    } catch (e) {
      cb([])
    }
  },
  add: (storeName, item, cb) => {
    store.getAll(storeName, (items) => {
      items.push(item)
      window.localStorage[storeName] = JSON.stringify(items)
      cb()
    })
  },
  replace: (storeName, index, item, cb) => {
    store.getAll(storeName, (items) => {
      items[index] = item
      window.localStorage[storeName] = JSON.stringify(items)
      cb()
    })
  }
}
