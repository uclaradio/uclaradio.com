/**
Manually sends out confirmation emails for users.

I made this cause our server wasn't sending out emails...
So an alternative is pulling out data from the server into a json file
and sending out emails with this on my macbook.
* */

const mail = require('../mail.js');

// expects input here
const input = require('./users_to_confirm.json');

/**
Expecting user strings like: "
  Something Smith @@ smith@ucla.edu [: Sun Jan 08 2017 21:11:19 GMT-0800 (PST)]
  Something Lee @@ lee@yahoo.com [: Sun Jan 08 2017 21:11:24 GMT-0800 (PST)]
"

Will indicate if messages are sent:
emailed chris@ucla.edu chris
Message sent: 250 2.0.0 OK 1483946970 w125sm176207212pfb.8 - gsmtp
* */
const confirmUsers = function(users) {
  for (let userIndex = 0; userIndex < users.length; userIndex++) {
    const user = users[userIndex];
    const email = user.email;
    const name = user.fullName;
    const username = user.username;
    if (email && name && username) {
      mail.confirmAccount(email, username);
      console.log('emailing', email.trim(), username.trim());
    }
  }
};

const extractUsersFromString = function(raw) {
  const users = [];
  const pattern = /([^\/]*)\/([^:\/]*)\/([^:\/]*)(:[^:@]*)?/gm;
  for (let userIndex = 0; userIndex < raw.length; userIndex++) {
    var u = raw[userIndex];
    let match = pattern.exec(u);
    while (match != null) {
      var u = {
        fullName: match[1],
        username: match[2],
        email: match[3],
      };
      users.push(u);
      match = pattern.exec(u);
    }
  }
  return users;
};

const users = extractUsersFromString(input);
confirmUsers(users);
