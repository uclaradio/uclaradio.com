// StreamMarquee.js

import React from 'react';
import { Grid } from 'react-bootstrap';

require('./StreamMarquee.scss');

/*
StreamMarquee:

@prop message: message to display on the marquee
*/

var StreamMarquee = React.createClass({
  render: function() {
    return (
      <div className="marquee-container">
        <div className="marquee">
          <p>{this.props.message}</p>
        </div>
      </div>
    );
  },
});

export default StreamMarquee;
