require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

const bodyParser = require('body-parser');

const {sendInvitationEmail} = require('./mailer');
const {inviteSMS} = require('./sms');

app.use(express.static(`${__dirname} /../client/dist`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/invite', async (req, res) => {
  // console.log('This is the request: ', req.body);

  if (typeof req.body.email != 'undefined') {
    const {email, name} = req.body;

    try {
      await sendInvitationEmail(email, name);
      res.status(200).send('Success!');
    } catch(e) {
      res.status(500).send(e.message);
    }
  };

  if (typeof req.body.sms != 'undefined') {
    const {name, sms} = req.body;

    try {
      let message = await inviteSMS(name, sms)
      res.sendStatus(201)

    } catch(e) {
      res.status(500).send(e.message);
    }
  };


 });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
