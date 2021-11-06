const dotenv = require('dotenv');
const result = dotenv.config({path: './.env'});

if (result.error) {
  throw result.error;
}

// console.log(result.parsed);


const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
// console.log(accountSid);

const client = require('twilio')(accountSid, authToken, {
  logLevel: 'debug'
});

const inviteSMS = async (name, sms) => {
  // console.log(' We are here SMS: ', sms);

  client.messages
    .create({
      body: `Hi ${name}! Your friend on MusicShare wants to share music with you. Join today!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: sms
    })
    .then((message) => {
      // console.log(message.sid);
      return message.sid;
    })
    .catch(e => console.log('Error: ', e.message))
  // return true;
};



module.exports.inviteSMS = inviteSMS;
