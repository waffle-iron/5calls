const html = require('choo/html');
const t = require('../utils/translation');

module.exports = (state, prev, send, issue) => {
  if (issue) {
    const url = encodeURIComponent('http://5calls.org/#issue/' + issue.id + '?utm_campaign=twshare');
    const tweet = encodeURIComponent(t.getText("promote.iJustCalled", null, true) + issue.name.substring(0, 72) + t.getText("promote.youShouldToo", null , true));
    return html`
    <div class="promote">
      <p>
        <a target="_blank"
          href="https://twitter.com/share?url=${url}&text=${tweet}"><i class="fa fa-twitter" aria-hidden="true"></i> t.getText("promote.tweetThisIssue", null , true))</a> <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://bit.ly/2iJb5nH"><i class="fa fa-facebook" aria-hidden="true"></i> t.getText("promote.shareThisIssue", null , true))</a>
      </p>
    </div>
    `;
  }
}
