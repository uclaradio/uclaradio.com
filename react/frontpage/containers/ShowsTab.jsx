// ShowsTab.jsx
// container for frontpage list of shows

import { connect } from 'react-redux';

import { updateShows } from '../actions/shows';
import ShowList from '../components/ShowList.jsx';

const scheduleURL = "/api/schedule";

const mapStateToProps = (state) => ({
	shows: state.shows
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
  $.ajax({
    url: scheduleURL,
    dataType: 'json',
    cache: false,
    success: function(data) {
      dispatch(updateShows(data.shows));
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(scheduleURL, status, err.toString());
    }.bind(this)
  });
}

export default ShowsTab;
