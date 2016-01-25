var db = require('../db');

console.log("Updating managers...");

db.dropManagers();

var callback = function(err, managerSaved){ if (err) { console.log("error occurred inserting manager");}}

//db.addManager(name, position, meetingTime, meetingPlace, email, showName, showTime, photo, callback)
db.addManager("Gracie Phillips", "Programming Manager", "TBA", "TBA", "radio.programming@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xfa1/t31.0-8/q81/p960x960/11212674_822438087837255_7878424938127600285_o.jpg", callback);
db.addManager("Zach Seidl", "General Manager", "TBA", "The Station", "gm@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/12088257_10200801882246758_7822281650510597887_n.jpg?oh=0a1b7bde02760f06ee2d2499bcd714d3&oe=57078F69", callback);
db.addManager("Tyler Wennstrom", "Asst. General Manager", "TBA", "TBA", "agm@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/10906045_945441715465927_2905963898448583881_n.jpg?oh=0bcdff2b5f76a9666158a5cffe978498&oe=57003B55", callback);
db.addManager("Carla Lupita Rowley", "Intern Manager", "TBA", "TBA", "uclaradio.interns@gmail.com", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/1979589_10206536392142428_5278191476036604085_n.jpg?oh=24805cb68d6a90c66fa99cd7ab9d51a8&oe=5720F96C", callback);
db.addManager("Alex Torpey", "Intern Manager", "TBA", "TBA", "uclaradio.interns@gmail.com", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/995615_10206836947546301_5899592961899905930_n.jpg?oh=6813ef4ad34443aadadcb899ec7410e2&oe=57135034", callback);

db.addManager("Pamela Crick", "Promos / Fundraising Manager", "TBA", "TBA", "radio.promotions@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xlf1/v/t1.0-9/10941912_10152660207998807_4000503844979689146_n.jpg?oh=4fc7c3a5aef91c8d87cc1c2b318c29e3&oe=571CEA23", callback);
db.addManager("Taylor Whelchel", "Marketing Manager", "TBA", "TBA", "radio.marketing@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xta1/v/t1.0-9/10559684_10208575397451681_6289109775822404845_n.jpg?oh=aac14e80dc2269dbd4e14dda635ce1f8&oe=571F4EF4", callback);
db.addManager("Eva Maria Pino", "Music Manager", "TBA", "TBA", "radio.music@media.ucla.edu", "show", "show time", "/img/eva.jpg", callback);
db.addManager("Eddie Hernandez", "Digital Press Manager", "TBA", "TBA", "radio.digitalpress@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xtf1/v/t1.0-9/11885248_915416035198237_8358619889574921472_n.jpg?oh=b049d4a8ca6efeb27ca04d9849c957cc&oe=57104C40", callback);

db.addManager("Matteo Vesprini-Heindrich", "Web Manager", "Wed 1-2PM", "The Station", "uclaradio.web@gmail.com", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/12003139_937416649658238_5496339720395314020_n.jpg?oh=39c287e0a44921b179ee7d5128361c7c&oe=571280AC", callback);
db.addManager("Gabe Brenner", "Art + Design Manager", "TBA", "TBA", "radio.artanddesign@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/11951825_10207541418163929_8298615012169738158_n.jpg?oh=7a26b318d1c5290835fde48280b1c2eb&oe=5702394E", callback);
db.addManager("Regan Hsu", "Web Manager", "Wed 1-2PM", "The Station", "uclaradio.web@gmail.com", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/12342662_10206930044742301_5206199238876877476_n.jpg?oh=f82dfc49a773e749f4cf2f335bf5c9d9&oe=571175FE", callback);
db.addManager("Gee Leonardo", "Photo / Video Manager", "TBA", "TBA", "photoandvideo@uclaradio.com", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/12227640_575714052584513_4778557768518796032_n.jpg?oh=5159b28ac75e96eb097b84a1a52a750d&oe=570FC0C1", callback);
db.addManager("Kim Seltzer", "Comedy Manager", "By Appointment", "", "uclaradio.comedy@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/11110575_1010112505668257_3301186109900778812_n.jpg?oh=92187372d4b4141475f03fd40b188da0&oe=57166B09", callback);

db.addManager("Aliya Kamalova", "Comedy Asst. Manager", "By Appointment", "", "uclaradio.comedy@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/12088257_10200801882246758_7822281650510597887_n.jpg?oh=0a1b7bde02760f06ee2d2499bcd714d3&oe=57078F69", callback);
db.addManager("Eric Aberbook", "Digital Press Manager", "TBA", "TBA", "radio.digitalpress@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/10981610_10204820998737513_6085244458543564994_n.jpg?oh=1b21b0184305d7ad377ed0072cabfdb3&oe=571739B2", callback);
db.addManager("Britt Hewitt", "News Manager", "TBA", "TBA", "uclaradio.news@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/11896186_10205833160886515_2262455960785604428_n.jpg?oh=e1eb03ae56dfb43a7921903fe208d69d&oe=570C8FAB", callback);
db.addManager("Scott Gee", "Events Manager", "TBA", "TBA", "radio.events@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/12193772_10207720391912625_1538564929513905088_n.jpg?oh=d397f566970474400de26270d036de4c&oe=571763FB", callback);
db.addManager("Nicolo Scolieri", "Productions Manager", "TBA", "TBA", "radio.productions@media.ucla.edu", "show", "show time", "https://scontent.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/10320469_10203202444076898_7181799369937496709_n.jpg?oh=ace176e27d16868ef3f095e48068101d&oe=5721B9C0", callback);

console.log("Finished updating managers");
