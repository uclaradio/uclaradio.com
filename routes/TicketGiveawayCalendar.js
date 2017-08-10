var express = require('express');
var router = express.Router();
var db = require('../database/db');
var nodemailer = require('nodemailer');
var passwords = require('../passwords.json');
var promo = passwords.promotions;
var transporter = nodemailer.createTransport(
  'smtps://radio.promotions%40media.ucla.edu:' + promo + '@smtp.gmail.com'
);

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

router.get('/availableShows', function(req, res, next) {
  publicGoogleCalendar.getEvents(function(err, events) {
    if (err) {
      return console.log(err.message);
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

    var ArtistVenueTime = [];
    // res.json(events);
    for (var i = 0; i < events.length; i++) {
      var Ticket = { summary: '', winner: '' };
      var winner = events[i]['description'];
      if (winner == '') continue;
      Ticket['winner'] = winner;
      Ticket['summary'] = events[i]['summary'];
      ArtistVenueTime.push(Ticket);
    }

    res.json(ArtistVenueTime);
  });
});

router.post('/stubform', function(req, res) {
  publicGoogleCalendar.getEvents(function(err, events) {
    // console.log(req.body);
    if (err) {
      return console.log(err.message);
    }

    var theKey = req.body['ArtistAndVenue']
      .replace(/\s/g, '')
      .replace('@', '')
      .toLowerCase();
    var requester = req.body['socialPlatform']
      .replace(/\s/g, '')
      .replace('@', '')
      .toLowerCase();
    console.log(theKey);
    events = events.filter(function(el) {
      return (
        el['description'] != ' ' &&
        el['summary']
          .replace(/\s/g, '')
          .replace('@', '')
          .toLowerCase()
          .indexOf(theKey) > -1 &&
        el['description']
          .replace(/\s/g, '')
          .replace('@', '')
          .toLowerCase()
          .indexOf(requester) > -1
      );
    });

    var message = '';

    if (events.length == 1) {
      var reciever = req.body['Email'];
      if (reciever.indexOf('@ucla.edu') > -1) {
        reciever = reciever.split('@');
        reciever = reciever[0] + '@g.ucla.edu';
      }
      console.log('CORRECT EMAIL' + reciever);
      var winner = req.body['Name'];
      var firstName = winner.split(' ')[0];
      var summary = events[0]['summary'];
      var month = events[0]['start'].getMonth() + 1;
      var day = events[0]['start'].getDate();
      var currday = new Date();
      var emailBody =
        'Hey ' +
        firstName +
        ',<p>Congratulations on winning the tickets to ' +
        summary +
        ' from UCLA Radio!</p> <p>This email is to confirm your spot on will call under the name <strong>' +
        winner +
        '</strong>. Please respond to this email to confirm that you have received this email and that you have thoroughly read it through. Here are the details of the show again. 1 PAIR of tickets to <strong>' +
        summary +
        '</strong> on <strong>' +
        month +
        '/' +
        day +
        "</strong>. Bring a valid photo ID to the show to claim your tickets.</p><p>NOTE: Contest winners are limited to win a maximum of 1 pair of tickets per event. Complimentary tickets that are won have no cash value, are non-transferable and may not be sold. We have a strict zero-tolerance policy on reselling; if a winner is found to have sold their complimentary tickets, the winner be banned from receiving any contest tickets in the future and will be denied entry into the event.</p><p>Please let me know if you have any questions. Be sure to tune into <a href='http://uclaradio.com/'>UCLARadio.com</a> to win future tickets, <a href='https://www.facebook.com/UCLARadio/'>Like</a> us on Facebook, and <a href='https://www.instagram.com/uclaradio/'>follow us on Instagram</a> to stay up to date on future giveaways!</p><p>Don't forget to check out our new <a href='http://uclaradio.com/GiveawayCalendar'>Giveaway Calendar</a> on our website to stay up to date on future giveaways!</p> Cheers,<br />Bryan Villalpando<br /> UCLA Radio Promotions Director<br /> radio.promotions@uclaradio.com<br /><a href='https://www.facebook.com/UCLARadio/'>Become a Fan on Facebook!</a><br />Follow us on <a href='https://twitter.com/UCLAradio'>Twitter @uclaradio</a> and <a href='https://www.instagram.com/uclaradio/'>Instagram @uclaradio</a> <br />To Listen: Go to <a href='http://uclaradio.com/'>UCLARadio.com</a> and click 'Play'<br /> <br />[" +
        currday +
        '] End of message.';
      var mailOptions = {
        from: 'UCLA RADIO <radio.promotions@media.ucla.edu>', // sender address
        to: reciever, // list of receivers
        subject: 'Congratulations', // Subject line
        // text: emailBody, // plaintext body
        html: emailBody, // html body
      };
      if (events.length == 1) {
        message =
          'Congratulations ' +
          firstName +
          '!  A confirmation email has been sent to ' +
          req.body['Email'] +
          '.';
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            return console.log(error);
          }
        });
      }
    } else {
      message =
        'Oops, either you are not on the list for this ticket OR you filled out something incorrectly.';
    }

    res.render('stubform', { message: message });
  });
});

router.get('/stubform', function(req, res) {
  res.render('stubform', { status: '' });
});

module.exports = router;
