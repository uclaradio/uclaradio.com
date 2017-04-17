// ShowsGraph.jsx

var React = require('react');

import Dates from '../../common/Dates';

// styling
require('./ShowsGraph.scss');

const week = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const dayWidth = `${100/8}%`;

/*
Full graph with schedule of shows

@prop shows: list of show objects

@prop currentShowID: id of current show
@prop spotlightShowID: id of spotlight show
@prop activeShowID: id of active show user clicked on
@prop onShowClick(show): callback for when a show is made active
*/
const ShowsGraph = React.createClass({
  getInitialState: function() {
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

  updateSchedule: function(shows) {
    var sorted = sortedShows(shows);
    this.setState({
      schedule: sorted
    });
  },
  
  findStartTime: function() { // find earliest show time (after 5am)
    var found = 0;
    for(var s = 5; s < Dates.availableTimes.length; s++){
      for(var showIndex = 0; showIndex < this.props.shows.length; showIndex++){
        if(this.props.shows[showIndex].time == Dates.availableTimes[s]){
          found = 1;
          break;
        }
      }
      if(found) {break;}
    }
    return s;
  },

  findEndTime: function() {  // find latest show time
    var found = 0;

    // check late night (after midnight and before 5am) shows first
    for(var e = 4; e >= 0; e--){
      for(var showIndex = 0; showIndex < this.props.shows.length; showIndex++){
        if(this.props.shows[showIndex].time == Dates.availableTimes[e]){
          found = 1;
          break;
        }
      }
      if(found) {break;}
    }
    if (found) { return e;}

    // now check before midnight
    for(var e = Dates.availableTimes.length-1; e > 0; e--){
      for(var showIndex = 0; showIndex < this.props.shows.length; showIndex++){
        if(this.props.shows[showIndex].time == Dates.availableTimes[e]){
          found = 1;
          break;
        }
      }
      if(found) {break;}
    }
    return e;
  },

  lateNightDay: function(day) {
    var displayDay;

    switch (day) {
      case "sunday":
        displayDay = "monday";
        break;
      case "monday":
        displayDay = "tuesday";
        break;
      case "tuesday":
        displayDay = "wednesday";
        break;
      case "wednesday":
        displayDay = "thursday";
        break;
      case "thursday":
        displayDay = "friday";
        break;
      case "friday":
        displayDay = "saturday";
        break;
      case "saturday":
        displayDay = "sunday";
        break;
    }
    return displayDay;
  },

  render: function() {

    var dayTitles = week.map((day) => {
      return (
        <span className="dayStyle" style={{left: dayWidth, width: dayWidth}}>
          {Dates.abbreviatedDay(day)}
        </span> 
      );
    });

    var showBlocks = [];

    // limit vertical size of grid, bounded by earliest and latest show times
    var start = this.findStartTime();
    var end = this.findEndTime(); 

    var hour = start;

    var endMargin = end < 5 ? Dates.availableTimes.length-1 : end;

    for (; hour < endMargin+1; hour++) {
      var hourString = Dates.availableTimes[hour];
      showBlocks.push( 
        <div className="hourBlocks">
          <p className="timeStyle" style={{width: dayWidth}}>{hourString}</p>
          { week.map((day) => {
            var show = this.state.schedule && this.state.schedule[day][hour];
            return (
              <ShowBlock isValidShow={(show && show.title)}
                isCurrentShow={show && show.id === this.props.currentShowID}
                isActiveShow={show && show.id === this.props.activeShowID}
                isSpotlightShow={show && show.id === this.props.spotlightShowID}
                handleClick={()=>{show && this.props.onShowClick(show)}} />
            );
          })}
        </div>
      );
    }

    if (end < 5) { // if we have late-night shows to display
      for (hour = 0; hour < end+1; hour++) {
        var hourString = Dates.availableTimes[hour];
        showBlocks.push( 
          <div className="hourBlocks">
            <p className="timeStyle" style={{width: dayWidth}}>{hourString}</p>
            { week.map((day) => {
              var displayDay = this.lateNightDay(day);
              var show = this.state.schedule && this.state.schedule[displayDay][hour];
              return (
                <ShowBlock isValidShow={(show && show.title)}
                  isCurrentShow={show && show.id === this.props.currentShowID}
                  isActiveShow={show && show.id === this.props.activeShowID}
                  isSpotlightShow={show && show.id === this.props.spotlightShowID}
                  handleClick={()=>{show && this.props.onShowClick(show)}} />
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
          <div className="dotCur"></div>  {/* Current Show Color Key */}
          <p>spotlight show</p>
          <div className="dotSpot"></div>  {/* Spotlight Show Color Key */}
          
        </div>

        {dayTitles}
        {showBlocks}
      </div>
    );
  }
});

/*
Individual show block with rollover action

@prop handleClick: callback for mouse click action
@prop isValidShow: styling bool -> overwrites isCurrentShow and isSpotlightShow if false
@prop isCurrentShow: styling bool: this show is currently playing
@prop isActiveShow: styling bool: user clicked on this show
@prop isSpotlightShow: styling bool: show is a spotlight feature on website
*/
var ShowBlock = React.createClass({
  handleClick: function() {
    this.props.handleClick()
  },
  render: function() {

    if (!this.props.isValidShow) {

      return (
        <div style={{width: dayWidth}} className="showBlock">
          <div className="boringBlockStyle" />
        </div>
      );
    } else {
      var blockColor = (this.props.isActiveShow && 'red')
        || (this.props.isSpotlightShow && 'purple')
        || (this.props.isCurrentShow && '#3c84cc')
        || 'black';

      return (
        <div className="showBlock" style={{width: dayWidth}}>
          <div className="blockStyle" 
            style={{backgroundColor: blockColor}}
            onClick={this.handleClick} />
        </div>
      );
    }
  }
});


// creates schedule object:
// {
//   "sunday": {9: {show}, ...},
//   ...
//   "saturday": {11: {show}, ...},
// }
const sortedShows = (shows) => {
  var schedule = {
    "sunday": {},
    "monday": {},
    "tuesday": {},
    "wednesday": {},
    "thursday": {},
    "friday": {},
    "saturday": {}
  };

  for (var s = 0; s < shows.length; s++) {
    var show = shows[s];
    var day = Dates.dayFromVar(show.day).toLowerCase();
    var hour = Dates.availableTimes.indexOf(show.time);
    if (day) {
      schedule[day][hour] = show;
    }
  }

  return schedule;
};

module.exports = ShowsGraph;
