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

// Temporary script to populate events collection with events
// run: 'node events.js' to populate 
// !!! Assumes no events collection has been made !!!

var event1 = new EventModel({
  id: 1, 
  date: new Date, 
  type: "Ticket Giveaway", 
  name: "Chainsmoker's Ticket Giveaway", 
  location: "The Novo DTLA",
  submitter: "gm", 
  description: "Baby pull me closer",
  public: true
});

var event2 = new EventModel({
  id: 2, 
  date: new Date, 
  type: "UCLA Radio Presents", 
  name: "Kidz Bop Live!", 
  location: "Hollywood Bowl",
  submitter: "gm", 
  description: "UCLA Radio Presents the grammy nominated Kidz Bop!",
  public: true
});

var event3 = new EventModel({
  id: 3, 
  date: new Date, 
  type: "Campus Event", 
  name: "Jacob Sartorius Meet and Greet", 
  location: "The Station",
  submitter: "gm", 
  description: "unfinished description",
  public: false
});

// Save to database:
event1.save(function (err, e) {
  if (err) return console.error(err);
});
event2.save(function (err, e) {
  if (err) return console.error(err);
});
event3.save(function (err, e) {
  if (err) return console.error(err);
});
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


module.exports = events;
