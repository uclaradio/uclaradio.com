// EventContainer.jsx
// redux container for single event page component

import { connect } from 'react-redux';
import EventPage from '../components/EventPage.jsx';

import { fetchUpdatedEvents } from '../actions/events';

const mapStateToProps = (state, ownProps) => {
	var eventID = ownProps.params['eventID'];
	return {
		event: eventFromGroups(eventID, state.events.events),
		fetching: state.events.fetching
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateEvents: () => {
		fetchUpdatedEvents(dispatch);
	}
});

const EventContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(EventPage);

/**
Helpers
**/

const eventFromGroups = (eventID, eventGroups) => {
	for (var groupIndex = 0; groupIndex < eventGroups.length; groupIndex++) {
		for (var eventIndex = 0; eventIndex < eventGroups[groupIndex].arr.length; eventIndex++) {
			var event = eventGroups[groupIndex].arr[eventIndex];
			console.log('event', event.id);
			if (event.id === eventID) {
				console.log('found');
				return event;
			}
		}
	}
	console.log('didnt find');
	return null;
}

export default EventContainer;
