//reducer for podcasts
const initialState = {
  playlists: [],
  fetching: false,
};

const podcasts = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PLAYLISTS':
      return Object.assign({}, state, { playlists: action.playlists });
    case 'STARTED_FETCHING_PLAYLISTS':
      return Object.assign({}, state, { fetching: true });
    case 'STOPPED_FETCHING_PLAYLISTS':
      return Object.assign({}, state, { fetching: false });
    default:
      return state;
  }
};

export default podcasts;
