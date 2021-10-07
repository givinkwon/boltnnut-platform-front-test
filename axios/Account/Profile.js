import axios from "axios";
import { ROOT_URL } from "../index";

export function savePartnerInfo(req, id) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/partner/${id}/`,
    data: req.data,
  });
}

export function saveAccount(req, id) {
    return axios({
      method: "PATCH",
      url: `${ROOT_URL}/user/${id}/`,
      data: req.data,
    });
  }
  
