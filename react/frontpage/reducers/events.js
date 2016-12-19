// events.js
// reducers for actions related to frontpage events

const initialState = {
	events: [],
	fetching: false
};

const events = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_EVENTS':
			// simply replace events with new data
			return Object.assign({}, state, {
				events: action.events
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

export default events;
