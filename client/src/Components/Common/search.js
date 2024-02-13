import { useState, useEffect } from "react";
import { search } from "../js/utils";
import SearchedUser from "../UserProfile/searched_user";
export default function Search() {
  const [loading, setState] = useState(null);
  const [query, changeQuery] = useState("");
  const [userData, changeData] = useState([]);

  async function searchPosts(value) {
    if (value === "") {
      changeData([]);
      return;
    }
    setState(true);
    const response = await search(`https://pg-dissertation-management-system.onrender.com/search/user/${value}`);
    setState(false);
    console.log(response);
    changeData(response);
  }

  function changeHandler(e) {
    searchPosts(e.target.value);
    changeQuery(e.target.value);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <input
        value={query}
        onChange={(e) => changeHandler(e)}
        name="user"
        id=""
        placeholder="Enter user title"
      />
      {userData && (
        <div>
          {userData.map((data) => (
            <SearchedUser
              key={data._id}
              id={data._id}
              email={data.email}
              username={data.username}
              post={data.post}
              following={data.following}
              followers={data.followers}
            />
          ))}
        </div>
      )}
    </div>
  );
}
