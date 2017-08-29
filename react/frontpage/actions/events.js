// events.js
// action creators for actions related to frontpage events

export const updateEvents = events => ({
  type: 'UPDATE_EVENTS',
  events,
});

export const updateGroups = groups => ({
  type: 'UPDATE_GROUPS',
  groups,
});

export const startFetching = () => ({
  type: 'STARTED_FETCHING_EVENTS',
});

export const stopFetching = () => ({
  type: 'STOPPED_FETCHING_EVENTS',
});

/**
Helpers
* */

// Fetch updated events list from server and update store via dispatch
const eventsURL = '/giveawaycalendar/data2';
export const fetchUpdatedEvents = dispatch => {
  dispatch(startFetching());
  $.ajax({
    url: eventsURL,
    dataType: 'json',
    cache: false,
    success(data) {
      dispatch(stopFetching());
      dispatch(updateGroups(monthGroups(data.events)));
      dispatch(updateEvents(eventsFromGroups(data.events)));
    },
    error(xhr, status, err) {
      dispatch(stopFetching());
      console.error(eventsURL, status, err.toString());
    },
  });
};

// extracts events objects from groups returned from API
// indexes events by ID
// {"asd@google.com": {event1}, ...}
const eventsFromGroups = eventGroups => {
  const events = {};
  for (let groupIndex = 0; groupIndex < eventGroups.length; groupIndex++) {
    for (
      let eventIndex = 0;
      eventIndex < eventGroups[groupIndex].arr.length;
      eventIndex++
    ) {
      const event = eventGroups[groupIndex].arr[eventIndex];
      events[event.id] = event;
    }
  }
  return events;
};

// creates event groups with lists of event ids,
// and groups corresponding to months returned from API
// [{title: "October", eventIDs: ["asdf@google.com", "fff@google'.com"]}, ...]
const monthGroups = eventGroups => {
  const groups = [];
  for (let groupIndex = 0; groupIndex < eventGroups.length; groupIndex++) {
    const monthGroup = {
      title: eventGroups[groupIndex].month,
      eventIDs: [],
    };
    for (
      let eventIndex = 0;
      eventIndex < eventGroups[groupIndex].arr.length;
      eventIndex++
    ) {
      monthGroup.eventIDs.push(eventGroups[groupIndex].arr[eventIndex].id);
    }
    groups.push(monthGroup);
  }
  return groups;
};
