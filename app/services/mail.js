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
  const body = `Congratulations, ${username}, you've been verified as a DJ and can now log in at uclaradio.com/panel\n\nTime to set the airwaves on fire 🔥\n\n-Web Department`;
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

// send mail with defined transport object
mail.send = function(to, subject, body) {
  // setup e-mail data with unicode symbols
  const mailOptions = {
    from: '"UCLA Radio Web Dept." <radio.web@media.ucla.edu>',
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
