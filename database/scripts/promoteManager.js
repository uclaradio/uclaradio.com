// promoteManager.js
// Promotes a user to a manager position
//
// usage: node .../promoteManager.js [username]

var accounts = require('../accounts.js');

var user = process.argv[2];
if (user == null) {
  console.log('no user provided');
  process.exit(1);
}
else {
  accounts.promoteToManager(user, function(err, saved) {
    if (saved) {
      console.log("successfully promoted", user, "to manager");
      process.exit();
    }
    else {
      console.log("error:", err);
      process.exit();
    }
  });
}
