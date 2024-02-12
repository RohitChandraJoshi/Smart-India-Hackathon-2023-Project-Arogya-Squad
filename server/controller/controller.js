require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const router = express.Router();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
const {
  validateSignIn,
  validateSignUp,
  validateTask,
  isRequestValidated,
} = require("../validators/auth");
const { signup, signIn } = require("./auth");
const { searchUser, getUser } = require("./user");
const {
  getProject,
  getTopProject,
  downloadFile,
  getGuides,
  uploadProjectDetails,
  getGuideProjects,
  approveProject,
  getApprovalProjects,
  approveProjects
} = require("./project");
const { assignTask, getTasks, updateTask, deleteTask } = require("./tasks");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

router.route("/auth/signup").post(validateSignUp, isRequestValidated, signup);
router.route("/auth/login").post(validateSignIn, isRequestValidated, signIn);

router.route("/search/user/:query").get(searchUser);
router.route("/get/user/:id").get(getUser);

router.route("/getProject/:userid").get(getProject);
router.route("/downloadFile/:userId").get(downloadFile);
router.route("/getTopProject/:userId").get(getTopProject);
router.route("/upload/project/details").post(uploadProjectDetails);
router.route("/get/guides").get(getGuides);

router.route("/get/guide/projects/:guideId").get(getGuideProjects);

router.route("/approve/project").post(approveProject);
router.route("/get/approval/projects").get(getApprovalProjects);
router.route("/approve/projects").post(approveProjects);

router
  .route("/assignTask/:guideId")
  .post(validateTask, isRequestValidated, assignTask);
router.route("/getTasks/:userId").get(getTasks);

router.route("/updateTask").post(updateTask);
router.route("/deleteTask").delete(deleteTask);
module.exports = router;
