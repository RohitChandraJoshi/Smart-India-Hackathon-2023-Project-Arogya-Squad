import axios from "axios";

let resources = {};
function requestCreator() {
  let token;
  return async function (query) {
    if (token) token.cancel();

    token = axios.CancelToken.source();

    try {
      if (resources[query]) return resources[query];
      const res = await axios(query, { cancelToken: token.token });
      const result = res.data.documents;
      resources[query] = result;
      return result;
    } catch (error) {
      if (axios.isCancel(error)) console.log("Request cancelled");
      else console.log("Error   ");
    }
  };
}

export const search = requestCreator();
