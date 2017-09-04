// Error404Page.js
// displayed error when an unknown page is requested

import React from 'react';

require('./Error404Page.scss');

const Error404Page = () => (
  <div className="error404Page">
    <h3>404: Page Not Found</h3>
    <p>Dude what?</p>
  </div>
);

export default Error404Page;
