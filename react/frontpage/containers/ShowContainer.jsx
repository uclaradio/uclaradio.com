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

  // set show if found
  for (var showIndex = 0; showIndex < state.shows.shows.length; showIndex++) {
    var show = state.shows.shows[showIndex];
    if (show.id === showID) {
      props.show = show;
    }
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
