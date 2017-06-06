// StreamMarquee.jsx

import React from 'react';

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
  }
});

module.exports = StreamMarquee;
