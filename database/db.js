var mongoose = require('mongoose');
var fs = require('fs');
var helper_funcs = require('../routes/helper_funcs');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
 
mongoose.connect('mongodb://localhost/local', options);

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
	picture: String, 
	thumbnail: String,
	showOfTheMonth: Boolean
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
   
var ManagerSchema = new Schema({
	name: String,
	position: String,
	meetingTime: String,
	meetingPlace: String,
	email: String,
	showName: String,
	showTime: String,
	photo: String
}, {collection: 'DepartmentMeetings'});

var StaffingPointsSchema = new Schema({
	fullName: String,
	dateCompleted: Date,
	description: String,
	department: String,
	number: Number,
	notes: String,
	managerNotes: String,
	status: String
}, {collection: 'StaffingPoints'});

var DjBlurbModel = mongoose.model('DjBlurb', DjBlurbSchema);

var ProposedShowModel = mongoose.model('ProposedShow', ProposedShowSchema);

var StaffingPointsModel = mongoose.model('StaffingPoints', StaffingPointsSchema);

var ManagerModel = mongoose.model('Manager', ManagerSchema);

//expects a string like '10pm', '8am', '6pm'
//i.e. hour and then am or pm. not 24-hour format
//expects day string like 'Wed', 'Thu'
//i.e. first three letters of the day, first letter capitalized
db.getBlurbByTimeslotAndDay = function(time, day, callback) {
	DjBlurbModel.findOne({timeslot: time, day: day}, function(err, blurb) {
		callback(err, blurb);
	});
};

//make a show a show of the month
db.makeShowOfMonth = function(title, callback) {
	DjBlurbModel.update({showOfTheMonth: title}, {showOfTheMonth: false}, function(err){
		DjBlurbModel.update({showName: title}, {showOfTheMonth: true}, function(err, blurb){
			callback(err);
		})
	});
};

//get a blurb by the title of the show
db.getBlurbByShowTitle = function(title, callback) {
	DjBlurbModel.find({'showName': title}, function(err, blurb){
		var earlier = helper_funcs.getUniqueBlurbs(blurb);
		earlier = earlier[0];
		callback(err, earlier);
	});
};

//delete a blurb by the title of show
db.deleteBlurbByShowTitle = function(title, callback){
	DjBlurbModel.findOneAndRemove({showName: title}, function(err){
		callback(err);
	});
};

db.getAllBlurbs = function(callback) {
	DjBlurbModel.find({}, function(err, blurbs) {
		callback(err, blurbs);
	});
};

db.addBlurb = function(djName, showName, genre, description, link, timeslot, day, picture, thumbnail, callback) {
	blurb_data = {
		"djName": djName,
		"showName": showName,
		"genre": genre,
		"description": description,
		"link": link,
		"timeslot": timeslot,
		"day": day,
		"picture": picture,
		"thumbnail": thumbnail
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

db.addStaffingPoints = function(data, callback) {
	staffingPointsData = {
		fullName: data.fullName,
		dateCompleted: data.dateCompleted,
		description: data.pointsDescription,
		department: data.department,
		number: data.numberOfPoints,
		notes: data.other,
		managerNotes: "",
		status: "pending"
	};

	var staffingPoints = new StaffingPointsModel(staffingPointsData);

	staffingPoints.save(function(err, staffingPointsSaved) {
		if (err) console.log(err);
		callback(err, staffingPointsSaved);
	});
};

db.updateStaffingPointStatus = function(id, newStatus, managerNotes, callback) {
	StaffingPointsModel.update({_id: id}, {$set: {'status': newStatus, 'managerNotes': managerNotes}}, { multi: false }, function(err, update) {
		if (err) console.log(err);
		callback(err, update);
	});
};

db.getStaffingPoints = function(callback) {
	StaffingPointsModel.find({}, function(err, points) {
		if (err) console.log(err);
		callback(err, points);
	});
};

db.getProposedShows = function(callback) {
	ProposedShowModel.find({}, function(err, shows) {
		callback(err, shows);
	});
};
	// name: String,
	// position: String,
	// meetingTime: String,
	// meetingPlace: String,
	// email: String,
	// showName: String,
	// showTime: String,
	// photo: String

// insert a new department manager
db.addManager = function(name, position, meetingTime, meetingPlace, email, showName, showTime, photo, callback) {
	manager_data = {
		"name": name,
		"position": position,
		"meetingTime": meetingTime,
		"meetingPlace": meetingPlace,
		"email": email,
		"showName": showName,
		"showTime": showTime,
		"photo": photo
	};

	var manager = new ManagerModel(manager_data);

	manager.save(function(err, managerSaved) {
		callback(err, managerSaved);
	});

};

db.dropManagers = function() {
	ManagerModel.remove({}, function(err) { 
	   // console.log('Removed all managers');
	});
}

db.getAllManagers = function(callback) {
	ManagerModel.find({}, function(err, managers) {
		callback(err, managers);
	});
};

function getIndexOffOfDayAndTime(day, time) {
	var xCord,
		yCord;

	console.log('"' + day + '"','"' + time + '"');

	switch (day) {
		case 'Sun':
			xCord = 1;
			break;
		case 'Mon':
			xCord = 2;
			break;
		case 'Tue':
			xCord = 3;
			break;
		case 'Wed':
			xCord = 4;
			break;
		case 'Thu':
			xCord = 5;
			break;
		case 'Fri':
			xCord = 6;
			break;
		case 'Sat':
			xCord = 7;
			break;
	}

	switch (time) {
		case '10am':
			yCord = 1;
			break;
		case '11am':
			yCord = 2;
			break;
		case '12pm':
			yCord = 3;
			break;
		case '1pm':
			yCord = 4;
			break;
		case '2pm':
			yCord = 5;
			break;
		case '3pm':
			yCord = 6;
			break;
		case '4pm':
			yCord = 7;
			break;
		case '5pm':
			yCord = 8;
			break;
		case '6pm':
			yCord = 9;
			break;
		case '7pm':
			yCord = 10;
			break;
		case '8pm':
			yCord = 11;
			break;
		case '9pm':
			yCord = 12;
			break;
		case '10pm':
			yCord = 13;
			break;
		case '11pm':
			yCord = 14;
			break;
		case '12am':
			yCord = 15;
			break;
	}

	return {
		x: xCord,
		y: yCord
	};
}

db.insertTimeslotsToSchedule = function(callback) {
	var namesHandledSoFar = [];
	ProposedShowModel.find({}, function(err, shows) {

		//initialize an array variable to hold interim schedule
		var schedule = new Array(8);
		for (var i = 0; i < 8; i++) {
			//create y axis with 15 time slots
			schedule[i] = new Array(16);
			for (var j = 0; j < 16; j++) {
				//create a list that we can put each priority slot in
				schedule[i][j] = new Array();
			}
		}
		
		//put in table headers
		schedule[0][0].push("");
		schedule[1][0].push("Sunday");
		schedule[2][0].push("Monday");
		schedule[3][0].push("Tuesday");
		schedule[4][0].push("Wednesday");
		schedule[5][0].push("Thursday");
		schedule[6][0].push("Friday");
		schedule[7][0].push("Saturday");

		schedule[0][1].push("10am");
		schedule[0][2].push("11am");
		schedule[0][3].push("12pm");
		schedule[0][4].push("1pm");
		schedule[0][5].push("2pm");
		schedule[0][6].push("3pm");
		schedule[0][7].push("4pm");
		schedule[0][8].push("5pm");
		schedule[0][9].push("6pm");
		schedule[0][10].push("7pm");
		schedule[0][11].push("8pm");
		schedule[0][12].push("9pm");
		schedule[0][13].push("10pm");
		schedule[0][14].push("11pm");
		schedule[0][15].push("12am");

		var addTimeToSchedule = function(coord, lastName, priority) {
			if (coord.x === undefined || coord.y === undefined)
				return;
			schedule[coord.x][coord.y].push(lastName + priority);
		}

		//iterate through all shows
		//getIndexOffOfDayAndTime(day, time)
		var coord;
		var lastName;
		for (i = 0; i < shows.length; i++) {
			lastName = shows[i].fullNames[0].split(' ')[1];
			if (namesHandledSoFar.indexOf(lastName) > -1)
				continue;
			namesHandledSoFar.push(lastName);
			coord = getIndexOffOfDayAndTime(shows[i].day1, shows[i].timeslot1);
			addTimeToSchedule(coord, lastName, '1');
			coord = getIndexOffOfDayAndTime(shows[i].day2, shows[i].timeslot2);
			addTimeToSchedule(coord, lastName, '2');
			coord = getIndexOffOfDayAndTime(shows[i].day3, shows[i].timeslot3);
			addTimeToSchedule(coord, lastName, '3');
			coord = getIndexOffOfDayAndTime(shows[i].day4, shows[i].timeslot4);
			addTimeToSchedule(coord, lastName, '4');
			coord = getIndexOffOfDayAndTime(shows[i].day5, shows[i].timeslot5);
			addTimeToSchedule(coord, lastName, '5');
			coord = getIndexOffOfDayAndTime(shows[i].day6, shows[i].timeslot6);
			addTimeToSchedule(coord, lastName, '6');
			coord = getIndexOffOfDayAndTime(shows[i].day7, shows[i].timeslot7);
			addTimeToSchedule(coord, lastName, '7');
			coord = getIndexOffOfDayAndTime(shows[i].day8, shows[i].timeslot8);
			addTimeToSchedule(coord, lastName, '8');
			coord = getIndexOffOfDayAndTime(shows[i].day9, shows[i].timeslot9);
			addTimeToSchedule(coord, lastName, '9');
			coord = getIndexOffOfDayAndTime(shows[i].day10, shows[i].timeslot10);
			addTimeToSchedule(coord, lastName, '10');
		}

		var stringSchedule = '';
		for (var y = 0; y < schedule[0].length; y++) {
			for (var x = 0; x < schedule.length; x++) {
				if (x !== 0)
					stringSchedule += ', ';
				stringSchedule += '"';
				for (var i = 0; i < schedule[x][y].length; i++) {
					if (i !== 0)
						stringSchedule += ', ';
					stringSchedule += schedule[x][y][i];
				}
				stringSchedule += '"';
			}
			stringSchedule += '\n';
		}

		fs.writeFile('test.csv', stringSchedule, function (err) {
			if (err) console.log(err);
			console.log('saved file');
		});
	});

};

module.exports = db;
