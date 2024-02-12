import React from "react";
import NavBar from "../../Common/Nav";
import { useEffect, useState } from "react";
import { checkLogin } from "../../js/checkLogin";

export default function Profile() {
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
        <div className="profile">
          {" "}
          <NavBar /> <div> Hello </div>
        </div>
      )}
    </div>
  );
}
