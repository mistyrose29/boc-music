const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
