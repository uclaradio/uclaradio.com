// ShowsTab.jsx
// container for frontpage list of shows

import { connect } from 'react-redux';

import { updateShows } from '../actions/shows';
import ShowList from '../components/ShowList.jsx';

const scheduleURL = "/api/schedule";
// const sampleData = JSON.parse('[{"title":"pizza planet","id":1,"day":"Sun","time":"9am","djs":{"chris":"dj smooth moves"},"picture":"/uploads/cb5ffe0294ccfc4bc57ee3dbffb3dd74.PNG","public":true,"pages":[],"episodes":[]}]');

const mapStateToProps = (state) => ({
	shows: state.shows
});

const mapDispatchToProps = (dispatch) => ({
	updateShows: () => {
		fetchShowUpdates(dispatch)
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
const fetchShowUpdates = (dispatch) => {
  $.ajax({
    url: scheduleURL,
    dataType: 'json',
    cache: false,
    success: function(data) {
      dispatch(updateShows(data.shows));
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(this.props.urls.showURL, status, err.toString());
    }.bind(this)
  });
}

export default ShowsTab;
