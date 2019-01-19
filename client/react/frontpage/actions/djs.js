// djs.js
// action creators for actions related to frontpage djs

export const updateDJs = djs => ({
  type: 'UPDATE_DJS',
  djs,
});

export const startFetching = () => ({
  type: 'STARTED_FETCHING_DJS',
});

export const stopFetching = () => ({
  type: 'STOPPED_FETCHING_DJS',
});

export const updateCurrentShow = currentShow => ({
  type: 'UPDATE_CURRENT_SHOW',
  currentShow,
});

// Fetch updated DJ list from server and update store via dispatch
const djsURL = '/api/djs'; // uncomment this later

export const fetchUpdatedDJs = dispatch => {
  dispatch(startFetching());
  $.ajax({
    url: djsURL,
    dataType: 'json',
    cache: false,
    success(data) {
      dispatch(stopFetching());
      dispatch(updateDJs(data.djs));
    },
    error(xhr, status, err) {
      dispatch(stopFetching());
      console.error(djsURL, status, err.toString());
    },
  });
};

// Fetch current show from server
const currentShowURL = '/api/nowplaying';
// const currentShowURL = 'https://uclaradio.com/api/nowplaying';

export const fetchCurrentShow = dispatch => {
  $.ajax({
    url: currentShowURL,
    dataType: 'json',
    cache: false,
    success(data) {
      console.log(data);
      dispatch(updateCurrentShow(data));
    },
    error(xhr, status, err) {
      console.error(currentShowURL, status, err.toString());
    },
  });
};
