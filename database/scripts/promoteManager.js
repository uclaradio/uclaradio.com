var db = require('../db.js');
var accounts = require('../dbAccounts.js');

var user = process.argv[2];
if (user == null) {
  console.log('no user provided');
  process.exit(1);
}
else {
  accounts.updatePrivilege(user, accounts.managerPrivilegeName, true, function(err, saved) {
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
