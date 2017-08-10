// shows.js
// reducers for actions related to frontpage shows

const initialState = {
  shows: [],
  fetching: false,
};

const shows = (state = initialState, action) => {
  switch (action.type) {
    // simply replace djs with new data
    case 'UPDATE_SHOWS':
      return Object.assign({}, state, {
        shows: action.shows,
      });
    // update now playing show id
    case 'UPDATE_NOW_PLAYING':
      return Object.assign({}, state, {
        nowPlayingID: action.showID,
      });
    // update shows by adding a show, replacing old copy if necessary
    case 'ADD_UPDATE_SHOW':
      return Object.assign({}, state, {
        shows: addOrReplaceObjectWithID(state.shows, action.show),
      });
    // should indicate in UI that shows fetching started
    case 'STARTED_FETCHING_SHOWS':
      return Object.assign({}, state, {
        fetching: true,
      });
    // should indicate in UI that shows fetching finished
    case 'STOPPED_FETCHING_SHOWS':
      return Object.assign({}, state, {
        fetching: false,
      });
    case 'UPDATE_SPOTLIGHT_SHOW':
      return Object.assign({}, state, {
        spotlightID: action.showID,
      });
    default:
      return state;
  }
};

/**
Helpers
**/

// returns copy of array with obj added, replacing existing object
//   if one exists in arr with the same id
const addOrReplaceObjectWithID = (arr, obj) => {
  arr = arr.filter(a => {
    return a.id !== obj.id;
  });
  return [...arr, obj];
};

export default shows;
