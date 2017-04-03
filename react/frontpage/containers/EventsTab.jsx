// EventsTab.jsx
// container for frontpage list of events

import { connect } from 'react-redux';

import { updateEvents, fetchUpdatedEvents } from '../actions/events';
import EventList from '../components/EventList.jsx';

const mapStateToProps = (state) => ({
  eventGroups: eventGroupsFromState(state.events),
  fetching: state.events.fetching
});

const mapDispatchToProps = (dispatch) => ({
  updateEvents: () => {
    fetchUpdatedEvents(dispatch);
  }
});

const EventsTab = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);

/**
Helpers
**/

const eventGroupsFromState = (state) => {
  if (!state.events || !state.groups) {
    return [];
  }

  // convert groups' event ids to event objects
  var eventGroups = [];
  for (var groupIndex = 0; groupIndex < state.groups.length; groupIndex++) {
    var stateGroup = state.groups[groupIndex];
    var newGroup = {
      title: stateGroup.title,
      events: []
    };
    for (var eventIndex = 0; eventIndex < stateGroup.eventIDs.length; eventIndex++) {
      var event = state.events[stateGroup.eventIDs[eventIndex]];
      if (event) {
        newGroup.events.push(event);
      }
    }
    eventGroups.push(newGroup);
  }
  return eventGroups;
};

export default EventsTab;
