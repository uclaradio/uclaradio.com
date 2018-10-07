// PromoBanner.js
// A carousel of various promotion related material (ie Show of the Month, Ticket Giveaways, ect)

import React from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';
import RectImage from '../../common/RectImage';
import './PromoBanner.scss';

// Promo Banner Data:
// Data should look like:
//  {
//     img: '',
//     link: '',
//  }
const bannerData = [
  {
    img: '/img/promo/summer-graphic-radio-banner.jpg',
    link: '',
  },
  {
    img: '/img/GeneralWEB.png',
    link: '',
  },
];

const PromoBanner = React.createClass({
  getImage(banner) {
    return (
      <RectImage src={banner.img} aspectRatio={5}>
        <div className="overlay" />
      </RectImage>
    );
  },
  render() {
    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      fade: true,
      autoplaySpeed: 5000,
      draggable: false,
    };

    // <Link> component is unable to link to external links
    // Currently doing an inline conditional via a ternary
    // The self variable is be declared as 'this' is function scoped
    // An alternative solution would be to use ES6 arrow functions

    const self = this;
    const banners = bannerData.map(banner => (
      <div>
        {banner.link.indexOf('http') == -1 ? (
          <Link to={banner.link}>{self.getImage(banner)}</Link>
        ) : (
          <a href={banner.link}>{self.getImage(banner)}</a>
        )}
      </div>
    ));

    return (
      <div className="promoBanner">
        <Slider {...settings}>{banners}</Slider>
      </div>
    );
  },
});

export default PromoBanner;
