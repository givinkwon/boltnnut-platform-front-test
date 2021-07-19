import axios from "axios";
import { ROOT_URL } from "../index";

//  로그인
export function login(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/users/login/`,
    data: req.data,
  });
}

// 현재 로그인한 사용자 정보
export function reloadUserInfo(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/users/data/`,
    headers: req.headers ? req.headers : null,
  });
}

// 클라이언트 회원가입
export function clientSignup(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/client/signup/`,
    data: req.data,
  });
}

// 파트너 회원가입
export function partnerSignup(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/partner/signup/`,
    data: req.data,
  });
}

// 임시 비밀번호 전송
export function sendPassword(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/users/password/phone/`,
    data: req.data,
  });
}

// 이메일 찾기
export function findId(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/users/findemail/`,
    data: req.data,
  });
}

// 비밀번호 변경
export function changePassword(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/users/password/`,
    data: req.data,
    headers: req.headers ? req.headers : null,
  });
}

// 회원탈퇴
export function deactivateUser(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/users/deactivate/`,
    data: req.data,
    headers: req.headers ? req.headers : null,
  });
}

// Schedule 에서 이름, 회사명, 직책, 부서명 보내기

export function patchClientInfo(req, id) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/client/${id}/`,
    data: req,
  });
}

export function setUserIP(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/accesslog/`,
    data: req.data,
  });
}

export function setUserPageIP(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/pageaccesslog/`,
    data: req.data,
  });
}
