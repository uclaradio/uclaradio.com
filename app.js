var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var socket_io = require('socket.io');
var app = express();
var io = socket_io();
app.io = io;

var routes = require('./routes/index');
var staffingPoints = require('./routes/staffingPoints');
var ios = require('./routes/ios');
// var schedule = require('./routes/schedule');
var pages = require('./routes/pages');
var calendar = require('./routes/calendar');
var showsPages = require('./routes/shows');
var managers = require('./routes/managers');
var TicketGiveawayCalendar = require('./routes/TicketGiveawayCalendar');
var panel = require('./routes/panel.js');
var notFound = require('./routes/notFound');
var analytics = require('./routes/analytics');
var api = require('./routes/api');
var chat = require('./routes/chat')(io);

// //socket io events
// io.on( "connection", function( socket )
// {
//     console.log( "A user connected" );
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  key: "mysite.sid.uid.whatever",
  secret: "faeb4453e5d14fe6f6d04637f78077c76c73d1b4",
  cookie: {
    maxAge: 2678400000 // 31 days
  },
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ dest: './public/uploads/'}));

app.use('/', routes);
app.use('/staffingPoints', staffingPoints);
app.use('/ios', ios);
// app.use('/schedule', schedule);
app.use('/pages', pages);
app.use('/calendar', calendar);
app.use('/shows', showsPages);
app.use('/managers', managers);
app.use('/GiveawayCalendar', TicketGiveawayCalendar);
app.use('/notFound', notFound);
app.use('/analytics', analytics);
app.use('/api', api);
app.use('/chat', chat);
// all links to panel/* handled in panel.js
app.use('/panel', panel);

app.use('/faq', function(req, res, next) {
  res.redirect('/panel/faq');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('notFound');

});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
