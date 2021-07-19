import axios from "axios"
import { ROOT_URL } from "../index"
import * as StringUtils from 'utils/string'

export function getNextPage(req) {
  return axios({
    method: 'GET',
    url: req.nextUrl,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}

export function getNotice(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/notice/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}

export function getNoticeDetail(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/notice/${req.id}/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}