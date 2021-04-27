import axios from "axios";
import { ROOT_URL } from "./index";

export function saveChat(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/chatlog/`,
    data: req,
  });
}

export function loadChat(id) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/chatlog/?answer=${id}&ordering=-id`,
    // order: [["id", "DESC"]], //DESC
  });
}

export function loadChatCount(id) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/answer/${id}`,
  });
}

export function saveChatCount(req) {
  // console.log("RRRQWEWEWEEWEWEWEWE");
  console.log(req.params);
  console.log(`${ROOT_URL}/answer/${req.extraUrl}`);
  return axios({
    method: "PUT",
    url: `${ROOT_URL}/answer/${req.extraUrl}`,
    data: req.params ? req.params : null,
  });
}
