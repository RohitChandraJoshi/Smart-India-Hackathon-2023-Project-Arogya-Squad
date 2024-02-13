import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../Common/Nav";
import UserBody from "./GuideBody";
import { useEffect, useState } from "react";
import { checkLogin } from "../js/checkLogin";
import Sidebar from "G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/Dashboard/Home/Sidebar.js"

export default function TrackProgress() {
  const [isLoggedIn, changeState] = useState(false);
  useEffect(() => {
    (async () => {
      const userLoggedIn = await checkLogin();
      userLoggedIn ? changeState(true) : (window.location.href = "/");
    })();
  });
  return (
    <div>
      <Sidebar />
      {isLoggedIn && (
        <div>
          {" "}
          <NavBar />
          <UserBody />{" "}
        </div>
      )}
    </div>
  );
}
