
import axios from "axios";
import { ROOT_URL } from "./index";

export function login(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/users/login/`,
    data: req.data,
  });
}

export function reloadUserInfo(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/users/data/`,
    headers: req.headers ? req.headers : null,
  })
}

export function clientSignup(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/client/signup/`,
    data: req.data,
  });
}

export function partnerSignup(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/partner/signup/`,
    data: req.data,
  });
}

export function sendPassword(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/users/password/email/`,
    data: req.data,
  });
}
export function findId(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/users/findemail/`,
    data: req.data,
  });
}
export function changePassword(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/users/password/`,
    data: req.data,
    headers: req.headers ? req.headers : null,
  });
}

export function deactivateUser(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/users/deactivate/`,
    data: req.data,
    headers: req.headers ? req.headers : null,
  });
}