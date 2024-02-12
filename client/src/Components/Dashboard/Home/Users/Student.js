import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  MenuItem,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { formatDate } from "../../../js/formatDate";
import { compareTwoStrings } from "string-similarity"; // Import the comparison function
import axios from 'axios'; // Import axios for API requests
import Modal from 'react-modal'; // Import Modal for displaying popups

export default function Student() {
  const [showProject, updateProject] = useState(false);
  const [showProjectForm, updateProjectForm] = useState(false);
  const [options, updateOptions] = useState([]);
  const [guideId, updateGuideId] = useState("");
  const [title, updateTitle] = useState("");
  const [students, updateStudent] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for controlling the popup
  const [similarity, setSimilarity] = useState(null); // State for storing similarity percentage
  const [similarTopics, setSimilarTopics] = useState([]); // State for storing similar topics

  useEffect(() => {
    // Fetch data on component mount
    (async () => {
      // Fetch project details
      const response = await fetch(
        `http://localhost:8000/getProject/${localStorage.getItem("id")}`
      );
      const data = await response.json();

      if (!data.result) updateProject(false);
      else updateProject(true);

      // Fetch guide options
      const guideResponse = await fetch(`http://localhost:8000/get/guides`);
      const guideData = await guideResponse.json();
      if (guideData.result) {
        updateOptions(guideData.result);
      }

      // Fetch project details for student
      const studentResponse = await fetch(
        `http://localhost:8000/getProject/${localStorage.getItem("id")}`
      );
      const studentData = await studentResponse.json();
      if (studentData.result) updateStudent(studentData.result);
    })();
  }, []);

  async function uploadProject(event) {
    event.preventDefault();
    console.log(event);
    const similarityThreshold = 0.6; // Set the similarity threshold

    // Compare the entered title with existing topics
    axios
      .get(`https://sih-topic-duplicacy-checker.onrender.com/get-google-scholar-results?topic=${encodeURIComponent(title)}`)
      .then((response) => {
        const googleScholarResults = response.data.results;

        const existingTopics = googleScholarResults.map((result) => result.title);
        const highestSimilarity = existingTopics.reduce((max, topic) => {
          const similarityValue = compareTwoStrings(title, topic);
          return Math.max(max, similarityValue);
        }, 0);

        const similarityPercentage = highestSimilarity * 100;
        setSimilarity(similarityPercentage);

        if (similarityPercentage >= similarityThreshold) {
          // If similarity is too high, set similar topics and open the modal
          const similarTopicsList = googleScholarResults.filter(result => compareTwoStrings(title, result.title) >= similarityThreshold);
          setSimilarTopics(similarTopicsList);
          setModalIsOpen(true);
        } else {
          // If similarity is acceptable, proceed with project submission
          const options = {
            method: "POST",
            body: new URLSearchParams({
              guideId,
              title,
              userId: localStorage.getItem("id"),
              date: new Date(),
            }),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
          };
          fetch("http://localhost:8000/upload/project/details", options)
            .then((response) => response.json())
            .then((data) => {
              if (data.message) window.location.href = "/dashboard/submit/projects";
            })
            .catch((error) => console.error('Error uploading project:', error));
        }
      })
      .catch((error) => console.error('Error fetching Google Scholar results:', error));
  }

  function handleOptionChange(event) {
    console.log(event.target.value);
    updateGuideId(event.target.value);
  }
  function handleTitleChange(event) {
    updateTitle(event.target.value);
  }
  function handleFileChange(event) {}

  return (
    <div>
      {/* Existing UI code */}
      {showProject ? (
        <div className="project-details">
          <h2 style={{ marginBottom: "20px" }}>Project Details</h2>
          <div className="flex-container">
            <div className="full-width-column">
              <div className="header column">Student name</div>
              <div className="header column">Title</div>
              <div className="header column">Date</div>
              <div className="header column">Approve Project</div>
              <div className="header column"> Project File</div>
            </div>
            {students.map((student, index) => {
              return (
                <div className="full-width-column" key={index}>
                  <div className="column">
                    {" "}
                    {student.firstname + student.lastname}{" "}
                  </div>
                  <div className="column"> {student.title} </div>
                  <div className="column">
                    {" "}
                    {formatDate(new Date(student.date))}{" "}
                  </div>
                  <div className="column">
                    {student.approved && <span>Approved</span>}
                    {student.approvalSent === true &&
                      student.approved == null && <span>Approval pending</span>}
                    {student.approvalSent === false && (
                      <span>Approval not forwarded</span>
                    )}
                    {student.approvalSent === true &&
                      student.approved === false && (
                        <span>Approval rejected</span>
                      )}
                  </div>
                  <div className="column">File1 </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            margin: "50px 0",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          {" "}
          <h1>No Project To Display</h1>
          <Button
            style={{
              backgroundColor: "#4CB9E7",
              color: "white",
              width: "30%",
              margin: "auto",
            }}
            onClick={() => {
              updateProjectForm(!showProjectForm);
            }}
          >
            {" "}
            Upload Project Details
          </Button>
        </div>
      )}

      {showProjectForm && (
        <div>
          {/* Existing project form */}
          <FormGroup onSubmit={uploadProject} className="project-form">
            <FormLabel>Enter Project Title</FormLabel>
            <Input
              onChange={handleTitleChange}
              placeholder="Enter Project Title"
              type="text"
              required="true"
            />
            <FormLabel>Select a guide</FormLabel>
            <Select
              labelId="demo-simple-select-label"
              id="guide"
              label="Choose a guide"
              placeholder="Choose a role"
              style={{ width: "100%" }}
              onChange={handleOptionChange}
            >
              {options.map((option) => {
                return (
                  <MenuItem value={option._id} key={option._id}>
                    {" "}
                    {option.firstname + " " + option.lastname}
                  </MenuItem>
                );
              })}
            </Select>
            <Input type="file" name="file" />
            <Button type="submit" onClick={uploadProject}>
              {" "}
              Submit{" "}
            </Button>
          </FormGroup>
        </div>
      )}

      {/* Popup modal for similar topics */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={{
        border: "2px solid #f79e0f",
        maxWidth: "6000px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "2",
        backdropFilter: "blur(5px)"
      }}>
        <h2>Topic Similarity Alert</h2>
        <p>The similarity percentage of the entered topic with existing topics is {similarity}%.</p>
        <p>Similar topics found:</p>
        <ul>
          {similarTopics.map((topic, index) => (
            <li key={index}>
              <a href={topic.link} target="_blank" rel="noopener noreferrer">{topic.title}</a>
            </li>
          ))}
        </ul>
        <p>Please modify your topic to ensure originality.</p>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}
