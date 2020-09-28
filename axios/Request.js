import axios from "axios";
import { ROOT_URL } from "./index";

export function findSelect(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/select/category/`,
    data: req.data,
  });
}

export function create(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/requests/`,
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
