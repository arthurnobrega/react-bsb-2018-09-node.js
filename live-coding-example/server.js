const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let participantes = [];

app.post('/participantes', (req, res) => {
  const {name, age} = req.body;

  participantes.push({ name, age })

  res.sendStatus(200);
});

app.get('/participantes', (req, res) => {
  res.status(200).send(participantes);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});