// // connect to database
// require('./db');

// const mongoose = require('mongoose');

// const points = {};

// const StaffingPointsSchema = new mongoose.Schema(
//   {
//     fullName: String,
//     dateCompleted: Date,
//     description: String,
//     department: String,
//     number: Number,
//     notes: String,
//     managerNotes: String,
//     status: String,
//   },
//   { collection: 'StaffingPoints' }
// );

// const StaffingPointsModel = mongoose.model(
//   'StaffingPoints',
//   StaffingPointsSchema
// );

// points.addStaffingPoints = function(data, callback) {
//   staffingPointsData = {
//     fullName: data.fullName,
//     dateCompleted: data.dateCompleted,
//     description: data.pointsDescription,
//     department: data.department,
//     number: data.numberOfPoints,
//     notes: data.other,
//     managerNotes: '',
//     status: 'pending',
//   };

//   const staffingPoints = new StaffingPointsModel(staffingPointsData);

//   staffingPoints.save((err, staffingPointsSaved) => {
//     if (err) console.log(err);
//     callback(err, staffingPointsSaved);
//   });
// };

// points.updateStaffingPointStatus = function(
//   id,
//   newStatus,
//   managerNotes,
//   callback
// ) {
//   StaffingPointsModel.update(
//     { _id: id },
//     { $set: { status: newStatus, managerNotes } },
//     { multi: false },
//     (err, update) => {
//       if (err) console.log(err);
//       callback(err, update);
//     }
//   );
// };

// points.getStaffingPoints = function(callback) {
//   StaffingPointsModel.find(
//     {},
//     null,
//     { sort: { _id: 'desc' } },
//     (err, points) => {
//       if (err) console.log(err);
//       callback(err, points);
//     }
//   );
// };

// module.exports = points;
