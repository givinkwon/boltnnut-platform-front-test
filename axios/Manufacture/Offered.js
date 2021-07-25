import axios from "axios"
import { ROOT_URL } from "../index"
import * as StringUtils from 'utils/string'

export function getAnswerList(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/answer/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}
export function getNextPage(req) {
  return axios({
    method: 'GET',
    url: req.nextUrl,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}

export function getProject(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/project/${req.extraUrl ? req.extraUrl : ''}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}

export function getReview(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/review/`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}

export function getClient(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/client/${req.extraUrl ? req.extraUrl : ''}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  })
}
