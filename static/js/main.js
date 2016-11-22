const choo = require('choo');
const html = require('choo/html');

const app = choo();

app.model({
  state: {
    zip: '00501',
    activeIssue: false,
    issues: []
  },
  reducers: {

  },
  effects: {

  }
});

const initialView = (state, prev, send) => {
  return html`
    <main role="main">
      <p>(choo has taken over rendering)</p>
    </main>
  `;
}

app.router((route) => [
  route('/', initialView)
]);

const tree = app.start('#root');
