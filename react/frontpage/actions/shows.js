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

export const updateNowPlaying = (showID) => ({
	type: 'UPDATE_NOW_PLAYING',
	showID: showID
});

export const addUpdateShow = (show) => ({
	type: 'ADD_UPDATE_SHOW',
	show: show
})
