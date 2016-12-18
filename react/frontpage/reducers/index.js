import { combineReducers } from 'redux'

import events from './events';
import shows from './shows';

const frontpage = combineReducers({
	events,
	shows
});

export default frontpage;
