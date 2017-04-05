// events.js
// Data model for radio events

// connect to database
var db = require('./db');

// user accounts
var accounts = require('./accounts');

var mongoose = require('mongoose');
var fs = require('fs');

var events = {};

var dates = require('../react/common/Dates.js')

// Radio events to show on the site
var EventSchema = new mongoose.Schema({
  id: Number,  //unique identifier
  month: String,
  date: Number,
  year: Number,
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
   month:  event.month,
   date:  event.date,
   year: event.year,
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

      // response is now array of all db events
      var currDate = new Date();
      var Year = currDate.getFullYear();
      var Month = currDate.getMonth();
      var currDate = currDate.getDate();

      //only return events that haven't happened yet
      response = response.filter(function(el) {
        return (dates.numberFromMonth(el["month"]) >= Month) 
          && (el["year"] == Year) 
          && !((dates.numberFromMonth(el["month"]) == Month) && (el["date"] < currDate))
      })
      response = response.reverse();
      console.log("response is " + response);

      var eventsByMonth = [{month:"January", arr:[]},
      {month:"February", arr:[]},
      {month:"March", arr:[]},
      {month:"April", arr:[]},
      {month:"May", arr:[]},
      {month:"June", arr:[]},
      {month:"July", arr:[]},
      {month:"August", arr:[]},
      {month:"September", arr:[]},
      {month:"October", arr:[]},
      {month:"November", arr:[]},
      {month:"December", arr:[]}];

      for(var i = 0; i < response.length; i++) {
        eventsByMonth[dates.numberFromMonth(response[i]["month"])].arr.push(response[i]);
      }
      eventsByMonth = eventsByMonth.filter(function(el) {
        return el.arr.length != 0;
      })
      console.log(eventsByMonth);

      /*var cleanedMonths = eventsByMonth.map(function(month) {
        return cleanedEvents = month.arr.map(function(event) {
          var e = event;
          // assume giveaway
          e.type = "Ticket Giveaway";

          // get host, location from summary
          var summaryPattern = /([^@]*)(?:@([^@]*))?/g;
          var match = summaryPattern.exec(e.summary);
          if (match != null) {
            e.host = match[1] && match[1].trim();
            e.location = match[2] && match[2].trim();
          }

          // get image from description
          // var descriptionImagePattern = /image: "([^"]*)"/g;
          // match = descriptionImagePattern.exec(e.description);
          // if (match != null) {
          //   e.image = match[1].trim();
          // }
          e.image = e.description;
          return e;
        });
      });*/

      callback(null, eventsByMonth);
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

events.removeEvent = function(id, callback) {
  EventModel.remove({id: id}, function (e) {
    callback(e);
  });
};



module.exports = events;