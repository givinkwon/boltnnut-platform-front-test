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
  @observable ManufactureProcessList = [];
  @observable selectedBigCategory=null;
  @observable selectedMidCategory=null;
  @observable midCategorySet=[];
  @observable categoryDefaultValue={
    big:null,
    mid:null
}
  
  @action init = async () => {
    await ManufactureProcessAPI.loadTitle()
      .then(res => {
          this.title_list = res.data;
          console.log(this.title_list);

          const arr = [...res.data.data]
          console.log(arr)

          this.ManufactureProcessList=[]; //초기화

          for(let i=0;i<arr.length;i++)
          {
            console.log("a"+arr.length)
            this.ManufactureProcessList.push({name:arr[i].name,id:arr[i].id,detail:[]});
            
            for(let j=0;j<arr[i].detailManufactureProcess.length;j++)
            {
              // console.log("b"+arr[i].detailManufactureProcess.length)
              this.ManufactureProcessList[i].detail.push(
                {
                  name:arr[i].detailManufactureProcess[j].name,
                  id:arr[i].detailManufactureProcess[j].id
            });
            }
          }
          console.log(this.ManufactureProcessList)
        }
      )
    this.setDefaultValue('CNC')
    this.reset()
  };

  @action setBigCategory = (e) =>
  {
    this.selectedBigCategory = e;
    this.midCategorySet = e.detail;
    this.selectedMidCategory=e.detail[0];
  };
  
  @action reset = async () => {
    this.SelectChecked='';
    this.MinPrice=0;
    this.MaxPrice=0;
    this.totalMinPrice=0;
    this.totalMaxPrice=0;
  };

  @action setDefaultValue = (name) => {
    // this.categoryDefaultValue = this.ManufactureProcessList[2];
    this.ManufactureProcessList.forEach(t=>
      {
        if(t.name==name)
        {
          this.categoryDefaultValue.big = t;
          this.categoryDefaultValue.mid = t.detail[0];
          this.midCategorySet=t.detail;

        }
      })
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
      return res;
    })
    .catch((e) => {
      console.log(e);
      console.log(e.response);
    });
}
}
export default new ManufactureProcess()