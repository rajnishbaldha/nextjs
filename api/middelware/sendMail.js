const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sayogdonga156156@gmail.com',
    pass: 'tgnkqncjecqiayop'
  }
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}

module.exports = sendEmail;
