import { observable, action, toJS, makeObservable } from "mobx";

import * as CategoryAPI from "axios/Account/Category";
import * as PartnerAPI from "axios/Manufacture/Partner";

import Partner from "./Partner";
import Auth from "stores/Account/Auth";

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
  @observable category_selected_tagbox = [];

  // 카테고리 선택 시 상단 박스안에 선택한 카테고리 들어가는 상태
  @observable selected_category_subbox = [];
  @observable selected_business_subbox = [];
  @observable selected_city_subbox = [];

  //전체<< 체크박스 체크상태 저장하는 dictionary
  @observable checkAllState = {};
  @observable nextBtnActive = false;

  @observable RegisterTypeArray = [
    {
      img: "/static/icon/registerMain1.svg",
      content: "부품/완제품 판매",
      type: "product",
      checked: false,
      id: 0,
    },
    {
      img: "/static/icon/registerMain2.svg",
      content: "개발/설계",
      type: "development",
      checked: false,
      id: 1,
    },
    {
      img: "/static/icon/registerMain3.svg",
      content: "제작",
      type: "manufacture",
      checked: false,
      id: 2,
    },
  ];
  @observable locationModalActive = false;
  @observable LocationAddress = "";
  @observable LocationZipCode = "";
  //회사소개서 파일(1개)
  @observable partnerInfoFile = null;
  //파트너 포트폴리오(배열)
  @observable partnerPortfolioArray = [];
  //파트너 소개
  @observable partnerInfo = "";
  //진행한 제품군
  @observable partnerHistory = "";

  @action setCheckAllState = (type) => {
    const temp = new Array();
    temp.push(false);

    // const typeArray = ["business","category"]
    this.checkAllState[type] = temp;
  };

  @action setPartnerInfo = (e) => {
    this.partnerInfo = e[0];
    console.log(e[0])
  };
  @action setPartnerHistory = (e) => {
    console.log(e);
    this.partnerHistory = e;
  };
  @action setPartnerInfoFile = (e) => {
    this.partnerInfoFile = e[0];
    console.log(e[0])
  };

  @action setPartnerPortfolioFile = (e) => {
    for (var i = 0; i < e.length; i++) {
      this.partnerPortfolioArray.push(e[i]);
    }
    console.log(this.partnerPortfolioArray);
  };
  /* init */

  // @observable setCheckAllState = (type) => {
  //   const temp = new Array();
  //   temp.push(false);

  //   // const typeArray = ["business","category"]
  //   this.checkAllState[type] = temp;
  // };
  @action init = async () => {
    this.checkAllState = [];

    // 업체분류 데이터 가져오기
    await CategoryAPI.getMainbusiness()
      .then((res) => {
        this.mainbusiness_list = res.data.results;
        this.setCheckAllState("business");
        console.log(toJS(this.mainbusiness_list));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    // 카테고리 가져오기
    await CategoryAPI.getMainCategory()
      .then(async (res) => {
        this.maincategory_list = res.data.results;
        this.maincategory_list.forEach((mainCategory) => {
          // const temp = new Array();
          // temp.push(false);

          // this.checkAllState["category"] = temp;
          this.setCheckAllState("category");
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
        // console.log(toJS(this.city_list));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    // 소재 가져오기
    await CategoryAPI.getMainmaterial()
      .then((res) => {
        this.mainmaterial_list = res.data.results;
        this.setCheckAllState("material");
        // console.log(toJS(this.mainmaterial_list));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    // 공정 가져오기
    await CategoryAPI.getDevelopbig()
      .then((res) => {
        this.developbig_list = res.data.results;
        this.developbig_list.forEach((mainCategory) => {
          this.setCheckAllState("develop");
        });
        // console.log(toJS(this.developbig_list));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  /* reset */
  @action reset = () => {
    console.log("Category Reset");
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

    this.business_selected_name = [];
    this.category_selected_name = [];
    this.material_selected_name = [];
    this.develop_selected_name = [];

    // 파트너 등록 데이터
    this.locationModalActive = false;
    this.LocationAddress = "";
    this.LocationZipCode = "";
    //회사소개서 파일(1개)
    this.partnerInfoFile = null;
    //파트너 포트폴리오(배열)
    this.partnerPortfolioArray = [];
    //파트너 소개
    this.partnerInfo = "";
    //진행한 제품군
    this.partnerHistory = "";

    // RegisterIndex
    Auth.registerPageIdx = 0;
  };

  /* 선택된 리스트 초기화 */
  @action reset_selected = () => {
    console.log("Category Reset");

    // 선택된 리스트
    this.business_selected = [];
    this.category_selected = [];
    this.city_selected = [];
    this.material_selected = [];
    this.develop_selected = [];

    this.business_selected_name = [];
    this.category_selected_name = [];
    this.material_selected_name = [];
    this.develop_selected_name = [];

    // 모달 끄기
    Partner.filter_dropdown = false;

    // 다시 가져오기
    Partner.getPartner();
  };

  // 선택된 필터를 추가하기
  // state : 선택된 대카테고리 테이블
  // id : 선택된 중카테고리 id
  // container : 제조사 찾기 | 회원가입 페이지에서 사용중
  @action add_selected = async (state, id, data, container = "search") => {
    console.log(typeof id);
    // 카테고리 선택
    if (state == "business") {
      if (this.business_selected.indexOf(id) < 0) {
        this.business_selected.push(id);
        this.category_selected_tagbox.push({ id: id, type: state, data: data });
        this.selected_business_subbox.push(data);
      }
    }
    // 카테고리 선택
    if (state == "category") {
      if (this.category_selected.indexOf(id) < 0) {
        this.category_selected.push(id);
        this.category_selected_tagbox.push({ id: id, type: state, data: data });
        this.selected_category_subbox.push(data);
      }
    }

    // 지역 선택
    if (state == "city") {
      this.city_selected.push(id);
      console.log(toJS(this.city_selected));
      this.category_selected_tagbox.push({ id: id, type: state, data: data });
      this.selected_city_subbox.push(data);
    }

    // 공정 선택
    if (state == "develop") {
      this.develop_selected.push(id);
      this.category_selected_tagbox.push({ id: id, type: state, data: data });
    }

    // 소재 선택
    if (state == "material") {
      this.material_selected.push(id);
      this.category_selected_tagbox.push({ id: id, type: state, data: data });
    }

    // search 페이지에서 왔을 때만
    if (container == "search") {
      Partner.getPartner();
    }
  };

  @action isChecked = (myType) => {
    this.nextBtnActive = false;
    if (myType === "main") {
      this.RegisterTypeArray.map((item, idx) => {
        if (item.checked) {
          this.nextBtnActive = true;
        }
      });
    } else if (myType === "category") {
      if (this.business_selected.length > 0) {
        this.nextBtnActive = true;
      }
    }
  };

  // 선택된 필터를 제거하기
  // state : 선택된 대카테고리 테이블
  // id : 선택된 중카테고리 id
  // container : 제조사 찾기 | 회원가입 페이지에서 사용중
  @action remove_selected = async (state, id, container = "search", data) => {
    let deleteIdx;
    let business_subbox_deleteIdx;
    let category_subbox_deleteIdx;
    let city_subbox_deleteIdx;

    // 태그 박스 삭제
    this.category_selected_tagbox.map((sub_data, idx) => {
      // 데이터가 있는 경우
      if (sub_data.data === data) {
        this.category_selected_tagbox.splice(idx, 1);
      }
    });

    // 카테고리 선택
    if (state === "business") {
      deleteIdx = this.business_selected.indexOf(id);
      business_subbox_deleteIdx = this.selected_business_subbox.indexOf(data);

      this.business_selected.splice(deleteIdx, 1);
      this.selected_business_subbox.splice(business_subbox_deleteIdx, 1);
    }

    // 업체 분류 선택
    if (state === "category") {
      deleteIdx = this.category_selected.indexOf(id);
      category_subbox_deleteIdx = this.selected_category_subbox.indexOf(data);

      this.category_selected.splice(deleteIdx, 1);
      this.selected_category_subbox.splice(category_subbox_deleteIdx, 1);
    }

    // 지역 선택
    if (state === "city") {
      deleteIdx = this.city_selected.indexOf(id);
      city_subbox_deleteIdx = this.selected_city_subbox.indexOf(data);

      this.city_selected.splice(deleteIdx, 1);
      this.selected_city_subbox.splice(city_subbox_deleteIdx, 1);
    }

    // 공정 선택
    if (state === "develop") {
      deleteIdx = this.develop_selected.indexOf(id);
      this.develop_selected.splice(deleteIdx, 1);
    }

    // 소재 선택
    if (state === "material") {
      deleteIdx = this.material_selected.indexOf(id);
      this.material_selected.splice(deleteIdx, 1);
    }

    // search 페이지에서 왔을 때만
    if (container === "search") {
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

  // Category가 id로 되어 있기 때문에 이름을 가져오기 위한 함수
  @action getNameByCategory = async (state) => {
    console.log(state);
    if (state === "business") {
      console.log(state);
      if (this.business_selected) {
        console.log(state);
        this.business_selected_name = [];
        await this.business_selected.map(async (item, idx) => {
          console.log(state);
          await this.getBusinessName(state, item);
        });
      }
      console.log(this.business_selected_name);
    }
  };

  // Business가 id로 되어 있기 때문에 이름을 가져오기 위한 함수
  @action getBusinessName = async (state, id) => {
    console.log(state);
    const req = {
      id: id,
    };

    await CategoryAPI.getBusinessName(req)
      .then(async (res) => {
        console.log(res.data.category);
        this.business_selected_name = await this.business_selected_name.concat(
          res.data.category
        );
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    console.log(this.business_selected_name);
  };

  @action save_selected = async (pageName, id) => {
    let req = null;

    switch (pageName) {
      //business입니다. 페이지만 Category
      case "Category":
        req = {
          data: {
            partnerId: id,
            business: this.business_selected,
            category: this.category_selected,
          },
        };
        CategoryAPI.saveSelectedList(req)
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
        break;
      case "Process":
        req = {
          data: {
            partnerId: id,
            develop: this.develop_selected,
          },
        };
        CategoryAPI.saveSelectedList(req)
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
        break;
      case "Material":
        req = {
          data: {
            partnerId: id,
            material: this.material_selected,
          },
        };
        CategoryAPI.saveSelectedList(req)
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
        break;
      case "Aboutus":
        // 예외처리
        if (!this.LocationAddress.split(" ")[0] && !this.LocationAddress) {
          await alert("주소를 입력해주세요.");
          Auth.registerPageIdx -= 1;
          console.log(Auth.registerPageIdx);
          return;
        }

        if (!this.partnerInfo) {
          await alert("회사소개를 입력해주세요.");
          Auth.registerPageIdx -= 1;
          return;
        }
        if (!this.partnerHistory) {
          await alert("진행한 제품군을 입력해주세요");
          Auth.registerPageIdx -= 1;
          return;
        }
        if (!Partner.CEO_name){
          await alert("대표자명을 입력해주세요.");
          Auth.registerPageIdx -= 1;
          return;
        }
        if (!Partner.employee){
          await alert("직원 숫자를 입력해주세요.");
          Auth.registerPageIdx -= 1;
          return;
        }
        if (!Partner.revenue){
          await alert("매출액을 입력해주세요.");
          Auth.registerPageIdx -= 1;
          return;
        }
        if (!Partner.year){
          await alert("설립연도를 입력해주세요.");
          Auth.registerPageIdx -= 1;
          return;
        }
        
        // 데이터 저장
        var formData = new FormData();
        
        // 파트너 ID
        formData.append("partnerId", id);

        // 지역 대분류
        formData.append("city", this.LocationAddress.split(" ")[0]);

        // 지역 상세분류
        formData.append("region", this.LocationAddress);

        // 회사소개
        formData.append("info_company", this.partnerInfo);

        // 회사소개서 파일
        formData.append("file", this.partnerInfoFile);

        // 만든 제품 소개
        formData.append("history", this.partnerHistory);

        // 포토폴리오 파일 리스트
        if (this.partnerPortfolioArray.length === 0) {
          formData.append(`portfolio`, "");
        }
        for (var i = 0; i < this.partnerPortfolioArray.length; i++) {
          formData.append(`portfolio`, this.partnerPortfolioArray[i]);
        }

        // 회사 대표 이름
        formData.append("CEO", Partner.CEO_name);

        // 직원 숫자
        formData.append("staff", Partner.employee.value);

        // 매출
        formData.append("sales", Partner.revenue.value);

        // 설립연도
        formData.append("year", Partner.year);

        // 인증서 관련 내용
        formData.append("certification_list", Partner.certification)

        // axois 쏘기
        let req = {
          data: formData,
        };

        CategoryAPI.savePartnerInfo(req)
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
        break;
    }
  };
}

export default new Category();
