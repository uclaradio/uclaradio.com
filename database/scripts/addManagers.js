var db = require('../db');

db.dropManagers();

var callback = function(err, managerSaved){ if (err) { console.log("error occurred inserting manager");}}

db.addManager("Gracie Phillips", "Programming", "TBA", "The Station", "picture", "thumbnail", callback);
db.addManager("Zach Seidl", "General Manager", "Tues 5:30-7PM and Thurs 3:30-5PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Tyler Wennstrom", "Productions", "Wed 7-8PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Carla Lupita Rowley", "Intern", "Thurs 6-7PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Alex Torpey", "Intern", "Thurs 8-9PM", "The Station", "picture", "thumbnail", callback);

db.addManager("Pamela Crick", "Promotions & Fundraising", "Mon 8PM (as needed)", "The Station", "picture", "thumbnail", callback);
db.addManager("Taylor Whelchel", "Marketing", "Mon & Wed 12-12:45PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Eva Maria Pino", "Music", "Wed 6PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Catherine Yi", "Music", "Wed 6PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Eddie Hernandez", "Digital Press", "Wed 3-4PM", "The Station", "picture", "thumbnail", callback);

db.addManager("Matteo Vesprini-Heindrich", "Web", "Thurs 6-7PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Gabe Brenner", "Art & Design", "Thurs 6:30PM (as needed)", "The Station", "picture", "thumbnail", callback);
db.addManager("Regan Hsu", "Web", "Thurs 6-7PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Gee Leonardo", "Photo/Video", "Fri 1-2:30PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Kim Seltzer", "Comedy", "By Appointment", "", "picture", "thumbnail", callback);

db.addManager("Aliya Kamalova", "Comedy", "By Appointment", "", "picture", "thumbnail", callback);
db.addManager("Eric Aberbook", "Digital Press", "Wed 3-4PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Britt Hewitt", "News", "Thurs 4-5PM", "The Station", "picture", "thumbnail", callback);
db.addManager("Scott Gee", "Events", "Tues 6-7PM", "The Station", "picture", "thumbnail", callback);
