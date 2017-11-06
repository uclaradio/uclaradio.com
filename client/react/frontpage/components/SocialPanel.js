import React from 'react';

import './SocialPanel.scss';

const SocialPanel = ({ links, size }) => (
  <div className="link-container">
    {links.map(function(obj) {
      let faName = 'fa fa-' + obj.img + ' fa-' + size;
      return (
        <a href={obj.link} className="social-link" target="_blank">
          <i className={faName} aria-hidden="true" />
        </a>
      );
    })}
  </div>
);

export default SocialPanel;
