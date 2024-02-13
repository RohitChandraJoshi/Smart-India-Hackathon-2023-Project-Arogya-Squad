import { useEffect, useState } from "react";
import { formatDate } from "../../../js/formatDate";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Close from "@mui/icons-material/Close";
import Sidebar from "G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/Dashboard/Home/Sidebar.js"

import { Button } from "@mui/material";
export default function Faculty() {
  const [students, updateStudents] = useState([]);
  const [approved, updateItem] = useState(false);
  async function handleApproval(index) {
    updateItem(true);
    const project = students[index]._id;
    const options = {
      method: "POST",
      body: new URLSearchParams({
        project,
      }),
    };
    const response = await fetch(
      "https://pg-dissertation-management-system.onrender.com/approve/project",
      options
    );
    const data = await response.json();
    if (data.result) {
      window.location.href = "/dashboard/projects";
    }
  }
  useEffect(() => {
    (async () => {
      const guideId = localStorage.getItem("id");
      const response = await fetch(
        `https://pg-dissertation-management-system.onrender.com/get/guide/projects/${guideId}`
      );
      const data = await response.json();
      console.log(data);

      if (data.result) {
        updateStudents(data.result);
      }
    })();
  }, []);
  return (
    <div className="project-guide-info">
      <Sidebar />
      <h3 style={{marginLeft:"100px"}} > Project Details</h3>

      <div className="flex-container">
        <div className="full-width-column">
          <div className="header column">Student name</div>
          <div className="header column">Title</div>
          <div className="header column">Date</div>
          <div className="header column">Approve Project</div>
        </div>

        {students.map((student, index) => {
          return (
            <div className="full-width-column">
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
                {student.approvalSent === true && student.approved === null && (
                  <span>Approval pending</span>
                )}
                {student.approvalSent === false && (
                  <span>
                    <button
                      className="approval"
                      style={{
                        padding: "5px",
                        border: "1px solid #C43EF3",
                        color: "black",
                        borderRadius: "10px",
                        background: "#fff",
                        boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.1)",
                      }}
                      onClick={() => handleApproval(index)}
                    >
                      Send For Approval
                    </button>
                  </span>
                )}
                {student.approvalSent && student.approved === false && (
                  <span>Approval rejected</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
