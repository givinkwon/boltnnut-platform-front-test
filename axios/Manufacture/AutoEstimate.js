import axios from "axios";
import { ROOT_URL } from "../index";

export function create(req) {
    return axios({
      method: "POST",
      url: `${ROOT_URL}/estimate/`,
      data: req.data,
    });
  }
  