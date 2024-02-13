import { useEffect, useState } from "react";

export default function Summary({ grade, projectCompleted }) {
  const [isPublished, updatePublishedPaper] = useState("No");
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://pg-dissertation-management-system.onrender.com/getProject/${localStorage.getItem("id")}`
      );
      const data = await response.json();
      if (data.published) updatePublishedPaper("Yes");
      else updatePublishedPaper("No");
    })();
  });

  return (
    <div className="summary-report">
      <h3>Summary</h3>
      <div className="summary">
        <div className="summary-heading">
          <div>
            <span className="summary-label">Project Title:</span>
            <span>Deep Learning</span>
          </div>
          <div>
            <span className="summary-label">Date Assigned: </span>
            <span>19/12/22</span>
            <span className="summary-label">Completed:</span>
            <span>{projectCompleted}%</span>
          </div>
        </div>
        <div className="summary-box">
          <div className="summary-item">
            <div className="wrapper">
              <img
                src={process.env.PUBLIC_URL + `/images/check-list.png`}
                alt=""
              />
            </div>
            <div className="summary-item-info">
              <h6>Meetings Held</h6>
              <h6>0</h6>
            </div>
          </div>
          <div className="summary-item">
            <div className="wrapper">
              <img src={process.env.PUBLIC_URL + `/images/book.png`} alt="" />
            </div>
            <div className="summary-item-info">
              <h6>Published</h6>
              <h6>{isPublished}</h6>
            </div>
          </div>
          <div className="summary-item">
            <div className="wrapper">
              <img src={process.env.PUBLIC_URL + `/images/grades.png`} alt="" />
            </div>
            <div className="summary-item-info">
              <h6>Predicted Grade</h6>
              <h6>{grade}%</h6>
            </div>
          </div>
          <div className="summary-item">
            <div className="wrapper">
              <img
                src={process.env.PUBLIC_URL + `/images/planning.png`}
                alt=""
              />
            </div>
            <div className="summary-item-info">
              <h6>Evaluations Completed</h6>
              <h6>{(projectCompleted / 100) * 4}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
