require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING);


const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
  user: {
    type: String,
  },
});

userSchema.statics.getStudentGuideRatio = async function () {
  try {
    const totalStudents = await this.countDocuments({ user: "student" });
    const totalGuides = await this.countDocuments({ user: "guide" });
    const studentGuideRatio = totalStudents / totalGuides;
    return { totalStudents, totalGuides, studentGuideRatio };
  } catch (error) {
    console.error("Error calculating student-guide ratio:", error);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
