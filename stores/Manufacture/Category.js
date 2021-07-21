import { observable, action, toJS, makeObservable } from "mobx";

import * as CategoryAPI from "axios/Account/Category";
import { isConstructorDeclaration } from "typescript";
import NoneDrawingConsultingContainer from "containers/Manufacture/Request/NoneDrawingConsulting";

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

  /* init */
  @action init = async () => {
    console.log("GG");
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
  };

  @action getCategory = () => {
    this.filter_category_ary = [];

    const req = {
      // nextUrl: this.develop_next,
    };

    PartnerAPI.getCategory(req)
      .then(async (res) => {
        this.filter_category_ary = this.filter_category_ary.concat(
          res.data.results
        );
        this.develop_next = res.data.next;

        while (this.develop_next) {
          const req = {
            nextUrl: this.develop_next,
          };
          await PartnerAPI.getNextDevelopPage(req)
            .then((res) => {
              this.filter_category_ary = this.filter_category_ary.concat(
                res.data.results
              );

              this.develop_next = res.data.next;
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getCity = () => {
    //this.filter_category_ary = [];

    const req = {
      // nextUrl: this.develop_next,
    };

    PartnerAPI.getCity(req)
      .then(async (res) => {
        this.filter_city_ary = await this.filter_city_ary.concat(
          res.data.results
        );
        console.log(toJS(this.filter_city_ary));
        this.city_ary = this.city_ary.concat(res.data.results);
        this.city_next = res.data.next;

        // console.log(toJS(res.data.results));
        // console.log(toJS(this.filter_city_ary));
        // console.log(this.city_next);
        while (this.city_next) {
          const req = {
            nextUrl: this.city_next,
          };
          await PartnerAPI.getNextCityPage(req)
            .then((res) => {
              // console.log(res);
              this.filter_city_ary = this.filter_city_ary.concat(
                res.data.results
              );
              this.city_ary = this.city_ary.concat(res.data.results);

              this.city_next = res.data.next;
              //console.log(this.city_next);
              //this.project_page = parseInt(this.project_count/5) + 1
              // if (callback) {
              //   callback();
              // }
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    console.log(this.filter_city_ary);
  };

  @action getCityName = (id) => {
    const req = {
      id: id,
    };

    PartnerAPI.getCityName(req)
      .then(async (res) => {
        console.log(res);
        this.city_name = res.data.city;
        console.log(this.city_name);
        // return res.data.city
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
}

export default new Category();
