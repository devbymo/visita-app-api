const mongoose = require('mongoose');
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cimlsu6.mongodb.net/${DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(
  URL,
  () => {
    console.log('DB Conntected.');
  },
  (err) => {
    console.log(err.message);
  },
  {
    useNewUrlParser: true,
  }
);
