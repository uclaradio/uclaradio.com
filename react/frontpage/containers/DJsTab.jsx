// DJsTab.jsx
// container for frontpage list of djs

import { connect } from 'react-redux';

import { updateDJs, startFetching, stopFetching } from '../actions/djs';
import DJList from '../components/DJList.jsx';

const djsURL = '/api/djs';

const mapStateToProps = (state) => ({
	djs: state.djs.djs,
	fetching: state.djs.fetching
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
	dispatch(startFetching());
  $.ajax({
    url: djsURL,
    dataType: 'json',
    cache: false,
    success: function(data) {
    	dispatch(stopFetching());
      dispatch(updateDJs(data.djs));
    }.bind(this),
    error: function(xhr, status, err) {
    	dispatch(stopFetching());
      console.error(djsURL, status, err.toString());
    }.bind(this)
  });
}

export default DJsTab;
