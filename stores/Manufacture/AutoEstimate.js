import { observable, action } from "mobx";
import { toJS } from "mobx";

import * as AutoEstimateAPI from "axios/Manufacture/AutoEstimate";

class AutoEstimate {


  // 견적서 로딩 state 
  @observable loadingEstimate = false;

  // 파일을 하나 이상 올렸는지에 대한 여부 검사 변수
  @observable checkFileUpload = false;

  // 절삭가공 견적
  @observable CNCPrice = 0;
  // 금형 견적
  @observable MoldPrice = 0;
  // 사출 견적
  @observable InjectionPrice = 0;

  // 공정 대분류 : 절삭가공 | 금형 > ID 선택, 미선택 시 0
  @observable BigCategory = 0;

  // 공정 중분류 : 금형 - 실리콘 | 플라스틱 > ID 선택, 미선택 시 0
  @observable MidCategory = 0;

  // 재료 분류 : 절삭가공(금속류), 금형(실리콘 재료 | 플라스틱 재료) > ID 선택, 미선택 시 0
  @observable Material = 0;
  
  // 수량 변수
  @observable quantity = 0;

  // CNC 가격 저장
  @action set_cncprice = (val) => {
    this.CNCPrice = val;
    console.log(this.CnCPrice)
  };

  // 금형 가격 저장
  @action set_moldprice = (val) => {
    this.MoldPrice = val;
    console.log(this.MoldPrice)
  };

  // 사출 가격 저장
  @action set_injectionprice = (val) => {
    this.InjectionPrice = val;
    console.log(this.InjectionPrice)
  };

  // 사출 가격 저장
  @action set_injectionprice = (val) => {
    this.InjectionPrice = val;
    console.log(this.InjectionPrice)
  };

  // 공정 대분류 저장
  @action set_bigcategory = (idx) => {
    this.BigCategory = idx;
    console.log(this.BigCategory)
  };

  // 공정 중분류 저장
  @action set_midcategory = (idx) => {
    this.MidCategory = idx;
    console.log(this.MidCategory)
  };

  // 재료 저장
  @action set_material = (idx) => {
    this.Material = idx;
    console.log(this.Material)
  };

  // 수량 저장
  @action set_quantity = (idx) => {
    this.Quantity = idx;
    console.log(this.Quantity)
  };

  @action reset = async () => {
    @observable loadingEstimate = false;
    @observable checkFileUpload = false;
    @observable CNCPrice = 0;
    @observable MoldPrice = 0;
    @observable InjectionPrice = 0;
    @observable BigCategory = 0;
    @observable MidCategory = 0;
    @observable Material = 0;
    @observable quantity = 0;
    }
}

export default new AutoEstimate();