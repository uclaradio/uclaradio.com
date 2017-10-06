// addUserToShow.js
// Adds a user to a show
//
// usage: node .../addUserToShow.js [showID] [username]

const shows = require('../shows.js');

const showID = process.argv[2];
const username = process.argv[3];

if (showID == null) {
  console.log('no show id provided');
  process.exit(1);
} else if (username == null) {
  console.log('no user provided');
  process.exit(1);
} else {
  shows.addUser(showID, username, (err, saved) => {
    if (saved) {
      console.log('successfully added', username, 'to show:', saved.title);
      process.exit();
    } else {
      console.log('error:', err);
      process.exit();
    }
  });
}
