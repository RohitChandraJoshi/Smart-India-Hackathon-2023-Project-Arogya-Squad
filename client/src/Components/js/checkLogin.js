export async function checkLogin() {
  try {
    const options = {
      method: "GET",
      headers: {
        tokenKey: localStorage.getItem("token"),
      },
    };
    const response = await fetch("http://localhost:8000/dashboard", options);
    if ((await response.json()).message == "succesfull") return true;
    else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}
