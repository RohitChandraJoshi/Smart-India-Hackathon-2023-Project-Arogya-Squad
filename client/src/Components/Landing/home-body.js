import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Signup from "./SignUp";

function Body() {
  return (
    <Container style={{ background: "", padding: "1% 0%" }} fluid>
      <Row>
        <Col>
          <Signup />
        </Col>
      </Row>
    </Container>
  );
}
export default Body;
