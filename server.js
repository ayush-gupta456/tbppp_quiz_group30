const express = require('express');
const path = require('path');

const app = express();
const port =3000;

app.use(express.static(path.join('/', 'public')));

const questions = require('./questions.json');

app.get('/questions.json', (req, res) => {
  res.json(questions);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});