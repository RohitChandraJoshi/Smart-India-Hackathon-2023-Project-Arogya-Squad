import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "../../../css/Research.css";

export default function SubmitFile() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    title: "",
    guide: "",
    file: null, // For storing the selected file
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      // Handle file input separately
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      // Handle other input fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const uploadDetails = async (event) => {
    try {
      event.preventDefault();
      const formDataObject = new FormData();
      formDataObject.append("fullname", formData.fullname);
      formDataObject.append("email", formData.email);
      formDataObject.append("title", formData.title);
      formDataObject.append("guide", formData.guide);

      formDataObject.append("file", formData.file);

      console.log(formDataObject);
      // Replace 'http://localhost:3000' with your server URL
      const response = await axios.post(
        `https://pg-dissertation-management-system.onrender.com/upload/${localStorage.getItem("id")}`,
        formDataObject
      );
      const message = response.data.message;
      if (message) {
        //redirect
        window.location.href = "/dashboard/submit/projects";
      } else alert("Error Processing in file");

      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <Container style={{ background: "#F5F5F5", padding: "4% 8%" }} fluid>
      <Row>
        <Col>
          <div className="submit-file">
            <div className="heading ">
              <h1>Research Tools </h1>
              <h3>Upload your project </h3>
            </div>
            <Form method="post">
              <Form.Group className="mb-3 group" controlId="formBasicUsername">
                <img src={process.env.PUBLIC_URL + "/images/user.png"} alt="" />
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  className="input"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 group" controlId="formBasicEmail">
                <img
                  src={process.env.PUBLIC_URL + "/images/email.png"}
                  alt=""
                />

                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Enter email"
                  onChange={handleInputChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 group" controlId="formBasicPassword">
                <img
                  src={process.env.PUBLIC_URL + "/images/title.png"}
                  alt=""
                />
                <Form.Label>Project Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Project Title"
                  className="input"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 group" controlId="formBasicPassword">
                <img
                  src={process.env.PUBLIC_URL + "/images/teacher.png"}
                  alt=""
                />

                <Form.Label>Guide</Form.Label>
                <Form.Control
                  name="guide"
                  type="text"
                  placeholder="Guide Name"
                  className="input"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 group" controlId="formBasicPassword">
                <img src={process.env.PUBLIC_URL + "/images/file.png"} alt="" />

                <Form.Label>Upload Project File</Form.Label>
                <Form.Control
                  name="file"
                  type="file"
                  className="file-upload input"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 group" controlId="formBasicPassword">
                <Button
                  onClick={uploadDetails}
                  type="submit"
                  variant="contained"
                  id="submit-btn"
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>

            {/* <DragAndDrop/> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
