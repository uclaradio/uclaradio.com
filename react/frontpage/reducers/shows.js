// shows.js
// reducers for actions related to frontpage shows

const initialState = {
	shows: [],
	fetching: false
};

const shows = (state = initialState, action) => {
	switch(action.type) {
		case 'UPDATE_SHOWS':
			// simply replace djs with new data
			return Object.assign({}, state, {
				shows: action.shows
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
	};
};

export default shows;