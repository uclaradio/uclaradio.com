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
db.getBlurbByTimeslotAndDay = function(time, day, callback) {
	DjBlurbModel.findOne({timeslot: time, day: day}, function(err, blurb) {
		callback(err, blurb);
	});
};

db.getAllBlurbs = function(callback) {
	DjBlurbModel.find({}, function(err, blurbs) {
		var arrayBlurbs = [];
		for(var i = 0; i < blurbs.length; i++)
			arrayBlurbs.push(blurbs[i]._doc);

		arrayBlurbs = [{
			djName: "dj Nutmeg", 
			showName: "Satyr Presents: How Do We get your job", 
			genre: "eclectic", 
			about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ILorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularit was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			link: "www.reganhsu.com",
			timeslot: "12pm",
			day: "Friday",
			image: "http://www.austinpsychfest.com/apfenfold/wp-content/uploads/2011/03/spiderhouse.jpg"
		},
		{
			djName: "dj Nutmeg", 
			showName: "Satyr Presents: How Do We get your job?", 
			genre: "eclectic", 
			about: "I like my beers.  I like to think a lot.",
			link: "www.reganhsu.com",
			timeslot: "12pm",
			day: "Friday",
			image: ""
			//image: "http://vignette2.wikia.nocookie.net/simpsons/images/6/63/The_Simpsons_Simpsons_FamilyPicture.png/revision/latest?cb=20101023180303"
		},
		{
			djName: "dj Nutmeg", 
			showName: "The Ultimate Spice", 
			genre: "eclectic", 
			about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ILorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularit was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			link: "www.reganhsu.com",
			timeslot: "2pm",
			day: "Friday",
			image: "http://vignette2.wikia.nocookie.net/simpsons/images/6/63/The_Simpsons_Simpsons_FamilyPicture.png/revision/latest?cb=20101023180303"
		},
		{
			djName: "dj Nutmeg", 
			showName: "Satyr Presents: How Do We Get Your Job?", 
			genre: "eclectic", 
			about: "I like my beers.  I like to think a lot.",
			link: "www.reganhsu.com",
			timeslot: "3pm",
			day: "Friday",
			image: "http://vignette2.wikia.nocookie.net/simpsons/images/6/63/The_Simpsons_Simpsons_FamilyPicture.png/revision/latest?cb=20101023180303"
		}
		];
		callback(err, arrayBlurbs);
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
};

module.exports = db;
