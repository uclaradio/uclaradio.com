// shows.js
// action creators for actions related to frontpage shows

export const updateShows = (shows) => ({
	type: 'UPDATE_SHOWS',
	shows: shows
});

export const startFetching = () => ({
	type: 'STARTED_FETCHING'
});

export const stopFetching = () => ({
	type: 'STOPPED_FETCHING'
});
