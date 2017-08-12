// DJContainer.jsx
// redux container for single dj page component

import { connect } from 'react-redux';
import DJPage from '../components/DJPage.jsx';
import { fetchUpdatedDJs } from '../actions/djs';

const mapStateToProps = (state, ownProps) => {
  var props = {
    fetching: state.djs.fetching,
    // 'djs' prop set below
  };

  var djName = ownProps.params['djName'];

  // set DJ if found
  for (var djIndex = 0; djIndex < state.djs.djs.length; djIndex++) {
    var dj = state.djs.djs[djIndex];
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
