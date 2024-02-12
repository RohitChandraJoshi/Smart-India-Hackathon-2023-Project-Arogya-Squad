import React from "react";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

import "../../css/LoginSignup.css";
import { Select, MenuItem } from "@mui/material";

function Signup() {
  const [action, setAction] = useState("Login");
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    if (action === "Sign Up") {
      console.log(12);
      const form = new FormData(event.target);
      const email = form.get("email");
      const firstName = form.get("first_name");
      const lastName = form.get("last_name");
      const rollNo = form.get("rollno");
      const password = form.get("password");
      console.log(rollNo);
      const options = {
        method: "POST",
        body: new URLSearchParams({
          email: email,
          firstName,
          lastName,
          password: password,
          user: selectedOption,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      };
      const response = await fetch(
        "http://localhost:8000/auth/signup",
        options
      );
      const data = await response.json();
      if (data.error) alert(data.error);
      else if (data.message) window.location.href = "/";
      else console.log(data);
    } else {
      const form = new FormData(event.target);
      const email = form.get("email");
      const password = form.get("password");

      const options = {
        method: "POST",
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      };
      const response = await fetch("http://localhost:8000/auth/login", options);
      const data = await response.json();
      if (data.error) alert(data.error);
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("firstname", data.firstname);
        localStorage.setItem("lastname", data.lastname);
        localStorage.setItem("id", data.id);
        window.location.href = "/dashboard";
      } else alert("Incorrect Login Credentials");
    }
  }
  return (
    <form className="auth-container" method="POST" onSubmit={handleSubmit}>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              required="true"
              name="first_name"
              type="text"
              placeholder="Enter First Name"
            />
          </div>
        )}
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              required="true"
              name="last_name"
              type="text"
              placeholder="Enter Last Name"
            />
          </div>
        )}
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Choose a car"
              placeholder="Chose a role"
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="dean">Dean</MenuItem>
              <MenuItem value="faculty">Faculty</MenuItem>
              <MenuItem value="hod">HOD</MenuItem>
            </Select>
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            required="true"
            name="email"
            type="email"
            placeholder="Enter e-mail address"
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            required="true"
            name="password"
            type="password"
            placeholder="Enter password"
          />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Lost Password? <span>Click Here! </span>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
      <Button
        sx={{
          backgroundColor: "#C43EF3",
          width: "80%",
          height: "40px",
          margin: "auto",
          color: "#fff",
          marginBottom: "30px"
        }}
        type="submit"
        className="auth-btn"
        onSubmit={handleSubmit}
      >
        Submit{" "}
      </Button>
    </form>
  );
}
export default Signup;
