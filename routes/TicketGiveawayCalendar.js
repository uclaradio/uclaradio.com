var express = require('express');
var router = express.Router();
var db = require('../database/db');

var PublicGoogleCalendar = require('public-google-calendar')
  , publicGoogleCalendar = new PublicGoogleCalendar({ calendarId: 'media.ucla.edu_u701v206t0p4hfes93rkdjtghg@group.calendar.google.com' });


router.get('/', function(req, res, next) {
    publicGoogleCalendar.getEvents(function(err, events) {
      if (err) { return console.log(err.message); }
      // events is now array of all calendar events
      var currDate = new Date();
      var Year = currDate.getYear();
      var Month = currDate.getMonth();
      var currDate = currDate.getDate();
      events = events.filter(function(el) {
          return (el["start"].getMonth() >= Month) 
          && (el["start"].getYear() == Year) 
          && !((el["start"].getMonth() == Month) && (el["start"].getDate() < currDate))
      })
      events = events.reverse();

      var eventsByMonth = [{month:"January", arr:[]},
                          {month:"February", arr:[]},
                          {month:"March", arr:[]},
                          {month:"May", arr:[]},
                          {month:"June", arr:[]},
                          {month:"July", arr:[]},
                          {month:"August", arr:[]},
                          {month:"September", arr:[]},
                          {month:"October", arr:[]},
                          {month:"November", arr:[]},
                          {month:"December", arr:[]}];

      for(var i = 0; i < events.length; i++) {
        eventsByMonth[events[i]["start"].getMonth()].arr.push(events[i]);
      }
      eventsByMonth = eventsByMonth.filter(function(el) {
        return el.arr.length != 0;
      })
      console.log(eventsByMonth);
      //console.log(events[0]);
      res.render('TicketGiveawayCalendar', {eventsByMonth: eventsByMonth});

    });
});

module.exports = router;