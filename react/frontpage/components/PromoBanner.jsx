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
  {"img": "/img/promo/sotm/sotm-may2017.jpg", "link": "/shows/266"}
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

    const dateInFuture = new Date('2017-5-31');
    return (
      <div className="promoBanner">
         <Slider {...settings}>
           {banners}
          <div>
            <CountdownTimer deadline={dateInFuture}/>
          </div>
         </Slider>
       </div>
    );
  }
});

export default PromoBanner;