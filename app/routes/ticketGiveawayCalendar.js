var express = require('express');
var router = express.Router();
var db = require('../database/db');
var passwords = require('../../passwords.json');
var promo = passwords.promotions;

var PublicGoogleCalendar = require('public-google-calendar'),
  publicGoogleCalendar = new PublicGoogleCalendar({
    calendarId:
      'media.ucla.edu_u701v206t0p4hfes93rkdjtghg@group.calendar.google.com',
  });

var fetchEvents = function(callback) {
  publicGoogleCalendar.getEvents(function(err, events) {
    if (err) {
      console.log(err.message);
      callback(null);
    }
    // events is now array of all calendar events
    var currDate = new Date();
    var Year = currDate.getYear();
    var Month = currDate.getMonth();
    var currDate = currDate.getDate();
    events = events.filter(function(el) {
      return (
        el['start'].getMonth() >= Month &&
        el['start'].getYear() == Year &&
        !(el['start'].getMonth() == Month && el['start'].getDate() < currDate)
      );
    });
    events = events.reverse();

    var eventsByMonth = [
      { month: 'January', arr: [] },
      { month: 'February', arr: [] },
      { month: 'March', arr: [] },
      { month: 'April', arr: [] },
      { month: 'May', arr: [] },
      { month: 'June', arr: [] },
      { month: 'July', arr: [] },
      { month: 'August', arr: [] },
      { month: 'September', arr: [] },
      { month: 'October', arr: [] },
      { month: 'November', arr: [] },
      { month: 'December', arr: [] },
    ];

    for (var i = 0; i < events.length; i++) {
      eventsByMonth[events[i]['start'].getMonth()].arr.push(events[i]);
    }
    eventsByMonth = eventsByMonth.filter(function(el) {
      return el.arr.length != 0;
    });
    callback(eventsByMonth);
  });
};

router.get('/', function(req, res, next) {
  fetchEvents(function(eventsByMonth) {
    var mobileEvents = eventsByMonth;
    res.render('TicketGiveawayCalendar', {
      eventsByMonth: eventsByMonth,
      mobileEvents: mobileEvents,
    });
  });
});

// json verson for apps
router.get('/data', function(req, res, next) {
  fetchEvents(function(eventsByMonth) {
    res.json({ events: eventsByMonth });
  });
});

// json verson for apps v2
router.get('/data2', function(req, res, next) {
  fetchEvents(function(eventsByMonth) {
    var cleanedMonths = eventsByMonth.map(function(month) {
      return (cleanedEvents = month.arr.map(function(event) {
        var e = event;
        // assume giveaway
        e.type = 'Ticket Giveaway';

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
      }));
    });
    res.json({ events: eventsByMonth });
  });
});

module.exports = router;
