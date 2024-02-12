require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const emailExistence = require("email-existence");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

async function signup(req, res) {
  const { firstName, lastName, email, user, password } = req.body;

  // Check if any required field is empty
  if (!firstName || !lastName || !email || !password || !user)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Roll No cannot be empty" });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

  try {
    // Check if the user with the provided email already exists
    const findUser = await User.findOne({ email });
    if (findUser)
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "User already registered",
      });

    // Create a new user
    const newUser = await User.create({
      firstname: firstName,
      lastname: lastName,
      email: email,
      user: user,
      password: hashedPassword,
    });

    // Save the new user
    await newUser.save();

    // Return success message
    return res.json({ message: true });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error signing up user",
    });
  }
}


async function signIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Missing details" });

  const findUser = await User.findOne({ email });
  console.log(findUser);
  if (findUser) {
    const matchedPasswords = await bcrypt.compare(password, findUser.password);
    if (matchedPasswords) {
      const token = jwt.sign({ _id: findUser._id }, process.env.JWT_KEY, {
        expiresIn: "30d",
      });

      findUser.token = token;
      res.json({
        id: findUser._id,
        firstname: findUser.firstname,
        lastname: findUser.lastname,
        token: token,
      });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Password does not match" });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "User does not exists" });
  }
}

module.exports = { signup, signIn };
