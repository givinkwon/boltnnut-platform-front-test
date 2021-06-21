import { observable, action } from "mobx";
import Proposal from "./Proposal";
import { toJS } from "mobx";

import * as ManufactureProcessAPI from "axios/ManufactureProcess";
class ManufactureProcess {
  /* 
  
  + import makeObservable
  constructor(value){
    mskeObservable(this)
  }
  */

  constructor() {
    //makeObservable(this);
  }
  @observable loadingEstimate = false;
  @observable title_list = [];
  @observable SelectChecked = "";
  @observable SelectedItem = null;
  @observable EstimateDataForDrawing = [];
  @observable MaxPrice = 0;
  @observable MinPrice = 0;
  @observable totalMinPrice = 0;
  @observable totalMaxPrice = 0;
  @observable moldPrice = 0;
  @observable ejaculationPrice = 0;
  @observable productionPrice = 0;
  @observable message = "";
  @observable ManufactureProcessList = [];
  @observable selectedBigCategory = null;
  @observable selectedMidCategory = null;
  @observable midCategorySet = [];
  @observable categoryDefaultValue = {
    big: null,
    mid: null,
  };
  // 수량 변수
  @observable quantity = 0;
  // 파일을 하나 이상 올렸는지에 대한 여부 검사 변수
  @observable checkFileUpload = false;
  // 금액 관련 변수
  @observable dataPrice = [];
  @observable orderMinPrice = 0;
  @observable orderMaxPrice = 0;
  @observable totalorderPrice = 0;
  @observable calendar_checked = false;
  @observable date_conference = false;
  @observable date_undefined = false;
  @observable date_conference_idx = 0;
  @observable deliverystate = "";

  // 참고 파일 관련 변수
  @observable file = "";
  @observable fileName = "";
  @observable fileArray = [];
  @observable openFileArray = [];
  @observable privateFileArray = [];
  @observable purposeContent = 0;
  // 기타 요청사항 변수
  @observable requestComment = "";
  @observable requestComment2 = "";
  @observable processDataAry = [];
  @observable detailProcessDataAry = [];
  @observable checkPaymentButton = false;
  @observable changeProject = false;
  @observable projectname = "";

  @observable projectSubmitLoading = true;
  @observable nonDrawingProjectSubmitLoading = true;

  @observable loadingSaveSearchText = true;

  @action countQuantity = (data) => {
    data.map((item, idx) => {
      console.log(item);
    });
  };
  @action async getProcess(idx) {
    const req = {
      id: idx,
    };
    await ManufactureProcessAPI.loadProcess(req).then((res) => {
      const data = res.data;
      console.log(data.name);
      return data.name;
    });
  }
  @action getProcessList = async (process, detailProcess) => {
    await ManufactureProcessAPI.loadTitle().then((res) => {
      const arr = [...res.data.data];
      const detailArr = [];
      const arr2 = [];
      console.log(arr);
      this.ManufactureProcessList = [];
      console.log(process);
      console.log(detailProcess);
      for (let i = 0; i < process.length; i++) {
        this.processDataAry.push(arr[process[i] - 1].name);
        detailArr.push(arr[process[i] - 1].detailManufactureProcess);
        // console.log(toJS(this.processDataAry));
        // console.log(detailArr);
        // for (let j = 0; j < detailArr.length; j++) {
        //   console.log(detailArr[i][j].id);
        //   console.log(detailProcess[i].id);
        //   if (detailArr[i][j].id === detailProcess[i].id) {
        //     this.detailProcessDataAry.push(detailArr[i][j].name);
        //     console.log(toJS(this.detailProcessDataAry));
        //   }
        // }
        arr2.push(detailArr[i]);
      }
      console.log(detailArr);
      console.log(arr2);
      // for (let i = 0; i < arr.length; i++) {
      //   this.processDataAry.push({
      //     name: arr[i].name,
      //     // id: arr[i].id,
      //     detail: [],
      //   });
      //   for (let j = 0; j < arr[i].detailManufactureProcess.length; j++) {
      //     // console.log("b"+arr[i].detailManufactureProcess.length)
      //     this.ManufactureProcessList[i].detail.push({
      //       name: arr[i].detailManufactureProcess[j].name,
      //       id: arr[i].detailManufactureProcess[j].id,
      //     });
      //   }
      // }
      // console.log(this.ManufactureProcessList);
    });
    console.log(toJS(this.processDataAry));
    console.log(toJS(this.detailProcessDataAry));
  };
  @action init = async () => {
    console.log("Enter init()");
    await ManufactureProcessAPI.loadTitle().then((res) => {
      console.log("LoadTitle");
      this.title_list = res.data;
      console.log(this.title_list);
      const arr = [...res.data.data];
      console.log(arr);
      this.ManufactureProcessList = []; //초기화
      for (let i = 0; i < arr.length; i++) {
        console.log("a" + arr.length);
        this.ManufactureProcessList.push({
          name: arr[i].name,
          id: arr[i].id,
          detail: [],
        });
        for (let j = 0; j < arr[i].detailManufactureProcess.length; j++) {
          // console.log("b"+arr[i].detailManufactureProcess.length)
          this.ManufactureProcessList[i].detail.push({
            name: arr[i].detailManufactureProcess[j].name,
            id: arr[i].detailManufactureProcess[j].id,
          });
        }
      }
      console.log(this.ManufactureProcessList);
    });
    this.setDefaultValue("금형사출");
    this.reset();
    console.log("Close Init");
  };
  @action setQuantity = (val) => {
    console.log(val);
    this.quantity = val;
  };
  @action setBigCategory = (e) => {
    this.selectedBigCategory = e;
    // this.midCategorySet = e.detail;
    console.log(this.selectedBigCategory);
    this.selectedMidCategory = e.detail[0];
  };
  @action setMidCategory = (e) => {
    this.selectedMidCategory = e;
    console.log("setMidCategory()");
  };
  @action reset = async () => {
    console.log("resetreset");
    if (!this.changeProject) {
      this.SelectChecked = "";
      this.MinPrice = 0;
      this.MaxPrice = 0;
      this.totalMinPrice = 0;
      this.totalMaxPrice = 0;
      this.purposeContent = 0;
      this.projectname = "";
      this.requestComment = "";
      this.requestComment2 = "";
      this.checkFileUpload = false;
      this.openFileArray = [];
      this.privateFileArray = [];
      this.date_conference = false;
      this.date_undefined = false;
    }
  };
  @action setDefaultValue = (name) => {
    // this.categoryDefaultValue = this.ManufactureProcessList[2];
    this.ManufactureProcessList.forEach((t) => {
      console.log(t);
      if (t.name == name) {
        this.categoryDefaultValue.big = t;
        this.categoryDefaultValue.mid = t.detail[0];
        this.selectedBigCategory = t;
        this.selectedMidCategory = t.detail[0];
        console.log(this.categoryDefaultValue.mid);
        this.midCategorySet = t.detail;
      }
    });
  };
  @action saveSelect = (req) => {
    ManufactureProcessAPI.saveSelect(req)
      .then((res) => {
        console.log("받은 리스폰스", res);
        this.EstimateDataForDrawing = res.data.data;
        console.log(this.EstimateDataForDrawing);
        this.moldPrice = Math.round(
          this.EstimateDataForDrawing.totalMinPrice / 10000
        );
        this.ejaculationPrice =
          Math.round(this.EstimateDataForDrawing.MinPrice / 10) * 10;

        this.MaxPrice = this.EstimateDataForDrawing.maxPrice;
        this.MinPrice = this.EstimateDataForDrawing.minPrice;
        this.totalMaxPrice = this.EstimateDataForDrawing.totalMaxPrice;
        this.totalMinPrice = this.EstimateDataForDrawing.totalMinPrice;
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
  };

  @action saveSearchText = (text) => {
    const formData = new FormData();

    formData.append("text", text);

    // const Token = localStorage.getItem("token");

    const req = {
      data: formData,
    };

    ManufactureProcessAPI.saveSearchText(req)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
}
export default new ManufactureProcess();
