var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/local');

var Schema = mongoose.Schema;
   
var DjBlurbSchema = new Schema({
	djName: String,
	picture: Buffer,
	description: String,
	timeslot: String
});

var DjBlurbModel = mongoose.model('DjBlurb', DjBlurbSchema);

/*DjBlurbModel.findOne({timeslot: 'm10am'}, function(err, blurb) {
	if (err) return console.error(err);
	console.dir(blurb);
});*/

