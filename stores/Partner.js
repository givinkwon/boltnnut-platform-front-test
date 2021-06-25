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
  @observable category_main_list = [];
  @observable category_middle_total_ary = [];
  @observable category_middle_ary = [];
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
  @observable select_city = null;
  @observable loading = 0;

  // 필터 & 라디오박스 관련 변수
  @observable filter_region = 0;
  @observable filter_category = 0;
  @observable filter_detail_category = 0;

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
  @observable city_name = "";

  @observable filter_checked_idx = 0;

  @observable input_process_filter = null;
  @observable input_category = null;
  @observable input_big_category = null;
  @observable input_small_category = null;

  @observable input_max_budget = null;
  @observable input_min_budget = null;

  @observable category_ary = [];
  @observable category_name_ary = [];
  @observable category_name_list = null;
  @observable temp_category_name_ary = [];
  @observable category_dic = {
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
  @observable check_loading_category = false;
  @observable check_click_filter = false;
  @observable check_loading_develop = false;

  @observable modalActive = false;
  @observable requestModalActive = false;
  @observable requestDoneModalActive = false;
  @observable ReviewActive = false;
  @observable reviewModalActive = false;
  @observable ReviewActiveIndex = 1;
  @observable reviewWritingModalActive = true;

  @observable modalUserPhone = "";
  @observable filterFile = false;

  @observable filterLoading = true;

  @observable filterList = [];
  // @observable img = "";
  @observable selectedIntroductionFile = null;
  @observable selectedIntroductionFileType = null;
  // 파트너 리뷰
  @observable star_ary = [
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
    { id: 4, checked: false },
    { id: 5, checked: false },
  ];

  @observable filterArray = [
    // { id: 1, name: "전체", checked: false },
    { id: 1, name: "신제품개발", checked: false },
    { id: 2, name: "OEM 구매", checked: false },
    { id: 3, name: "금형/양산", checked: false },
    { id: 4, name: "단품가공", checked: false },
    { id: 5, name: "대량가공", checked: false },
    // { id: 6, name: "기타", checked: false },
  ];

  @observable detailFilterArray = [
    // { id: 1, name: "전체", checked: false },
    { id: 1, name: "샘플제작", checked: false },
    { id: 2, name: "OEM", checked: false },
    { id: 3, name: "ODM", checked: false },
    { id: 4, name: "금형/사출", checked: false },
    { id: 5, name: "대량가공", checked: false },
    // { id: 6, name: "기타", checked: false },
  ];

  @observable partnerName = "";
  // @observable reviewPartnerName = 0;
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
  @observable mobileRequestIndex = 0;

  @observable portFolioList = [];

  @observable minDirectInput = false;
  @observable maxDirectInput = false;
  @observable detailMinDirectInput = false;
  @observable detailMaxDirectInput = false;

  @observable fileArray = [];
  @observable detailRequestTitle = null;
  @observable detailRequestInfo = null;
  @observable detailRequestEmail = null;
  @observable detailRequestPhone = null;
  @observable detail_select_city = null;
  @observable input_detail_min_budget = null;
  @observable input_detail_max_budget = null;
  @observable input_detail_big_category = null;
  @observable input_detail_small_category = null;
  @observable input_detail_direct_min_budget = null;
  @observable input_detail_direct_max_budget = null;

  @observable filter_categorys = "";
  @observable filter_ary = [];
  @observable filter_begin_idx = "";
  @observable filter_end_idx = "";

  @observable filter_begin_id = "";
  @observable filter_end_id = "";

  // 파트너의 답변
  @observable answer_set = [];

  @observable clientInfo = [];

  // 파트너 리뷰 페이지
  @observable reviewActiveIndex = 0;
  @observable searchProjectModalActive = false;
  @observable projectName = "";
  @observable partnersName = "";
  @observable reviewPartnerName = "";
  @observable reviewPartnerId = "";
  @observable partnersList = [];
  @observable partnerExist = true;
  @observable newPartner = 0; // 가입되어 있는 제조사 : 0, 가입되어 있지 않은 제조사 : 1
  @observable partnerReviewList = [];

  @observable searchPartnerModalActive = false;
  @observable reviewKindnessAry = [
    { score: 1, content: "불친절해요", checked: false },
    { score: 2, content: "보통이에요", checked: false },
    { score: 3, content: "친절해요", checked: true },
  ];

  @observable reviewKindnessIndex = 3;

  @observable reviewCommunicationAry = [
    { score: 1, content: "불편했어요", checked: false },
    { score: 2, content: "보통이에요", checked: false },
    { score: 3, content: "원활했어요", checked: true },
  ];

  @observable reviewCommunicationIndex = 3;

  @observable reviewProfessionAry = [
    { score: 1, content: "서툴러요", checked: false },
    { score: 2, content: "보통이에요", checked: false },
    { score: 3, content: "전문적이에요", checked: true },
  ];
  @observable reviewProfessionIndex = 3;
  @observable ratingPoint = 0;
  @observable reviewSearchStep = 1;

  @observable partnerReviewNext = null;
  @observable partnerReviewCount = 0;
  @observable partnerPage = 0;
  @observable reviewCurrentPage = 1;

  // @observable clientInfoList = {};
  @observable clientInfoList = [];
  @observable isSearched = false;
  @observable originPartnerList = [];
  @observable subButtonActive = false;
  @observable exceptionCategory = "";
  @action resetReviewAry = () => {
    this.reviewKindnessIndex = 3;
    this.reviewCommunicationIndex = 3;
    this.reviewProfessionIndex = 3;
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

  @action resetReviewData = () => {
    this.reviewPartnerId = "";
    this.projectName = "";

    this.ratingPoint = 0;

    this.reviewKindnessIndex = 3;
    this.reviewCommunicationIndex = 3;
    this.reviewProfessionIndex = 3;

    this.reviewContent = "";
    this.newPartner = 0;
    this.reviewPartnerName = "";

    this.reviewSearchStep = 1;
  };

  @action setProcessFilter = (val) => {
    this.input_process_filter = val;
    console.log(toJS(this.input_process_filter));
    this.filter_category = val.id;

    this.getPartner();
  };

  // 수정필요!
  @action setBigCategory = (val) => {
    this.input_big_category = val;
  };

  @action setMainCategory = async (val) => {
    this.input_big_category = val;

    console.log(val);
    this.request_middle_list = this.input_big_category.category_set;
    // this.selectedMidCategory = obj.category_set[0];
    this.category_middle_ary = await this.category_middle_total_ary.filter(
      (item) => item.maincategory === val.id
    );

    // console.log(toJS(this.category_middle_ary));
    // console.log(toJS(this.category_middle_total_ary));
    // console.log(
    //   toJS(
    //     this.category_middle_total_ary.filter(
    //       (item) => item.maincategory === val.id
    //     )
    //   )
    // );

    this.input_small_category = this.category_middle_ary[0];

    // this.input_detail_big_category = val;
    // this.input_detail_small_category = this.category_middle_ary[0];
    // console.log(this.input_small_category);
  };

  @action setSmallCategory = (val) => {
    this.input_small_category = val;
    // this.input_detail_small_category = val;
  };

  @action setDetailBigCategory = async (val) => {
    this.input_detail_big_category = val;

    this.request_middle_list = this.input_detail_big_category.category_set;
    // this.selectedMidCategory = obj.category_set[0];
    this.category_middle_ary = await this.category_middle_total_ary.filter(
      (item) => item.maincategory === val.id
    );

    this.input_detail_small_category = this.category_middle_ary[0];
  };

  @action setDetailSmallCategory = (val) => {
    this.input_detail_small_category = val;
  };

  @action setMinBudget = (val) => {
    this.input_min_budget = val;
    console.log(val);
    if (val.label === "직접 입력") {
      console.log("true");
      this.minDirectInput = true;
    } else {
      console.log("false");
      this.minDirectInput = false;
    }
  };

  @action setMaxBudget = (val) => {
    this.input_max_budget = val;
    if (val.label === "직접 입력") {
      console.log("true");
      this.maxDirectInput = true;
    } else {
      console.log("false");
      this.maxDirectInput = false;
    }
  };

  @action setDetailMinBudget = (val) => {
    this.input_detail_min_budget = val;
    console.log(val);
    if (val.label === "직접 입력") {
      console.log("true");
      this.detailMinDirectInput = true;
    } else {
      console.log("false");
      this.detailMinDirectInput = false;
    }
  };

  @action setDetailMaxBudget = (val) => {
    this.input_detail_max_budget = val;
    console.log(val);
    if (val.label === "직접 입력") {
      console.log("true");
      this.detailMaxDirectInput = true;
    } else {
      console.log("false");
      this.detailMaxDirectInput = false;
    }
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
          this.category_middle_total_ary = this.category_middle_total_ary.concat(
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

  @action setCityCategory = (val) => {
    console.log(val);
    this.select_city = val;
    this.filter_region = val.id;

    console.log(toJS(this.filter_region));
    this.partner_next = null;
    this.partner_count = null;

    this.currentPage = 1;

    // this.category_dic = {};
    this.resetDevCategory();

    this.getPartner();
  };

  @action setDetailCityCategory = (val) => {
    this.detail_select_city = val;
    console.log(this.detail_select_city);
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
        console.log(toJS(toJS(this.filter_category_ary)));
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
        // this.filter_city_ary = this.filter_city_ary.filter(
        //   (item) => item.id === 0 || item.id < 9
        // );

        // this.city_ary = this.city_ary.filter((item) => item.id < 9);
        // console.log(toJS(this.filter_city_ary));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
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

  //기성품이 없는 신제품의 개발 버튼 클릭했을 때 호출
  @action getOtherPartner = async (page = 1) => {
    this.partner_list = [];
    this.category_ary = [];
    this.resetDevCategory();

    const token = localStorage.getItem("token");
    // alert(this.exceptionCategory);
    let req = {
      params: { page: page },
    };

    let temp = { params: { page: page } };
    if (this.filter_region) {
      temp.params.city = this.filter_region;
      req.params.city = this.filter_region;
    }

    if (this.subButtonActive) {
      delete req.params.category_middle__id;
    } else {
      req.params.category_middle__id = 2;
    }

    // if (this.filter_category) {
    //   //temp["category_middle__id"] = this.filter_category;
    //   temp.params.category_middle__id = this.filter_category;
    //   req.params.category_middle__id = this.filter_category;
    // }

    delete req.params.search;
    delete req.params.history;

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

    console.log(req.params);

    await PartnerAPI.getPartners(req)
      .then(async (res) => {
        console.log(res);
        this.partner_list = [];
        this.category_ary = [];
        this.category_name_ary = [];
        this.temp_category_name_ary;

        this.partner_list = await res.data.results;

        this.partner_next = res.data.next;
        this.partner_count = res.data.count;
        console.log(toJS(this.partner_list));
        //this.category_ary = res.data.results.category_middle;
        this.partner_page = parseInt((this.partner_count - 1) / 10) + 1;
        this.partner_list.map((item, idx) => {
          console.log(item);
          this.category_ary.push(item.category_middle);
          //console.log(toJS(item));
          console.log(toJS(this.category_ary));
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

        await this.category_ary.map(async (data, id) => {
          console.log(toJS(data));
          console.log(id);
          await data.map(async (sub_data, index) => {
            const req = {
              id: sub_data,
            };

            await this.setCategoryDic(req, sub_data, id);
          });
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    this.check_loading_develop = true;
    console.log(this.check_loading_develop);
    this.filterLoading = true;
  };

  @action getPartner = async (page = 1) => {
    this.partner_list = [];
    this.category_ary = [];
    console.log(toJS(this.category_ary));
    this.resetDevCategory();
    // console.log(toJS(this.category_dic));
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

    await PartnerAPI.getPartners(req)
      .then(async (res) => {
        this.partner_list = [];
        this.category_ary = [];
        this.category_name_ary = [];
        this.temp_category_name_ary;

        this.partner_list = await res.data.results;
        this.originPartnerList = this.partner_list;
        this.partner_next = res.data.next;
        this.partner_count = res.data.count;
        console.log(toJS(this.partner_list));
        //this.category_ary = res.data.results.category_middle;
        this.partner_page = parseInt((this.partner_count - 1) / 10) + 1;
        this.partner_list.map((item, idx) => {
          this.category_ary.push(item.category_middle);
          //console.log(toJS(item));
          console.log(toJS(this.category_ary));
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
        let count = 0;
        await this.category_ary.map(async (data, id) => {
          console.log(toJS(data));
          console.log(id);
          await data.map(async (sub_data, index) => {
            // console.log(toJS(sub_data));
            // console.log(count++);
            // console.log(id);
            const req = {
              id: sub_data,
            };
            if (this.isSearched) {
              this.exceptionCategory += sub_data + ",";
            }
            //console.log(index);
            await this.setCategoryDic(req, sub_data, id);
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
    this.check_loading_develop = true;
    console.log(this.check_loading_develop);
    this.filterLoading = true;
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

  @action setclickLog = async (formData) => {
    const req = {
      data: formData,
    };
    await PartnerAPI.setclickLog(req)
      .then((res) => {
        console.log("create: ", res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getPartnerName = async (name, page = 1) => {
    console.log("333");
    this.partnersList = [];
    const req = {
      params: {
        request_name: name,
        page: page,
      },
    };
    await PartnerAPI.getPartnerName(req)
      .then(async (res) => {
        this.partnersList = [];
        console.log("create: ", res);
        this.partnerExist = true;
        this.partnersList = await this.partnersList.concat(res.data.current);
        this.partnerReviewNext = res.data.next;
        this.partnerReviewCount = res.data.count;
        this.partnerPage = parseInt((this.partnerReviewCount - 1) / 10) + 1;
      })
      .catch((e) => {
        this.partnersList = [];
        this.partnerReviewNext = null;
        this.partnerReviewCount = 0;
        this.partnerPage = 0;
        this.partnerExist = false;
        console.log(e);
        console.log(e.response);
      });
  };

  @action setPartnerReview = async (formData) => {
    const req = {
      data: formData,
    };

    PartnerAPI.setPartnerReview(req)
      .then((res) => {
        console.log("create!!", res);
        this.resetReviewData();
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getReviewByPartner = async (id) => {
    console.log(id);
    this.partnerReviewList = [];
    const req = {
      params: {
        partner_id: id,
      },
    };

    await PartnerAPI.getReviewByPartner(req)
      .then(async (res) => {
        this.partnerReviewList = await this.partnerReviewList.concat(res.data);
        console.log(this.partnerReviewList);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // @action getClientById = (id) => {
  //   const
  //   PartnerAPI.getClient(request.client, req)
  // .then((res) => {
  //   this.clients.push(res.data);
  //   console.log(res.data);
  // })
  // .catch((e) => {
  //   console.log(e);
  //   console.log(e.response);
  // });
  // }

  @action getClientNameById = async (id, idx) => {
    const req = {
      params: null,
    };
    await PartnerAPI.getClient(id, req).then(async (res) => {
      console.log(`${idx} : ${id} ============= ${res.data}`);
      this.clientInfoList = await this.clientInfoList.concat(res.data);

      // this.clientInfoList[id] = res.data;
      console.log(this.clientInfoList);
    });
  };
}

export default new Partner();
