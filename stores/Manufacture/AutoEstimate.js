import { observable, action } from "mobx";
import { toJS } from "mobx";

import * as AutoEstimateAPI from "axios/Manufacture/AutoEstimate";

class AutoEstimate {


  // 견적서 로딩 state 
  @observable loadingEstimate = false;

  // 파일을 하나 이상 올렸는지에 대한 여부 검사 변수
  @observable checkFileUpload = false;

  // 견적 생성 관련
  @observable file_list = [] // 도면 파일 리스트
  @observable process = 0 // 공정 => 미선택 0, CNC 가공 1 / 금형 가공 2
  @observable material = 0 // 재료 => CNC 0~6, 금형 0~1.

  // 도면 파일 리스트 저장
  @action set_file_list = (obj) => {
    // obj 형태일 때만 저장
    if (typeof obj == "object") {
      this.file_list.push(obj);
    }
  };

  // 공정 저장
  @action set_process = (idx) => {
    this.process = idx;
    console.log(this.process)
  };

  // 재료 저장
  @action set_material = (idx) => {
    this.material = idx;
    console.log(this.material)
  };
  
  // 수량 변수
  @observable quantity = 0;

  // 수량 저장
  @action set_quantity = (idx) => {
    this.Quantity = idx;
    console.log(this.Quantity)
  };


  // 파일 사이즈 관련
  @observable x_length = 0; // x축 길이
  @observable y_length = 0; // y축 길이
  @observable z_length = 0; // z축 길이
  @observable volume = 0; // 부피

  // 절삭가공 견적
  @observable CNCPrice = 0;
  // 금형 견적
  @observable MoldPrice = 0;
  // 사출 견적
  @observable InjectionPrice = 0;

  // 견적서를 생성할 때 호출하는 함수
  @action create_estimate = () => {

    // 데이터 생성
    var formData = new FormData();

    // 도면 파일 리스트
    formData.append("blueprint", this.file_list);
    // 공정 id
    formData.append("process", this.process);
    // 재료 id
    formData.append("material", this.material);

    const req = {
      data: formData,
    };

    AutoEstimateAPI.create(req)
      .then((res) => {

        console.log(res);
        // 데이터 저장
        this.x_length = res.data.x_length;
        this.y_length = res.data.y_length;
        this.z_length = res.data.z_length;
        this.volume = res.data.volume;

        // CNC인 경우
        if(this.process==1){
          this.CNCPrice = res.data.price;
        } 
        // 금형인 경우
        else {
          this.MoldPrice = res.data.mold_price;
          this.InjectionPrice = res.data.injection_price;
        }


      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  }

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