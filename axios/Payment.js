
import axios from "axios";
import { ROOT_URL } from "./index";

export function order(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/paylist/order/`,
    data: req.data,
  });
}

export function pay(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/paylist/payment/`,
    data: req.data,
  });
}

export function addCoin(req) {
  return axios({
    method: "PATCH",
    url: `${ROOT_URL}/partner/coin/`,
    data: req.data,
    headers: req.header,
  })
}
