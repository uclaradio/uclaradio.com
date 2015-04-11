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
});

var DjBlurbModel = mongoose.model('DjBlurb', DjBlurbSchema);

db.getABlurb = function(time) {
	DjBlurbModel.find({timeslot: '10pm', day: 'Wed'}, 'link', function(err, blurb) {
		if (err)
			console.log('err');
		console.dir(blurb);
	});
});

module.exports = db;
