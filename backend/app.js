const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./utils/config');
const postRouter = require('./controllers/Posts');
const photoRouter = require('./controllers/Pictures');
const commentRouter = require('./controllers/Comments');

const app = express();



mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('dist'))
app.use(express.json());

app.use('/api/posts', postRouter);
app.use('/api/pictures', photoRouter);
app.use('/api/comments', commentRouter);


module.exports = app;