const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const multer = require("multer");
const Grid = require("gridfs-stream");
const path = require("path");
const mongoose = require("mongoose");
const File = require("./models/filemodel");
const Project = require("./models/projectmodel");
require("./models/topicduplicacyserver");
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/build"));
const connection = mongoose.connection;

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

app.get("/home", (req, res) => {
  res.json({ message: "Hello from react" });
});

app.use(require("./controller/controller.js"));
app.use(require("./router/routers.js"));

let gfs;
connection.once("open", () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Set up a route for file uploads
app.post("/upload/:userId", upload.single("file"), async (req, res) => {
  // Access the uploaded file details using req.file
  const file = await File.find({ userId: req.params.userId });
  console.log(file);

  if (file && file.length) {
    console.log("Updated File");
    await File.updateOne(
      { userId: req.params.userId },
      {
        $set: {
          filename: req.file.filename,
          path: req.file.path,
          date: new Date(),
        },
      }
    );
  } else {
    var newFile = new File({
      userId: req.params.userId,
      filename: req.file.filename,
      path: req.file.path,
      date: new Date(),
    });
    newFile.save();
  }

  const project = await Project.find({ userId: req.params.userId });
  if (project && project.length) {
    console.log("Project updated");
    await Project.updateOne(
      { userId: req.params.userId },
      {
        $set: {
          title: req.body.title,
          fullname: req.body.fullname,
          email: req.body.email,
          guide: req.body.guide,
          date: new Date(),
        },
      }
    );
  } else {
    var newProject = new Project({
      userId: req.params.userId,
      fullname: req.body.fullname,
      email: req.body.email,
      guide: req.body.guide,
      title: req.body.title,
      date: new Date(),
    });
    newProject.save();
  }
  res.json({ message: "Sucessfull" });
});

