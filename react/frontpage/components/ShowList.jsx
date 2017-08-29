// ShowList.jsx
// text list of shows

import React from 'react';

import { Link } from 'react-router';

require('./ShowList.scss');
require('../_common.scss');

// order in which days appear
const scheduleDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
Implemented as a presentational component (view)

@prop shows: show objects indexed by their ids
* */
const ShowList = React.createClass({
  getInitialState() {
    return {
      schedule: [],
    };
  },
  componentWillMount() {
    this.updateSchedule(this.props.shows);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.shows) {
      this.updateSchedule(nextProps.shows);
    }
  },
  updateSchedule(shows) {
    const sorted = sortedShows(shows);
    this.setState({
      schedule: sorted,
    });
  },
  urlFromShow(show) {
    return `/shows/${show.id}`;
  },
  render() {
    return (
      <div className="showList">
        {this.state.schedule.map(show =>
          <div key={show.id}>
            <Link to={this.urlFromShow(show)}>
              <h3>
                {`${show.day} ${show.time}: `}
                {show.title}
              </h3>
            </Link>
            <p>
              {show.blurb}
            </p>
            <br />
          </div>
        )}
      </div>
    );
  },
});

// shows sorted by day, then time
const sortedShows = shows => {
  // clone shows and sort
  const sorted = shows.slice(0);
  sorted.sort((a, b) => {
    if (a.day !== b.day) {
      return scheduleDays.indexOf(a.day) - scheduleDays.indexOf(b.day);
    }
    return militaryTime(a.time) - militaryTime(b.time);
  });
  return sorted;
};

// converts time string to military time number
// "8pm" -> 20
// "12am" -> 0
const militaryTime = time => {
  let hour = Number(time.replace(/[^0-9]+/g, '')) % 12;
  if (time.indexOf('p') >= 0) {
    hour += 12;
  }
  return hour;
};

export default ShowList;
