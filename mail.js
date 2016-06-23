
var nodemailer = require('nodemailer');
var passwords = require('../passwords.json');

var mail = {};

/**
Send a user an email confirming their DJ account.
*/
mail.confirmAccount = function(email, username) {
  var body = "Congratulations, " + username
  + ", you've been verified as a DJ and can now log in at uclaradio.com/panel\n\nTime to set the airwaves on fire 🔥\n\n-Web Department";
  mail.send(email, "DJ Account Verified", body);
}

/**
Send a user an email letting them know they have been promoted to manager.
*/
mail.confirmManager = function(email) {
  var body = "Well look at you stud, you've been promoted to manager.\n\nNow you can access the Manager panel at uclaradio.com/panel/manager";
  mail.send(email, "Manager Account Confirmed", body);
}

// send mail with defined transport object
mail.send = function(to, subject, body) {

  // create reusable transporter object using the default SMTP transport
  var smtpConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: passwords.emailuser,
          pass: passwords.emailpass
      }
  };
  var transporter = nodemailer.createTransport(smtpConfig);

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"UCLA Radio Web Dept." <radio.web@media.ucla.edu>',
      to: to,
      subject: subject,
      text: body,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}

module.exports = mail;
