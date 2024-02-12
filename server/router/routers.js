const express = require("express");
const router = express.Router();
const isAuthenticated = require("./auth");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.redirect("/");
});

module.exports = router;
