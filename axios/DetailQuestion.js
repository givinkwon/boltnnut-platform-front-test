import axios from 'axios';
import { ROOT_URL } from './index';

//  QuestionTitle
export function loadTitle() {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/detailQuestionTitle/`,
  });
}
export function loadSelect(title_id) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/detailQuestionSelect/detailQuestionTitle/${title_id}`,
  });
}
