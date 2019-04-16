const winston = require("winston");
const express = require("express");
const env = require('custom-env').env();
const config = require("config");
const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/helmet")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
module.exports = server;