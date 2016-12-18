// shows.js
// reducers for actions related to frontpage shows

const shows = (state = [], action) => {
	switch(action.type) {
		case 'UPDATE_SHOWS':
			// simply replace shows with new data
			return action.shows;
		default:
			return state;
	};
};

export default shows;