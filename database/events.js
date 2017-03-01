// events.js
// Data model for radio events

// connect to database
var db = require('./db');

// user accounts
var accounts = require('./accounts');

var mongoose = require('mongoose');
var fs = require('fs');

var events = {};

// Radio events to show on the site
var EventSchema = new mongoose.Schema({
  id: Number,  //unique identifier
  date: Date,
  type: String, // Ticket Giveaway / UCLA Radio Presents / Campus Event / Local Event
  name: String,
  location: String,
  picture: String, // url to image file
  submitter: String, // username of person who submitted event 
  description: String,
  public: Boolean
});
EventSchema.index({ id: 1});
var EventModel = mongoose.model('events', EventSchema);

events.webSafeEvent = function(event) {
  return {title:  event.title,
             id:  event.id,
           date:  event.date,
           type:  event.type,
           name:  event.name,
       location:  event.location,
        picture:  event.picture,
      submitter:  event.submitter,
         public:  event.public,
    description:  event.description};
}

/***** Events *****/

// Get all events marked as public
events.getAllEvents = function(callback) {
  EventModel.find({public: true}, function(err, allEvents) {
    if (err) { callback(err); }
    else {
      var response = [];
      for (var e = 0; e < allEvents.length; e++) {
        response.push(events.webSafeEvent(allEvents[e]));
      }
      callback(null, response);
    }
  });
}

// Get events by submitter
events.getEventsForUser = function(djUsername, callback) {
  EventModel.find({submitter: djUsername}, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res);
    }
  });
};

// Add a new event
events.addNewEvent = function(name, type, user, callback) {
  db.getNextAvailableId(db.eventIdKey, function(nextId) {
    console.log("nextId: ", nextId);
    newData = {
      "id": nextId,
      "name": name, 
      "type": type,
      "submitter": user
    };

    var newEvent = new EventModel(newData); 
    newEvent.save(function(err, saved) {
      callback(err, saved); 
      if (saved) {
        db.setLastTakenId(db.eventIdKey, nextId, function(err) {
          if (err) { console.log("error setting next id for event: ", err); }
        });
      }
    });
  });
};

// Check user access to event
events.userHasAccessToEvent = function(username, id, callback) {
  accounts.isManager(username, function(err, isManager) {
    EventModel.findOne({id: id, submitter: username}, function(err, o) {
      if (isManager || o) { callback(true); }
      else { callback(false); }
    });
  });
};

// Get event by id
events.getEventByID = function(id, callback) {
  EventModel.findOne({id: id}, function(err, o) {
    if (err || o == null) {
      callback(err);
      return;
    }
    var event = events.webSafeEvent(o);
    callback(err, event);
  });
};

// Update event info
events.updateEvent = function(id, newData, callback) {
  var update = function() {
    EventModel.findOneAndUpdate({'id': id}, newData, {upsert:false, new:true}, function(err, o) {
          if (err) { callback(err); }
          else { callback(null, events.webSafeEvent(o)); }
      });
  }
  EventModel.findOne({id: id}, function(err, o) {
    if (o) {
      if (o.picture !== newData.picture) {
        var path = require('path');
        fs.unlink(path.resolve('public'+o.picture), function() {
          update();
        });
      }
      else {
        update();
      }
    }
    else { callback(err); }
  });
};



module.exports = events;