const nodemailer = require('nodemailer');
const keys = require('./../keys/keys.js');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.gmailUser,
    pass: keys.gmailPW
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Nodemailer is ready to send messages');
  }
});

class NodeMailer {
  constructor({name, phone, email, message}) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.message = message;
  }

  async sendEmail(){
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Tony Bot 👻" <do-not-reply@tonyma.com>', // sender address
      to: 'kevinma91@yahoo.com', // list of receivers
      subject: 'You have an inquiry from your website!', // Subject line
      text: 'You have an inquiry from your website, sir. Name: ' + this.name + '. Phone #: ' + this.phone + '. Email: ' + this.email + '. Message: ' + this.message + '.', // plain text body
      html: 'You have an inquiry from your website, sir. Name: ' + this.name + '. Phone #: ' + this.phone + '. Email: ' + this.email + '. Message: ' + this.message + '.'
      // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      }
      console.log('Message sent: %s', info.messageId);
      return;
    });
  }
}

module.exports = NodeMailer;
