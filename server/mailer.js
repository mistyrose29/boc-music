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
        console.log('Transporter error is: ', err);
      } else {
        res(info);
      }
    });
  });
}

exports.sendInvitationEmail = function(email, name) {
  console.log('Email: ', email);
  const message = {
    from: process.env.GOOGLE_USER,
    // to: toUser.email // in production uncomment this
    to: email,
    subject: 'Join MusicShare',
    text: `Hello ${name}. You have friends on MusicShare. Register an account today! ${process.env.DOMAIN}`,
    html: `
      <h3> Hello ${name} </h3>
      <p>You have friends on MusicShare who want to share files with you...</p>
      <p>Register an account today at: <a target="_" href="${process.env.DOMAIN}">${process.env.DOMAIN}/activate </a></p>
      <p>Cheers!</p>
      <p>MusicShare Team</p>
    `,
    dsn: {
      id: 'some random message specific id',
      return: 'headers',
      notify: 'success',
      recipient: process.env.GOOGLE_USER
    },
    dsn: {
      id: 'some random message specific id',
      return: 'headers',
      notify: ['failure', 'delay'],
      recipient: process.env.GOOGLE_USER
    }
  };

  return sendEmail(message);
};