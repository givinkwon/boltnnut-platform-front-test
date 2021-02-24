import { observable, action } from "mobx";
import Proposal from './Proposal'

import * as ManufactureProcessAPI from "axios/ManufactureProcess";
class ManufactureProcess {
  @observable title_list = [];
  @observable SelectChecked='';
  @observable SelectedItem=null;
  @observable EstimateDataForDrawing=[];
  @observable MaxPrice=0;
  @observable MinPrice=0;
  @observable totalMinPrice=0;
  @observable totalMaxPrice=0;
  @observable message = '';

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
    this.MinPrice=0;
    this.MaxPrice=0;
    this.totalMinPrice=0;
    this.totalMaxPrice=0;
  };


@action saveSelect = (req) => {
  ManufactureProcessAPI.saveSelect(req)
    .then((res) => {
      console.log("받은 리스폰스",res);
      this.EstimateDataForDrawing = res.data.data;
      console.log(this.EstimateDataForDrawing)
      this.MaxPrice= this.EstimateDataForDrawing.maxPrice;
      this.MinPrice= this.EstimateDataForDrawing.minPrice;
      this.totalMaxPrice= this.EstimateDataForDrawing.totalMaxPrice;
      this.totalMinPrice= this.EstimateDataForDrawing.totalMinPrice;
      this.proposal_type = res.data.proposalId;
      this.message = res.data.message;
      Proposal.loadEstimateInfo(this.proposal_type);
      // console.log("EStimate = proposal_type="+this.proposal_type);
    })
    .catch((e) => {
      console.log(e);
      console.log(e.response);
    });
}
}
export default new ManufactureProcess()