// Post.js
import React, { useState } from "react";
import { Button } from "@mui/material";
import "../../css/Progress/progress.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const Post = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: null,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding property in the formData state
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function assignTask(event) {
    let guideId = `abcdefgh`;
    event.preventDefault();
    try {
      const formDataObject = new FormData();
      formDataObject.append("title", formData.title);
      formDataObject.append("description", formData.description);
      formDataObject.append("deadline", formData.deadline);
      formDataObject.append("userId", localStorage.getItem("id"));

      const options = {
        method: "POST",
        body: new URLSearchParams(formDataObject),
      };
      const response = await fetch(
        `http://localhost:8000/assignTask/${guideId}`,
        options
      );

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      console.log(data);

      if (data.message) {
        window.location.href = "/dashboard/progress";
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="task-form-container">
        <h2> Enter Evaluation Details</h2>
        <HighlightOffIcon
          onClick={props.showModal}
          sx={{ fontSize: "2.5rem", fontWeight: "500px" }}
          className="close"
        />
        <form className="task-form" method="POST" action="">
          <label>Evaluation Title</label>
          <input
            type="text"
            placeholder="Enter Evaluation Title"
            name="title"
            onChange={handleInputChange}
            required="true"
          />
          <label>Description</label>

          <textarea
            rows="2"
            cols="30"
            onChange={handleInputChange}
            name="description"
            placeholder="Enter Evaluation description"
            className="description-task"
            required="true"
          ></textarea>
          <label>Deadline</label>
          <input
            onChange={handleInputChange}
            type="date"
            className="task-deadline"
            name="deadline"
            required="true"
          />
          <Button
            type="submit"
            className="assign-task-btn"
            onClick={assignTask}
          >
            Assign Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Post;
