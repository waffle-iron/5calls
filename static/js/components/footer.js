const html = require('choo/html');
const t = require('../utils/translation');

module.exports = (state, prev, send) => {

  return html`
      <footer><div class="tinyletter__form">
        <form action="https://my.sendinblue.com/users/subscribe/js_id/2p22o/id/1" method="get" target="popupwindow" onsubmit="window.open('https://my.sendinblue.com/users/subscribe/js_id/2p22o/id/1', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
          <label for="email">${t.getText('footer.emailLabel')}</label>
          <span class="emailform">
            <input type="text" style="width:140px" name="email" id="email" />
            <input type="submit" value="${t.getText('footer.subscribe', null, true)}" />
          </span>
        </form>
      </div>
      <div class="colophon">
        <a href="https://github.com/5calls/5calls">
          <i class="fa fa-github" aria-hidden="true"></i>${t.getText('footer.openSource')}
        </a>
        <a href="https://twitter.com/make5calls">
          <i class="fa fa-twitter" aria-hidden="true"></i>${t.getText('footer.twitter')}
        </a>
        <a href="https://5calls.org/privacy.html" data-no-routing>
          <i class="fa fa-shield" aria-hidden="true"></i>${t.getText('footer.privacy')}
        </a>
        <a href="mailto:make5calls@gmail.com">
          <i class="fa fa-envelope" aria-hidden="true"></i> ${t.getText('footer.contact')}
        </a>
        <a href="#about">
          <i class="fa fa-heart" aria-hidden="true"></i> ${t.getText('footer.about')}
        </a>
        <a href="https://5calls.zendesk.com/hc/en-us/sections/115000760947-FAQ">
          <i class="fa fa-question-circle" aria-hidden="true"></i> ${t.getText('footer.faq')}
        </a>
        <br />
        <a href="http://ipinfo.io">${t.getText('footer.ipGeolocation')}</a>
      </div></footer>
  `;
}