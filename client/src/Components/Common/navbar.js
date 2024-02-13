import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../css/Nav/nav.css";
import Button from "@mui/material/Button";

function NavBar() {
  async function handleSubmit(event) {
    event.preventDefault();
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
    const getToken = await fetch("https://pg-dissertation-management-system.onrender.com/auth/login", options);
    const data = await getToken.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("id", data.id);
      window.location.href = "/dashboard";
    } else {
      console.log("Error");
    }
  }

  return (
    <Navbar id="navbar" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <h3>OurApp</h3>
        </Navbar.Brand>
        <Nav id="nav-child" className="me-auto">
          <form id="form" onSubmit={handleSubmit}>
            <input
              placeholder="Enter email"
              type="email"
              name="email"
              id=""
            ></input>
            <input
              placeholder="Enter password"
              type="password"
              name="password"
              id=""
            ></input>
            <Button type="submit" variant="contained">
              Sign In
            </Button>
          </form>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
