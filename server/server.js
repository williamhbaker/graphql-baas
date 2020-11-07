const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000;
const bodyParser = require('body-parser');

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index', { title: 'Links' });
});

app.post('/schema', function (req, res) {
  const newSchema = req.body.newSchema;

  console.log(newSchema);

  axios
    .post('http://dgraph:8080/admin/schema', newSchema)
    .then((response) => {
      console.log(response.data);
      console.log(response.config.data);
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

app.listen(port, () => {
  console.log(`Server listening at localhost:${4000}`);
});
