const nodemailer = require('nodemailer');
const passwords = require('../../passwords.json');

const mail = {};

// create reusable transporter object using the default SMTP transport
const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: passwords.emailuser,
    pass: passwords.emailpass,
  },
};
const transporter = nodemailer.createTransport(smtpConfig);

/**
Send a user an email confirming their DJ account.
*/
mail.confirmAccount = function(email, username) {
  const body = `Congratulations, ${username}, you've been verified as a DJ and can now log in at uclaradio.com/panel\n\nTime to set the airwaves on fire 🔥\n\n-Dev Department`;
  mail.send(email, 'DJ Account Verified', body);
};

/**
Send a user an email letting them know they have been promoted to manager.
*/
mail.confirmManager = function(email) {
  const body =
    "Well look at you stud, you've been promoted to manager.\n\nNow you can access the Manager panel at uclaradio.com/panel/manager";
  mail.send(email, 'Manager Account Confirmed', body);
};

//Send User an email with reset password link
mail.resetPassword = function(email, token) {
  const body =
    "Looks like you forgot your password! Here's a chance to reset it.  " +
    'If this was not you, please contact a Dev Manager A$AP.\n\n' +
    'Copy the activation key below and click on the link to reset your password.\n' +
    'Unique Identifier: ' +
    token +
    '\n' +
    'Reset Link: https://uclaradio.com/panel/set-password\n\n' +
    'Please note that this unique identifier is only valid for 15 minutes.\n' +
    '- UCLA Radio Dev Team\n';
  mail.send(email, 'UCLA Radio Panel Password Reset', body);
};

mail.sendUsername = function(email, username) {
  const body =
    "Looks like you forgot your username! Here's what we found-\n\n" +
    'UCLA Radio Panel Username: ' +
    username +
    '\n\n' +
    'If this was not you, please contact a Dev Manager A$AP\n' +
    '- UCLA Radio Dev Team\n';
  mail.send(email, 'UCLA Radio Panel Username Recovery', body);
};

mail.usernameAndResetPassword = function(email, token, username) {
  const body =
    'Looks like you forgot your username & password!' +
    " Here's your username and a chance to reset your password.  " +
    'If this was not you, please contact a Dev Manager A$AP.\n\n' +
    'Copy the activation key below and click on the link to reset your password.\n' +
    'Username: ' +
    username +
    '\n' +
    'Unique Identifier: ' +
    token +
    '\n' +
    'Reset Link: https://uclaradio.com/panel/set-password\n\n' +
    'Please note that this unique identifier is only valid for 15 minutes.\n' +
    '- UCLA Radio Dev Team\n';
  mail.send(
    email,
    'UCLA Radio Panel Username Recovery and Password Reset',
    body
  );
};

// send mail with defined transport object
mail.send = function(to, subject, body) {
  // setup e-mail data with unicode symbols
  const mailOptions = {
    from: '"UCLA Radio Dev Dept." <radio.web@media.ucla.edu>',
    to,
    subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message sent: ${info.response}`);
  });
};

module.exports = mail;
