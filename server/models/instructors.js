require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING);

const guideSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  users: {
    type: Array,
  },
});


const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
