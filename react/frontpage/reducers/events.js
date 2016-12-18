// events.js
// reducers for actions related to frontpage events

const events = (state = [], action) => {
	switch (action.type) {
		case 'UPDATE_EVENTS':
			// simply replace events with new data
			return action.events
		default:
			return state;
	}
}

export default events;
