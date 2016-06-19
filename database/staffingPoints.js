// connect to database
require('./db');

var mongoose = require('mongoose');

var staffingPoints = {};

var StaffingPointsSchema = new mongoose.Schema({
  fullName: String,
  dateCompleted: Date,
  description: String,
  department: String,
  number: Number,
  notes: String,
  managerNotes: String,
  status: String
}, {collection: 'StaffingPoints'});

var StaffingPointsModel = mongoose.model('StaffingPoints', StaffingPointsSchema);

staffingPoints.addStaffingPoints = function(data, callback) {
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

staffingPoints.updateStaffingPointStatus = function(id, newStatus, managerNotes, callback) {
  StaffingPointsModel.update({_id: id}, {$set: {'status': newStatus, 'managerNotes': managerNotes}}, { multi: false }, function(err, update) {
    if (err) console.log(err);
    callback(err, update);
  });
};

staffingPoints.getStaffingPoints = function(callback) {
  StaffingPointsModel.find({}, function(err, points) {
    if (err) console.log(err);
    callback(err, points);
  });
};

// function getIndexOffOfDayAndTime(day, time) {
//  var xCord,
//    yCord;

//  console.log('"' + day + '"','"' + time + '"');

//  switch (day) {
//    case 'Sun':
//      xCord = 1;
//      break;
//    case 'Mon':
//      xCord = 2;
//      break;
//    case 'Tue':
//      xCord = 3;
//      break;
//    case 'Wed':
//      xCord = 4;
//      break;
//    case 'Thu':
//      xCord = 5;
//      break;
//    case 'Fri':
//      xCord = 6;
//      break;
//    case 'Sat':
//      xCord = 7;
//      break;
//  }

//  switch (time) {
//    case '10am':
//      yCord = 1;
//      break;
//    case '11am':
//      yCord = 2;
//      break;
//    case '12pm':
//      yCord = 3;
//      break;
//    case '1pm':
//      yCord = 4;
//      break;
//    case '2pm':
//      yCord = 5;
//      break;
//    case '3pm':
//      yCord = 6;
//      break;
//    case '4pm':
//      yCord = 7;
//      break;
//    case '5pm':
//      yCord = 8;
//      break;
//    case '6pm':
//      yCord = 9;
//      break;
//    case '7pm':
//      yCord = 10;
//      break;
//    case '8pm':
//      yCord = 11;
//      break;
//    case '9pm':
//      yCord = 12;
//      break;
//    case '10pm':
//      yCord = 13;
//      break;
//    case '11pm':
//      yCord = 14;
//      break;
//    case '12am':
//      yCord = 15;
//      break;
//  }

//  return {
//    x: xCord,
//    y: yCord
//  };
// }

module.exports = staffingPoints;