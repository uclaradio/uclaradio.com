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

var ProposedShowSchema = new Schema({
	fullNames: Array,
	djNames: Array,
	departments: Array,
	emails: Array,
	phoneNumbers: Array,
	numQuarters: Number,
	acceptableToHaveIntern: Boolean,
	numInterns: Number,
	showTitle1: String,
	genre1: String,
	length1: Number,
	showDescription1: String,
	sampleSet1: String,
	talkingPoints1: String,
	showTitle2: String,
	genre2: String,
	length2: Number,
	showDescription2: String,
	sampleSet2: String,
	talkingPoints2: String,
	timeslot1: String,
	day1: String,
	timeslot2: String,
	day2: String,
	timeslot3: String,
	day3: String,
	timeslot4: String,
	day4: String,
	timeslot5: String,
	day5: String,
	timeslot6: String,
	day6: String,
	timeslot7: String,
	day7: String,
	timeslot8: String,
	day8: String,
	timeslot9: String,
	day9: String,
	timeslot10: String,
	day10: String,
	preferredShow: String,
	whyValuable: String,
	howToImprove: String,
	threeThingsImproved: String,
	whatHasImproved: String,
	moreListeners: String,
	otherComments: String,
	interestedInReceiving: String,
}, {collection: 'ProposedShows'});

var DjBlurbModel = mongoose.model('DjBlurb', DjBlurbSchema);

var ProposedShowModel = mongoose.model('ProposedShow', ProposedShowSchema);

//expects a string like '10pm', '8am', '6pm'
//i.e. hour and then am or pm. not 24-hour format
//expects day string like 'Wed', 'Thu'
//i.e. first three letters of the day, first letter capitalized
db.getBlurbByTimeslotAndDay = function(time, day, callback) {
	DjBlurbModel.findOne({timeslot: time, day: day}, function(err, blurb) {
		callback(err, blurb);
	});
};

//get a blurb by the title of the show
db.getBlurbByShowTitle = function(title, callback) {
	DjBlurbModel.findOne({showName: title}, function(err, blurb){
		callback(err, blurb);
	});
};

//delete a blurb by the title of show
db.deleteBlurbByShowTitle = function(title, callback){
	console.log("DB show title is:" + title);
	DjBlurbModel.findOneAndRemove({showName: title}, function(err){
		callback(err);
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

db.addProposedShow = function(data, callback) {
	proposedShowData = {
		fullNames: data.fullName.split(','),
		djNames: data.djName.split(','),
		departments: data.department.split(','),
		emails: data.email.split(','),
		phoneNumbers: data.phoneNumber.split(','),
		numQuarters: parseInt(data.numQuarters),
		acceptableToHaveIntern: !!data.acceptableToHaveIntern,
		numInterns: data.numInterns,
		showTitle1: data.showTitle,
		genre1: data.genre,
		length1: parseInt(data.length),
		showDescription1: data.showDescription,
		sampleSet1: data.sampleSet,
		talkingPoints1: data.talkingPoints,
		showTitle2: data.showTitle2,
		genre2: data.genre2,
		length2: data.length2,
		showDescription2: data.showDescription2,
		sampleSet2: data.sampleSet2,
		talkingPoints2: data.talkingPoints2,
		timeslot1: data.timeslot1,
		day1: data.day1,
		timeslot2: data.timeslot2,
		day2: data.day2,
		timeslot3: data.timeslot3,
		day3: data.day3,
		timeslot4: data.timeslot4,
		day4: data.day4,
		timeslot5: data.timeslot5,
		day5: data.day5,
		timeslot6: data.timeslot6,
		day6: data.day6,
		timeslot7: data.timeslot7,
		day7: data.day7,
		timeslot8: data.timeslot8,
		day8: data.day8,
		timeslot9: data.timeslot9,
		day9: data.day9,
		timeslot10: data.timeslot10,
		day10: data.day10,
		preferredShow: data.preferredShow,
		whyValuable: data.whyValuable,
		howToImprove: data.howToImprove,
		threeThingsImproved: data.threeThingsImproved,
		whatHasImproved: data.whatHasImproved,
		moreListeners: data.moreListeners,
		otherComments: data.otherComments,
		interestedInReceiving: data.interestedInReceiving
	};

	var proposedShow = new ProposedShowModel(proposedShowData);

	proposedShow.save(function(err, proposedShowSaved) {
		callback(err, proposedShowSaved);
	});
};

db.getProposedShows = function(callback) {
	ProposedShowModel.find({}, function(err, shows) {
		callback(err, shows);
	});
}

module.exports = db;
