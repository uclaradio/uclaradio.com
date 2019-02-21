// EventPage.js
// shows full description of an event

import React from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';
import RectImage from '../../common/RectImage';
import './EventPage.scss';

import { fetchUpdatedEvents } from '../actions/events';

const defaultEventPic = '/img/radio.png';

/**
Page content for individual event
Displays full description of a event, with description, picture, location...

@prop event: event object
@prop fetching: currently fetching events
@prop updateEvents: callback to update all listed events
* */
class EventPage extends React.Component {
  componentWillMount() {
    if (this.props.event == null) {
      this.props.updateEvents();
    }
  }

  componentDidMount() {
    // scroll to top of page
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    const event = this.props.event;
    if (!event) {
      return (
        <div className="eventPage">
          {this.props.fetching ? <Loader /> : "This event doesn't exist!"}
        </div>
      );
    }
    return (
      <div className="eventPage">
        <RectImage maxWidth="350px" src={event.image || defaultEventPic} />
        <div className="eventInfo">
          <h3>{event.host}</h3>
          <h4>{event.location}</h4>
          <p>{formatDate(event.start)}</p>
          <p>{event.type}</p>
        </div>
      </div>
    );
  }
}

var formatDate = function(dateString) {
  const date = new Date(dateString);
  return date.toDateString();
};

const mapStateToProps = (state, ownProps) => {
  const eventID = ownProps.params.eventID;
  return {
    event: state.events.events[eventID],
    fetching: state.events.fetching,
  };
};

const mapDispatchToProps = dispatch => ({
  updateEvents: () => {
    fetchUpdatedEvents(dispatch);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage);
