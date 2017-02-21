// DJContainer.jsx
// redux container for single dj page component

import { connect } from 'react-redux';
import DJPage from '../components/DJPage.jsx'
import { updateDJs } from '../actions/djs';

const mapStateToProps = (state, ownProps) => {
  var props = {
    fetching: state.djs.fetching
    // 'djs' prop to be set
  }

  return props; 
};

const mapDispatchToProps = (dispatch) => ({
  updateDJs: () => {
    fetchUpdatedDJs(dispatch);
  }
});

const DJContainer = connect (
  mapStateToProps,
  mapDispatchToProps
)(DJPage);

export default DJContainer;