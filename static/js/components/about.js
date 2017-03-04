const html = require('choo/html');
const i18n = require('i18next');
const constants = require('../constants');

module.exports = (state, prev, send) => {
  return html`
    <main role="main" class="layout__main" onload=${(e) => send('startup')}>
    <section class="about">
      <h2 class="about__title">${i18n.t("about.title")}</h2>

      <h3 class="about__subtitle">${i18n.t("about.whyCallingWorks.title")}</h3>

      <p>${i18n.t("about.whyCallingWorks.justificationForCalling")}</p>
      <p>${i18n.t("about.whyCallingWorks.justificationArticlesListHeader")}</p>
      <ul>
          <li><a href="https://www.nytimes.com/2016/11/22/us/politics/heres-why-you-should-call-not-email-your-legislators.html">“Here’s Why You Should Call, Not Email, Your Legislators”</a> <span class="about__source">NY Times</span></li>
          <li><a href="http://www.vox.com/policy-and-politics/2016/11/15/13641920/trump-resist-congress">“Don’t just write to your representatives. Call them — and go to town halls.”</a> <span class="about__source">Vox</span></li>
          <li><a href="https://www.washingtonpost.com/powerpost/a-day-of-chaos-at-the-capitol-as-house-republicans-back-down-on-ethics-changes/2017/01/03/50e392ac-d1e6-11e6-9cb0-54ab630851e8_story.html?utm_term=.86c8d3a06832">“I can tell you the calls we’ve gotten in my district office and here in Washington surprised me, meaning the numbers of calls.”</a> <span class="about__source"> Washington Post</span></li>
          <li><a href="https://twitter.com/costareports/status/816373917900161024">“Most members tell me blizzard of angry constituent calls were most impt factor in getting the House to sideline the amdt”</a> <span class="about__source">Robert Costa</span></li>
      </ul>
      <p>${i18n.t("about.whyCallingWorks.weDoTheResearch")}</p>
      <p>${i18n.t("about.whyCallingWorks.sendYourIssues")} <a href='mailto:${constants.contact.email}'>${i18n.t("common.pleaseReachOut")}</a> </p>

      <h3 class="about__subtitle">${i18n.t("about.callingTips.title")}</h3>
      <p>${i18n.t("about.callingTips.callTechnique")}</p>
      <p>${i18n.t("about.callingTips.callEtiquette")}</p>

      <h3 class="about__subtitle">${i18n.t("about.whoIs5Calls.title")}</h3>
      <p>${i18n.t("about.whoIs5Calls.whyWeWorkOnIt")}</p>
      <p>${i18n.t("about.whoIs5Calls.broughtToYouBy")}
      <a href='https://twitter.com/nickoneill'>@nickoneill</a>, <a href='https://twitter.com/syntheticmethod'>@syntheticmethod</a>, <a href='https://twitter.com/monteiro'>@monteiro</a>, <a href='https://twitter.com/stewartsc'>@stewartsc</a>, <a href='https://twitter.com/liamdanger'>@liamdanger</a>, <a href='https://twitter.com/capndesign'>@capndesign</a>, <a href='https://twitter.com/gotwarlost'>@gotwarlost</a>, <a href='https://twitter.com/jameshome'>@jameshome</a>, <a href='https://twitter.com/robynshhh'>@robynshhh</a>
      ${i18n.t("about.whoIs5Calls.andMoreSupporters")}
      </p>

      <h3 class="about__subtitle">${i18n.t("about.joinUs.title")}</h3>

      <p>${i18n.t("common.thisProjectIs")} <a href="${constants.contact.github}">${i18n.t("common.openSource")}</a>
      ${i18n.t("common.and")} ${i18n.t("common.volunteerMade")}. ${i18n.t("about.joinUs.contactInvite")} 
       <a href="${constants.contact.twitter}">${i18n.t("common.twitter")}</a> ${i18n.t("common.or")} <a href="mailto:${constants.contact.email}">${i18n.t("common.email")}</a>.</p
    </section>
    </main>
  `;
}
