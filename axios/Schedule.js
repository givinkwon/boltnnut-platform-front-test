import axios from "axios";
import {ROOT_URL} from "./index";

export function getOccupied(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/schedule/?startAt=${req.startAt}&endAt=${req.endAt}&timeWindow=1`, 
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}
