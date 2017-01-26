// ShowsTab.jsx
// container for frontpage list of shows

import { connect } from 'react-redux';

import { fetchUpdatedShows } from '../actions/shows';
import ShowList from '../components/ShowContent.jsx';

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

export default ShowsTab;
