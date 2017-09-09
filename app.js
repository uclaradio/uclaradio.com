const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const app = express();
const io = socketIO();
app.io = io;

const routes = require('./routes/index');
const staffingPoints = require('./routes/staffingPoints');
const pages = require('./routes/pages');
const calendar = require('./routes/calendar');
const managers = require('./routes/managers');
const panel = require('./routes/panel.js');
const notFound = require('./routes/notFound');
const api = require('./routes/api');
const chat = require('./routes/chat')(io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(`${__dirname}/public/favicon.ico`));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    key: 'mysite.sid.uid.whatever',
    secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2678400000, // 31 days
    },
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/staffingPoints', staffingPoints);
app.use('/pages', pages);
app.use('/calendar', calendar);
app.use('/managers', managers);
app.use('/notFound', notFound);
app.use('/api', api);
app.use('/chat', chat);
// all links to panel/* handled in panel.js
app.use('/panel', panel);

app.use('/faq', (req, res) => {
  res.redirect('/panel/faq');
});

// catch 404 and forward to frontpage
app.use((req, res) => {
  // var err = new Error('Not Found');
  // err.status = 404;
  // res.render('notFound');
  res.sendFile(path.resolve('public/frontpage.html'));
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
