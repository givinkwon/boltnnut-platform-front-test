import { observable, action } from "mobx";

import * as ManufactureProcessAPI from "axios/ManufactureProcess";
class ManufactureProcess {
  @observable title_list = [];
  @observable SelectChecked='';
  @observable SelectedItem=null;
  @observable EstimateDataForDrawing=[];
  @observable MaxPrice=0;
  @observable MinPrice=0;

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
      this.EstimateDataForDrawing = res.data.data;
      this.MaxPrice= this.EstimateDataForDrawing.totalMaxPrice;
      this.MinPrice= this.EstimateDataForDrawing.totalMinPrice;
    })
    .catch((e) => {
      console.log(e);
      console.log(e.response);
    });
}
}
export default new ManufactureProcess()