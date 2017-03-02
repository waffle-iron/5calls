const html = require('choo/html');

module.exports = (state, prev, send, issue) => {
  let url = "https://5calls.org?utm_campaign=twshare"
  let additionalComps = "&via=make5calls"
  let tweet = "try a make5calls today"
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

  return html`
    <div class="promote">
      <p>
        <a target="_blank"
          href="https://twitter.com/share?url=${url}${additionalComps}&text=${tweet}"><i class="fa fa-twitter" aria-hidden="true"></i> ${twitterTitle}</a> <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://bit.ly/2iJb5nH"><i class="fa fa-facebook" aria-hidden="true"></i> ${facebookTitle}</a>
      </p>
    </div>
  `;  
}
