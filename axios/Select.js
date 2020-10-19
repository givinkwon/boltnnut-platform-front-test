import axios from "axios";
import {ROOT_URL} from "./index";

export function getSelectSave(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/select_save/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}
