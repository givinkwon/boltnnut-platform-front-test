import { observable, action } from "mobx";
import { toJS } from "mobx";

import * as AutoEstimateAPI from "axios/Manufacture/AutoEstimate";

class AutoEstimate {


  // 견적서 로딩 state 
  @observable loadingEstimate = false;

  // 파일을 하나 이상 올렸는지에 대한 여부 검사 변수
  @observable checkFileUpload = false;

  // 견적 생성 관련
  @observable fileList = [] // 도면 파일 리스트

  // 현재 가장 최근 도면 파일
  @observable file = 0 

  // 도면 파일 저장
  @action set_file = (obj) => {
    // obj 형태일 때만 저장
    if (typeof obj == "object") {
      this.file = obj;
    }
  };
  
  // 전체 수량 변수
  @observable total_quantity = 0;


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

  // 자동 견적 카드에서 공정 / 소재 선택
  @observable ManufactureOption = [
    { id: 1, name: "절삭가공" },
    { id: 2, name: "금형사출" },
  ] 

  // 금형 사출일 때 소재
  @observable MoldMaterialOption = [
    { id: 0, name: "플라스틱" },
    { id: 1, name: "실리콘" },
  ] 
  
  // CNC 일 때 소재
  @observable CNCMaterialOption= [
    { id: 0, name: "알루미늄 6061" },
    { id: 0, name: "알루미늄 6063" },
    { id: 0, name: "알루미늄 2024" },
    { id: 0, name: "알루미늄 7050"},
    { id: 0, name: "알루미늄 7075"},
    { id: 2, name: "구리 101" },
    { id: 2, name: "구리 260(황동)" },
    { id: 2, name: "구리 C110" },
    { id: 2, name: "구리 C360(황동)"},
    { id: 2, name: "구리 C932(청동)"},
    { id: 5, name: "플라스틱(ABS/PP/PC/PVC)" },
    { id: 3, name: "아크릴" },
    { id: 3, name: "아세틸/나일론" },
    { id: 6, name: "스테인리스 15-5"},
    { id: 6, name: "스테인리스 17-4"},
    { id: 6, name: "스테인리스 303" },
    { id: 6, name: "스테인리스 304" },
    { id: 6, name: "스테인리스 316" },
    { id: 6, name: "스테인리스 410"},
    { id: 6, name: "스테인리스 416"},
    { id: 6, name: "스테인리스 420"},
    { id: 6, name: "스테인리스 440"},
    { id: 1, name: "철 1018"},
    { id: 1, name: "철 1215"},
    { id: 1, name: "철 4130"},
    { id: 1, name: "철 4140"},
    { id: 1, name: "철 4140PH"},
    { id: 1, name: "철 4340"},
    { id: 1, name: "철 A36"},
    { id: 1, name: "티타늄"},
    { id: 6, name: "기타 소재"},
  ] 

  

  // 공정 선택 시 값 저장 => 초기값 CNC
  @observable selectedManufacture = { id: 1, name: "절삭가공" };


  @observable selectedMaterial = { id: 0, name: "알루미늄 6061" };

  // 견적서를 생성할 때 호출하는 함수
  @action create_estimate = () => {

    // 데이터 생성
    var formData = new FormData();

    // 도면 파일 리스트
    formData.append("blueprint", this.file);
    
    // 공정 id
    formData.append("process", 1);
    // 재료 id
    formData.append("material", 0);

    const req = {
      data: formData,
    };

    AutoEstimateAPI.create(req)
      .then((res) => {

        console.log(res);        
        // 기본 호출은 CNC로 가정
        this.CNCPrice = res.data.price;


        // 데이터 저장
        this.fileList.push({
          // 크기 관련
          x_length : res.data.data.x_length,
          y_length : res.data.data.y_length,
          z_length : res.data.data.z_length,
          volume : res.data.data.volume,
          // 파일 관련
          stl_file : res.data.stl,
          originFile: this.file,
          fileName : this.file.name,
          // CNC 가격
          price : this.CNCPrice,
          // 금형 가격
          moldPrice : this.MoldPrice,
          injectionPrice : this.InjectionPrice,

          // 선택 수량 관련
          quantity: 1,

          // 공정 선택 관련
          selectedManufacture: { id: 1, name: "절삭가공" },
          selectedMaterial : { id: 0, name: "알루미늄 6061" },
          
          // 납기
          period : Math.ceil(res.data.price/250000),

          // 기타
          checked : true,
        })
        // 가격 리로딩
        this.countPrice();

        // 개수 초기화
        this.checkQuantity(0,1,0);

      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  }

  // 도면 및 발주 요청 파일 저장
  @action create_dwg = () => {

    // 데이터 생성
    var formData = new FormData();

    // 도면 및 발주 요청 파일 리스트
    for (var i = 0; i < this.request_file_set.length; i++) {
      formData.append(`dwg`, this.request_file_set[i]);
    }

    const req = {
      data: formData,
    };

    AutoEstimateAPI.create_dwg(req)
      .then((res) => {
          console.log(res)
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  }

  // 견적 카드에서 카테고리를 변경할 때 사용하는 함수
  @action ReloadAutoEstimate = (fileIdx) => {
  // 데이터 생성
  var formData = new FormData();



  // 도면 파일 리스트
  formData.append("blueprint", this.fileList[fileIdx].originFile);
  // 공정 id
  formData.append("process", this.fileList[fileIdx].selectedManufacture.id);
  // 재료 id
  formData.append("material", this.fileList[fileIdx].selectedMaterial.id);

  const req = {
    data: formData,
  };

  AutoEstimateAPI.create(req)
      .then((res) => {
        console.log(res);
        
        // CNC인 경우
        if(this.fileList[fileIdx].selectedManufacture.id == 1){
          this.CNCPrice = res.data.price;
          this.MoldPrice = 0;
          this.InjectionPrice = 0;
          // 납기일 => 20만원당 하루
          this.fileList[fileIdx].period = Math.ceil(res.data.price/200000)
        } 
        // 금형인 경우
        else {
          this.CNCPrice = 0;
          this.MoldPrice = res.data.mold_price;
          this.InjectionPrice = res.data.injection_price;
          // 납기일 => 60영업일
          this.fileList[fileIdx].period = 60;
        }

        // CNC 가격
        this.fileList[fileIdx].price = this.CNCPrice,
        // 금형 가격
        this.fileList[fileIdx].moldPrice = this.MoldPrice,
        this.fileList[fileIdx].injectionPrice = this.InjectionPrice,

        // 가격 리로딩
        this.countPrice();

      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action setManufacture = (e, idx) => {
    this.fileList[idx].selectedManufacture = e; // 공정 선택
    
    // 절삭가공을 선택한 경우 => 소재 변경해주기
    if(this.fileList[idx].selectedManufacture.id == 1){
      this.fileList[idx].selectedMaterial = { id: 0, name: "알루미늄 6061" },
      console.log(this.fileList[idx].selectedMaterial)
    } 
    // 금형 사출을 선택한 경우 => 소재 변경해주기
    else {
      this.fileList[idx].selectedMaterial = { id: 0, name: "플라스틱" },
      console.log(this.fileList[idx].selectedMaterial)
    }

    // 가격 리로딩
    this.countPrice();

  };

  @action setMaterial = (e, idx) => {
    this.fileList[idx].selectedMaterial = e; // 소재 선택
    // 가격 리로딩
    this.countPrice();

  };

  @observable quantity = 0; // 주문 개수
  // 전체 가격 관련
  @observable totalPrice = 0; // 전체 주문 가격
  @observable totalMoldPrice = 0 // 전체 금형 가격
  @observable totalInjectionPrice = 0 // 전체 사출 가격
  @observable totalCNCPrice = 0 // 전체 CNC 가격

  // 전체 납기 관련
  @observable totalPeriod = 1;

  // 체크에 따라 총 주문 개수를 세는 함수
  @action checkQuantity = (idx = 0, current_value = 0, checked = 0) => {
  
    if (checked === 1) {
      // 체크가 되어 있는 경우 => 제외해야하므로
      this.fileList[idx].quantity = 0;
      this.fileList[idx].period = 0;
    } else {
      // 체크가 되어 있지 않던 경우
      this.fileList[idx].quantity = current_value;
      
      // CNC 체크인 경우
      if(this.fileList[idx].selectedManufacture.id == 1){
        // 20만원당 하루
        this.fileList[idx].period = Math.ceil(this.fileList[idx].price * this.fileList[idx].quantity / 200000) 
      }
    }

    // 전체 수량 세기
    this.total_quantity = 0
    // 전체 납기 세기
    this.totalPeriod = 1

    for (let i = 0; i < this.fileList.length; i++) {
      // 도면 개수 전체 합한 것
      this.total_quantity += parseInt(this.fileList[i].quantity); // 문자열이라 숫자로 바꿔줘야함
      this.totalPeriod += parseInt(this.fileList[i].period)
    };

    // 가격 리로딩
    this.countPrice();

  }

  // 주문 개수 변경에 따라 총 주문 개수를 세는 함수
  @action countQuantity = (idx, current_value) => {

    this.fileList[idx].quantity = current_value;
    // CNC 체크인 경우
    if(this.fileList[idx].selectedManufacture.id == 1){
      // 20만원당 하루
      this.fileList[idx].period = Math.ceil((this.fileList[idx].price * this.fileList[idx].quantity) / 200000) 
    }
    
    // 전체 수량 세기
    this.total_quantity = 0
    // 전체 납기 세기
    this.totalPeriod = 1

    for (let i = 0; i < this.fileList.length; i++) {
      this.total_quantity += parseInt(this.fileList[i].quantity); // 문자열이라 숫자로 바꿔줘야함
      this.totalPeriod += parseInt(this.fileList[i].period)
    };

    // 가격 리로딩
    this.countPrice();

  }

  // 각각의 도면 데이터들의 가격과 총 주문금액을 계산하는 함수
  @action countPrice() {
    // 가격 초기화
    this.totalMoldPrice = 0;
    this.totalInjectionPrice = 0;
    this.totalCNCPrice = 0;
    this.totalPrice = 0;
    // 납기일 초기화
    this.totalPeriod = 1;

    this.fileList.map((data, idx) => {
        // 도면 데이터가 체크 되어 있는 경우에만 총 주문금액 계산
        if (data.checked) {
          this.totalMoldPrice += data.moldPrice;
          this.totalInjectionPrice += data.injectionPrice * data.quantity;
          this.totalCNCPrice += data.price * data.quantity;
          this.totalPeriod += data.period
          }  
    });
    // 전체 주문 가격
    this.totalPrice = this.totalMoldPrice + this.totalInjectionPrice + this.totalCNCPrice;

    //console.log(this.totalMoldPrice, this.totalInjectionPrice, this.totalCNCPrice, this.totalPrice)
  }

  // 자동견적에 넣는 발주 요청 파일
  @observable request_file_set = [];

  // 의뢰 파일 추가하기
  @action set_file_set = (obj) => {
    if (typeof obj == "object") {
      this.request_file_set.push(obj);
      console.log("file uploaded");
    } else {
      this.request_file = null;
    }
  };

  // 의뢰 파일 삭제하기
  @action delete_File = (deleteIdx) => {
    // 파일 삭제하기
    this.request_file_set.splice(deleteIdx, 1);
    console.log(deleteIdx, this.request_file_set);
  };

  @action reset = async () => {
    this.fileList = [];
    this.loadingEstimate = false;
    this.checkFileUpload = false;
    this.CNCPrice = 0;
    this.MoldPrice = 0;
    this.InjectionPrice = 0;
    this.BigCategory = 0;
    this.MidCategory = 0;
    this.Material = 0;
    this.quantity = 0;
    }
}

export default new AutoEstimate();