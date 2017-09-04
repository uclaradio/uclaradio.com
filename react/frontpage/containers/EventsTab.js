// EventsTab.js
// container for frontpage list of events

import { connect } from 'react-redux';

import { updateEvents, fetchUpdatedEvents } from '../actions/events';
import EventList from '../components/EventList.js';

const mapStateToProps = state => ({
  eventGroups: eventGroupsFromState(state.events),
  fetching: state.events.fetching,
});

const mapDispatchToProps = dispatch => ({
  updateEvents: () => {
    fetchUpdatedEvents(dispatch);
  },
});

const EventsTab = connect(mapStateToProps, mapDispatchToProps)(EventList);

/**
Helpers
* */

const eventGroupsFromState = state => {
  if (!state.events || !state.groups) {
    return [];
  }

  // convert groups' event ids to event objects
  const eventGroups = [];
  for (let groupIndex = 0; groupIndex < state.groups.length; groupIndex++) {
    const stateGroup = state.groups[groupIndex];
    const newGroup = {
      title: stateGroup.title,
      events: [],
    };
    for (
      let eventIndex = 0;
      eventIndex < stateGroup.eventIDs.length;
      eventIndex++
    ) {
      const event = state.events[stateGroup.eventIDs[eventIndex]];
      if (event) {
        newGroup.events.push(event);
      }
    }
    eventGroups.push(newGroup);
  }
  return eventGroups;
};

export default EventsTab;
