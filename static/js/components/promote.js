const html = require('choo/html');

module.exports = (state, prev, send, issue) => {
  let url = encodeURIComponent("https://5calls.org?utm_campaign=twshare")
  let additionalComps = encodeURIComponent("&via=make5calls")
  let tweet = encodeURIComponent("try a make5calls today")
  let twitterTitle = "Share on Twitter"
  let facebookTitle = "Share on Facebook"

  if (issue) {
    url = encodeURIComponent('http://5calls.org/#issue/' + issue.id + '?utm_campaign=twshare')
    additionalComps = ""
    tweet = encodeURIComponent('I just called my rep to ' + issue.name.substring(0, 72) +
    ' — you should too:')
    twitterTitle = "Tweet this issue"
    facebookTitle = "Share this issue"
  }

  function tweetShare(e) {
    e.preventDefault();
    window.open("https://twitter.com/share?url="+url+additionalComps+"&text="+tweet, 'sharewindow', 'width=500, height=350');
  }

  function fbShare(e) {
    e.preventDefault();
    window.open("https://www.facebook.com/sharer/sharer.php?u=http://bit.ly/2iJb5nH", 'sharewindow', 'width=500, height=350');
  }

  return html`
    <div class="promote">
      <p>
        <a target="_blank" onclick=${(e) => tweetShare(e)}><i class="fa fa-twitter" aria-hidden="true"></i> ${twitterTitle}</a>
        <a target="_blank" onclick=${(e) => fbShare(e)}><i class="fa fa-facebook" aria-hidden="true"></i> ${facebookTitle}</a>
      </p>
    </div>
  `;  
}
