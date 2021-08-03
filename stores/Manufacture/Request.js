import { observable, action, makeObservable, toJS } from "mobx";

import * as CategoryAPI from "axios/Account/Category";
import * as PartnerAPI from "axios/Manufacture/Partner";
import * as RequestAPI from "axios/Manufacture/Request";

import Router from "next/router";
import moment from "moment";
import Schedule from "./Schedule";
import ManufactureProcess from "./ManufactureProcess";
import Auth from "stores/Account/Auth";

class Request {
  constructor() {
    //makeObservable(this);
  }

  // 의뢰 관련 index
  // 의뢰 완료 페이지로 넘어가기 위한 Trigger
  @observable newIndex = 0;

  // 의뢰하기 접근한 이전 페이지 => 0인 경우 Nav 바에서, 1인 경우 제조사 검색에서, 2인 경우 제조사 디테일에서
  @observable request_type = ""; 

  // 파트너 상세에서 의뢰하기를 선택했을 때, 선택한 파트너 id
  @observable selected_partner = "";

  // 의뢰서 제출용 데이터
  @observable request_state = -1; // 문의 목적 state => 미선택 -1, 상담요청 0, 견적 요청 1, 업체 수배 2
  @observable request_name = ""; // 의뢰 제목
  @observable request_price = ""; // 희망 예산 금액
  @observable request_price_state = -1; // 예산 조율 state => 미 체크 시에는 -1, 조율 가능 체크 시 0, 상담 후 예산 결정 시 1
  @observable request_period = ""; // 희망 납기일
  @observable request_period_state = 0; // 납기일 협의 state => 체크 시에는 1, 미 체크 시에는 0
  @observable request_contents =
    "1. 프로젝트의 소개 및 제작 목적:   2. 프로젝트의 진행 상황 및 계획 수립 :   3. 프로젝트 기능 및 특이 사항 - 필수로 들어가야 할 기능들  :  4. 참고자료 / 레퍼런스 예시) ‘볼트앤너트 네이버 블로그’ 참고 등 :  5. 제조사(파트너)에게의 요청사항 - 프로젝트 진행 시 파트너가 알아야 할 발주 조건 : ";
  @observable request_file_set = []; // 의뢰 관련 파일
  @observable request_file_secure = 0; // 의뢰 보안 state => 미선택 0, 도면 파일 공개 1, 미공개 2
  @observable request_drawing_set = []; // 의뢰 도면 파일

  // 파트너 상세에서 의뢰서 클릭 한 경우에 id를 넘겨주는 것
  @action partner_request = (val) => {
    this.selected_partner = val;
    console.log(this.selected_partner);
  };

  // 의뢰하기 접근한 이전 페이지 => 0인 경우 Nav 바에서, 1인 경우 제조사 검색에서, 2인 경우 제조사 디테일에서
  @action set_request_type = (val = 0) => {
    this.request_type = val;
    console.log(this.request_type)
  }

  // 의뢰 상태 추가하기
  @action set_state = (val) => {
    // 이미 선택되어 있을 때
    if (this.request_state == val) {
      this.request_state = -1;
      console.log(this.request_state);
      return true;
    } else {
      this.request_state = val;
      console.log(this.request_state);
    }
  };

  // 의뢰 제목 추가하기
  @action set_name = (val) => {
    this.request_name = val;
    console.log(this.request_name);
  };

  // 희망 예산 금액 추가하기
  @action set_price = (obj) => {
    this.request_price = obj;
    console.log(this.request_price);
  };

  // 예산 조율 협의 상태 추가하기
  @action set_period_state = (val) => {
    this.request_period_state = val;
    console.log(this.request_period_state);
  };

  // 납기일 협의 상태 추가하기
  @action set_price_state = (val) => {
    this.request_price_state = val;
  };

  // 의뢰 내용 추가하기
  @action set_contents = (val) => {
    Auth.checkLogin();

    if (!Auth.logged_in_user) {
      alert("로그인이 필요한 서비스입니다.");
      Router.push("/login");
      return;
    }
    this.request_contents = val;
    console.log(this.request_contents);
  };

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

  // 의뢰 보안 상태 추가
  @action set_file_secure = (val) => {
    this.request_file_secure = val;
    console.log(this.request_file_secure);
  };

  // 도면 파일 추가하기
  @action set_drawing_set = (obj) => {
    if (typeof obj == "object") {
      this.request_drawing_set.push(obj);
      console.log("file uploaded");
    } else {
      this.common_file = null;
    }
  };

  // 도면 파일 삭제하기
  @action delete_Drawing = (deleteIdx) => {
    // 파일 삭제하기
    this.request_drawing_set.splice(deleteIdx, 1);
    console.log(deleteIdx, this.request_drawing_set);
  };

  // 의뢰서 제출 시 의뢰서 만들기
  @action requestSubmit = async () => {
    // error 처리
    if (this.request_state == -1) {
      alert("문의 목적을 선택해주세요");
      return false;
    }
    if (this.request_name.length == 0) {
      alert("의뢰 제목을 입력해주세요");
      return false;
    }
    if (this.request_name.length > 200) {
      alert("제목이 너무 깁니다. 200자 이내로 작성해주세요.");
      return false;
    }
    if (this.request_contents.length == 0) {
      alert("의뢰 내용 작성해주세요");
      return false;
    }

    if (this.request_contents.length > 4500) {
      alert("의뢰 내용이 너무 깁니다. 4500자 이내로 작성해주세요.");
      return false;
    }

    // 데이터 저장
    var formData = new FormData();

    // 문의 목적 상태
    formData.append("request_state", this.request_state);

    // 의뢰 제목
    formData.append("name", this.request_name);

    // 희망 예산 저장
    formData.append("price", this.request_price.id);

    // 희망 예산 상태 저장
    formData.append("price_state", this.request_price_state);

    // 제조사 상세보기에서 의뢰서 클릭해서 들어온 경우
    formData.append("partner", Request.selected_partner);

    // 선택한 날짜가 없으면, 기본 날짜 추가하기
    if (Schedule.clickDay) {
      formData.append("deadline", Schedule.clickDay + " 09:00");
    } else {
      formData.append("deadline", "2020-11-11 11:11");
    }

    // 선택한 납기 미선택 시
    if (this.request_period_state == 0) {
      formData.append("deadline_state", 0);
    } else {
      // 납기 협의 가능 선택 시
      formData.append("deadline_state", 1);
    }

    // 의뢰 내용 ( 공개 사항 )
    formData.append("contents", this.request_contents);

    // 의뢰 관련 파일 저장
    if (this.request_file_set.length === 0) {
      formData.append(`file`, "");
    }
    for (var i = 0; i < this.request_file_set.length; i++) {
      formData.append(`file`, this.request_file_set[i]);
    }

    // 도면 유무 저장 => 도면이 있으면, state = 1로
    if (this.request_drawing_set.length === 0) {
      formData.append("blueprint_exist", 0);
    } else {
      formData.append("blueprint_exist", 1);
    }

    // 의뢰 보안 상태 추가
    formData.append("request_file_secure", this.request_file_secure);

    // 도면 관련 파일 저장
    if (this.request_drawing_set.length === 0) {
      formData.append(`blueprint`, "");
    }
    for (var i = 0; i < this.request_drawing_set.length; i++) {
      formData.append(`blueprint`, this.request_file_set[i]);
    }

    // 로그인 토큰 받아 user 데이터 받기
    const Token = localStorage.getItem("token");
    console.log(Token);

    // axois 쏘기
    const req = {
      headers: {
        Authorization: `Token ${Token}`,
      },
      data: formData,
    };

    console.log(req);

    RequestAPI.create(req)
      .then((res) => {
        console.log("create: ", res);
        // page 넘기기 위한 트리거 만들기
        this.newIndex = 1;
        // GA 데이터 보내기
        MyDataLayerPush({ event: "request_Drawing" });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // 의뢰서 수정 관련

  // 의뢰서 수정에서 의뢰 파일 가져오기
  @action getRequestFile = async (id) => {
    console.log(id);
    const req = {
      params: {
        request: id,
      },
    };
    await RequestAPI.getRequestFile(req)
      .then((res) => {
        console.log(toJS(res));
        console.log(toJS(res.data.results));
        res.data.results.map((item, idx) => {
          console.log(item.id);
          this.request_file_set.push(item.id);
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // 의뢰서 수정에서 파일 삭제하기
  @action deleteRequestFile = (id) => {
    console.log(id);
    const req = {
      id: id,
    };

    RequestAPI.deleteRequest(req)
      .then((res) => {
        console.log(toJS(res));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // 의뢰서 id로 의뢰서 가져오기
  @observable requests = [];
  @observable current_request_id = -1;

  getRequestById = (id) => {
    if (id === -1) {
      return;
    }

    console.log(`getRequestById(${id})`);
    const idx = this.requests.findIndex((request) => request.id == id);

    console.log(this.requests[idx]);
    return this.requests[idx];
  };

  @action reset = () => {
    // 의뢰서 관련 변수 초기화
    this.newIndex = 0;
    this.selected_partner = "";
    this.request_state = -1;
    this.request_name = "";
    this.request_price = "";
    this.request_price_state = -1;
    this.request_period = "";
    this.request_period_state = 0;
    this.request_contents = "";
    this.request_file_set = [];
    this.request_file_secure = 0;
    this.request_drawing_set = [];
  };
}
export default new Request();
