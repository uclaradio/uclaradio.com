// StreamMarquee.js

import React from 'react';

require('./StreamMarquee.scss');

/*
StreamMarquee:

@prop message: message to display on the marquee
*/

var StreamMarquee = React.createClass({
  render() {
    let style = { width: this.props.marqueeWidth };
    return (
      <div className="marquee-container" style={style}>
        <div className="marquee">
          <p>{this.props.message}</p>
        </div>
      </div>
    );
  },
});

export default StreamMarquee;
