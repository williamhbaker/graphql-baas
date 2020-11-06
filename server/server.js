const express = require('express');

const app = express();
const port = 4000;

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Links' });
});

app.listen(port, () => {
  console.log(`Server listening at localhost:${4000}`);
});
