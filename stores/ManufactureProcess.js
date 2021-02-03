import { observable, action } from "mobx";

import * as ManufactureProcessAPI from "axios/ManufactureProcess";
class ManufactureProcess {
  @observable title_list = [];
  @observable SelectChecked='';
  @observable SelectedItem=null;

  @action init = async () => {
    await ManufactureProcessAPI.loadTitle()
      .then(res => {
          this.title_list = res.data;
        }
      )
    this.reset()
  };

  @action reset = async () => {
    this.SelectChecked='';
  };


@action saveSelect = (req) => {
  ManufactureProcessAPI.saveSelect(req)
    .then((res) => {
      console.log("받은 리스폰스",res);
    })
    .catch((e) => {
      console.log(e);
      console.log(e.response);
    });
}
}
export default new ManufactureProcess()