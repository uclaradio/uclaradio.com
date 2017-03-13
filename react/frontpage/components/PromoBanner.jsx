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

var PromoBanner = React.createClass({
  render: function() {
    var settings = {
      dots: true,
      autoplay: true,
      infinite: true, 
      fade: true, 
      autoplaySpeed: 5000
    };

    return (
      <div className="promoBanner">
        <Slider {...settings}>
          <div>
            <Link to="/shows/90">
              <RectImage src="/img/sotm-mar17-nuindigo.png" aspectRatio={5}><div className="overlay" /></RectImage>
            </Link>
          </div>

          <div>
            <Link to="/shows/90">
              <RectImage src="/img/sotm-feb2017.jpg" aspectRatio={5}><div className="overlay" /></RectImage>
            </Link>
          </div>

          <div>
            <Link to="/shows/90">
              <RectImage src="/img/sotm_january_2017.png" aspectRatio={5}><div className="overlay" /></RectImage>
            </Link>
          </div>

        </Slider>
      </div>
    );
  }
});

export default PromoBanner;