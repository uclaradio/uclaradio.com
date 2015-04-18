var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/uclaradio');

var db = {};

var Schema = mongoose.Schema;
   
var DjBlurbSchema = new Schema({
	djName: String,
	showName: String,
	genre: String,
	description: String,
	link: String,
	timeslot: String,
	day: String
}, {collection: 'DjBlurbs'});

var DjBlurbModel = mongoose.model('DjBlurb', DjBlurbSchema);

//expects a string like '10pm', '8am', '6pm'
//i.e. hour and then am or pm. not 24-hour format
//expects day string like 'Wed', 'Thu'
//i.e. first three letters of the day, first letter capitalized
db.getBlurbByTimeslotAndDay = function(time) {
	DjBlurbModel.findOne({timeslot: time}, function(err, blurb) {
		if (err) console.log('err');
		console.log(blurb);
	});
};

db.addBlurb = function(djName, showName, genre, description, link, timeslot, day) {
	blurb_data = {
		"djName": djName,
		"showName": showName,
		"genre": genre,
		"description": description,
		"link": link,
		"timeslot": timeslot,
		"day": day	
	};
	var blurb = new DjBlurbModel(blurb_data);
	blurb.save( function(err, blurb) {
		if (err) console.log('err');
		console.log(blurb);
	});
}
	
module.exports = db;
