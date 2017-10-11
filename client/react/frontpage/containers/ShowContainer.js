// ShowContainer.js
// redux container for single show page component

import { connect } from 'react-redux';
import ShowPage from '../components/ShowPage';

import { fetchUpdatedShows } from '../actions/shows';

const mapStateToProps = (state, ownProps) => {
  const props = {
    fetching: state.shows.fetching,
  };

  const showID = Number(ownProps.params.showID);

  // set show if found
  for (let showIndex = 0; showIndex < state.shows.shows.length; showIndex++) {
    const show = state.shows.shows[showIndex];
    if (show.id === showID) {
      props.show = show;
    }
  }

  return props;
};

const mapDispatchToProps = dispatch => ({
  updateShows: () => {
    fetchUpdatedShows(dispatch);
  },
});

const ShowContainer = connect(mapStateToProps, mapDispatchToProps)(ShowPage);

export default ShowContainer;
