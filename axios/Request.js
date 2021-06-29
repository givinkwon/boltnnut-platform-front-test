import axios from "axios";
import { ROOT_URL } from "./index";

export function getRequests(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/requests/?ordering=-id`,
  });
}
export function findSelect(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/select/category/`,
    data: req.data,
  });
}

export function create(req) {
  console.log(req);
  return axios({
    method: "POST",
    url: `${ROOT_URL}/requests/`,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function modifyProject(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/requests/${req.id}/`,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function put(req) {
  return axios({
    method: "PUT",
    url: `${ROOT_URL}/requests/${req.id}/`,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function selectSave(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/select_save/`,
    data: req.data,
  });
}

export function sendKakao(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/partner/kakaotalk/`,
    data: req.data,
    headers: req.headers ? req.headers : null,
  });
}
export function deleteRequest(req) {
  return axios({
    method: "Delete",
    url: `${ROOT_URL}/requestfile/${req.id}/`,
  });
}

export function delEstimate(req) {
  return axios({
    method: "Delete",
    url: `${ROOT_URL}/estimate/${req.id}/`,
  });
}

export function getRequestFile(req) {
  return axios({
    method: "Get",
    url: `${ROOT_URL}/requestfile/`,
    params: req.params ? req.params : null,
  });
}

export function setRequestFile(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/requestfile/`,
    data: req.data,
  });
}

export function sendKakaoTalk(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/answer/chat/`,
    data: req,
  });
}
