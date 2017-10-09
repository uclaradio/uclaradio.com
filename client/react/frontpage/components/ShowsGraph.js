// ShowsGraph.js

import React from 'react';
import Dates from '../../common/Dates';
import './ShowsGraph.scss';

const week = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
const dayWidth = `${100 / 8}%`;

/*
Full graph with schedule of shows

@prop shows: list of show objects

@prop currentShowID: id of current show
@prop spotlightShowID: id of spotlight show
@prop activeShowID: id of active show user clicked on
@prop onShowClick(show): callback for when a show is made active
*/
const ShowsGraph = React.createClass({
  getInitialState() {
    return {};
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

  findStartTime() {
    // find earliest show time (after 5am)
    let found = 0;
    for (var s = 5; s < Dates.availableTimes.length; s++) {
      for (
        let showIndex = 0;
        showIndex < this.props.shows.length;
        showIndex++
      ) {
        if (this.props.shows[showIndex].time == Dates.availableTimes[s]) {
          found = 1;
          break;
        }
      }
      if (found) {
        break;
      }
    }
    return s;
  },

  findEndTime() {
    // find latest show time
    let found = 0;

    // check late night (after midnight and before 5am) shows first
    for (var e = 4; e >= 0; e--) {
      for (
        var showIndex = 0;
        showIndex < this.props.shows.length;
        showIndex++
      ) {
        if (this.props.shows[showIndex].time == Dates.availableTimes[e]) {
          found = 1;
          break;
        }
      }
      if (found) {
        break;
      }
    }
    if (found) {
      return e;
    }

    // now check before midnight
    for (var e = Dates.availableTimes.length - 1; e > 0; e--) {
      for (
        var showIndex = 0;
        showIndex < this.props.shows.length;
        showIndex++
      ) {
        if (this.props.shows[showIndex].time == Dates.availableTimes[e]) {
          found = 1;
          break;
        }
      }
      if (found) {
        break;
      }
    }
    return e;
  },

  lateNightDay(day) {
    let displayDay;

    switch (day) {
      case 'sunday':
        displayDay = 'monday';
        break;
      case 'monday':
        displayDay = 'tuesday';
        break;
      case 'tuesday':
        displayDay = 'wednesday';
        break;
      case 'wednesday':
        displayDay = 'thursday';
        break;
      case 'thursday':
        displayDay = 'friday';
        break;
      case 'friday':
        displayDay = 'saturday';
        break;
      case 'saturday':
        displayDay = 'sunday';
        break;
    }
    return displayDay;
  },

  render() {
    const dayTitles = week.map(day => (
      <span className="dayStyle" style={{ left: dayWidth, width: dayWidth }}>
        {Dates.abbreviatedDay(day)}
      </span>
    ));

    const showBlocks = [];

    // limit vertical size of grid, bounded by earliest and latest show times
    const start = this.findStartTime();
    const end = this.findEndTime();

    let hour = start;

    const endMargin = end < 5 ? Dates.availableTimes.length - 1 : end;

    for (; hour < endMargin + 1; hour++) {
      var hourString = Dates.availableTimes[hour];
      showBlocks.push(
        <div className="hourBlocks">
          <p className="timeStyle" style={{ width: dayWidth }}>
            {hourString}
          </p>
          {week.map(day => {
            const show = this.state.schedule && this.state.schedule[day][hour];
            return (
              <ShowBlock
                isValidShow={show && show.title}
                isCurrentShow={show && show.id === this.props.currentShowID}
                isActiveShow={show && show.id === this.props.activeShowID}
                isSpotlightShow={show && show.id === this.props.spotlightShowID}
                handleClick={() => {
                  show && this.props.onShowClick(show);
                }}
              />
            );
          })}
        </div>
      );
    }

    if (end < 5) {
      // if we have late-night shows to display
      for (hour = 0; hour < end + 1; hour++) {
        var hourString = Dates.availableTimes[hour];
        showBlocks.push(
          <div className="hourBlocks">
            <p className="timeStyle" style={{ width: dayWidth }}>
              {hourString}
            </p>
            {week.map(day => {
              const displayDay = this.lateNightDay(day);
              const show =
                this.state.schedule && this.state.schedule[displayDay][hour];
              return (
                <ShowBlock
                  isValidShow={show && show.title}
                  isCurrentShow={show && show.id === this.props.currentShowID}
                  isActiveShow={show && show.id === this.props.activeShowID}
                  isSpotlightShow={
                    show && show.id === this.props.spotlightShowID
                  }
                  handleClick={() => {
                    show && this.props.onShowClick(show);
                  }}
                />
              );
            })}
          </div>
        );
      }
    }

    return (
      <div className="showsGraph">
        <div className="colorKey">
          <p>current show</p>
          <div className="dotCur" /> {/* Current Show Color Key */}
          <p>spotlight show</p>
          <div className="dotSpot" /> {/* Spotlight Show Color Key */}
        </div>

        {dayTitles}
        {showBlocks}
      </div>
    );
  },
});

/*
Individual show block with rollover action

@prop handleClick: callback for mouse click action
@prop isValidShow: styling bool -> overwrites isCurrentShow and isSpotlightShow if false
@prop isCurrentShow: styling bool: this show is currently playing
@prop isActiveShow: styling bool: user clicked on this show
@prop isSpotlightShow: styling bool: show is a spotlight feature on website
*/
const ShowBlock = React.createClass({
  handleClick() {
    this.props.handleClick();
  },
  render() {
    if (!this.props.isValidShow) {
      return (
        <div style={{ width: dayWidth }} className="showBlock">
          <div className="boringBlockStyle" />
        </div>
      );
    }
    const blockColor =
      (this.props.isActiveShow && 'red') ||
      (this.props.isSpotlightShow && 'purple') ||
      (this.props.isCurrentShow && '#3c84cc') ||
      'black';

    return (
      <div className="showBlock" style={{ width: dayWidth }}>
        <div
          className="blockStyle"
          style={{ backgroundColor: blockColor }}
          onClick={this.handleClick}
        />
      </div>
    );
  },
});

// creates schedule object:
// {
//   "sunday": {9: {show}, ...},
//   ...
//   "saturday": {11: {show}, ...},
// }
const sortedShows = shows => {
  const schedule = {
    sunday: {},
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
  };

  for (let s = 0; s < shows.length; s++) {
    const show = shows[s];
    const day = Dates.dayFromVar(show.day).toLowerCase();
    const hour = Dates.availableTimes.indexOf(show.time);
    if (day) {
      schedule[day][hour] = show;
    }
  }

  return schedule;
};

export default ShowsGraph;
