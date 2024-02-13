import NavBar from "../../../Common/Nav";
import { useEffect, useState } from "react";
import { checkLogin } from "../../../js/checkLogin";
import SubmitFile from "../Research";
import ProjectList from "./ProjectList";
import Sidebar from "G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/Dashboard/Home/Sidebar.js"

export default function HomeProjectList() {
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
          
          <NavBar />
          <ProjectList />{" "}
        </div>
      )}
    </div>
  );
}
