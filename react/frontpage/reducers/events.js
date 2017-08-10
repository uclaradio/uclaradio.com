// events.js
// reducers for actions related to frontpage events

const initialState = {
  events: [],
  fetching: false,
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_EVENTS':
      // simply replace events with new data
      return Object.assign({}, state, {
        events: action.events,
      });
    case 'UPDATE_GROUPS':
      // use for groups (months) of events
      return Object.assign({}, state, {
        groups: action.groups,
      });
    case 'STARTED_FETCHING_EVENTS':
      return Object.assign({}, state, {
        fetching: true,
      });
    case 'STOPPED_FETCHING_EVENTS':
      return Object.assign({}, state, {
        fetching: false,
      });
    default:
      return state;
  }
};

export default events;
