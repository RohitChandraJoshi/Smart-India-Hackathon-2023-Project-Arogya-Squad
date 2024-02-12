import NavBar from "../../../Common/Nav";
import { useEffect, useState } from "react";
import { checkLogin } from "../../../js/checkLogin";
import SubmitFile from "../Research";
import ProjectList from "./ProjectList";

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
      {isLoggedIn && (
        <div>
          {" "}
          <NavBar />
          <ProjectList />{" "}
        </div>
      )}
    </div>
  );
}
