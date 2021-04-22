import axios from "axios";
import { ROOT_URL } from "./index";

export function saveChat(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/chatlog/`,
    data: req,
  });
}

export function loadChat() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/chatlog/`,
  });
}
