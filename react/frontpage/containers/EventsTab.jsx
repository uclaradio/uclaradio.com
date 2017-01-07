// EventsTab.jsx
// container for frontpage list of events

import { connect } from 'react-redux';

import { updateEvents, fetchUpdatedEvents } from '../actions/events';
import EventList from '../components/EventList.jsx';

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

export default EventsTab;
