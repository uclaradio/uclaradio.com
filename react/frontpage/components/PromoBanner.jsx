// PromoBanner.jsx
// A carousel of various promotion related material (ie Show of the Month, Ticket Giveaways, ect)

import React from 'react';

// Open-Source Components
import Slider from 'react-slick';

// Common Components
import RectImage from '../../common/RectImage.jsx';

import  { Link } from 'react-router';

// styling
require('./PromoBanner.scss');

// Promo Banner Data 
const bannerData = [
  {"img": "/img/sotm-mar17-nuindigo.png", "link": "/shows/90"},
  {"img": "/img/sotm-feb2017.jpg", "link": "/shows/75"},
  {"img": "/img/sotm_january_2017.png", "link": "/shows/83"}
];

var PromoBanner = React.createClass({
  render: function() {
    var settings = {
      dots: true,
      autoplay: true,
      infinite: true, 
      fade: true, 
      autoplaySpeed: 5000
    };

    var banners = bannerData.map(function(banner) {
      return (
        <div>
          <Link to={banner.link}>
            <RectImage src={banner.img} aspectRatio={5}>
              <div className="overlay" />
            </RectImage>
          </Link>
        </div>
      ); 
    });

    console.log(banners);
    return (
      <div className="promoBanner">
        <Slider {...settings}>
          {banners}
        </Slider>
      </div>
    );
  }
});

export default PromoBanner;