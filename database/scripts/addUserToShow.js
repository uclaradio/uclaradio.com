// addUserToShow.js
// Adds a user to a show
//
// usage: node .../addUserToShow.js [showID] [username]

var shows = require('../shows.js');

var showID = process.argv[2];
var username = process.argv[3];

if (showID == null) {
  console.log('no show id provided');
  process.exit(1);
} else if (username == null) {
  console.log('no user provided');
  process.exit(1);
}
else {
  shows.addUser(showID, username, function(err, saved) {
    if (saved) {
      console.log("successfully added", username, "to show:", saved.title);
      process.exit();
    }
    else {
      console.log("error:", err);
      process.exit();
    }
  });
}
