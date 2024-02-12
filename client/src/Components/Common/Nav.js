import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../css/Nav/nav.css";
import Button from "@mui/material/Button";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#ffff",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    green: {
      main: "#4CAF50",
    },
  },
});

function NavBar() {
  const [state, changeState] = useState(false);
  function createPost() {
    changeState(true);
  }
  return (
    <Navbar id="navbar" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <h3 style={{ color: 'white' }}>PG APP</h3>
        </Navbar.Brand>
        <Nav id="nav-child" className="me-auto">
          <div className="nav-bar-icons">
            <h4 style={{ color: 'white' }}>
              Welcome{" "}
              <span style={{ color: "#068FFF" }}>
                {localStorage.getItem("firstname") + " " + localStorage.getItem("lastname")}
              </span>
            </h4>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
