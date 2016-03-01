var db = require('../db');

console.log("Adding privileges...");
db.dropManagers();

var callback = function(err, privilegeSaved) { if (err) { console.log("error occurred saving privilege");}};

// updatePrivilege = function(username, privilege, shouldHave, callback)
db.updatePrivilege("chris", accounts.managerPrivilegeName, true, callback);

console.log("Finished adding privileges");