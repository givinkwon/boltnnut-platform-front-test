import axios from "axios";
import { ROOT_URL } from "./index";
import * as StringUtils from "../utils/string"

export function getDevelop() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/developbig/`,
  });
}

export function getMainCategory(req) {
  if(req){
    return axios({
      method: "GET",
      url: `${ROOT_URL}/maincategory/`,
      params: req.data
    });
  }
  return axios({
    method: "GET",
    url: `${ROOT_URL}/maincategory/`,
  });
}

export function getCategoryMiddle(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/category/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}

export function getSubclass(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/subclass/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}

export function getCategory(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/maincategory/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}

export function getCity() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/city/`,
  });
}

export function getPath() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/path/`,
  });
}

export function getBusiness() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/business/`,
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
    // url: req.nextUrl[4] === 's'
    //   ? req.nextUrl
    //   : StringUtils.insert(req.nextUrl, 's', 4),
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
    // url: req.nextUrl[4] === 's'
    //   ? req.nextUrl
    //   : StringUtils.insert(req.nextUrl, 's', 4),
    headers: req.headers ? req.headers : null,
  })
}
