// setupPanel.js
// Set up user panel with first account: 
//
// - username: gm
// - password: [whatever is in passwords.json under 'gmpass']
//
// usage: node .../setupPanel.js

var accounts = require('../accounts');
var passwords = require('../../passwords.json');

console.log("Setting up Secret DJ Panel...");

// links to make available to managers
var links = [];
var managerPanel = {title: "Manager Panel", link: "/panel/manager"};
links.push(managerPanel);

/***** Create Manager Privilege *****/

accounts.addPrivilege(accounts.managerPrivilegeName, links, function(err, success) {

  /***** Create General Manager Account *****/

  // requestNewAccount = function(username, pass, email, fullName, callback)
  accounts.requestNewAccount("gm", passwords.gmpass, "radio.web@media.ucla.edu", "General Manager", function(err, saved) {
    if (err) {
      console.log("error creating gm account:", err);
      process.exit();
    } else if (saved) {
      accounts.verifyAccount("gm", function(err, o) {
        if (err) { console.log("error validating gm user", err); }

        /***** Add new manager account to privilege *****/

        // updatePrivilege = function(username, privilege, shouldHave, callback)
        accounts.updatePrivilege("gm", accounts.managerPrivilegeName, true, function(err, success) {
          console.log("Finished setting up Secret DJ Panel");
          process.exit();
        });
      });
    }
  });
});
