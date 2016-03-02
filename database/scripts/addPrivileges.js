var accounts = require('../db.js'); // included to connect to database
var accounts = require('../dbAccounts.js');

console.log("Adding privileges...");

var callback = function(err, privilegeSaved) { if (err) { console.log("error occurred saving privilege");}};

// links to make available to managers
var links = [];
var managerPanel = {title: "Manager Panel", link: "/panel/manager"};
links.push(managerPanel);

// addPrivilege = function(privilege, links, callback)
accounts.addPrivilege(accounts.managerPrivilegeName, links, callback);

// updatePrivilege = function(username, privilege, shouldHave, callback)
accounts.updatePrivilege("chris", accounts.managerPrivilegeName, true, callback);

console.log("Finished adding privileges");