// Loader.jsx
// common reusable view component showing a loading animation

import React from 'react';
import './Loader.scss';

/**
props:
 - color (default '#fff')
 - delay (default 1000)
 - height (default 64)
 - type (default 'balls')
 - width (default 64)
* */
const Loader = () => (
  <div className="loader">
    <center>
      <img src="./img/icons/loading.gif" />
    </center>
  </div>
);

export default Loader;
