// PromoBanner.jsx
// A carousel of various promotion related material (ie Show of the Month, Ticket Giveaways, ect)

import React from 'react';

// Open-Source Components
import Slider from 'react-slick';

// Common Components
import RectImage from '../../common/RectImage.jsx';


import CountdownTimer from './CountdownTimer.jsx';

import  { Link } from 'react-router';

// styling
require('./PromoBanner.scss');

// Promo Banner Data 
const bannerData = [
  {"img": "/img/promo/sotm/sotm_april_2017.png", "link": "/shows/182"}, 
  {"img": "/img/promo/localchella_giveaways.jpg", "link": "https://www.facebook.com/UCLARadio/photos/a.220123767998373.66127.214439101900173/1543809082296495/?type=3&theater"}
  // Will update once their shows are updated
  // {"img": "/img/sotm-mar17-nuindigo.png", "link": "/shows/90"},
  // {"img": "/img/sotm-feb2017.jpg", "link": "/shows/75"},
  // {"img": "/img/sotm_january_2017.png", "link": "/shows/83"}
];

var PromoBanner = React.createClass({
  getImage: function(banner) {
    return (
      <RectImage src={banner.img} aspectRatio={5}>
        <div className="overlay" />
      </RectImage>
    );
  },
  render: function() {
    var settings = {
      dots: true,
      autoplay: true,
      infinite: true, 
      fade: true, 
      autoplaySpeed: 5000
    };

    // <Link> component is unable to link to external links
    // Currently doing an inline conditional via a ternary 
    // The self variable is be declared as 'this' is function scoped
    // An alternative solution would be to use ES6 arrow functions
    
    var self = this; 
    var banners = bannerData.map(function(banner) {
      return (
        <div>
          {
           (banner.link.indexOf("http") == -1) ? 
            
            (
                <Link to={banner.link}>
                  {self.getImage(banner)}
                </Link>
            ) :
            (
                <a href={banner.link}>
                  {self.getImage(banner)}
                </a>
            )

          }
        </div>
      ); 
    });

    const dateInFuture = new Date('2017-5-1');
    return (
      //<div className="promoBanner">
        // <Slider {...settings}>
          // {banners}
          <CountdownTimer deadline={dateInFuture}/>
        // </Slider>
      // </div>
    );
  }
});

export default PromoBanner;