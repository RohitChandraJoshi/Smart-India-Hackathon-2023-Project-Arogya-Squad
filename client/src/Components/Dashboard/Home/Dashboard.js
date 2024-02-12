import React, { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import { checkLogin } from "../../js/checkLogin";

export default function Dashboard({ socket }) {
  const [isLoggedIn, changeState] = useState(false);
  useEffect(() => {
    (async () => {
      const userLoggedIn = await checkLogin();
      userLoggedIn ? changeState(true) : (window.location.href = "/");
    })();
  });

  return <div>{isLoggedIn && <LandingPage socket={socket} />}</div>;
}
