import { observable, action } from "mobx";

import * as DetailQuestionAPI from "axios/DetailQuestion";
import Router from "next/router";

class DetailQuestion {
    @observable title_list = [];
    @observable select = [];

    @action init = async () => {
        await DetailQuestionAPI.loadTitle()
        .then(res => {
            this.title_list = res.data;
          }
        )
    }
}

export default new DetailQuestion()
