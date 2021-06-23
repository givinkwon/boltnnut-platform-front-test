import axios from "axios";
import { ROOT_URL } from "./index";

export function saveChat(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/chatlog/`,
    data: req,
    // headers: req.headers ? req.headers : null,
  });
}

export function saveFile(req) {
  console.log(req.data);
  return axios({
    method: "POST",
    url: `${ROOT_URL}/chatlog/`,
    data: req.data,
    // headers: req.headers ? req.headers : null,
  });
}
export function loadChat(req) {
  // console.log(`${ROOT_URL}/chatlog/?answer=${req.extraUrl}`);
  return axios({
    method: "GET",
    // url: `${ROOT_URL}/chatlog/?answer=${req.params.id}&ordering=-id`,
    url: `${ROOT_URL}/chatlog/?answer=${req.extraUrl}`,
    params: req.params ? req.params : null,
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
  // console.log(req.params);
  // console.log(`${ROOT_URL}/answer/${req.extraUrl}`);
  return axios({
    method: "PUT",
    url: `${ROOT_URL}/answer/${req.extraUrl}`,
    data: req.params ? req.params : null,
  });
}

export function patchShareInform(req) {
  // console.log("RRRQWEWEWEEWEWEWEWE");
  console.log(req.params);
  console.log(`${ROOT_URL}/answer/${req.extraUrl}`);
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/answer/${req.extraUrl}`,
    data: req.params ? req.params : null,
  });
}

export function sendJandi(req) {
  return axios({
    method: "POST",
    url: `https://wh.jandi.com/connect-api/webhook/18069463/bf7dce120b1a85f9478b8460db6d07ad`,
    data: req.params,
    headers: req.headers ? req.headers : null,
  });
}
