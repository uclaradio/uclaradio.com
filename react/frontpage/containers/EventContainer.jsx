// EventContainer.jsx
// redux container for single event page component

import { connect } from 'react-redux';
import EventPage from '../components/EventPage.jsx';

import { fetchUpdatedEvents } from '../actions/events';

const mapStateToProps = (state, ownProps) => {
	var eventID = ownProps.params['eventID'];
	return {
		event: state.events.events[eventID],
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

export default EventContainer;
