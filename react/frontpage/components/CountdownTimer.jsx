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
const CountdownTimer = React.createClass({
  getInitialState() {
    const currentDate = new Date();
    const timeDiff = Math.abs(
      this.props.deadline.getTime() - currentDate.getTime()
    );
    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hoursLeft = Math.floor(timeDiff / (1000 * 3600)) - 24 * daysLeft;
    const minutesLeft =
      Math.floor(timeDiff / (1000 * 60)) - 60 * hoursLeft - 24 * 60 * daysLeft;
    const secondsLeft =
      Math.floor(timeDiff / 1000) -
      60 * minutesLeft -
      3600 * hoursLeft -
      24 * 3600 * daysLeft;
    return {
      days: daysLeft,
      hours: hoursLeft,
      minutes: minutesLeft,
      seconds: secondsLeft,
    };
  },
  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  },
  componentWillUnmount() {
    clearInterval(this.timer);
  },
  tick() {
    const currentDate = new Date();
    const timeDiff = Math.abs(
      this.props.deadline.getTime() - currentDate.getTime()
    );
    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hoursLeft = Math.floor(timeDiff / (1000 * 3600)) - 24 * daysLeft;
    const minutesLeft =
      Math.floor(timeDiff / (1000 * 60)) - 60 * hoursLeft - 24 * 60 * daysLeft;
    const secondsLeft =
      Math.floor(timeDiff / 1000) -
      60 * minutesLeft -
      3600 * hoursLeft -
      24 * 3600 * daysLeft;
    this.setState({
      days: daysLeft,
      hours: hoursLeft,
      minutes: minutesLeft,
      seconds: secondsLeft,
    });
  },
  render() {
    return (
      <div className="countdownWrapper">
        <a href="https://spark.ucla.edu/uclaradio">
          <div className="countdownBanner">
            <div className="countdown">
              <div className="timeBlock">
                <div className="timeValue">
                  {this.state.days}
                </div>
                <div className="timeLabel">Days</div>
              </div>
              <div className="timeBlock">
                <div className="timeValue">
                  {this.state.hours}
                </div>
                <div className="timeLabel">Hours</div>
              </div>
              <div className="timeBlock">
                <div className="timeValue">
                  {this.state.minutes}
                </div>
                <div className="timeLabel">Minutes</div>
              </div>
              <div className="timeBlock">
                <div className="timeValue">
                  {this.state.seconds}
                </div>
                <div className="timeLabel">Seconds</div>
              </div>
              <div className="countdownText">
                Left to Donate to Pledge Drive!
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  },
});

export default CountdownTimer;
