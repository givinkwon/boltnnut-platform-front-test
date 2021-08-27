import axios from "axios";
import { ROOT_URL } from "../index";

// 리뷰 저장하기
export function setReview(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/partnerreview/`,
    data: req.data ? req.data : null,
  });
}

// 리뷰 불러오기
export function getReview(req) {
  return axios({
    method: "GET",
    url: `${ROOT_URL}/partnerreview/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

// 리뷰 다음 페이지 불러오기
export function getNextReviewPage(req) {
    return axios({
      method: "GET",
      url: req.nextUrl,
      params: req.params ? req.params : null,
      headers: req.headers ? req.headers : null,
    });
  }