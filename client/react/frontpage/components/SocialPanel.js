import React from 'react';

import './SocialPanel.scss';

const SocialPanel = ({ links, size }) => {
  const getFaName = (img, size) => `fa fa-${img} fa-${size}`;
  return (
    <div className="link-container">
      {links.map(obj => (
        <a href={obj.link} className="social-link" target="_blank">
          <i className={getFaName(obj.img, size)} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialPanel;
