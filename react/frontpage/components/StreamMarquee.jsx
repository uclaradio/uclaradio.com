import React from 'react';

require('./StreamMarquee.scss');

var StreamMarquee = React.createClass({
  render: function() {
    return (
      <div className="marquee">
        <p>{this.props.message}</p>
      </div>
    );
  }
});

module.exports = StreamMarquee;