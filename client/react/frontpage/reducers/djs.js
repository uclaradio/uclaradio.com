import { bindActionCreators } from 'redux';

// djs.js
// reducers for actions related to frontpage djs

const initialState = {
  djs: [],
  currentShow: {
    title: 'default',
  },
  fetching: false,
};

const djs = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DJS':
      // simply replace djs with new data
      return Object.assign({}, state, {
        djs: action.djs,
      });
    case 'STARTED_FETCHING_DJS':
      return Object.assign({}, state, {
        fetching: true,
      });
    case 'STOPPED_FETCHING_DJS':
      return Object.assign({}, state, {
        fetching: false,
      });
    case 'UPDATE_CURRENT_SHOW':
      return Object.assign({}, state, {
        currentShow: action.currentShow,
      });
    default:
      return state;
  }
};

export default djs;
