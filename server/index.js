require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

const bodyParser = require('body-parser');

const {sendInvitationEmail} = require('./mailer');

app.use(express.static(`${__dirname} /../client/dist`));

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

app.get('/invite', async (req, res) => {

  const {email, name} = req.body;

  try {

    await sendInvitationEmail(email, name);

  } catch(e) {
    res.status(404).send(e.message);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
