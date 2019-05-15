// AboutPage.js

import React from 'react';
import './AboutPage.scss';

/**
Full page About content detailing UCLA Radio history and offering links to contact managers.
Used as a tab's full content in frontpage.
* */
const AboutPage = () => (
  <div className="aboutPage">
    <div id="wrapper">
      <div className="threesplit">
        <h1>CONTACT US FOR: </h1>
      </div>

      <div className="threesplit">
        <h3> GENERAL INFO /INQUIRIES </h3>
        <a href="mailto:radio.info@media.ucla.edu" target="_top">
          | radio.info@media.ucla.edu{' '}
        </a>
        <br />
        <a href="mailto:gm@media.ucla.edu" target="_top">
          | gm@media.ucla.edu
        </a>
        <br />
        <h3> MUSIC / BOOKING </h3>
        <a href="mailto:radio.music@media.ucla.edu" target="_top">
          | radio.music@media.ucla.edu
        </a>
      </div>

      <div className="threesplit">
        <h3> PLAYLISTS </h3>
        <a href="mailto:radio.playlists@media.ucla.edu" target="_top">
          {' '}
          | radio.playlists@media.ucla.edu
        </a>
        <br />
        <h3> PROMOS / GIVEAWAYS </h3>
        <a href="mailto:radio.promotions@media.ucla.edu" target="_top">
          | radio.promotions@media.ucla.edu
        </a>
      </div>
      <br />
    </div>
    <br />
    <br />
    <div className="threesplit">
      <h1>ABOUT US: </h1>
    </div>
    <div className="twothirdsplit">
      <p>
        <strong>UCLA Radio</strong> is made up of over 150 unique, creative, and
        passionate students dedicated to bringing quality programming to our
        listeners. UCLA Radio has been broadcasting on campus since 1962, when
        we were established as a "terrestrial radio station" in the basement of
        Dykstra Residential Hall. Now operating out of a cave in Ackerman and
        broadcasting online, our audience consists of listeners in such diverse
        places as Australia, Italy, England, and Brazil. The station is
        completely student-run and listener-supported through charitable
        donations and our fundraising efforts. Our eclectic programming features
        shows spanning a wide variety of musical genres as well as talk radio
        shows featuring comedy, news, and sports content. In 2012, our station
        was named the #1 Student-Run Internet-Only College Radio Station in the
        country by College Music Journal.
      </p>
    </div>
    <br />
    <br />
    <div className="threesplit">
      <h1>OUR POLICY: </h1>
    </div>
    <div className="twothirdsplit">
      <p>
        It is UCLA Radio's policy to respect your privacy regarding any
        information we may collect while operating our website. This Privacy
        Policy applies to <a href="http://uclaradio.com">uclaradio.com</a>{' '}
        (hereinafter, "us", "we", or "uclaradio.com"). We respect your privacy
        and are committed to protecting personally identifiable information you
        may provide us through the Website. We have adopted this privacy policy
        ("Privacy Policy") to explain what information may be collected on our
        Website, how we use this information, and under what circumstances we
        may disclose the information to third parties. This Privacy Policy
        applies only to information we collect through the Website and does not
        apply to our collection of information from other sources.
      </p>
      <br />
      <p>Read our full Privacy Policy below.</p>
      <br />
      <div id="privacypolicy">
        <a id="pplink" href="/about/policy">
          Privacy Policy{' '}
        </a>
      </div>
    </div>
  </div>
);

export default AboutPage;
