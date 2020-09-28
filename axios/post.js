import axios from "axios";
import { ROOT_URL } from "./index";

export function getPosts() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/posts/`,
  });
}