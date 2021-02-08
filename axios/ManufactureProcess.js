import axios from 'axios';
import { ROOT_URL } from './index';

export function loadTitle() {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/manufactureProcess/`,
  });
}

export function saveSelect(req) {
  return axios({
    method: "POST",
    url: `${ROOT_URL}/estimate/`,
    data: req,
  });
}