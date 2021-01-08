import axios from 'axios';
import { ROOT_URL } from './index';

//  QuestionTitle
export function loadTitle() {
    return axios({
      method: 'GET',
      url: `${ROOT_URL}/detailQuestionTitle/`,
    });
  }