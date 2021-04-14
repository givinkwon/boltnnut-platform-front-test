import axios from "axios";
import { ROOT_URL } from "./index";
import * as StringUtils from "utils/string";

// 백엔드 view에서 보여주는 요청서 목록을 필터링할 필요 있음
export function getRequests(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/requests/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}
export function getNextPage(req) {
  return axios({
    method: "GET",
    url: req.nextUrl,
    // url: req.nextUrl[4] === 's'
    // 	? req.nextUrl
    // 	: StringUtils.insert(req.nextUrl, 's', 4),
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function postProposal(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/answer/`,
    data: req.data ? req.data : null,
    headers: req.headers ? req.headers : null,
  });
}

export function minusCoin(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/partner/minus-coin/`,
    data: req.data ? req.data : null,
    headers: req.headers ? req.headers : null,
  });
}

export function sendKakaoTalkToClient(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/client/kakaotalk/`,
    data: req.data ? req.data : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getProject(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/project/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getMyProject() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/project/`,
  });
}

export function getEstimateInfo(index) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/proposal/${index}`,
  });
}
