// db.js
// Set up Mongo database connection

var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/uclaradio');

module.exports = {};
