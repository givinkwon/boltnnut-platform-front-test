import axios from "axios";
import { ROOT_URL } from "../index";
import * as StringUtils from "utils/string"

// 만든 제품 분야 : 대분류
export function getMainCategory(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/maincategory/`,
  })
}

// 만든 제품 분야 : 중분류
export function getCategory(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/category/`,
  })
}

// 업체 분류 분야 : 대분류
export function getMainbusiness(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/mainbusiness/`,
  })
}

// 업체 분류 분야 : 중분류
export function getBusiness(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/business/`,
  })
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
  })
}

export function getNextRegion(req) {
  return axios({
    method: "GET",
    url: nextUrl,
  })
}

export function getMagazine() {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/magazine/`,
    params: {
      ordering: '-is_top,-id',
    },
  })
}

export function getNextPage(req) {
  return axios({
    method: "GET",
    url: req.nextUrl,
    headers: req.headers ? req.headers : null,
  })
}
