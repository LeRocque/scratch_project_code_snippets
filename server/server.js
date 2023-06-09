const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3000;

const mongoURI =
  'mongodb+srv://paaoul:Melikeit1@scratchcluster.igf2bag.mongodb.net/';

mongoose.connect(mongoURI);

const snippetsRouter = require('./routes/snippets');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/snippets', snippetsRouter);

app.use((req, res) => res.status(404).send('Invalid endpoint'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
