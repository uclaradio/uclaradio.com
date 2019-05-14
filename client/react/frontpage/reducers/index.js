import { combineReducers } from 'redux';

import events from './events';
import shows from './shows';
import djs from './djs';
import podcasts from './podcasts';

const frontpage = combineReducers({
  events,
  shows,
  djs,
  podcasts,
});

export default frontpage;
