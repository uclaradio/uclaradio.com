/**
Manually sends out confirmation emails for users.

I made this cause our server wasn't sending out emails...
So an alternative is pulling out data from the server into a json file
and sending out emails with this on my macbook.
**/


var mail = require('../mail.js');

// expects input here
var input = require('./users_to_confirm.json');

/**
Expecting user strings like: "
	Something Smith @@ smith@ucla.edu [: Sun Jan 08 2017 21:11:19 GMT-0800 (PST)]
	Something Lee @@ lee@yahoo.com [: Sun Jan 08 2017 21:11:24 GMT-0800 (PST)]
"

Will indicate if messages are sent:
emailed chris@ucla.edu chris
Message sent: 250 2.0.0 OK 1483946970 w125sm176207212pfb.8 - gsmtp
**/
var confirmUsers = function(users) {
	for (var userIndex = 0; userIndex < users.length; userIndex++) {
		var user = users[userIndex];
		var email = user.email;
		var name = user.fullName;
		var username = user.username;
		if (email && name && username) {
			mail.confirmAccount(email, username);
			console.log("emailed", email.trim(), username.trim());
		}
	}
};

var extractUsersFromString = function(raw) {
	var users = [];
	var pattern = /([^\/]*)\/([^:\/]*)\/([^:\/]*)(:[^:@]*)?/mg;
	for (var userIndex = 0; userIndex < raw.length; userIndex++) {
		var u = raw[userIndex];
		var match = pattern.exec(u);
		while (match != null) {
			var u = {
				fullName: match[1],
				username: match[2],
				email: match[3]
			};
			users.push(u);
			match = pattern.exec(u);
		}
	}
	return users;
};

var users = extractUsersFromString(input);
confirmUsers(users);
