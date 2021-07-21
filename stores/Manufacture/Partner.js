import { observable, action, toJS, makeObservable } from "mobx";

import * as CategoryAPI from "axios/Account/Category";
import * as PartnerAPI from "axios/Manufacture/Partner";
import Router from "next/router";
import { isConstructorDeclaration } from "typescript";
import NoneDrawingConsultingContainer from "containers/Manufacture/Request/NoneDrawingConsulting";

class Partner {
  constructor() {
    //makeObservable(this);
  }

  /* /producer 우측 카드 변수 */
  @observable totalPartnerBookmark = 0;
  @observable totalClientBookmark = 0;
  @observable hoverInterestedIdx = false;
  @observable hoverProjectIdx = false;
  @observable interestedIdx = false;
  @observable projectIdx = false;

  @observable recentPartnerList = [];
  @observable recentPartnerId = 0;
  @observable selectedTabIdx = 0; // 선택한 tabBar의 index 저장하는 변수
  @observable viewerLoading = 0;
  @observable subViewerLoading = -1;
  @observable click_count = 1;
  @observable detail = null;
  @observable requests = [];
  @observable clients = [];

  @observable docViewerLoading = false;

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

  @observable search = "";
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

  @observable business_name = [];
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
  @observable category_count = 0;

  @observable availableFileType = [
    "png",
    "jpeg",
    "gif",
    "bmp",
    "pdf",
    "csv",
    "xslx",
    "docx",
    "mp4",
    "webm",
    "mp3",
    "pptx",
    "doc",
    "html",
  ];
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
  @observable review_client_obj = {
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
  @observable reviewWritingModalActive = false;

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

  @observable cityArray = [
    // { id: 1, name: "전체", checked: false },
    // { id: 0, name: "전체", checked: false },
    { id: 1, name: "서울특별시", checked: false },
    {
      id: 2,
      name: "경기도",
      checked: false,
    },
    { id: 3, name: "강원도", checked: false },
    { id: 6, name: "전라북도", checked: false },
    { id: 7, name: "전라남도", checked: false },
    { id: 9, name: "경상남도", checked: false },
    { id: 15, name: "인천광역시", checked: false },
    // { id: 6, name: "기타", checked: false },
  ];

  @observable filterArray = [
    // { id: 1, name: "전체", checked: false },
    // { id: 0, name: "전체", checked: false },
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
  @observable detailCompanyName = null;
  @observable detailRank = null;
  @observable detailPassword = null;
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

  @observable filter_dropdown = false;
  @observable check_filter_city = false;
  @observable filter_city_idx = -1;
  @observable check_filter_category = false;
  @observable filter_category_idx = -1;

  // 파트너의 답변
  @observable answer_set = [];

  @observable clientInfo = [];

  // 파트너 리뷰 페이지
  @observable reviewLoading = false;
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
  @observable partnerAllReviewList = [];

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
  @observable review_partner_page = 0;
  @observable review_partner_count = 0;

  // @observable clientInfoList = {};
  @observable clientInfoList = [];
  @observable isSearched = false;
  @observable originPartnerList = [];
  @observable subButtonActive = false;
  @observable exceptionCategory = "";
  @observable loadingFlag = 1;
  @observable detailLoadingFlag = false;

  @observable dropDownActive = false;
  @observable dropDownIdx = -1;

  @observable fileName = "";
  @observable file = "";
  @observable checkFileUpload = false;

  @observable filter_active = false;
  @observable activeReview = false;

  @action movePage = (e) => {
    e.preventDefault();
    const newPage = e.target.innerText * 1;
    this.currentPage = newPage;
    this.resetDevCategory();
    this.check_loading_develop = false;
    this.ReviewActive = false;
    this.ReviewActiveIndex = -1;
    this.dropDownActive = false;
    this.dropDownIdx = -1;
    this.click_count += 1;
    this.subButtonActive
      ? this.getOtherPartner(newPage)
      : this.getPartner(newPage, this.click_count);
  };

  @action pageNext = (e) => {
    e.preventDefault();
    if (this.currentPage < this.partner_page) {
      const nextPage = this.currentPage + 1;
      this.currentPage = nextPage;
      this.check_loading_develop = false;
      this.resetDevCategory();
      this.ReviewActive = false;
      this.ReviewActiveIndex = -1;
      this.dropDownActive = false;
      this.dropDownIdx = -1;
      this.click_count += 1;
      this.subButtonActive
        ? this.getOtherPartner(this.currentPage)
        : this.getPartner(this.currentPage, this.click_count);
    }
  };

  @action pagePrev = (e) => {
    e.preventDefault();
    if (this.currentPage > 1) {
      const newPage = this.currentPage - 1;
      this.currentPage = newPage;
      this.resetDevCategory();
      this.check_loading_develop = false;
      this.ReviewActive = false;
      this.ReviewActiveIndex = -1;
      this.dropDownActive = false;
      this.dropDownIdx = -1;
      this.click_count += 1;
      this.subButtonActive
        ? this.getOtherPartner(this.currentPage)
        : this.getPartner(this.currentPage, this.click_count);
    }
  };

  // @action pushToDetail = async (item, idx) => {
  //   console.log(this.modalActive);

  //   if (!this.requestModalActive && !this.modalActive) {
  //     console.log("Detail click");
  //     this.category_name_list = null;
  //     this.partner_detail_list = [];
  //     this.partner_detail_list.push({ item: item });
  //     this.category_name_list = this.category_dic[idx];

  //     if (this.dropDownIdx === -1) {
  //       await this.getCityName(this.partner_detail_list[0].item.city);
  //       this.portFolioList = [];
  //       await this.getPortfolio(this.partner_detail_list[0].item.id);
  //       this.dropDownActive = true;
  //       this.dropDownIdx = idx;
  //     } else {
  //       if (this.dropDownIdx === idx) {
  //         this.dropDownActive = false;
  //         this.dropDownIdx = -1;
  //       } else {
  //         await this.getCityName(this.partner_detail_list[0].item.city);
  //         this.portFolioList = [];
  //         await this.getPortfolio(this.partner_detail_list[0].item.id);
  //         this.dropDownActive = true;
  //         this.dropDownIdx = idx;
  //       }
  //     }
  //   }
  // };

  @action pushToDetail = async (item, idx) => {
    this.detailLoadingFlag = true;

    if (!this.requestModalActive && !this.modalActive) {
      console.log("Detail click");
      this.category_name_list = null;

      this.category_name_list = this.category_dic[idx];

      if (!item.file) {
        this.detailLoadingFlag = false;
        alert("해당 회사의 소개서가 존재하지 않습니다!");
        return;
      }
      this.selectedIntroductionFile = item.file;

      const fileType = item.file
        .split(".")
        [item.file.split(".").length - 1].toLowerCase();
      this.selectedIntroductionFileType = fileType;

      if (this.availableFileType.indexOf(fileType) > -1) {
        console.log("뷰어 페이지 router push");
        this.partner_detail_list = [];
        await this.partner_detail_list.push({ item: item, idx: idx });
        this.recentPartnerId = this.partner_detail_list[0].item.id;

        // Partner.getReviewByPartner(Partner.partner_detail_list[0]);
        console.log(toJS(this.partner_detail_list));
        await this.getReviewByPartner(
          this.partner_detail_list[0].item.id,
          1,
          1
        );
        await this.getReviewByPartner(this.partner_detail_list[0].item.id);

        await this.getCityName(this.partner_detail_list[0].item.city);
        Router.push("/producer/detail");
        // this.setState({ g: 3 });
      } else {
        console.log("file download");
        this.filedownload(item.file);
      }
    }
  };

  @action onChangeFile = (e) => {
    if (e && e.currentTarget.files[0]) {
      console.log(e.currentTarget);
      console.log(e.currentTarget.files[0]);

      for (var item in e.currentTarget.files) {
        console.log(item);
        if (typeof e.currentTarget.files[item] === "object") {
          this.fileArray.push(e.currentTarget.files[item]);
        } else {
          break;
        }
      }
    }

    console.log(toJS(this.fileArray));
    const fileName = e.currentTarget.files[0].name;

    this.file = e.currentTarget.files[0];
    this.fileName = fileName;
    this.checkFileUpload = true;
  };

  @action resetReviewAry = () => {
    this.reviewKindnessIndex = 3;
    this.reviewCommunicationIndex = 3;
    this.reviewProfessionIndex = 3;
  };

  @action openModal = () => {
    console.log("open click");
    this.requestModalActive = true;
  };

  @action closeModal = () => {
    console.log("close click");
    this.requestModalActive = false;
  };

  @action activeHandler = (idx) => {
    if (idx === this.filter_checked_idx) {
      console.log("ture");
      return true;
    } else {
      console.log("false");
      return false;
    }
  };

  @action filterActiveHandler = () => {
    if (this.filter_active) {
      this.check_click_filter = false;
    } else {
      this.filter_active = true;
      this.check_click_filter = true;
    }
  };

  @action onClickReviewHandler = (idx, name) => {
    if (this.ReviewActiveIndex === idx) {
      console.log(`review false : ${idx}`);
      this.activeReview = false;
      this.ReviewActive = false;
      this.ReviewActiveIndex = -1;
      this.partnerName = "";
    } else {
      console.log(`review true : ${idx}`);
      this.activeReview = true;
      this.ReviewActive = true;
      this.ReviewActiveIndex = idx;
      this.partnerName = name;
    }
  };

  @action activeFileFilter = () => {
    if (this.filterFile) {
      this.filterFile = false;
    } else {
      this.filterFile = true;
    }
  };

  @action handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      this.reviewCurrentPage = 1;
      this.getPartnerName(this.partnersName);
    }
  };

  @action moveReviewPage = () => {
    if (this.reviewSearchStep == 2) {
      this.searchProjectModalActive = false;
    } else {
      this.searchProjectModalActive = false;
      this.searchPartnerModalActive = true;
    }
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

  @action resetClientObj = () => {
    this.review_client_obj = {
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

  @action searchText = async (e) => {
    this.search = e.target.value;
    await (this.search_text = e.target.value);
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
    this.request_middle_list = this.input_big_category.category_set;
    this.category_middle_ary = await this.category_middle_total_ary.filter(
      (item) => item.maincategory === val.id
    );

    this.input_small_category = this.category_middle_ary[0];
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
    console.log("ffffffffffffffffffffffffff");
    // await Promise.all(
    await PartnerAPI.getPartnerCategory(req)
      .then(async (res) => {
        console.log("gggggggggggggggggggggggg");

        if (!this.category_dic.hasOwnProperty(id)) {
          this.category_dic[id] = [];
        }
        this.category_dic[id] = await [
          ...this.category_dic[id],
          res.data.category,
        ];
        console.log(toJS(this.category_dic));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    // console.log(`${id} : ${toJS(this.category_dic[id])}`);
    // console.log(toJS(this.category_dic))
    // console.log(`3 : ${this.filterLoading}`);
    // this.filterLoading = true;
    // console.log(toJS(this.category_dic));
    // );
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
      //temp["category_middle__id"] = this.filter_category;
      // if(this.filter_category==1){
      //   req.params.category_middle__id = this.filter_category;
      // }
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

        // await this.category_ary.map(async (data, id) => {
        //   await data.map(async (sub_data, index) => {
        //     const req = {
        //       id: sub_data,
        //     };
        //     if (this.isSearched) {
        //       this.exceptionCategory += sub_data + ",";
        //     }

        //     if (this.click_count != click) {
        //       return;
        //     }

        //     await PartnerAPI.getPartnerCategory(req)
        //       .then(async (res) => {
        //         if (click == 0) {
        //           click += 1;
        //         }

        //         if (this.click_count == click) {
        //           if (!this.category_dic.hasOwnProperty(id)) {
        //             this.category_dic[id] = [];
        //           }
        //           this.category_dic[id] = await [
        //             ...this.category_dic[id],
        //             res.data.category,
        //           ];
        //         } else {
        //           return;
        //         }

        //       }
        //       )
        //       .catch((e) => {
        //         console.log(e);
        //         console.log(e.response);
        //       });
        //     if (this.click_count != click) {
        //       return;
        //     }
        //   });
        // }

        // );
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    this.check_loading_develop = true;

    this.filterLoading = true;
    // if (this.click_count != click) {
    //   return;
    // }
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
    this.partnersList = [];
    const req = {
      params: {
        name: name,
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
        this.reviewActiveIndex = 2;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getReviewByPartner = async (id, page_nation = 0, page = 1) => {
    console.log(id);
    console.log(page_nation);
    console.log(page);
    console.log(this.review_partner_page);
    // this.review_partner_page = 0;
    if (page_nation == 1) {
      this.partnerReviewList = [];
    } else {
      this.partnerAllReviewList = [];
    }

    const req = {
      params: {
        partner_id: id,
        page_nation: page_nation,
        page: page,
      },
    };

    await PartnerAPI.getReviewByPartner(req)
      .then(async (res) => {
        if (page_nation == 1) {
          this.partnerReviewList = await this.partnerReviewList.concat(
            res.data
          );
          console.log(this.partnerReviewList);
          this.review_partner_count = res.data.count;
          this.review_partner_page =
            parseInt((this.review_partner_count - 1) / 10) + 1;
        } else {
          this.partnerAllReviewList = await this.partnerAllReviewList.concat(
            res.data
          );
        }
        console.log(this.partnerReviewList);
        console.log(this.partnerAllReviewList);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action checkReviewWriting = async (client_id) => {
    console.log(client_id);
    const req = {
      params: {
        client_id: client_id,
      },
    };

    await PartnerAPI.checkReviewWriting(req)
      .then((res) => {
        this.reviewWritingModalActive = true;
        console.log(res);
      })
      .catch((e) => {
        this.reviewWritingModalActive = false;
        console.log(e);
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
    console.log(id);
    console.log(idx);
    const req = {
      params: null,
    };
    await PartnerAPI.getClient(id, req).then(async (res) => {
      console.log(res.data);
      console.log(`${idx} : ${id} ============= ${res.data}`);
      this.clientInfoList = await this.clientInfoList.concat(res.data);

      // this.clientInfoList[id] = res.data;

      // console.log(this.clientInfoList);

      if (!this.review_client_obj.hasOwnProperty(id)) {
        this.review_client_obj[idx] = [];
      }
      this.review_client_obj[idx] = await [
        ...this.review_client_obj[idx],
        res.data.user.username,
      ];
    });
    console.log(toJS(this.review_client_obj));
  };

  // 배열을 무작위로 섞는 함수
  // 배열을 인자로 받음
  @action shuffleArray = (array) => {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      // [array[i], array[j]] = [array[j], array[i]];
      const x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  };

  /*  - 클릭 시 발생하는 이벤트 함수 
      - type은 이벤트 종류를 명시
      - item은 이벤트 발생 시 전달 받은 객체(type에 따라 다양)
      - idx는 몇 번째 item인지 index를 의미 
  */
  @action clickHandler = (type, item = 0, idx = 0) => {
    switch (type) {
      case "tabbar":
        if (this.selectedTabIdx === idx + 1) {
          // this.selectedTabIdx = 0;
        } else {
          this.selectedTabIdx = idx + 1;
        }
        console.log(this.selectedTabIdx);
        break;
      case "interested":
        this.interestedIdx = !this.interestedIdx;
        console.log(this.interestedIdx);
        break;
      case "project":
        this.projectIdx = !this.projectIdx;
        console.log(this.projectIdx);
        break;
    }
  };

  /*  - 클릭한 후 상태에 관한 함수
      - type은 이벤트 종류를 명시
      - item은 이벤트 발생 시 전달 받은 객체(type에 따라 다양)
      - idx는 몇 번째 item인지 index를 의미 
  */
  @action activeHandler = (type, item = 0, idx = 0) => {
    console.log(type);
    switch (type) {
      case "interested":
        console.log(this.interestedIdx);
        if (this.interestedIdx) {
          return true;
        } else {
          return false;
        }
        break;

      case "project":
        if (this.projectIdx) {
          return true;
        } else {
          return false;
        }
        break;

      case "tabbar":
        console.log(idx === this.selectedTabIdx - 1);
        if (idx === this.selectedTabIdx - 1) {
          return true;
        } else {
          return false;
        }
        break;
    }
  };

  @action hoverHandler = (type, action) => {
    switch (type) {
      case "project":
        this.hoverProjectIdx = action;
        break;
      case "interested":
        this.hoverInterestedIdx = action;
        break;
    }
  };

  /*  
      - 관심 업체를 등록하는 함수
      - clientID : 클라이언트 Id,  partnerID: 파트너 Id
  */
  @action setBookmarkPartner = async (clientID, partnerID) => {
    console.log(clientID);
    console.log(partnerID);
    const formData = new FormData();
    formData.append("clientID", clientID);
    formData.append("partnerID", partnerID);

    const req = {
      data: formData,
    };

    await PartnerAPI.setBookmarkPartner(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  /*  
      - 로그인한 클라이언트가 관
      - clientID : 클라이언트 Id,  partnerID: 파트너 Id
  */
  @action getBookmarkByClient = async (clientID) => {
    console.log(clientID);

    const req = {
      params: {
        clientID: clientID,
      },
    };

    await PartnerAPI.getBookmarkByClient(req)
      .then((res) => {
        console.log(res);
        this.totalClientBookmark = res.data.count;
        console.log(this.totalClientBookmark);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action deleteBookmarkPartner = async (clientID, partnerID) => {
    console.log(clientID);
    console.log(partnerID);
    const formData = new FormData();
    formData.append("clientID", clientID);
    formData.append("partnerID", partnerID);

    const req = {
      data: formData,
    };

    await PartnerAPI.deleteBookmarkPartner(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action existBookmarkPartner = async (clientID, partnerID) => {
    console.log(typeof clientID);
    console.log(clientID);
    console.log(partnerID);

    const req = {
      params: {
        clientID: clientID,
        partnerID: partnerID,
      },
    };

    await PartnerAPI.existBookmarkPartner(req)
      .then((res) => {
        console.log(res);
        console.log(res.data.data);
        console.log(typeof res.data.data);
        if (parseInt(res.data.data)) {
          this.interestedIdx = true;
        } else {
          this.interestedIdx = false;
        }
        console.log(this.interestedIdx);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action checkedInterestedIdx = async (clientId, partnerId) => {
    if (this.interestedIdx) {
      await this.setBookmarkPartner(clientId, partnerId);
    } else {
      await this.deleteBookmarkPartner(clientId, partnerId);
    }
    await this.getBookmarkByClient(clientId);
    await this.getTotalBookmarkByPartner(partnerId);
  };

  @action getTotalBookmarkByPartner = async (partnerId) => {
    const req = {
      params: {
        partnerID: partnerId,
      },
    };

    PartnerAPI.getTotalBookmarkByPartner(req)
      .then((res) => {
        console.log(res);
        console.log(res.data.count);
        this.totalPartnerBookmark = res.data.count;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getBusinessCategory = (id) => {
    const req = {
      id: id,
    };

    PartnerAPI.getBusinessCategory(req)
      .then((res) => {
        console.log(res);
        this.business_name = res.data.business;
        console.log(this.business_name);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
}

export default new Partner();
