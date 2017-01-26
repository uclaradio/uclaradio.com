// ShowsTab.jsx
// container for frontpage list of shows

import { connect } from 'react-redux';

import { fetchUpdatedShows } from '../actions/shows';
import ShowsContent from '../components/ShowsContent.jsx';

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
)(ShowsContent);

export default ShowsTab;
