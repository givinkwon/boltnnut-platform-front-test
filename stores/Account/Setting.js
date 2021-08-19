import { observable, action } from "mobx";
import * as AccountAPI from "axios/Account/Account";
import Router from "next/router";

class Setting {

  // state 리셋 함수
  @action reset = () => {
  }

  // 기본 정보 수정
  @action edit_information = () => {
      
  }
}

export default new Setting();
