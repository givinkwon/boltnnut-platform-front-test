import axios from "axios";
import { ROOT_URL } from "../index";

// Sample 요청 저장을 위한 API
export function create(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/sample/`,
    data: req.data ? req.data : null,
  });
}