// djs.js
// reducers for actions related to frontpage djs

const djs = (state = [], action) => {
	switch(action.type) {
		case 'UPDATE_DJS':
			// simply replace djs with new data
			return action.djs;
		default:
			return state;
	}
}

export default djs;
