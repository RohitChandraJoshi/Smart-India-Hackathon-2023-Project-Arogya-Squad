const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("../models/usermodel");
const Project = require("../models/projectmodel");
const File = require("../models/filemodel");
const Grade = require("../models/grademodel");
const verifyDate = require("../utils/validateDate");
const Task = require("../models/taskmodel");
app.use(cors());

async function assignTask(req, res) {
  const guideId = req.params.guideId;
  let { title, description, deadline, userId } = req.body;
  let newDeadline = new Date(deadline);
  if (deadline === "null" || !verifyDate(newDeadline))
    res.json({ error: "Invalid Date" });
  else {
    const task = await Task.create({
      title,
      description,
      deadline,
      guideId,
      userId,
    });
    task
      .save()
      .then((document) => res.json({ message: "Sucesfull insertion" }))
      .catch((error) => res.json({ message: null }));
  }
}

async function getTasks(req, res) {
  const userId = req.params.userId;
  const tasks = await Task.find({ userId });
  if (tasks && tasks.length) res.json({ result: tasks });
  else res.json({ message: null });
}

async function updateTask(req, res) {
  const taskId = req.body.taskId;
  const grade = req.body.grade;

  console.log(taskId, grade);
  const task = await Task.findByIdAndUpdate(
    taskId,
    { grade: +grade },
    { new: true }
  );
  console.log(task);
  if (!task) return res.json({ result: null });
  return res.json({ result: task });
}

async function deleteTask(req, res) {
  const { task } = req.body;

  const deletedTask = await Task.findByIdAndDelete(task);
  if (!deletedTask) {
    return res.status(404).json({ message: false });
  }

  res.json({ message: true });
}
module.exports = { assignTask, getTasks, updateTask, deleteTask };
