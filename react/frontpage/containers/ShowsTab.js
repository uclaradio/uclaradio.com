// ShowsTab.js
// container for frontpage list of shows

import { connect } from 'react-redux';

import { fetchUpdatedShows } from '../actions/shows';
import ShowsContent from '../components/ShowsContent.js';

const mapStateToProps = state => ({
  shows: state.shows.shows,
  fetching: state.shows.fetching,
  currentShowID: state.shows.nowPlayingID,
  spotlightShowID: state.shows.spotlightID,
});

const mapDispatchToProps = dispatch => ({
  updateShows: () => {
    fetchUpdatedShows(dispatch);
  },
});

const ShowsTab = connect(mapStateToProps, mapDispatchToProps)(ShowsContent);

export default ShowsTab;
