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

export function saveChatCount(id, req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/answer/${id}`,
    data: req,
  });
}
