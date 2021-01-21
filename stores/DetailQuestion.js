import { observable, action } from "mobx";

import * as DetailQuestionAPI from "axios/DetailQuestion";
import Router from "next/router";

class DetailQuestion {
  @observable title_list = [];
  @observable select = [];
  @observable index = 0;
  @observable pageCount = 0;
  @observable nextPage = 0;
  @observable prevPage = [];
  @observable SelectChecked='';
  @observable SelectId=null;
  @action init = async () => {
    await DetailQuestionAPI.loadTitle()
      .then(res => {
          this.title_list = res.data;
        }
      )
  };
  @action loadSelectFromTitle = async (m_index) => {
    await DetailQuestionAPI.loadSelect(m_index)
      .then(res => {
          this.select = res.data;
        }
      )
  };

}


export default new DetailQuestion()
