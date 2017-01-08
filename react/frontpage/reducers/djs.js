// djs.js
// reducers for actions related to frontpage djs

const initialState = {
	djs: [],
	fetching: false
};

const djs = (state = initialState, action) => {
	switch(action.type) {
		case 'UPDATE_DJS':
			// simply replace djs with new data
			return Object.assign({}, state, {
				djs: action.djs
			});
		case 'STARTED_FETCHING':
			return Object.assign({}, state, {
				fetching: true
			});
		case 'STOPPED_FETCHING':
			return Object.assign({}, state, {
				fetching: false
			});
		default:
			return state;
	}
}

export default djs;
