import { observable, action, toJS, makeObservable } from "mobx";

import * as CategoryAPI from "axios/Category";
import * as PartnerAPI from "axios/Partner";
import { isConstructorDeclaration } from "typescript";
import NoneDrawingConsultingContainer from "../containers/Request/NoneDrawingConsulting";

class Partner {
  constructor() {
    //makeObservable(this);
  }
  @observable detail = null;
  @observable requests = [];
  @observable clients = [];

  // "/"에서 제조사 찾기 섹션의 그림 누르고 들어옴
  @observable developBig = null;

  // "/mainCategory"
  @observable category_list = [];
  @observable category_middle_list = [];
  @observable request_middle_list = [];
  @observable develop_list = [];
  @observable city_list = [];

  @observable partner_list = [];
  @observable partner_detail_list = [];
  @observable random_partner_list = [];
  @observable partner_count = 0;
  @observable partner_next = null;
  @observable partner_page = 0;

  @observable page = 1;
  @observable currentPage = 1;

  @observable search_text = "";
  @observable search_category = [];
  @observable search_develop = [];
  @observable search_region = [];
  @observable search_class = "전체";

  @observable partnerdata = "";
  @observable select_big = null;
  @observable select_mid = null;
  @observable loading = 0;

  // 필터 & 라디오박스 관련 변수
  @observable filter_region = 0;
  @observable filter_category = 0;

  @observable filter_filter = 0;
  @observable filter_budget = 0;
  @observable filter_view = 0;

  @observable radiobox_checked_idx = 0;
  @observable radiobox_category_checked_idx = 0;

  @observable filterbox_checked_idx = 0;
  @observable filterbox_budget_checked_idx = 0;
  @observable filterbox_view_checked_idx = 0;

  @observable filter_category_ary = [{ id: 0, category: "전체" }];
  @observable develop_next = 0;

  @observable city_ary = [];
  @observable filter_city_ary = [{ id: 0, city: "전체" }];
  @observable city_next = 0;

  @observable filter_checked_idx = 0;

  @observable input_process_filter = null;
  @observable input_category = null;
  @observable input_big_category = null;
  @observable input_small_category = null;

  @observable category_ary = [];
  @observable category_name_ary = [];
  @observable category_name_list = null;
  @observable temp_category_name_ary = [];
  @observable category_dic = {};
  @observable check_loading_category = false;
  @observable check_click_filter = false;

  @observable modalActive = false;
  @observable ReviewActive = false;
  @observable reviewModalActive = false;
  @observable ReviewActiveIndex = -1;
  @observable modalUserPhone = "";
  // @observable img = "";
  @observable selectedIntroductionFile = null;
  // 파트너 리뷰
  @observable star_ary = [
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
    { id: 4, checked: false },
    { id: 5, checked: false },
  ];
  @observable partnerName = "";
  @observable reviewPartnerName = 0;
  @observable reviewScore = "";
  @observable reviewContent = "";
  @observable review_ary = [];
  @observable review_next = 0;
  @observable review_count = 0;
  @observable review_done = false;
  @observable loadReviewData = 0;
  @observable userEmail = 0;
  @observable review_user_ary = [];

  @observable newIndex = 0;

  @observable portFolioList = [];

  // 파트너의 답변
  @observable answer_set = [];

  @observable clientInfo = [];
  @action setProcessFilter = (val) => {
    this.input_process_filter = val;
    console.log(toJS(this.input_process_filter));
    this.filter_category = val.id;

    this.getPartner();
  };

  @action setBigCategory = (val) => {
    this.input_big_category = val;
  };

  @action setSmallCategory = (val) => {
    this.input_small_category = val;
  };

  @action setCategory = (val) => {
    console.log(val);
    this.input_category = val;
    console.log(toJS(this.input_category));

    if (val.value === "전체") {
      console.log("전체");
      this.search_class = "전체";
    } else if (val.value === "만든 제품") {
      console.log("만든 제품");
      this.search_class = "만든 제품";
    } else {
      this.search_class = "";
    }
    //this.getPartner();
    console.log(toJS(this.search_class));
  };

  @action setLoading = () => {
    this.loading = 1;
  };

  @action init = () => {
    CategoryAPI.getMainCategory()
      .then((res) => {
        this.big_category_all = res.data.results;
        console.log(res.data.results.splice(0, 4));
        this.category_list = res.data.results;
        this.category_list.forEach((mainCategory) => {
          this.category_middle_list = this.category_middle_list.concat(
            mainCategory.category_set
          );
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

  @action getClientInfo = async (id) => {
    const req = {
      params: null,
    };
    await PartnerAPI.getClient(id, req).then((res) => {
      this.clientInfo = res.data;
    });
  };

  @action getPartnerDetail = async (id) => {
    await PartnerAPI.detail(id)
      .then((res) => {
        console.log(res);
        // return res.data;
        this.detail = res.data;
        console.log(this.detail);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action setBigCategory = (obj) => {
    this.select_mid = null;
    this.select_big = obj;
    this.request_middle_list = this.select_big.category_set;
  };
  @action setMidCategory = (obj) => {
    this.select_mid = obj;
  };

  @action setParentList = (state, data, type) => {
    if (type === "category") {
      const list = [];
      if (state) {
        for (var d of data.category_set) {
          const index = this.search_category.indexOf(d.id);
          if (index !== -1) {
            continue;
          }

          list.push(d.id);
        }
        this.search_category = [...list, ...this.search_category];
      } else {
        for (var d of data.category_set) {
          const index = this.search_category.indexOf(d.id);
          this.search_category.splice(index, 1);
        }
      }
    } else if (type === "develop") {
      console.log(data);
      const list = [];
      if (state) {
        for (var d of data.develop_set) {
          const index = this.search_develop.indexOf(d.id);
          if (index !== -1) {
            continue;
          }

          list.push(d.id);
        }
        this.search_develop = [...list, ...this.search_develop];
        console.log(this.search_develop);
      } else {
        for (var d of data.develop_set) {
          const index = this.search_develop.indexOf(d.id);
          this.search_develop.splice(index, 1);
        }
      }
    } else if (type === "city") {
      const list = [];
      if (state) {
        for (var d of data.region_set) {
          const index = this.search_region.indexOf(d.id);
          if (index !== -1) {
            continue;
          }

          list.push(d.id);
        }
        this.search_region = [...list, ...this.search_region];
      } else {
        for (var d of data.region_set) {
          const index = this.search_region.indexOf(d.id);
          this.search_region.splice(index, 1);
        }
      }
    }
    this.searchjust();
  };
  @action setList = (id, type) => {
    if (type === "category") {
      const index = this.search_category.indexOf(id);
      if (index > -1) {
        this.search_category.splice(index, 1);
      } else {
        this.search_category = [id, ...this.search_category];
      }
    } else if (type === "develop") {
      const index = this.search_develop.indexOf(id);
      if (index > -1) {
        this.search_develop.splice(index, 1);
      } else {
        this.search_develop = [id, ...this.search_develop];
      }
    } else if (type === "city") {
      const index = this.search_region.indexOf(id);
      if (index > -1) {
        this.search_region.splice(index, 1);
      } else {
        this.search_region = [id, ...this.search_region];
      }
    }
    this.search();
  };
  @action search = () => {
    const name = this.search_text;
    const develop = this.search_develop;
    const region = this.search_region;

    let subclasses = [];
    if (this.search_category) {
      for (let i = 0; i < this.search_category.length; i++) {
        const category_middle = this.getCategoryById(this.search_category[i]);

        if (category_middle) {
          category_middle.subclass_set.forEach((subclass) => {
            subclasses.push(subclass.id);
          });
        }
      }
    }
    console.log(subclasses);

    const req = {
      data: {
        search: name,
        // 제품 분야 = 가능 제품 분야
        history_set__id: subclasses.toString() ? subclasses.toString() : null,
        // history_set__id: toJS(develop).toString(),
        region: region.toString() ? region.toString() : null,
        // 카테고리 = 의뢰 분야
        category_middle__id: toJS(develop).toString()
          ? toJS(develop).toString()
          : null,
        page: this.page,
      },
    };
    console.log(req);
    PartnerAPI.search(req)
      .then((res) => {
        console.log(res);
        this.partner_list = res.data.results;
        this.partner_count = res.data.count;
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // 파트너 정보 제한 검색
  @action searchjust = () => {
    const name = this.search_text;
    const develop = this.search_develop;
    const region = this.search_region;

    let subclasses = [];
    if (this.search_category) {
      for (let i = 0; i < this.search_category.length; i++) {
        const category_middle = this.getCategoryById(this.search_category[i]);

        if (category_middle) {
          category_middle.subclass_set.forEach((subclass) => {
            subclasses.push(subclass.id);
          });
        }
      }
    }
    console.log(subclasses);

    const req = {
      data: {
        search: name,
        // 제품 분야 = 가능 제품 분야
        history_set__id: subclasses.toString() ? subclasses.toString() : null,
        // history_set__id: toJS(develop).toString(),
        region: region.toString() ? region.toString() : null,
        // 카테고리 = 의뢰 분야
        category_middle__id: toJS(develop).toString()
          ? toJS(develop).toString()
          : null,
        page: this.page,
      },
    };
    console.log(req);
    PartnerAPI.searchjust(req)
      .then((res) => {
        console.log(res);
        this.partner_list = res.data.results;
        this.partner_count = res.data.count;
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // 파트너 정보 제한 랜덤 검색
  @action searchrandom = () => {
    const name = this.search_text;
    const develop = this.search_develop;
    const region = this.search_region;

    let subclasses = [];
    if (this.search_category) {
      for (let i = 0; i < this.search_category.length; i++) {
        const category_middle = this.getCategoryById(this.search_category[i]);

        if (category_middle) {
          category_middle.subclass_set.forEach((subclass) => {
            subclasses.push(subclass.id);
          });
        }
      }
    }
    console.log(subclasses);

    const req = {
      data: {
        search: name,
        // 제품 분야 = 가능 제품 분야
        history_set__id: subclasses.toString() ? subclasses.toString() : null,
        // history_set__id: toJS(develop).toString(),
        region: region.toString() ? region.toString() : null,
        // 카테고리 = 의뢰 분야
        category_middle__id: toJS(develop).toString()
          ? toJS(develop).toString()
          : null,
        page: this.page,
      },
    };
    console.log(req);
    PartnerAPI.searchrandom(req)
      .then((res) => {
        console.log(res);
        this.partner_list = res.data.results;
        this.partner_count = res.data.count;
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getNextPartner = () => {
    if (!this.partner_next) {
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      nextUrl: this.partner_next,
      // headers
      headers: {
        //  Authorization: `Token ${token}`,
      },
    };

    PartnerAPI.getNextPage(req)
      .then((res) => {
        console.log("파트너 다음 페이지 읽기 성공");
        console.log(res.data);

        this.partner_list = this.partner_list.concat(res.data.results);
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getNextJustPartner = () => {
    if (!this.partner_next) {
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      nextUrl: this.partner_next,
      // headers
      headers: {
        //  Authorization: `Token ${token}`,
      },
    };

    PartnerAPI.getNextJustPage(req)
      .then((res) => {
        console.log("파트너 다음 페이지 읽기 성공");
        console.log(res.data);

        this.partner_list = this.partner_list.concat(res.data.results);
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getNextRandomPartner = () => {
    if (!this.partner_next) {
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      nextUrl: this.partner_next,
      // headers
      headers: {
        //  Authorization: `Token ${token}`,
      },
    };

    PartnerAPI.getNextJustPage(req)
      .then((res) => {
        console.log("파트너 다음 페이지 읽기 성공");
        console.log(res.data);

        this.partner_list = this.partner_list.concat(res.data.results);
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  //파트너 숫자만 로드
  @action loadPartnerCount = () => {
    PartnerAPI.getMyPartner()
      .then((res) => {
        this.partner_count = res.data.count;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getRequestsByAnswers = () => {
    if (!this.detail) {
      return;
    }

    this.detail.answer_set.forEach((answer, idx) => {
      const projectId = answer.project;
      const token = localStorage.getItem("token");
      const req = {
        // headers
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      PartnerAPI.getProject(projectId, req)
        .then((res) => {
          this.requests.push(res.data.request_set[0]);
          console.log(res.data);

          if (idx === this.detail.answer_set.length - 1) {
            this.getClientsByRequests();
          }
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    });
  };

  @action getCountRequest = () => {
    PartnerAPI.getProject(projectId, req)
      .then((res) => {
        this.requests.push(res.data.request_set[0]);
        console.log(res.data);

        if (idx === this.detail.answer_set.length - 1) {
          this.getClientsByRequests();
        }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getClientsByRequests = () => {
    if (!this.detail) {
      return;
    }

    this.requests.forEach((request, idx) => {
      const token = localStorage.getItem("token");
      const req = {
        // headers
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      PartnerAPI.getClient(request.client, req)
        .then((res) => {
          this.clients.push(res.data);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    });
  };

  getRequestByProjectId = (projectId) => {
    if (projectId == -1) {
      return;
    }

    const idx = this.requests.findIndex(
      (request) => request.project == projectId
    );

    return this.requests[idx];
  };
  getCategoryById = (id) => {
    if (id == -1) {
      return;
    }

    const idx = this.category_middle_list.findIndex(
      (category) => category.id == id
    );

    return this.category_middle_list[idx];
  };
  getCityNameById = (id) => {
    console.log(id);
    if (id == -1) {
      return;
    }

    const idx = this.city_list.findIndex((city) => city.id == id);
    console.log(idx);
    // 못 찾았을 경우
    if (idx === -1) {
      return "";
    }

    return this.city_list[idx].city;
  };

  getCityName = (id) => {
    console.log(id);
    // if (id == -1) {
    //   return;
    // }

    console.log(toJS(this.city_ary));
    const idx = this.city_ary.findIndex((city) => city.id == id);
    console.log(idx);
    // 못 찾았을 경우
    if (idx === -1) {
      return "";
    }

    // return "제주";
    return this.city_ary[idx].city;
  };

  getRegionNameById = (id) => {
    if (id == -1) {
      return;
    }

    let cityName = "";

    for (let i = 0; i < this.city_list.length; i++) {
      const city = this.city_list[i];

      for (let j = 0; j < city.region_set.length; j++) {
        const region = city.region_set[j];

        if (region.id == id) {
          cityName = region.region;
          return cityName;
        }
      }
    }

    return cityName;
  };
  getClientById = (id) => {
    if (id == -1) {
      return;
    }

    const idx = this.clients.findIndex((client) => client.id == id);

    return this.clients[idx];
  };

  @action getPartnerCategory = async (request, i, idx, id = 0) => {
    // console.log(request);
    await PartnerAPI.getPartnerCategory(request)
      .then((res) => {
        // console.log(toJS(res.data.category));
        this.category_ary[idx].push(res.data.category);

        if (idx === this.partner_list.length - 1) {
          // console.log("finish");
          this.check_loading_category = true;
        }

        // console.log(toJS(this.category_ary[idx].length));
        // console.log(id);
        // console.log(toJS(this.category_ary[idx]));

        // if (this.category_ary[idx].length > id) {
        //   console.log("조건조건조건조건조건조건조건조건조건조건조건조건");
        //   this.temp_category_name_ary.push(res.data.category);
        //   console.log(toJS(this.category_ary[idx].length));
        //   console.log(id);
        //   console.log(toJS(this.temp_category_name_ary));
        //   if (this.category_ary[idx].length - 1 === id) {
        //     this.category_name_ary.push(this.temp_category_name_ary);
        //     this.temp_category_name_ary = [];
        //     console.log(toJS(this.category_name_ary));
        //   }

        //this.category_ary[idx].push(res.data.category);

        // if (idx === this.partner_list.length - 1) {
        //   console.log("finish");
        //   this.check_loading_category = true;
        // }
        // }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    // console.log((i + 1) * 2);
    // console.log(toJS(this.category_ary[idx].length));
    // if ((i + 1) * 2 === this.category_ary[idx].length) {
    //   console.log(toJS(this.category_ary[idx]));
    //   console.log(toJS(Object.keys(this.category_ary[idx]).length));

    //   console.log(
    //     toJS(
    //       this.category_ary[idx].splice(
    //         Object.keys(this.category_ary[idx]).length,
    //         Object.keys(this.category_ary[idx]).length

    //         //Partner.category_ary[idx].length
    //       )
    //     )
    //   );
    //}
    // console.log(toJS(this.category_ary[idx]));
  };

  @action setCategoryDic = async (req, sub_data, id) => {
    await PartnerAPI.getPartnerCategory(req)
      .then((res) => {
        // console.log(toJS(res));
        // console.log(`${sub_data} : ${toJS(res.data.category)}`);
        //this.category_ary[idx].push(res.data.category);
        // console.log(toJS(typeof this.category_name_ary));
        //this.category_dic[id] = [1, 2, 3];
        // console.log(`${id} +  ${toJS(this.category_dic.hasOwnProperty(id))}`);

        if (!this.category_dic.hasOwnProperty(id)) {
          this.category_dic[id] = [];
        }
        this.category_dic[id] = [...this.category_dic[id], res.data.category];
        // console.log(toJS(this.category_dic));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    // console.log(`${id} : ${toJS(this.category_dic[id])}`);
  };

  @action getCategory = () => {
    //this.filter_category_ary = [];

    const req = {
      // nextUrl: this.develop_next,
    };

    PartnerAPI.getCategory(req)
      .then(async (res) => {
        this.filter_category_ary = this.filter_category_ary.concat(
          res.data.results
        );
        this.develop_next = res.data.next;

        // console.log(toJS(res.data.results));
        // console.log(toJS(this.filter_category_ary));
        // console.log(this.develop_next);
        while (this.develop_next) {
          const req = {
            nextUrl: this.develop_next,
          };
          //console.log("========================");
          await PartnerAPI.getNextDevelopPage(req)
            .then((res) => {
              //console.log(res);
              this.filter_category_ary = this.filter_category_ary.concat(
                res.data.results
              );

              this.develop_next = res.data.next;
              //console.log(this.develop_next);
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
        // console.log(toJS(res.data.results.category));
        // console.log(toJS(typeof this.filter_category_ary));
        // console.log(toJS(this.filter_category_ary));
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
        this.filter_city_ary = this.filter_city_ary.concat(res.data.results);
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
        // console.log(toJS(res.data.results));
        // console.log(toJS(typeof this.filter_city_ary));
        // console.log(toJS(this.filter_city_ary));
        this.filter_city_ary = this.filter_city_ary.filter(
          (item) => item.id === 0 || item.id < 9
        );

        // this.city_ary = this.city_ary.filter((item) => item.id < 9);
        // console.log(toJS(this.filter_city_ary));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getPartner = async (page = 1) => {
    this.partner_list = [];
    this.category_ary = [];
    //this.data_dt = [];
    //console.log(this.filter_region);
    const token = localStorage.getItem("token");
    let req = { params: { page: page } };
    let temp = { params: { page: page } };
    if (this.filter_region) {
      temp.params.city = this.filter_region;
      req.params.city = this.filter_region;
    }

    if (this.filter_category) {
      //temp["category_middle__id"] = this.filter_category;
      temp.params.category_middle__id = this.filter_category;
      req.params.category_middle__id = this.filter_category;
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
    // console.log(toJS(this.search_class));
    // if (this.search_text !== "") {
    //   req.params.search = ParseInt(this.search_text);
    // }

    //console.log(temp);
    console.log(req);
    // if (!this.filter_region) {
    //   if (!this.filter_category) {
    //     req = {
    //       params: {
    //         search: this.search_text,
    //         page: page,
    //       },
    //     };
    //   } else {
    //     req = {
    //       params: {
    //         //city: this.filter_region === 0 ? "" : this.filter_region,

    //         category_middle__id: this.filter_category,
    //         search: this.search_text,
    //         page: page,
    //       },
    //     };
    //   }
    // } else {
    //   if (!this.filter_category) {
    //     req = {
    //       params: {
    //         //city: this.filter_region === 0 ? "" : this.filter_region,
    //         city: this.filter_region,

    //         search: this.search_text,
    //         page: page,
    //       },
    //     };
    //   } else {
    //     req = {
    //       params: {
    //         //city: this.filter_region === 0 ? "" : this.filter_region,
    //         city: this.filter_region,
    //         category_middle__id: this.filter_category,
    //         search: this.search_text,
    //         // history
    //         page: page,
    //       },
    //     };
    //   }
    // }

    await PartnerAPI.getPartners(req)
      .then((res) => {
        this.partner_list = [];
        this.category_ary = [];
        this.category_name_ary = [];
        this.temp_category_name_ary;

        this.partner_list = res.data.results;
        this.partner_next = res.data.next;
        this.partner_count = res.data.count;
        //this.category_ary = res.data.results.category_middle;
        this.partner_page = parseInt((this.partner_count - 1) / 10) + 1;

        this.partner_list.map((item, idx) => {
          this.category_ary.push(item.category_middle);
          //console.log(toJS(item));
          //console.log(toJS(this.category_ary));

          this.category_ary[idx].map((data, id) => {
            //console.log(toJS(data));

            // const request = {
            //   id: data,
            // };

            // if(this.partner_list.length-1 === idx){

            // }
            // this.category_ary.map((data, id) => {
            //   console.log(toJS(data));
            // });
            //   console.log(toJS(this.category_name_ary));

            //   console.log(toJS(this.category_ary[idx]));
            for (let i = 0; i < this.category_ary[idx].length; i++) {
              const request = {
                id: this.category_ary[idx][i],
              };
              // this.getPartnerCategory(request, i, idx);
            }
          });
        });

        // //async function temp() {
        this.category_ary.map((data, id) => {
          //console.log(toJS(data));
          data.map((sub_data, index) => {
            // console.log(toJS(sub_data));

            // console.log(id);
            const req = {
              id: sub_data,
            };

            //console.log(index);
            this.setCategoryDic(req, sub_data, id);
          });
        });
        // }
        // temp();

        // for(let i=0; i<this.category_ary.length; i++){
        //   req = {
        //     id: this.category_ary

        //    };
        // }

        // // 2)
        // PartnerAPI.getPartnerCategory(request)
        //   .then((res) => {
        //     console.log(toJS(res.data.category));
        //     // this.category_ary[idx].push(res.data.category);

        //     // if (idx === this.partner_list.length - 1) {
        //     //   console.log("finish");
        //     //   this.check_loading_category = true;
        //     // }

        //     console.log(toJS(this.category_ary[idx].length));
        //     console.log(id);
        //     console.log(toJS(this.category_ary[idx]));

        //     if (this.category_ary[idx].length > id) {
        //       console.log(
        //         "조건조건조건조건조건조건조건조건조건조건조건조건"
        //       );
        //       this.temp_category_name_ary.push(res.data.category);
        //       console.log(toJS(this.category_ary[idx].length));
        //       console.log(id);
        //       console.log(toJS(this.temp_category_name_ary));
        //       if (this.category_ary[idx].length - 1 === id) {
        //         this.category_name_ary.push(this.temp_category_name_ary);
        //         this.temp_category_name_ary = [];
        //         console.log(toJS(this.category_name_ary));
        //       }

        //       //this.category_ary[idx].push(res.data.category);

        //       // if (idx === this.partner_list.length - 1) {
        //       //   console.log("finish");
        //       //   this.check_loading_category = true;
        //       // }
        //     }
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //     console.log(e.response);
        //   });

        //            this.getPartnerCategory(request, 0, idx, id);

        //this.getCategory();
        //});

        // console.log(toJS(this.partner_list));

        //console.log(toJS(this.category_ary));
        //console.log(toJS(this.category_name_ary));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getReview = async (page = 1, clientId = "") => {
    // console.log(clientId);
    const req = {
      params: {
        partnername: this.partnerName,
        //client: clientId,
      },
      // nextUrl: this.develop_next,
    };

    await PartnerAPI.getReview(req)
      .then(async (res) => {
        // console.log(res.data.results);
        this.review_ary = this.review_ary.concat(res.data.results);

        this.review_next = res.data.next;
        this.review_count = res.data.count;
        // console.log(this.review_count);

        if (this.review_ary.length !== 0) {
          this.loadReviewData = 1;
          //await this.getClientEmail();
        } else {
          this.loadReviewData = -1;
        }

        while (this.review_next) {
          const req = {
            nextUrl: this.review_next,
            params: {
              partnername: this.partnerName,
              // client: clientId,
            },
          };
          await PartnerAPI.getNextReviewPage(req)
            .then((res) => {
              // console.log(res.data.results);
              this.review_ary = this.review_ary.concat(res.data.results);

              this.review_next = res.data.next;
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
    // console.log(toJS(this.review_ary));

    // if (this.review_count !== 0 && clientId) {
    //   this.review_done = true;
    // } else {
    //   this.review_done = false;
    // }
    // console.log(this.review_done);
  };
  @action getPortfolio = async (partnerId) => {
    const req = {
      params: {
        partner: partnerId,
      },
    };
    await PartnerAPI.getPortfolioList(req)
      .then((res) => {
        console.log(res.data);
        // res.data.results.img_portfolio
        this.portFolioList = this.portFolioList.concat(res.data.results);
        console.log(toJS(this.portFolioList));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action checkReviewWriting = async (page = 1, clientId = "") => {
    // console.log(clientId);
    const req = {
      params: {
        client: clientId,
      },

      // nextUrl: this.develop_next,
    };

    await PartnerAPI.getReview(req)
      .then(async (res) => {
        // console.log(res.data.results);

        this.review_count = res.data.count;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    if (this.review_count !== 0 && clientId) {
      this.review_done = true;
    } else {
      this.review_done = false;
    }
    // console.log(this.review_done);
  };

  @action async getClientEmail() {
    console.log("getClientEmail");
    console.log(toJS(this.review_ary));
    let req = {};

    await Promise.all(
      this.review_ary.map(async (item, idx) => {
        req = {
          params: {
            id: item.client,
          },
        };
        // console.log(req.params.id);

        await PartnerAPI.getClientEmail(req)
          .then((res) => {
            console.log("MapMapMap");
            // console.log(res.data.results);
            // console.log(res.data.results[0].user);
            // console.log(res.data.results[0]);

            this.userEmail = res.data.results[0].user.username;
            this.review_user_ary.push(res.data.results[0].user.username);
            // console.log(toJS(this.review_user_ary));
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
          });
        // console.log(toJS(this.review_user_ary));
      })
    );
    console.log(toJS(this.review_user_ary));
  }
  // @action getPartnerByRegion = async (page = 1) => {
  //   this.partner_list = [];
  //   //this.data_dt = [];
  //   console.log(this.filter_region);
  //   const token = localStorage.getItem("token");
  //   let req = {};
  //   if (!this.filter_region) {
  //     req = {
  //       params: {
  //         // search: search_text,
  //         page: page,
  //         // ordering: "-id",
  //       },
  //       // headers: {
  //       //   Authorization: `Token ${token}`,
  //       // },
  //     };
  //   } else {
  //     req = {
  //       params: {
  //         //city: this.filter_region === 0 ? "" : this.filter_region,
  //         city: this.filter_region,
  //         // search: search_text,
  //         page: page,

  //         // ordering: "-id",
  //       },
  //       // headers: {
  //       //   Authorization: `Token ${token}`,
  //       // },
  //     };
  //   }

  //   PartnerAPI.getPartners(req)
  //     .then((res) => {
  //       this.partner_list = [];
  //       this.category_ary = [];

  //       this.partner_list = res.data.results;
  //       // this.category_ary = res.data.results.category_middle;

  //       // console.log(toJS(category_ary));
  //       this.partner_next = res.data.next;
  //       this.partner_count = res.data.count;
  //       this.partner_page = parseInt((this.partner_count - 1) / 10) + 1;
  //       console.log(toJS(this.partner_list));

  //       //this.getCategory();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       console.log(e.response);
  //     });
  // };
  // @action getPartnerCategory = async (page = 1) => {
  //   req = {
  //     params: {
  //       // search: search_text,
  //       page: page,
  //       // ordering: "-id",
  //     },
  //     // headers: {
  //     //   Authorization: `Token ${token}`,
  //     // },
  //   };

  //   PartnerAPI.getPartner(req)
  //     .then((res) => {
  //       this.category_list = [];

  //       this.category_list = res.data.results.category_middle;
  //       // this.partner_next = res.data.next;
  //       // this.partner_count = res.data.count;
  //       // this.partner_page = parseInt((this.partner_count - 1) / 10) + 1;
  //       // console.log(toJS(this.partner_list));
  //       //this.getCategory();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       console.log(e.response);
  //     });
  // };
}

export default new Partner();
