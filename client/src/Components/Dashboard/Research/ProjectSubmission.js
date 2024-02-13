import NavBar from "../../Common/Nav";
import { useEffect, useState } from "react";
import { checkLogin } from "../../js/checkLogin";
import SubmitFile from "./Research";
import Sidebar from "G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/Dashboard/Home/Sidebar.js"

export default function ProjectSubmission() {
  const [isLoggedIn, changeState] = useState(false);
  useEffect(() => {
    (async () => {
      const userLoggedIn = await checkLogin();
      userLoggedIn ? changeState(true) : (window.location.href = "/");
    })();
  });
  return (
    <div>
      {isLoggedIn && (
        <div>
          <Sidebar />
          <NavBar />
          <SubmitFile />{" "}
        </div>
      )}
    </div>
  );
}
