const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


const User = require("../models/usermodel");

app.use(cors());

async function getUser(req, res) {
  const id = req.params.id;

  try {
    const findUser = await User.findById(id);

    if (findUser) {
      res.json(findUser)
    } else res.json({ user: "Not found" });
  } catch (error) {
    console.log(error);
  }
}

async function searchUser(req, res) {
  const searchedUser = req.params.query;
  if (searchedUser === "") {
    console.log("Empty");
    return;
  }
  const query = { username: { $regex: searchedUser, $options: "i" } };

  const findDocument = await User.find(query);
  res.json({ documents: findDocument });
}



module.exports = { searchUser, getUser };
