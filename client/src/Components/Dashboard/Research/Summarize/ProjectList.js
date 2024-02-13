import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import { formatDate } from "../../../js/formatDate";
import { useState } from "react";
import "../../../../css/Research.css";
import Avatar from "@mui/material/Avatar";

export default function ProjectList() {
  const [files, updateFiles] = useState([]);
  const [username, updateUsername] = useState("");

  const [title, updateTitle] = useState("");
  const [guide, updateGuide] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://pg-dissertation-management-system.onrender.com/getProject/${localStorage.getItem("id")}`
      );
      const data = await response.json();
      console.log(data);
      if (data.result) {
        updateFiles(data.result);
        updateUsername(data.username);
        updateTitle(data.title);
        updateGuide(data.guide);
      } else alert("No project uploaded");
    })();
  }, []);

  async function handleDownload() {
    try {
      const response = await fetch(
        `https://pg-dissertation-management-system.onrender.com/downloadFile/${localStorage.getItem("id")}`
      );
      const blob = await response.blob();
      console.log();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = username + "_" + title;
      link.click();
    } catch (error) {}
  }

  return (
    <Container style={{ padding: "4% 8%" }} fluid>
      <Row>
        <Col>
          <div className="submit-file">
            <div className="heading">
              <h1>Your Project Submission</h1>
            </div>
            <div className="flex-container">
              <div className="full-width-column">
                <div className="header column">User</div>
                <div className="header column">Title</div>
                <div className="header column">Guide</div>
                <div className="header column">Date</div>
                <div className="header column">File</div>
              </div>
              {files.map((file) => {
                return (
                  <div className="full-width-column">
                    <div className="column">
                      {" "}
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          display: "inline-block",
                          marginRight: "8px",
                          textAlign: "center",
                          verticalAlign: "middle",
                          lineHeight: "32px",
                          fontSize: "1rem",
                        }}
                      >
                        AM
                      </Avatar>
                      <span className="username">{username} </span>
                    </div>
                    <div className="column">{title} </div>
                    <div className="column">{guide} </div>
                    <div className="column">
                      {formatDate(new Date(file.date))}{" "}
                    </div>
                    <div className="column download-column">
                      <button className="download-btn" onClick={handleDownload}>
                        <img
                          className="download-img"
                          src={process.env.PUBLIC_URL + "/images/download.png"}
                          alt=""
                        />{" "}
                        Download File{" "}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
