// DJPage.jsx
// shows full DJ information

import React from 'react';

// Frontpage Components
import Loader from './Loader.jsx';

// Common Components
import RectImage from '../../common/RectImage.jsx';

import  { Link } from 'react-router';

// styling
require('./DJPage.scss');

/**
Page content for individual DJ
Displays DJ information

@prop dj: dj object
@prop fetching: currently fetching djs
@prop updateDJs: callback to update all listed djs
**/

const DJPage = React.createClass({
  render: function() {
    return (
      <div>
        <p> This is a dj page </p>
      </div>
    );
  }
});

export default DJPage;