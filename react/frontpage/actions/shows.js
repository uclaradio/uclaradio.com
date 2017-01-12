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
});

export const updateSpotlightShow = (showID) => ({
  type: 'UPDATE_SPOTLIGHT_SHOW',
  showID: showID
});

const scheduleURL = "/api/schedule";
// Fetch updated show schedule from server and update store via dispatch
export const fetchUpdatedShows = (dispatch) => {
  dispatch(startFetching());
  $.ajax({
    url: scheduleURL,
    dataType: 'json',
    cache: false,
    success: function(data) {
      dispatch(stopFetching());
      dispatch(updateShows(data.shows));
    }.bind(this),
    error: function(xhr, status, err) {
      dispatch(stopFetching());
      console.error(scheduleURL, status, err.toString());
    }.bind(this)
  });
};
