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
  componentWillMount() {
    if (this.props.dj == null) {
      this.props.updateDJs();
    }
  },
  render: function() {
    var dj = this.props.dj;
    if (!dj) {
      return(
        <div>
          <p> DJ page doesn't exist! </p>
        </div>
      );
    }

    return (
      <div>
        <p> This is a dj page for {dj.djName} </p>
        <p> Their real name is {dj.fullName}, but they probably don't want you to know that </p>
      </div>
    );
  }
});

export default DJPage;