var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes/index');
var newBlurb = require('./routes/newBlurb');
var newShow = require('./routes/newShow');
var staffingPoints = require('./routes/staffingPoints');
var proposedShows = require('./routes/proposedShows');
var ios = require('./routes/ios');
var schedule = require('./routes/schedule');
var pages = require('./routes/pages');
var calendar = require('./routes/calendar');
var shows = require('./routes/shows');
var manageShows = require('./routes/manageShows');
var managers = require('./routes/managers');
var TicketGiveawayCalendar = require('./routes/TicketGiveawayCalendar');
var notFound = require('./routes/notFound');
var analytics = require('./routes/analytics');
var splash = require('./routes/splash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ dest: './public/blurbImages/'}));

app.use('/index', routes);
app.use('/newBlurb', newBlurb);
app.use('/newShow', newShow);
app.use('/staffingPoints', staffingPoints);
app.use('/proposedShows', proposedShows);
app.use('/ios', ios);
app.use('/schedule', schedule);
app.use('/pages', pages);
app.use('/calendar', calendar);
app.use('/shows', shows);
app.use('/manageShows', manageShows);
app.use('/managers', managers);
app.use('/GiveawayCalendar', TicketGiveawayCalendar);
app.use('/notFound', notFound);
app.use('/analytics', analytics);
app.use('/', splash);

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
