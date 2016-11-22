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

const initialView = (state, prev, send) => {
  return html`
    <div id="root" class="layout">
      <p>(choo has taken over rendering)</p>
    </div>
  `;
}

app.router((route) => [
  route('/', initialView)
]);

// const tree = app.start('#root');
