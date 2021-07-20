import axios from "axios";
import { ROOT_URL } from "../index";
import * as StringUtils from "utils/string"

// 만든 제품 분야 : 대분류
export function getMainCategory(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/maincategory/`,
    params: req.data ? req.data : null,
  })
}

// 만든 제품 분야 : 중분류
export function getCategory(req) {
return axios({
  method: "GET",
  url: `${ROOT_URL}/category/`,
  params: req.params ? req.params : null,
  headers: req.headers ? req.headers : null,
})
}

// 업체 분류 분야 : 대분류
export function getMainBusiness(req) {
    return axios({
      method: "GET",
      url: `${ROOT_URL}/mainbusiness/`,
      params: req.data ? req.data : null,
    })
}

// 업체 분류 분야 : 중분류
export function getBusiness(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/business/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}

// 공정 분류 분야 : 대분류
export function getDevelopbig() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/developbig/`,
    params: req.data ? req.data : null,
  });
}

// 공정 분류 분야 : 중분류
export function getDevelop() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/develop/`,
    params: req.data ? req.data : null,
  });
}

// 소재 분류 분야 : 대분류
export function getMainmaterial() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/mainmaterial/`,
    params: req.data ? req.data : null,
  });
}

// 소재 분류 분야 : 중분류
export function getMaterial() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/material/`,
    params: req.data ? req.data : null,
  });
}

// 지역 분류
export function getCity() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/city/`,
    params: req.data ? req.data : null,
  });
}

// ======================= 기타 카테고리 ======================= 
export function getPath() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/path/`,
  });
}

export function getBusiness() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/business_category/`,
  });
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
