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

export function patch(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/requests/${req.id}/`,
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
