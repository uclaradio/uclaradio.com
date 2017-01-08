import { combineReducers } from 'redux'

import events from './events';
import shows from './shows';
import djs from './djs';

const frontpage = combineReducers({
	events,
	shows,
	djs
});

export default frontpage;
