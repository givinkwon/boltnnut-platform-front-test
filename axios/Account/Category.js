import axios from "axios";
import { ROOT_URL } from "../index";
import * as StringUtils from "utils/string";

// 만든 제품 분야 : 대분류
export function getMainCategory(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/maincategory/`,
  });
}

// 만든 제품 분야 : 중분류
export function getCategory(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/category/`,
  });
}

// 파트너 등록하기 - 체크박스 저장
export function saveSelectedList(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/partner/signup-page2/`,
    data: req.data,
  });
}

// 파트너 등록하기 - 마지막페이지
export function savePartnerInfo(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/partner/signup-page3/`,
    data: req.data,
  });
}
// 업체 분류 분야 : 대분류
export function getMainbusiness(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/mainbusiness/`,
  });
}

// 업체 분류 분야 : 중분류
export function getBusiness(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/business/`,
  });
}

// 공정 분류 분야 : 대분류
export function getDevelopbig() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/developbig/`,
  });
}

// 공정 분류 분야 : 중분류
export function getDevelop() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/develop/`,
  });
}

// 소재 분류 분야 : 대분류
export function getMainmaterial() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/mainmaterial/`,
  });
}

// 소재 분류 분야 : 중분류
export function getMaterial() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/material/`,
  });
}

// 지역 분류
export function getCity() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/city/`,
  });
}

export function getBusinessName(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/business/${req.id}/`,
  });
}

// ======================= 기타 카테고리 =======================
export function getPath() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/path/`,
  });
}

export function getBusiness_client() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/business_client/`,
  });
}

export function getRegion() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/region/`,
  });
}

export function getNextRegion(req) {
  return axios({
    method: "GET",
    url: nextUrl,
  });
}

export function getMagazine() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/magazine/`,
    params: {
      ordering: "-is_top,-id",
    },
  });
}

export function getNextPage(req) {
  return axios({
    method: "GET",
    url: req.nextUrl,
    headers: req.headers ? req.headers : null,
  });
}
