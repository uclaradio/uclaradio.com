// AboutPage.jsx

import React from 'react';

require('./AboutPage.scss');

/**
Full page About content detailing UCLA Radio history and offering links to contact managers.
Used as a tab's full content in frontpage.
**/
const AboutPage = () =>
  <div className="aboutPage">
    <div id="wrapper">
      <div className="threesplit">
        <h1>CONTACT US FOR: </h1>
      </div>

      <div className="threesplit">
        <h3> GENERAL INFO /INQUIRIES </h3>
        <a href="mailto:radio.info@media.ucla.com" target="_top">
          | radio.info@media.ucla.com{' '}
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
          {' '}| radio.playlists@media.ucla.edu
        </a>
        <br />
        <h3> PROMOS / GIVEAWAYS </h3>
        <a href="mailto:radio.promotions@media.ucla.edu" target="_top">
          | radio.promotions@media.ucla.edu
        </a>
      </div>
      <br />
    </div>

    <div id="about_text">
      <br />
      <h3>About</h3>
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
  </div>;

module.exports = AboutPage;
