// CountdownTimer.jsx
// A countdown timer to a specific date
// Based on SitePoint's javascript timer guide: 
// http://codepen.io/SitePoint/pen/MwNPVq

import React from 'react'; 

// styling
require('./CountdownTimer.scss');

/*
CountdownTimer: 

@prop deadline: deadline the countdown is for
*/
var CountdownTimer = React.createClass({
  getInitialState: function() {
    console.log(this.props.deadline);
    return {
      hours: 0
    };

  },
  render: function() {
    return (
      <div className="countdown">
        <div className="timeBlock">
          <div className="timeValue">
            15
          </div>
          <div className="timeLabel">
            Days
          </div>
        </div>
        <div className="timeBlock">
          <div className="timeValue">
            2
          </div>
          <div className="timeLabel">
            Hours
          </div>
        </div>
        <div className="timeBlock">
          <div className="timeValue">
            36
          </div>
          <div className="timeLabel">
            Minutes
          </div>
        </div>
        <div className="timeBlock">
          <div className="timeValue">
            3
          </div>
          <div className="timeLabel">
            Seconds
          </div>
        </div>
      </div>
    );
  }
}); 

export default CountdownTimer; 