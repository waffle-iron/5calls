const html = require('choo/html');

module.exports = (state, prev, send) => {
  return html`
    <section class="about">
      <h2 class="about__title">About 5 Calls</h2>
      <p>Calling members of congress is <strong>the most effective way to have your voice heard</strong>. Calls are tallied and given to your representatives, telling them on how their constituents stand on issues.</p> 
      <p>Calling your members of congress is quick and easy. Calls should take a minute or less, something something.</p> 
      <p>We wanted to make activism easily achievable. Each issue on our call list has been carefully researched for accuracy, urgency, and impact.</p>
      <p>5 Calls is the quickest and easiest way to make a legitimate difference. Pick an issue you care about and make some calls.</p>
      <h3 class="about__subtitle">Who we are</h3>
      <p>We’re a group of like-minded volunteers who want to make advocacy accessible.  Our hope is 5 Calls will make it effortless for regular people to have a voice when it’s needed most.</p>
      <p>5 calls is brought to you by <a href="https://twitter.com/nickoneill">Nick</a>, <a href="https://twitter.com/syntheticmethod">Rebecca</a>, <a href="https://twitter.com/">etc</a>
      <h3 class="about__subtitle">Join us</h3>
      <p>This project is <a href="https://github.com/5calls/5calls">open source</a> and volunteer made. If you’d like to join us in developing useful tools for citizens, please get in touch via <a href="https://twitter.com/make5calls">Twitter</a> or <a href="mailto:make5calls@gmail.com">email</a>.</p>
    </section>
  `;
}
