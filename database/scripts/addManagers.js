var db = require('../db');

console.log("Updating managers...");

db.dropManagers();

var callback = function(err, managerSaved){ if (err) { console.log("error occurred inserting manager");}}

//db.addManager(managerName, managerTitle, meetingTime, meetingLocation, email, picture, callback)
db.addManager("Gracie Phillips", "Programming Manager", "TBA", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Zach Seidl", "General Manager", "Tues 5:30-7PM and Thurs 3:30-5PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Tyler Wennstrom", "Productions Manager", "Wed 7-8PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Carla Lupita Rowley", "Intern Manager", "Thurs 6-7PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Alex Torpey", "Intern Manager", "Thurs 8-9PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);

db.addManager("Pamela Crick", "Promotions & Fundraising Manager", "Mon 8PM (as needed)", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Taylor Whelchel", "Marketing Manager", "Mon & Wed 12-12:45PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Eva Maria Pino", "Music Manager", "Wed 6PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Catherine Yi", "Music Manager", "Wed 6PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Eddie Hernandez", "Digital Press Manager", "Wed 3-4PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);

db.addManager("Matteo Vesprini-Heindrich", "Web Manager", "Thurs 6-7PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Gabe Brenner", "Art & Design Manager", "Thurs 6:30PM (as needed)", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Regan Hsu", "Web Manager", "Thurs 6-7PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Gee Leonardo", "Photo/Video Manager", "Fri 1-2:30PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Kim Seltzer", "Comedy Manager", "By Appointment", "", "manager@uclaradio.com", "show", "show time", "radio.png", callback);

db.addManager("Aliya Kamalova", "Comedy Manager", "By Appointment", "", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Eric Aberbook", "Digital Press Manager", "Wed 3-4PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Britt Hewitt", "News Manager", "Thurs 4-5PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);
db.addManager("Scott Gee", "Events Manager", "Tues 6-7PM", "The Station", "manager@uclaradio.com", "show", "show time", "radio.png", callback);

console.log("Finished updating managers");
