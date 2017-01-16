// ShowContainer.jsx
// redux container for single show page component

import { connect } from 'react-redux';
import ShowPage from '../components/ShowPage.jsx';

import { fetchUpdatedShows } from '../actions/shows';

const mapStateToProps = (state, ownProps) => {
	var props = {
		fetching: state.shows.fetching
	};

	var showID = Number(ownProps.params['showID']);
	var show = state.shows.shows.find((show) => {
		return show.id === showID;
	});
	if (show && show != -1) {
		props.show = show;
	}

	return props;
};

const mapDispatchToProps = (dispatch) => ({
	updateShows: () => {
		fetchUpdatedShows(dispatch);
	}
});

const ShowContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShowPage);

export default ShowContainer;
