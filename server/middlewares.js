const express = require("express");
const authmiddleware = require("./tools/auth-middleware.js");
const bodyParser = require("body-parser");

const setupMiddlewares = (app) => {
  app.use(bodyParser.json());
  authmiddleware.init();
};

exports.setupMiddlewares = setupMiddlewares;
