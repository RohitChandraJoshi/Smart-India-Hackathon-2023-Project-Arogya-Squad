require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

function isAuthenticated(req, res, next) {
  const token = req.headers.tokenkey;
  if (token != "null") {
    jwt.verify(token, process.env.JWT_KEY);
    res.json({ message: "succesfull" });
  } else {
    res.json({ message: "Unsucesfull" });
  }
}

module.exports = isAuthenticated;
