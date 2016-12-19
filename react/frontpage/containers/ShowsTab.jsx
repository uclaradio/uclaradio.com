// ShowsTab.jsx
// container for frontpage list of shows

import { connect } from 'react-redux';

import { updateShows, startFetching, stopFetching } from '../actions/shows';
import ShowList from '../components/ShowList.jsx';

const scheduleURL = "/api/schedule";

const mapStateToProps = (state) => ({
	shows: state.shows.shows,
  fetching: state.shows.fetching
});

const mapDispatchToProps = (dispatch) => ({
	updateShows: () => {
		fetchUpdatedShows(dispatch);
	}
});

const ShowsTab = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShowList);

/**
Helpers
**/

// Fetch updated show schedule from server and update store via dispatch
const fetchUpdatedShows = (dispatch) => {
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
}

export default ShowsTab;
