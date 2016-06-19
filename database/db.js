// db.js
// Set up Mongo database connection

var mongoose = require('mongoose');
var fs = require('fs');
 
mongoose.connect('mongodb://localhost/uclaradio');

