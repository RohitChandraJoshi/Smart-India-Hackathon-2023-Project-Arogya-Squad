require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING);

const projectSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  title: {
    type: String,
  },
  userId: {
    type: String,
  },
  guideId: {
    type: String,
  },
  date: {
    type: Date,
  },
  published: {
    type: Boolean,
    default: false,
  },
  approved: {
    type: Boolean,
    default: null,
  },
  approvalSent: {
    type: Boolean,
    default: false,
  },
  file: {
    type: String,
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
