const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const db = config.get('db');
  async function connectDB() {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
      winston.info(`Connected to ${db}...`);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  connectDB();
}