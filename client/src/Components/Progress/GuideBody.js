import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../css/Progress/progress.css";
import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import Post from "./Post";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tasks from "./Tasks";
import StudentProgress from "./StudentReport";
import Summary from "./Summary";

export default function GuideBody() {
  const [showTasks, updateShowTask] = useState(false);
  const [tasks, updateTasks] = useState([]);
  const [evaluationCount, updateEvaluationCount] = useState(0);
  const [progressLabels, updateProgress] = useState([]);
  const [grades, updateGrades] = useState([]);
  const [averageGrade, updateAverageGrade] = useState(0);

  useEffect(() => {
    (async () => {
      let userId = localStorage.getItem("id");
      console.log(userId);
      const response = await fetch(`https://pg-dissertation-management-system.onrender.com/getTasks/${userId}`, {
        method: "GET",
      });
      const data = await response.json();
      const labels = [];
      const values = [];
      const result = data.result;
      let evaluations = 0;
      let sum = 0;
      if (data.result) {
        result.forEach((element) => {
          if (element.grade) {
            evaluations++;
            labels.push(element.title);
            values.push(element.grade);
          }
        });
        sum = values.reduce((a, b) => a + b, 0);
        updateEvaluationCount(evaluations);
        if (values.length === 0) updateAverageGrade(0);
        else updateAverageGrade(sum / values.length);
        updateTasks(data.result);
        updateProgress(labels);
        updateGrades(values);
      } else updateTasks([]);
    })();
  }, []);

  function assignTask() {
    if (evaluationCount >= 4) {
      updateShowTask(false);
      alert("No more evaluations possible");
    } else updateShowTask(!showTasks);
  }

  return (
    <Container style={{ marginTop: "70px" }}>
      <Row>
        <Col style={{ position: "relative" }}>
          <div className="create-task">
            <Button
              sx={{
                borderRadius: "5px",
                color: "#ffff",
                background: "#C43EF3",
                boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.1)",
              }}
              className="task-btn"
              onClick={assignTask}
            >
              Create Task
              <AddCircleIcon sx={{ margin: "0 0 0 5px" }} />
            </Button>
          </div>
          <div> {showTasks && <Post showModal={assignTask} />}</div>
          <Tasks tasks={tasks} />
          <StudentProgress
            evaluations={evaluationCount}
            labels={progressLabels}
            values={grades}
          />
          <Summary
            grade={averageGrade}
            projectCompleted={(evaluationCount / 4) * 100}
          />
        </Col>
      </Row>
    </Container>
  );
}
