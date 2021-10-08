import { observable, action, toJS, makeObservable } from "mobx";
import Router from "next/router";
import * as AccountAPI from "axios/Account/Account";
import * as CategoryAPI from "axios/Account/Category";
import * as PartnerAPI from "axios/Manufacture/Partner";
import * as ProfileAPI from "axios/Account/Profile";
import Category from "stores/Manufacture/Category";
import Auth from "stores/Account/Auth";

class Profile {

  @observable data = null;

  @observable email = "";
  @observable password = "";
  @observable password2 = "";
  @observable phone = "";
  @observable type = "";
  @observable step = 0;
  @observable loading = false;

  @observable company_name = "";
  @observable revenue = "";
  @observable employee = "";
  @observable career = "";
  @observable info_biz = "";
  @observable deal = "";
  @observable histories = "";

  @observable city = null;
  @observable region = null;
  @observable info_company = "";
  @observable possible_set = [];
  @observable history_set = [];

  @observable category_middle_set = [];

  @observable city_data = [];
  @observable region_data = [];

  @observable portfolio_set = [];
  @observable portfolio_id_set = [];
  @observable portfolio_checked = [];

  @observable structure_set = [];
  @observable structure_checked = [];

  @observable machine_set = [];
  @observable machine_checked = [];

  @observable process_set = [];
  @observable process_checked = [];

  /* 파트너 등록하기 */
  @observable authenticationFile = "";
  @observable authenticationFileArray = [];
  @observable authenticationFileName = "";
  @observable authenticationCheckFileUpload = false;

  @observable introductionFileArray = [];
  @observable introductionFile = "";
  @observable introductionCheckFileUpload = false;

  @observable portfolioFileArray = [];
  @observable portfolioCheckFileUpload = false;

  @observable locationAddress = "";
  @observable locationModalActive = false;

  @observable profileTabIdx = 1;
  @observable certificationModal = false;
  
  // 사업자등록증
  @observable certification = null;

  // 회사소개서
  @observable file = null;

  @action reset = () => {
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.type = "";
    this.step = 0;
    this.phone = "";

    this.company_name = "";
    this.revenue = "";
    this.employee = "";
    this.career = "";
    this.info_biz = "";
    this.deal = "";
    this.histories = "";

    this.info_company = "";
    this.possible_set = [];
    this.history_set = [];

    this.category_middle_set = [];
    this.certification = null;
  };
  
  // 사업자등록증 추가하기
  @action set_certification = (obj) => {
    if (typeof obj == "object") {
      this.certification = []
      this.certification.push(obj);
      console.log("file uploaded");
    } else {
      this.certification = null;
    }
    
    // 저장하기
    this.save_profile()
  };

  // 사업자등록증 삭제하기
  @action delete_certification = (deleteIdx) => {
    // 파일 삭제하기
    this.certification.splice(deleteIdx, 1);
    console.log(deleteIdx, this.certification);
  };

  // 프로필 수정에서 프로필 사항 가져오는 함수
  @action checkLogin = async () => {
    console.log("checkLogin");
    const token = localStorage.getItem("token");
    const req = {
      data: {
        username: this.email,
        password: this.password,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    await AccountAPI.reloadUserInfo(req)
      .then((res) => {
        if (res.data.data.User.type == 0) {
          alert("잘못된 접근입니다.");
          Router.push("/");
        } else if (res.data.data.User.type == 1) {
          console.log("파트너 정보 리로딩");
          console.log(res.data.data.Partner[0]);
          this.data = res.data.data.Partner[0];
          // 회사명
          this.company_name = res.data.data.Partner[0].name;
          // 상세 주소
          this.region = res.data.data.Partner[0].region;
          // 회사 소개
          this.info_company = res.data.data.Partner[0].info_company;
          // 거래처
          this.deal = res.data.data.Partner[0].deal;
          // 만든 제품군
          this.history = res.data.data.Partner[0].history;

          // 사업자등록증 파일
          this.certification = res.data.data.Partner[0].certification;

          // 회사소개서 파일
          this.file = res.data.data.Partner[0].file;

          // 포토폴리오
          this.portfolio_set = [];
          this.portfolio_id_set = [];
          res.data.data.Partner[0].portfolio_set.map((data) => {
            this.portfolio_set.push(data.img_portfolio);
            this.portfolio_id_set.push(data.id)
            console.log(data)
          });
          console.log(this.info_company);
        }
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
        localStorage.removeItem("token");
        // Router.push("/");
        Router.push("/account");
      });
    console.log(this.info_company);
  };

  // 프로필 포토폴리오 추가
  @action add_portfolio = (file) => {
    console.log(file)
    
    // 데이터 저장
    var formData = new FormData();

    formData.append('img_portfolio', file)
    formData.append('partner', Auth.logged_in_partner.id)
    
    // axois 쏘기
    let req = {
      data: formData,
    };

    ProfileAPI.addPortfolio(req, this.data.id)
      .then((res) => console.log(res))
      .catch((e) => console.log(e.response));
  }

  // 프로필 포토폴리오 삭제
  @action remove_portfolio = (id) => {
    console.log(id)
    ProfileAPI.removePortfolio(id)
      .then((res) => console.log(res))
      .catch((e) => console.log(e.response));
    
  }

  // 프로필 수정 시 저장하는 함수
  @action save_profile = () => {
    console.log(this.file)
    // 데이터 저장
    var formData = new FormData();
    
    // 카테고리 저장
    formData.append("business", Category.business_selected);
    formData.append("category", Category.category_selected);
    formData.append("develop", Category.develop_selected);
    formData.append("material", Category.material_selected);

    // 사업자등록증 저장
    formData.append("Certification", this.certification);

    // 지역 상세분류
    formData.append("region", this.region);

    // 회사소개
    formData.append("info_company", this.info_company);

    // 회사소개서 파일
    formData.append("file", this.file);

    // 만든 제품 소개
    formData.append("history", this.history);

    // 포토폴리오 파일 리스트
    formData.append("portfolio", this.portfolio_set)

    // axois 쏘기
    let req = {
      data: formData,
    };

    ProfileAPI.savePartnerInfo(req, this.data.id)
      .then((res) => console.log(res))
      .catch((e) => console.log(e.response));
    }

}

export default new Profile();
