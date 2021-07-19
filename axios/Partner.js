import axios from "axios";
import { ROOT_URL } from "./index";
import * as StringUtils from "../utils/string";

export function search(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partner/`,
    params: req.data,
  });
}

export function getPartner(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partner/${req.extraUrl}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function searchjust(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/justpartner/`,
    params: req.data,
  });
}

export function searchrandom(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/randompartner/`,
    params: req.data,
  });
}

export function matchPartner(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partner/request/`,
    params: req.params,
    headers: req.headers,
  });
}

export function detail(id) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partner/${id}/`,
  });
}

export function patch(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/partner/${req.id}/`,
    headers: req.headers ? req.headers : null,
    data: req.data ? req.data : null,
  });
}

export function getPortfolioList(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/portfolio/`,
    headers: req.headers ? req.headers : null,
    params: req.params ? req.params : null,
  });
}

export function postPortfolio(req, formData) {
  return axios.post(`${ROOT_URL}/portfolio/`, formData, {
    headers: req.headers ? req.headers : null,
  });
}

export function patchPortfolio(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/portfolio/${req.id}/`,
    headers: req.headers ? req.headers : null,
    data: req.data ? req.data : null,
  });
}

export function deletePortfolio(req) {
  return axios({
    method: "DELETE",
    url: `${ROOT_URL}/portfolio/${req.id}/`,
    headers: req.headers ? req.headers : null,
  });
}

export function getNextPage(req) {
  return axios({
    method: "GET",
    url: req.nextUrl,
    headers: req.headers ? req.headers : null,
  });
}

export function getNextJustPage(req) {
  return axios({
    method: "GET",
    url: req.nextUrl,
    headers: req.headers ? req.headers : null,
  });
}

export function postStructure(req, formData) {
  return axios.post(`${ROOT_URL}/structure/`, formData, {
    headers: req.headers ? req.headers : null,
  });
}
export function patchStructure(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/structure/${req.id}/`,
    headers: req.headers ? req.headers : null,
    data: req.data ? req.data : null,
  });
}
export function deleteStructure(req) {
  return axios({
    method: "DELETE",
    url: `${ROOT_URL}/structure/${req.id}/`,
    headers: req.headers ? req.headers : null,
  });
}
//20200925
export function postResume(req, formData) {
  return axios.post(`${ROOT_URL}/resume/`, formData, {
    headers: req.headers ? req.headers : null,
  });
}
export function patchResume(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/resume/${req.id}/`,
    headers: req.headers ? req.headers : null,
    data: req.data ? req.data : null,
  });
}
export function deleteResume(req) {
  return axios({
    method: "DELETE",
    url: `${ROOT_URL}/resume/${req.id}/`,
    headers: req.headers ? req.headers : null,
  });
}

export function postMachine(req, formData) {
  return axios.post(`${ROOT_URL}/machine/`, formData, {
    headers: req.headers ? req.headers : null,
  });
}
export function patchMachine(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/machine/${req.id}/`,
    headers: req.headers ? req.headers : null,
    data: req.data ? req.data : null,
  });
}
export function deleteMachine(req) {
  return axios({
    method: "DELETE",
    url: `${ROOT_URL}/machine/${req.id}/`,
    headers: req.headers ? req.headers : null,
  });
}

export function postCertification(req, formData) {
  return axios.post(`${ROOT_URL}/certification/`, formData, {
    headers: req.headers ? req.headers : null,
  });
}
export function patchCertification(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/certification/${req.id}/`,
    headers: req.headers ? req.headers : null,
    data: req.data ? req.data : null,
  });
}
export function deleteCertification(req) {
  return axios({
    method: "DELETE",
    url: `${ROOT_URL}/certification/${req.id}/`,
    headers: req.headers ? req.headers : null,
  });
}

export function postProcess(req, formData) {
  return axios.post(`${ROOT_URL}/process/`, formData, {
    headers: req.headers ? req.headers : null,
  });
}
export function patchProcess(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/process/${req.id}/`,
    headers: req.headers ? req.headers : null,
    data: req.data ? req.data : null,
  });
}
export function deleteProcess(req) {
  return axios({
    method: "DELETE",
    url: `${ROOT_URL}/process/${req.id}/`,
    headers: req.headers ? req.headers : null,
  });
}

export function getPartnerAnswer(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/answer/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getProject(id, req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/project/${id}/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getClient(id, req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/client/${id}/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getMyPartner() {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/randompartner/`,
  });
}

export function getRandomPartner(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/partner/category/`,
    data: req.data ? req.data : null,
  });
}

export function getPartners(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partner/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getCategory(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/develop/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getNextDevelopPage(req) {
  return axios({
    method: "GET",
    url: req.nextUrl,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getCity(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/city/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getNextCityPage(req) {
  return axios({
    method: "GET",
    url: req.nextUrl,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getPartnerCategory(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/develop/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function setReview(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/partnerreviewtemp/`,
    data: req.data ? req.data : null,
  });
}

export function getReview(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partnerreviewtemp/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getNextReviewPage(req) {
  return axios({
    method: "GET",
    url: req.nextUrl,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getClientEmail(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/client/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function setReqProducerInfo(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/requestinfo/`,
    data: req.data ? req.data : null,
  });
}

export function setclickLog(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/clicklog/`,
    data: req.data ? req.data : null,
  });
}

export function getCityName(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/city/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getPartnerName(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partner/find-partner-name/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function setPartnerReview(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/partnerreview/create/`,
    data: req.data ? req.data : null,
  });
}

export function getReviewByPartner(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partnerreview/partner_filter/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function checkReviewWriting(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partnerreview/client_filter/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getPPTInfo(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partner/pptx-find-text/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function setBookmarkPartner(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/bookmark/add/`,
    data: req.data ? req.data : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getBookmarkByClient(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/bookmark/client/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getTotalBookmarkByPartner(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/bookmark/partner/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function deleteBookmarkPartner(req) {
  return axios({
    method: "DELETE",
    url: `${ROOT_URL}/bookmark/sub/`,
    data: req.data ? req.data : null,
    headers: req.headers ? req.headers : null,
  });
}

export function existBookmarkPartner(req) {
  console.log(req);

  return axios({
    method: "GET",
    url: `${ROOT_URL}/bookmark/exist/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}
