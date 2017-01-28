const html = require('choo/html');

module.exports = (state, prev, send) => {
  return html`
  <div class="call__promote">
    <p>
      <a target="_blank" href="https://twitter.com/intent/tweet?text=Spend%205%20minutes.%20Make%205%20calls.%20Make%20your%20voice%20heard.%20http%3A%2F%2Fbit.ly%2F2iJb5nH&source=webclient&via=make5calls"><i class="fa fa-twitter" aria-hidden="true"></i> Tweet this issue</a> <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://bit.ly/2iJb5nH"><i class="fa fa-facebook" aria-hidden="true"></i> Share this issue</a>
    </p>
  </div>
  `;
}
