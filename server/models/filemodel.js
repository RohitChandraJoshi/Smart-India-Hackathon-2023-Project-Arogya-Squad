require("dotenv").config()
const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING);

const fileSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  filename: {
    type: String,
  },
  path: {
    type: String,
  },
  date: {
    type: Date
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
