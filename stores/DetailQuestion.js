import { observable, action } from "mobx";

import * as DetailQuestionAPI from "axios/DetailQuestion";
import Router from "next/router";

class DetailQuestion {
    @observable title_list = [];
    @observable select = [];
    @observable index = 2;

    @action init = async () => {
        await DetailQuestionAPI.loadTitle()
            .then(res => {
                this.title_list = res.data;
                }
            )
        await DetailQuestionAPI.loadSelect(this.index)
          .then(res => {
                this.select = res.data;
            }
          )
        }
    }

export default new DetailQuestion()
