import { observable, action, toJS, makeObservable } from "mobx";

import * as CategoryAPI from "axios/Account/Category";
import * as PartnerAPI from "axios/Manufacture/Partner";
import { isConstructorDeclaration } from "typescript";
import NoneDrawingConsultingContainer from "containers/Manufacture/Request/NoneDrawingConsulting";

import Partner from "./Partner";

class Category {
  constructor() {
    //makeObservable(this);
  }

  // 카테고리 배열
  @observable mainbusiness_list = [];
  @observable business_list = [];

  // 업체 분류 배열
  @observable maincategory_list = [];
  @observable category_list = [];

  // 지역 배열
  @observable city_list = [];

  // 소재 배열
  @observable mainmaterial_list = [];
  @observable material_list = [];

  // 공정 배열
  @observable developbig_list = [];
  @observable develop_list = [];

  // 선택된 리스트
  @observable business_selected = [];
  @observable category_selected = [];
  @observable city_selected = [];
  @observable material_selected = [];
  @observable develop_selected = [];

  /* init */
  @action init = async () => {
    // 카테고리 데이터 가져오기
    await CategoryAPI.getMainbusiness()
      .then((res) => {
        this.mainbusiness_list = res.data.results;
        console.log(toJS(this.mainbusiness_list));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    // 업체 분류 가져오기
    await CategoryAPI.getMainCategory()
      .then(async (res) => {
        this.maincategory_list = res.data.results;
        console.log(toJS(this.maincategory_list));
        this.category_list.forEach((mainCategory) => {
          this.category_list = this.category_list.concat(
            mainCategory.category_set
          );
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    // 지역 가져오기
    await CategoryAPI.getCity()
      .then((res) => {
        this.city_list = res.data.results;
        console.log(toJS(this.city_list));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    // 소재 가져오기
    await CategoryAPI.getMainmaterial()
      .then((res) => {
        this.mainmaterial_list = res.data.results;
        console.log(toJS(this.mainmaterial_list));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    // 공정 가져오기
    await CategoryAPI.getDevelopbig()
      .then((res) => {
        this.developbig_list = res.data.results;
        console.log(toJS(this.developbig_list));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  /* reset */
  @action reset = () => {
    console.log("Category Reset")
    // 카테고리 배열 초기화
    this.mainbusiness_list = [];
    this.business_list = [];

    // 업체 분류 배열 초기화
    this.maincategory_list = [];
    this.category_list = [];

    // 지역 배열 초기화
    this.city_list = [];

    // 소재 배열 초기화
    this.mainmaterial_list = [];
    this.material_list = [];

    // 공정 배열 초기화
    this.developbig_list = [];
    this.develop_list = [];

    // 선택된 리스트
    this.business_selected = [];
    this.category_selected = [];
    this.city_selected = [];
    this.material_selected = [];
    this.develop_selected = [];
  };

    /* 선택된 리스트 초기화 */
    @action reset_selected = () => {
      console.log("Category Reset")
  
      // 선택된 리스트
      this.business_selected = [];
      this.category_selected = [];
      this.city_selected = [];
      this.material_selected = [];
      this.develop_selected = [];
      
      // 모달 끄기
      Partner.filter_dropdown = false;

      // 다시 가져오기
      Partner.getPartner();
    };

  // 선택된 필터를 추가하기
  // state : 선택된 대카테고리 테이블
  // id : 선택된 중카테고리 id
  // container : 제조사 찾기 | 회원가입 페이지에서 사용중
  @action add_selected = async (state, id, container="producer") => {
    // 카테고리 선택
    if (state == "business") {
      this.business_selected.push(id);
    }

    // 업체 분류 선택
    if (state == "category") {
      this.category_selected.push(id);
    }

    // 지역 선택
    if (state == "city") {
      this.city_selected.push(id);
      console.log(toJS(this.city_selected));
    }

    // 공정 선택
    if (state == "develop") {
      this.develop_selected.push(id);
    }

    // 소재 선택
    if (state == "material") {
      this.material_selected.push(id);
    }

    // producer 페이지에서 왔을 때만
    if (container == "producer"){
      Partner.getPartner();
    }

  };

  // 선택된 필터를 제거하기
  // state : 선택된 대카테고리 테이블
  // id : 선택된 중카테고리 id
  // container : 제조사 찾기 | 회원가입 페이지에서 사용중
  @action remove_selected = async (state, id, container="producer") => {
    let deleteIdx;
    // 카테고리 선택
    if (state == "business") {
      deleteIdx = this.business_selected.indexOf(id);
      this.business_selected.splice(deleteIdx, 1);
    }

    // 업체 분류 선택
    if (state == "category") {
      deleteIdx = this.category_selected.indexOf(id);
      this.category_selected.splice(deleteIdx, 1);
    }

    // 지역 선택
    if (state == "city") {
      deleteIdx = this.city_selected.indexOf(id);
      this.city_selected.splice(deleteIdx, 1);
    }

    // 공정 선택
    if (state == "develop") {
      deleteIdx = this.develop_selected.indexOf(id);
      this.develop_selected.splice(deleteIdx, 1);
    }

    // 소재 선택
    if (state == "material") {
      deleteIdx = this.material_selected.indexOf(id);
      this.material_selected.splice(deleteIdx, 1);
    }

    // producer 페이지에서 왔을 때만
    if (container == "producer"){
      Partner.getPartner();
    }

  };

  categoryActiveHandler = (idx, state) => {
    if (state == "business") {
      if (this.business_selected.includes(idx)) {
        return true;
      } else {
        return false;
      }
    }

    // 업체 분류 선택
    if (state == "category") {
      if (this.category_selected.includes(idx)) {
        return true;
      } else {
        return false;
      }
    }

    // 지역 선택
    if (state == "city") {
      if (this.city_selected.includes(idx)) {
        return true;
      } else {
        return false;
      }
    }

    // 공정 선택
    if (state == "develop") {
      if (this.develop_selected.includes(idx)) {
        return true;
      } else {
        return false;
      }
    }

    // 소재 선택
    if (state == "material") {
      if (this.material_selected.includes(idx)) {
        return true;
      } else {
        return false;
      }
    }
  };
}

export default new Category();
