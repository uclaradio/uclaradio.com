// DJsTab.jsx
// container for frontpage list of djs

import { connect } from 'react-redux';

import { updateDJs } from '../actions/djs';
import DJList from '../components/DJList.jsx';

const djsURL = '/api/djs';

const mapStateToProps = (state) => ({
	djs: state.djs
});

const mapDispatchToProps = (dispatch) => ({
	updateDJs: () => {
		fetchUpdatedDJs(dispatch);
	}
});

const DJsTab = connect(
	mapStateToProps,
	mapDispatchToProps
)(DJList);

/**
Helpers
**/

const fetchUpdatedDJs = (dispatch) => {
  $.ajax({
    url: djsURL,
    dataType: 'json',
    cache: false,
    success: function(data) {
      dispatch(updateDJs(data.djs));
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(djsURL, status, err.toString());
    }.bind(this)
  });
}

export default DJsTab;
