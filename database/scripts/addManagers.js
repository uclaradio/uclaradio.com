var db = require('../db');

console.log("Updating managers...");
db.dropManagers();

var callback = function(err, managerSaved){ if (err) { console.log("error occurred inserting manager");}};

//db.addManager(name, position, meetingTime, meetingPlace, email, showName, showTime, photo, callback)
db.addManager("Zach Seidl", "General Manager", "Mon 6-8PM, Wed 5-7PM", "The Station", "gm@uclaradio.com", "102.HEAVEN", "Mon 2-3PM", "/img/Managers/zachseidl.jpg", callback);
db.addManager("Tyler Wennstrom", "Asst. General Manager", "Tues 3:30PM-5:00PM", "The Station", "agm@media.ucla.edu", "N/A", "N/A", "/img/Managers/tylerwennstrom.JPG", callback);
db.addManager("Carla Rowley", "Intern Manager", "Tues 8-9PM", "Bunche 2178", "rowleycarla@ucla.edu", "N/A", "N/A", "/img/Managers/carlarowley.JPG", callback);
db.addManager("Alex Torpey", "Intern Manager", "Tues 8-9PM", "Bunche 2178", "uclaradio.interns@gmail.com", "The Discourse", "Wed 1-2PM", "/img/Managers/alextorpey.jpg", callback);
db.addManager("Pamela Crick", "Promotions Manager", "Thurs 6-7PM", "The Station", "radio.promotions@media.ucla.edu", "Avocado Club", "Wed 8-9PM", "/img/Managers/pamelacrick.jpg", callback);
db.addManager("Taylor Whelchel", "Marketing Manager", "Tues 11AM on even weeks", "TBA", "radio.marketing@media.ucla.edu", "N/A", "N/A", "/img/Managers/taylorwhelchel.jpg", callback);
db.addManager("Eva Maria Pino", "Music Manager", "Thurs 6-7 PM", "The Station", "radio.music@media.ucla.edu", "Who's That?", "Tues 2-3PM", "/img/Managers/evapino.jpg", callback);
db.addManager("Angela Nguyen", "Music Manager", "Thurs 7-8 PM", "The Station", "radio.music@media.ucla.edu", "The Conventional Unknown", "Thurs 10-11PM", "/img/Managers/angelanguyen.png", callback);
db.addManager("Matteo Vesprini-Heidrich", "Web Manager", "Wed 1-2PM", "The Station", "uclaradio.web@gmail.com", "Sleep Sounds", "Wed 10-11PM", "/img/Managers/matteo.jpg", callback);
db.addManager("Regan Hsu", "Web Manager", "Wed 1-2PM", "The Station", "uclaradio.web@gmail.com", "N/A", "N/A", "/img/Managers/reganhsu.jpg", callback);
db.addManager("Eddie Hernandez", "Digital Press Manager", "Tues 6-7PM", "The Station", "radio.digitalpress@media.ucla.edu", "Sleep Sounds", "Wed 10-11PM", "/img/Managers/eddiehernandez.JPG", callback);
db.addManager("Eric Aberbook", "Digital Press Manager", "Tues 6-7PM", "The Station", "radio.digitalpress@media.ucla.edu", "N/A", "N/A", "/img/Managers/ericaberbook.jpg", callback);
db.addManager("Gabe Brenner", "Art + Design Manager", "Thurs 5:30-6:30PM", "The Station", "radio.artanddesign@media.ucla.edu", "N/A", "N/A", "/img/Managers/gabebrenner.png", callback);
db.addManager("Gee Leonardo", "Photo / Video Manager", "Thurs 6:15-8PM", "The Station", "photoandvideo@uclaradio.com", "N/A", "N/A", "/img/Managers/gleonardo.png", callback);
db.addManager("Scott Gee", "Events Manager", "Tues 5-6PM", "The Station", "radio.events@media.ucla.edu", "Few Things Considered", "Fri 8-9PM",  "/img/Managers/scottgee.jpg", callback);
db.addManager("Casey John Leonard", "News Manager", "Wed 5-6PM", "The Station", "cj.leonard@hotmail.com", "News Hour; In Conversation; Weekend Edition", "Mon & Thurs 5-6PM; Tues 1-2 PM; Sun 4-5 PM",  "/img/Managers/caseyleonard.jpg", callback);
db.addManager("Willow Stowe", "Programming Manager", "Tues 5:30-6:30PM (week 3, 4 & 6)", "The Station", "radio.programming@media.ucla.edu", "Coffee Talk", "Sun 6-7 PM", "/img/Managers/willowstowe.jpg", callback);
db.addManager("Gracie Phillips", "Programming Manager", "Tues 5:30-6:30PM (week 3, 4 & 6)", "The Station", "radio.programming@media.ucla.edu", "The Mighty Schwa", "Sun 11AM-12PM", "/img/Managers/graciephillips.jpg", callback);
db.addManager("Kim Seltzer", "Comedy Manager", "Thurs. 6PM on even weeks", "The Station", "uclaradio.comedy@media.ucla.edu", "Free Time", "Tues 6PM", "/img/Managers/kimseltzer.jpg", callback);
db.addManager("Aliya Kamalova", "Comedy Manager", "Thurs. 6PM on even weeks", "The Station", "uclaradio.comedy@media.ucla.edu", "Free Time", "Tues 6PM", "/img/Managers/aliyakamalova.jpg", callback);
db.addManager("Nicolo Scolieri", "Productions Manager", "Thurs 6:15-6:45PM", "The Station", "radio.productions@media.ucla.edu", "Where In The World Is Carmen Sandiego?", "Sat 11AM-12PM", "/img/Managers/nicoloscolieri.png", callback);
db.addManager("Darryn Albert", "Sports Manager", "Fri 4-5PM", "The Station", "dnalbert@ucla.edu", "Ball Don't Lie", "Fri 5-6PM", "/img/Managers/darrynalbert.JPG", callback);
db.addManager("Desiree Samler", "Fundraising Manager", "Wed 5-6PM", "The Station", "radio.fundraising@media.ucla.edu", "The Brunch Special", "Wed 2-3PM", "/img/Managers/desireesamler.png", callback);

console.log("Finished updating managers");