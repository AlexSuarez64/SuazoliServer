const winston = require("winston");
require("./startup/logging")();

const express = require("express");
// const env = require('custom-env').env();
const config = require("config");

const app = express();

require("./startup/cors")(app);
require("./startup/helmet")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/db")();
require("./startup/validation")();

const port = config.get("port");
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
module.exports = server;