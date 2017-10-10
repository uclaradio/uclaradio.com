// setupPanel.js
// Set up user panel with first account:
//
// - username: gm
// - password: [whatever is in passwords.json under 'gmpass']
//
// usage: node .../setupPanel.js

const accounts = require('../accounts');
const passwords = require('../../../passwords.json');

console.log('Setting up Secret DJ Panel...');

// links to make available to managers
const links = [];
const managerPanel = { title: 'Manager Panel', link: '/panel/manager' };
links.push(managerPanel);

/** *** Create Manager Privilege **** */

accounts.addPrivilege(accounts.managerPrivilegeName, links, (err, success) => {
  /** *** Create General Manager Account **** */

  // requestNewAccount = function(username, pass, email, fullName, callback)
  accounts.requestNewAccount(
    'gm',
    passwords.gmpass,
    'radio.web@media.ucla.edu',
    'General Manager',
    (err, saved) => {
      if (err) {
        console.log('error creating gm account:', err);
        process.exit();
      } else if (saved) {
        accounts.verifyAccount('gm', (err, o) => {
          if (err) {
            console.log('error validating gm user', err);
          }

          /** *** Add new manager account to privilege **** */

          // updatePrivilege = function(username, privilege, shouldHave, callback)
          accounts.updatePrivilege(
            'gm',
            accounts.managerPrivilegeName,
            true,
            (err, success) => {
              console.log('Finished setting up Secret DJ Panel');
              process.exit();
            }
          );
        });
      }
    }
  );
});
