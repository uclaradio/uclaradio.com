import React from 'react';

import './SocialPanel.scss';

// update social media links here
// img is the base name of the Font Awesome icon
const socialMediaLinks = [
  {
    img: 'facebook',
    link: 'https://www.facebook.com/uclaradio',
  },
  {
    img: 'twitter',
    link: 'https://twitter.com/UCLAradio',
  },
  {
    img: 'instagram',
    link: 'https://www.instagram.com/uclaradio/',
  },
  {
    img: 'snapchat-ghost',
    link: 'https://www.snapchat.com/add/uclaradio',
  },
];

const SocialPanel = React.createClass({
  convertToFaName(img, size) {
    return 'fa fa-' + img + ' fa-' + size;
  },
  render() {
    const self = this;
    return (
      <div>
        <p className="infoHeader">Social Media</p>
        <div className="link-container">
          {socialMediaLinks.map(function(obj) {
            // change size here
            let faName = self.convertToFaName(obj.img, '2x');
            return (
              <a href={obj.link} className="social-link">
                <i className={faName} />
              </a>
            );
          })}
        </div>
      </div>
    );
  },
});

export default SocialPanel;
