import NavBar from "../../Common/Nav";
import { useEffect, useState } from "react";
import { checkLogin } from "../../js/checkLogin";
import SubmitFile from "./Research";

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
          {" "}
          <NavBar />
          <SubmitFile />{" "}
        </div>
      )}
    </div>
  );
}
