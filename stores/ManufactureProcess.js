import { observable, action } from "mobx";

import * as ManufactureProcessAPI from "axios/ManufactureProcess";
class ManufactureProcess {
  @observable title_list = [];
  @action init = async () => {
    await ManufactureProcessAPI.loadTitle()
      .then(res => {
          this.title_list = res.data;
        }
      )
  };
}


export default new ManufactureProcess()
