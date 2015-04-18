var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/local');

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
db.getBlurbByTimeslotAndDay = function(time, day) {
	DjBlurbModel.findOne({timeslot: time, day: day}, function(err, blurb) {
		if (err) console.log('err');
		return blurb;
	});
};

db.getAllBlurbs = function() {
	DjBlurbModel.find({}, function(err, blurbs) {
		if (err) console.log(err);
		var arrayBlurbs = [];
		for(var i = 0; i < blurbs.length; i++)
			arrayBlurbs.push(blurbs[i]._doc);

		console.dir(arrayBlurbs);
	});
};

module.exports = db;
