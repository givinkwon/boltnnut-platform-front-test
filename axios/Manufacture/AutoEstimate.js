import axios from "axios";
import { ROOT_URL } from "../index";

export function create(req) {
    return axios({
      method: "POST",
      url: `${ROOT_URL}/estimate/`,
      data: req.data,
    });
  }

// 도면 및 발주 요청 파일 저장
export function create_dwg(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/dwg/`,
    data: req.data,
  });
}
  