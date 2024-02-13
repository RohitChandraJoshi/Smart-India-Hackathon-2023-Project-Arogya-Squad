import { Input } from "@mui/material";
import { formatDate } from "../js/formatDate";
import { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
export default function Tasks({ tasks }) {
  const [taskIndex, changeTaskIndex] = useState(-1);
  const [grade, updateGrade] = useState(-1);
  const [deleteMode, setDeleteMode] = useState(false);
  const [index, updateIndex] = useState(-1);
  const [gradeGiven, updateValue] = useState(false);

  const [returnedGrade, updateReturnedGrade] = useState(-1);
  function submitGrade(event) {
    event.preventDefault();
    console.log(grade);

    if (grade === -1) {
      alert("Please enter a value");
      return;
    }
    if (grade < 0 || grade > 100) {
      alert("Please enter a message between 0 and 100");
      return;
    }
    const taskId = tasks[taskIndex]._id;
    const options = {
      method: "POST",
      body: new URLSearchParams({ grade, taskId }),
    };
    (async () => {
      const response = await fetch(`https://pg-dissertation-management-system.onrender.com/updateTask`, options);
      const data = await response.json();
      console.log(data.result);
      if (data.result) {
        updateReturnedGrade(data.result.grade);
        window.location.href = "/dashboard/progress";
      }

      // else
      //   //
    })();
  }

  function handleInputChange(index, event) {
    changeTaskIndex(index);
    updateGrade(event.target.value);
  }

  function handleDelete(index) {
    updateIndex(index);
    setDeleteMode(true);

    (async () => {
      const task = tasks[index]._id;
      const options = {
        method: "DELETE",
        body: new URLSearchParams({ task }),
      };
      const response = await fetch("https://pg-dissertation-management-system.onrender.com/deleteTask", options);
      const data = await response.json();

      if (data.message) window.location.href = "/dashboard/progress";
      else alert("No such document");
    })();
  }
  return (
    <div className="tasks">
      <h3>Assigned Evaluations</h3>
      <div className="evaluation-table">
        <div className="table-full-width">
          <div className="item task-title">Evaluation</div>
          <div className="item task-description">Evaluation Description</div>
          <div className="item date">Date Due</div>
          <div className="item">Grade</div>
        </div>
        {tasks.map((task, index) => {
          return (
            <div className="table-full-width">
              <div className="item task-title">
                {task.title}
              </div>
              <div className="item task-description">{task.description} </div>
              <div className="item date">
                {" "}
                {formatDate(new Date(task.deadline))}
              </div>
              <div className="item">
                {gradeGiven || task.grade ? (
                  <div className="edit-div"> {task.grade}%</div>
                ) : (
                  <form method="POST" onSubmit={submitGrade}>
                    <Input
                      onChange={(event) => handleInputChange(index, event)}
                      name="grade"
                      type="number"
                      placeholder="Grade out of 100 Ex. 98"
                    />
                  </form>
                )}
                <DeleteIcon
                  className="delete"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
