var mongoose = require('mongoose');
 
mongoose.connect('mongodb://192.241.193.240/local');

var db = {};

var Schema = mongoose.Schema;
   
var DjBlurbSchema = new Schema({
	djName: Array,
	showName: String,
	genre: String,
	description: String,
	link: String,
	timeslot: String,
	day: String,
	picture: String
}, {collection: 'DjBlurbs'});

var DjBlurbModel = mongoose.model('DjBlurb', DjBlurbSchema);

//expects a string like '10pm', '8am', '6pm'
//i.e. hour and then am or pm. not 24-hour format
//expects day string like 'Wed', 'Thu'
//i.e. first three letters of the day, first letter capitalized
db.getBlurbByTimeslotAndDay = function(time, day, callback) {
	DjBlurbModel.findOne({timeslot: time, day: day}, function(err, blurb) {
		callback(err, blurb);
	});
};

db.getAllBlurbs = function(callback) {
	DjBlurbModel.find({}, function(err, blurbs) {
		callback(err, blurbs);
	});
};

db.addBlurb = function(djName, showName, genre, description, link, timeslot, day, picture, callback) {
	blurb_data = {
		"djName": djName,
		"showName": showName,
		"genre": genre,
		"description": description,
		"link": link,
		"timeslot": timeslot,
		"day": day,
		"picture": picture
	};

	var blurb = new DjBlurbModel(blurb_data);

	blurb.save(function(err, blurbSaved) {
		callback(err, blurbSaved);
	});

};

module.exports = db;
