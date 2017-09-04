// DJContainer
// redux container for single dj page component

import { connect } from 'react-redux';
import DJPage from '../components/DJPage';
import { fetchUpdatedDJs } from '../actions/djs';

const mapStateToProps = (state, ownProps) => {
  const props = {
    fetching: state.djs.fetching,
    // 'djs' prop set below
  };

  const djName = ownProps.params.djName;

  // set DJ if found
  for (let djIndex = 0; djIndex < state.djs.djs.length; djIndex++) {
    const dj = state.djs.djs[djIndex];
    if (dj.djName === djName) {
      props.dj = dj;
    }
  }
  return props;
};

const mapDispatchToProps = dispatch => ({
  updateDJs: () => {
    fetchUpdatedDJs(dispatch);
  },
});

const DJContainer = connect(mapStateToProps, mapDispatchToProps)(DJPage);

export default DJContainer;
