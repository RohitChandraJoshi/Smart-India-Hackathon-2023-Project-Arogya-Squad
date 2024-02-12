require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING);

const gradeSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  grade: {
    type: Number,
  },
  guideId: {
    type: String,
  },
});

const Grade = mongoose.model("Grade", gradeSchema);
module.exports = Grade;
