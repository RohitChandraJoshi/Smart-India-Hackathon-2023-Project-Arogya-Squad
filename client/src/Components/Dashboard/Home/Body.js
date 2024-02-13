import "../../../css/Dashboard/dashboard.css";
import "./Users/Guide/Guide.css";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import Faculty from "./Users/Faculty";
import Student from "./Users/Student";
import StudentBody from "./StudentBody";
import Dean from "./Users/Dean";
import GuideBody from "./Users/Guide/GuideBody";
export default function Body() {
  const [userType, changeUserType] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://pg-dissertation-management-system.onrender.com/get/user/${localStorage.getItem("id")}`,
        { method: "GET" }
      );
      const data = await response.json();
      changeUserType(data.user);
    })();
  });

  return (
    <div>
      {userType === "student" && <StudentBody />}
      {userType === "faculty" && <GuideBody />}
      {userType === "dean" && <Dean />}
    </div>
  );
}
