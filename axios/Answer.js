import axios from "axios";
import { ROOT_URL } from "./index";
import * as StringUtils from "utils/string";

// 충돌 예방을 위해 우선적으로 여기에 모두 작성
export function getClientRequest(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/requests/${req.extraUrl}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getClientRequestList(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/requests/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getNextClientRequestList(req) {
  // client__id 들어갈까?
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

export function getAnswer(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/answer/${req.extraUrl}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getAnswerList(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/answer/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getAnswerById(id) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/answer/${id}`,
  });
}
export function getNextAnswerList(req) {
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

export function getPartnerInfo(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partner/${req.extraUrl}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function patchAnswer(req) {
  return axios.patch(`${ROOT_URL}/answer/${req.extraUrl}`, req.data, {
    headers: req.headers ? req.headers : null,
  });
}

export function postReview(req) {
  return axios.post(`${ROOT_URL}/review/`, req.data, {
    headers: req.headers ? req.headers : null,
  });
}

/*
사용하지 않음
export function activeFirst(req) {
	return axios({
		method: 'POST',
		url: `${ROOT_URL}/answer/first-active/`,
		params: req.params ? req.params : null,
		headers: req.headers ? req.headers : null,
	})
}
*/

export function changeActiveAnswer(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/answer/active/`,
    data: req.data ? req.data : null,
    headers: req.headers ? req.headers : null,
    /*
		data: {
			'partner_id': partnerId,
			'project_id': projectId
		}
		*/
  });
}

export function getDevelopCategories(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/develop/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getDevelopBigCategories(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/developbig/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getMainCategories(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/maincategory/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getCategories(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/category/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}
export function getSubclass(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/subclass/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getCityList(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/city/`,
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
    headers: req.headers ? req.headers : null,
  });
}

export function getReview(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/review/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function patchReview(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/review/${req.id}/`,
    data: req.data ? req.data : null,
    headers: req.headers ? req.headers : null,
  });
}

export function patchRequest(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/requests/${req.id}/`,
    data: req.data ? req.data : null,
    headers: req.headers ? req.headers : null,
  });
}

export function checkAnswer(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/answer/answer_check/`,
    data: req.data ? req.data : null,
    headers: req.headers ? req.headers : null,
  });
}
