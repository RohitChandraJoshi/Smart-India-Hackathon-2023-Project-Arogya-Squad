import { useEffect, useState } from "react";
import { formatDate } from "../../../js/formatDate";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Close from "@mui/icons-material/Close";
export default function Dean() {
  const [students, updateStudents] = useState([]);
  const [approved, changeProject] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://pg-dissertation-management-system.onrender.com/get/approval/projects"
      );
      const data = await response.json();
      if (data.result) updateStudents(data.result);
    })();
  });

  async function approveProject(index, approved) {
    console.log(index, approved);
    const project_id = students[index]._id;
    const options = {
      method: "POST",
      body: new URLSearchParams({
        project_id,
        approved,
      }),
    };
    const response = await fetch(
      "https://pg-dissertation-management-system.onrender.com/approve/projects",
      options
    );
    const data = await response.json();
    if (data.result) window.location.href = "/dashboard";
  }
  return (
    <div className="project-dean-info">
      <h3>Projects Approval</h3>

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
                {" "}
                {student.approved && <span>Approved</span>}
                {student.approved === null && (
                  <span>
                    <CheckIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => approveProject(index, true)}
                    />
                    <CloseIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => approveProject(index, false)}
                    />
                  </span>
                )}
                {student.approved === false && <span>Rejected</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
