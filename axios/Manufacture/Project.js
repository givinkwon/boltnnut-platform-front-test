import axios from "axios";
import { ROOT_URL } from "../index";

export function getNextPage(req) {
  return axios({
    method: "GET",
    url: req.nextUrl,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getProjects(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/project/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getProjectDetail(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/project/${req.id}/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getCategory(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/category/${req.id}/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getMainCategory(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/maincategory/${req.id}/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function exitProject(req) {
  console.log(req);
  return axios({
    method: "PUT",
    url: `${ROOT_URL}/project/${req.id}/`,
    data: req.data,
  });
}

export function projectView(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/project/view/`,
    data: req.data ? req.data : null,
  });
}
