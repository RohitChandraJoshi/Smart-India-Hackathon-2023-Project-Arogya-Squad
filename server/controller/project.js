const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const User = require("../models/usermodel");
const Project = require("../models/projectmodel");
const File = require("../models/filemodel");
const Grade = require("../models/grademodel");
app.use(cors());

async function getProject(req, res) {
  const userId = req.params.userid;
  const project = await Project.findOne({ userId: userId });

  if (project) {
    res.json({
      result: [project],
    });
  } else res.json({ result: false });
}

async function downloadFile(req, res) {
  const userId = req.params.userId;
  const file = await File.findOne({ userId: userId });
  console.log(__dirname);
  const filePath = path.join(__dirname, "uploads", file.filename); // Replace with the path to your file
  const fileName = file.filename; // Replace with the desired file name
  res.download(filePath, fileName, (err) => {
    if (err) {
      // Handle errors, such as file not found
      console.error("Error downloading file:", err);
      res.status(404).send("File not found");
    }
  });
}

async function getTopProject(req, res) {
  const grades = await Grade.find({}).sort({ ["grade"]: -1 });
  const topThreeGrades = grades.slice(0, 3);

  let result = [];
  let obj = {};
  for (const grade of topThreeGrades) {
    // console.log(grade);
    const project = await Project.findOne({ userId: grade.userId });
    console.log(project);
    console.log(grade);
    // console.log(project);
    if (project) {
      obj = {
        name: project.fullname,
        guide: project.guide,
        submitted: project.date,
        grade: grade.grade,
      };
      result.push(obj);
    }
  }
  res.json({ result });
}

async function getGuides(req, res) {
  const guides = await User.find({ user: "faculty" });
  let remainingGuides = [];
  for (let guide of guides) {
    const project = await Project.find({ guideId: guide.id });
    if (project.length <= 2) {
      remainingGuides.push(guide);
    }
  }
  res.json({ result: remainingGuides });
}

async function uploadProjectDetails(req, res) {
  const { guideId, title, userId, date } = req.body;
  const project = await Project.findOne({ userId });
  const user = await User.findById(userId);

  if (project) res.json({ message: false });
  else {
    const newProject = await Project.create({
      title,
      guideId,
      userId,
      firstname: user.firstname,
      lastname: user.lastname,
      date: new Date(date),
    });
    newProject.save();
    return res.json({ message: true });
  }
}

async function getGuideProjects(req, res) {
  const guideId = req.params.guideId;
  if (!guideId) res.json({ result: false });
  const projects = await Project.find({ guideId });

  res.json({ result: projects });
}

async function approveProject(req, res) {
  const project = await Project.findOneAndUpdate(
    { _id: req.body.project },
    { $set: { approvalSent: true } },
    { returnDocument: "after" }
  );
  console.log(project);
  const user = await User.findOne({ user: "dean" });
  const guideMail = await User.findById(project.guideId);
  res.json({ result: project });
}

async function getApprovalProjects(req, res) {
  const projects = await Project.find({ approvalSent: true });
  res.json({ result: projects });
}

async function approveProjects(req, res) {
  const { project_id, approved } = req.body;
  console.log(project_id, approved);
  const project = await Project.findOneAndUpdate(
    { _id: project_id },
    { $set: { approved: approved } },
    { returnDocument: "after" }
  );
  res.json({ result: true });
}

module.exports = {
  getTopProject,
  downloadFile,
  getProject,
  getGuides,
  uploadProjectDetails,
  getGuideProjects,
  approveProject,
  getApprovalProjects,
  approveProjects,
};
