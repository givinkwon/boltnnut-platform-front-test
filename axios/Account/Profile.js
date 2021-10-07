import axios from "axios";
import { ROOT_URL } from "../index";

export function savePartnerInfo(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/partner/${req.id}/`,
  });
}
