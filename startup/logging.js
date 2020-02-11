const winston = require('winston');
const path = require('path');
const logPath = __dirname;
const tsFormat = () => (new Date().toISOString());
require('express-async-errors');

module.exports = function () {

  winston.add(new winston.transports.File({
    filename: 'logfile.log',
    tsFormat: tsFormat
  }));

  winston.add(new winston.transports.Console({
    format: winston.format.simple(),
    colorize: true,
    prettyPrint: true,
  }));

}