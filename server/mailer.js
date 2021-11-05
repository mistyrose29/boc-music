/* eslint-disable func-style */
const nodemailer = require('nodemailer');

function sendEmail(message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD
      }
    });

    transporter.sendMail(message, function(err, info) {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
}

exports.sendInvitationEmail = function({email, name}) {
  const message = {
    from: process.env.GOOGLE_USER,
    // to: toUser.email // in production uncomment this
    to: email,
    subject: 'Join MusicShare',
    html: `
      <h3> Hello ${name} </h3>
      <p>You have friends on MusicShare who want to share files with you...</p>
      <p>Register an an account today at: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
      <p>Cheers</p>
      <p>MusicShare Team</p>
    `
  };

  return sendEmail(message);
};