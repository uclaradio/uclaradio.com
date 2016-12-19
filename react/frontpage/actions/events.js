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
