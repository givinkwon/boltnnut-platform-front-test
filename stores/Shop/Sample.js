import { observable, action } from "mobx";

import * as SampleAPI from "axios/Shop/Sample";
class Sample {
  constructor() {
  }
  // 샘플 요청 이메일
  @observable email = "";
  
  // 샘플 요청 전화번호
  @observable phone = "";

  // 샘플 요청 내용
  @observable content = "";

  // 샘플 요청 회사명
  @observable company = "";

  // 샘플 요청 제출
  @action submit = () => {
    // 예외 처리
    if (!this.email) {
        alert("이메일을 입력해주세요.");
        return false;
      }
    var emailValid = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailValid.test(this.email)) {
        alert("이메일 형식을 확인해주세요.");
        return false;
    }
    if (!this.company) {
        alert("회사명을 입력해주세요");
        return false;
    }
    if (!this.phone) {
        alert("휴대전화를 입력해주세요.");
        return false;
    }
    // 예외 처리 끝

    // 데이터 저장
    var formData = new FormData();

    formData.append("email", this.email);
    formData.append("content", this.content);
    formData.append("phone", this.phone);
    formData.append("company", this.company);
    formData.append("PartnerName", this.partnerName)

    // axois 쏘기
    const req = {
        data: formData,
    };
    console.log(req);

    SampleAPI.create(req)
    .then((res) => {
        console.log("create: ", res);
        alert("완료되었습니다. 1영업일 내로 담당자가 연락드리겠습니다.")
        this.modal_open = false
    })
    .catch((e) => {
        try {
        console.log(e);
        console.log(e.response);
        alert(e.response.data.message);
        } catch {
        console.log(e);
        console.log(e.response);
        }
    });
}
  // 모달창 open state
  @observable modal_open = false;
  
  // 모달 open
  @action openModal = (partnerName) => {
    this.modal_open = true
    this.partnerName = partnerName
  }

  // 모달 open
  @action closeModal = () => {
    this.modal_open = false
  }

};


export default new Sample();
