// EventsTab.jsx
// container for frontpage list of events

import { connect } from 'react-redux';

import { updateEvents, startFetching, stopFetching } from '../actions/events';
import EventList from '../components/EventList.jsx';

const eventsURL = '/api/events';

const mapStateToProps = (state) => ({
	events: state.events.events,
	fetching: state.events.fetching
});

const mapDispatchToProps = (dispatch) => ({
	updateEvents: () => {
		fetchUpdatedEvents(dispatch);
	}
});

const EventsTab = connect(
	mapStateToProps,
	mapDispatchToProps
)(EventList);

/**
Helpers
**/

// Fetch updated events list from server and update store via dispatch
const fetchUpdatedEvents = (dispatch) => {
	dispatch(startFetching());
  $.ajax({
    url: eventsURL,
    dataType: 'json',
    cache: false,
    success: function(data) {
    	dispatch(stopFetching());
      dispatch(updateEvents(data.events));
    }.bind(this),
    error: function(xhr, status, err) {
    	dispatch(stopFetching());
      console.error(eventsURL, status, err.toString());
    }.bind(this)
  });
}

export default EventsTab;
