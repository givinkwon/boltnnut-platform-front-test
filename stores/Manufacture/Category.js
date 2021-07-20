import { observable, action, toJS, makeObservable } from "mobx";

import * as CategoryAPI from "axios/Account/Category";
import { isConstructorDeclaration } from "typescript";
import NoneDrawingConsultingContainer from "containers/Manufacture/Request/NoneDrawingConsulting";

class Category {
    constructor() {

    }

    // 카테고리 배열
    @observable business_arr = [];

    /* 카테고리 */
    @action getPartner = async (page = 1, click = 0) => {
        this.partner_list = [];
        this.category_ary = [];
    
        const token = localStorage.getItem("token");
        let req = { params: { page: page } };
        let temp = { params: { page: page } };
    
        if (this.filter_region) {
          console.log(this.filter_region);
          temp.params.city = this.filter_region;
          req.params.city = this.filter_region;
        }
    
        if (this.filter_category) {
          switch (this.filter_category) {
            case 1:
              req.params.category_middle__id = "2";
              break;
            case 2:
              req.params.category_middle__id = "12,14";
              break;
            case 3:
              req.params.category_middle__id = "14";
              break;
            case 4:
              req.params.category_middle__id = "12";
              break;
            case 5:
              req.params.category_middle__id = "12";
              break;
          }
    
          temp.params.category_middle__id = this.filter_category;
          // req.params.category_middle__id = this.filter_category;
        }
        if (this.search_class === "전체") {
          if (this.search_text === "") {
            delete req.params.search;
          } else {
            req.params.search = this.search_text;
          }
        }
    
        if (this.search_class === "만든 제품") {
          if (this.search_text === "") {
            delete req.params.history;
          } else {
            req.params.history = this.search_text;
          }
        }
    
        await PartnerAPI.getPartners(req)
          .then(async (res) => {
            this.partner_list = [];
            this.category_ary = [];
            this.category_name_ary = [];
            this.temp_category_name_ary;
            this.category_count = 0;
    
            this.partner_list = await res.data.results;
            this.originPartnerList = this.partner_list;
            this.partner_next = res.data.next;
            this.partner_count = res.data.count;
            await this.resetDevCategory();
    
            //this.category_ary = res.data.results.category_middle;
            this.partner_page = parseInt((this.partner_count - 1) / 10) + 1;
            await this.partner_list.map(async (item, idx) => {
              await this.category_ary.push(item.category_middle);
              this.category_count += 1;
            });
    
              await this.category_ary.map(async (data, id) => {
                await data.map(async (sub_data, index) => {
                  const req = {
                    id: sub_data,
                  };
                  if (this.isSearched) {
                    this.exceptionCategory += sub_data + ",";
                  }
    
                  if (this.click_count != click) {
                    return;
                  }
    
                  await PartnerAPI.getPartnerCategory(req)
                    .then(async (res) => {
                      if (click == 0) {
                        click += 1;
                      }
    
                      if (this.click_count == click) {
                        if (!this.category_dic.hasOwnProperty(id)) {
                          this.category_dic[id] = [];
                        }
                        this.category_dic[id] = await [
                          ...this.category_dic[id],
                          res.data.category,
                        ];
                      } else {
                        return;
                      }
                    })
                    .catch((e) => {
                      console.log(e);
                      console.log(e.response);
                    });
                  if (this.click_count != click) {
                    return;
                  }
                });
              });
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
          });
        this.check_loading_develop = true;
    
        this.filterLoading = true;        
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




    
    // 업체 분류 배열
    @observable category_arr = [];
    
    // 지역 배열
    @observable region_arr = [];


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

      

    
    // 공정 배열
    @observable develop_arr = [];



    /* init */
    @action init = async () => {
        CategoryAPI.getMainCategory()
          .then(async (res) => {
            this.category_main_list = res.data.results;
            this.big_category_all = res.data.results;
            console.log(res.data.results.splice(0, 4));
            this.category_list = res.data.results;
            this.category_list.forEach((mainCategory) => {
              this.category_middle_list = this.category_middle_list.concat(
                mainCategory.category_set
              );
            });
            await this.category_main_list.map((mainCategory) => {
              this.category_middle_total_ary =
                this.category_middle_total_ary.concat(mainCategory.category_set);
            });
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
          });
        CategoryAPI.getDevelop()
          .then((res) => {
            this.develop_list = res.data.results;
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
          });
        CategoryAPI.getCity()
          .then((res) => {
            this.city_list = res.data.results;
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
          });
      };


      /* reset */
      @action reset = () => {
        this.detail = null;
        this.category_list = [];
        this.category_middle_list = [];
        this.develop_list = [];
        this.city_list = [];
    
        this.partner_list = [];
        this.partner_count = 0;
        this.partner_next = null;
        this.page = 1;
    
        this.search_text = "";
        this.search_category = [];
        this.search_develop = [];
        this.search_region = [];
      };


      @action resetDevCategory = () => {
        this.category_dic = {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
          9: [],
        };
      };

      