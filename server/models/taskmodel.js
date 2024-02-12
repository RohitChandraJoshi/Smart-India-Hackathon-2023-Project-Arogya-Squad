require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING);

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  guideId: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  grade: {
    type: Number,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
