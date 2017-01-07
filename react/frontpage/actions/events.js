// events.js
// action creators for actions related to frontpage events

export const updateEvents = (events) => ({
	type: 'UPDATE_EVENTS',
	events: events
});

export const startFetching = () => ({
	type: 'STARTED_FETCHING'
});

export const stopFetching = () => ({
	type: 'STOPPED_FETCHING'
});

/**
Helpers
**/

// Fetch updated events list from server and update store via dispatch
const eventsURL = '/api/events';
export const fetchUpdatedEvents = (dispatch) => {
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
};
