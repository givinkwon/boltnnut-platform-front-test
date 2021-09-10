import { observable, action, toJS, makeObservable } from "mobx";

import * as CategoryAPI from "axios/Account/Category";
import * as PartnerAPI from "axios/Manufacture/Partner";
import * as ReviewAPI from "axios/Manufacture/Review";
import Router from "next/router";
import Auth from "../Account/Auth";

import Category from "./Category";
import { NonceProvider } from "react-select";

class Partner {
  constructor() {
    //makeObservable(this);
  }

  // 상세 주소
  @observable detailRegion = "";
  // 비즈니스 관련 카테고리를 가지고 있는 지
  @observable hashBusinessCategory = [];
  /* Page 관련 변수 */
  @observable pageType = "";
  /* Q/A 관련 변수 */
  @observable questionLoadSuccess = 0;
  @observable questionClientInfo = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  };
  @observable mergeQuestionList = [];
  @observable questionCurrentPage = 1;
  @observable questionPage = 0;
  @observable questionSaveCount = 0;
  @observable questionSaveSuccess = 0;
  @observable questionSearchText = ""; // 글 작성
  @observable answerSearchText = ""; // 답변 작성
  @observable secretIdx = 0;
  @observable questionCount = 0;
  @observable questionList = new Array(10);
  @observable writingModalIdx = "";
  /* /search 우측 카드 변수 */
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

  // city를 id로 주고 있어서 받아오기
  @observable city_name = "";

  // business를 id로 주고 있어서 받아오기
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
    "jpg",
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
  ];

  @observable filterArray = [
    { id: 1, name: "신제품개발", checked: false },
    { id: 2, name: "OEM 구매", checked: false },
    { id: 3, name: "금형/양산", checked: false },
    { id: 4, name: "단품가공", checked: false },
    { id: 5, name: "대량가공", checked: false },
  ];

  @observable detailFilterArray = [
    { id: 1, name: "샘플제작", checked: false },
    { id: 2, name: "OEM", checked: false },
    { id: 3, name: "ODM", checked: false },
    { id: 4, name: "금형/사출", checked: false },
    { id: 5, name: "대량가공", checked: false },
  ];

  @observable partnerName = "";
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

  @observable filter_dropdown_type = "";
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

  @observable recent_partner_name = "";
  @observable recent_partner_img = "";

  @observable total_review = 0;

  @observable check_bookmark = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

  @observable result_banner = false;

  // 파트너 등록 페이지 데이터
  @observable employee = 0; // 직원 수
  @observable revenue = 0; // 매출액
  @observable CEO_name = ""; // 대표 이름
  @observable year = ""; // 설립연도
  @observable certification = ""; // 기업 인증

  // 직원 수 설정하는 함수
  @action set_employee = (obj) => {
    this.employee = obj;
    console.log(this.employee);
  };

  // 매출액 설정하는 함수
  @action set_revenue = (obj) => {
    this.revenue = obj;
    console.log(this.revenue);
  };

  // CEO 이름
  @action set_CEO_name = (val) => {
    this.CEO_name = val;
    console.log(this.CEO_name);
  };

  // 설립 연도
  @action set_year = (val) => {
    this.year = val;
    console.log(this.year);
  };

  // 기업 인증
  @action set_certification = (val) => {
    this.certification = val;
    console.log(this.certification);
  };

  @action movePage = (e, container="Search") => {
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
    if(container=="Search"){
      this.subButtonActive
        ? this.getOtherPartner(newPage)
        : this.getPartner(newPage, this.click_count);
    }

    if(container=="Shop"){
      this.subButtonActive
      ? this.getOtherPartner(newPage)
      : this.getPartner(newPage, "Shop");
    }
    window.scrollTo(0, 0);
  };

  @action pageNext = (e, container="Search") => {
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
      if(container=="Search"){
        this.subButtonActive
          ? this.getOtherPartner(newPage)
          : this.getPartner(newPage, this.click_count);
      }
  
      if(container=="Shop"){
        this.subButtonActive
        ? this.getOtherPartner(newPage)
        : this.getPartner(newPage, "Shop");
      }
    }
  };

  @action pagePrev = (e, container="Search") => {
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
      if(container=="Search"){
        this.subButtonActive
          ? this.getOtherPartner(newPage)
          : this.getPartner(newPage, this.click_count);
      }
  
      if(container=="Shop"){
        this.subButtonActive
        ? this.getOtherPartner(newPage)
        : this.getPartner(newPage, "Shop");
      }
      window.scrollTo(0, 0);
    }
  };

  @action pushToDetail = async (item, idx) => {
    this.detailLoadingFlag = true;

    // 파트너 카드 조회 수 체크
    const req = {
      data: { partner_id: item.id },
    };
    PartnerAPI.partnerView(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));

    if (!this.requestModalActive && !this.modalActive) {
      this.category_name_list = null;

      this.category_name_list = this.category_dic[idx];

      if (!item.file) {
        this.partner_detail_list = [];
        await this.partner_detail_list.push({ item: item, idx: idx });
        this.recentPartnerId = this.partner_detail_list[0].item.id;

        // await this.getReviewByPartner(
        //   this.partner_detail_list[0].item.id,
        //   1,
        //   1
        // );
        // await this.getReviewByPartner(this.partner_detail_list[0].item.id);
        await this.getQuestion(this.partner_detail_list[0].item.id);
        await this.getCityName(this.partner_detail_list[0].item.city);

        Router.push("/search/detail");
        return;
      }

      this.selectedIntroductionFile = item.file;

      const fileType = item.file
        .split(".")
        [item.file.split(".").length - 1].toLowerCase();
      this.selectedIntroductionFileType = fileType;

      if (this.availableFileType.indexOf(fileType) > -1) {
        this.partner_detail_list = [];

        await this.partner_detail_list.push({ item: item, idx: idx });
        this.recentPartnerId = this.partner_detail_list[0].item.id;

        // await this.getReviewByPartner(
        //   this.partner_detail_list[0].item.id,
        //   1,
        //   1
        // );
        // await this.getReviewByPartner(this.partner_detail_list[0].item.id);
        await this.getQuestion(this.partner_detail_list[0].item.id);
        await this.getCityName(this.partner_detail_list[0].item.city);

        Router.push("/search/detail");
      } else {
        console.log("file download");
        this.filedownload(item.file);
      }
    }
  };

  @action filedownload = (url) => {
    if (!url) {
      alert("준비중입니다.");
    }

    const link = document.createElement("a");
    link.href = url;
    link.click();
  };

  @observable searchFileUrl = "";
  @observable imgSearchModalActive = false; // 이미지 검색 시 사진 렌더링하는 박스 상태
  @action onChangeFile = (e) => {
    if (e && e.currentTarget.files[0]) {
      console.log(e.currentTarget);
      console.log(e.currentTarget.files[0]);

      let reader = new FileReader();
      //다른거
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.searchFileUrl = reader.result;
      };
      reader.readAsDataURL(file);
      for (var item in e.currentTarget.files) {
        console.log(item);
        if (typeof e.currentTarget.files[item] === "object") {
          this.fileArray.pop();
          this.fileArray.push(e.currentTarget.files[item]);
          this.imgSearchModalActive = true;
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

    this.ImageSearch();
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

  @action resetQuestionClientObj = () => {
    this.questionClientInfo = {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
    };
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
  };

  @action setDetailBigCategory = async (val) => {
    this.input_detail_big_category = val;
    this.request_middle_list = this.input_detail_big_category.category_set;
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

    if (val.label === "직접 입력") {
      this.minDirectInput = true;
    } else {
      this.minDirectInput = false;
    }
  };

  @action setMaxBudget = (val) => {
    this.input_max_budget = val;
    if (val.label === "직접 입력") {
      this.maxDirectInput = true;
    } else {
      this.maxDirectInput = false;
    }
  };

  @action setDetailMinBudget = (val) => {
    this.input_detail_min_budget = val;

    if (val.label === "직접 입력") {
      this.detailMinDirectInput = true;
    } else {
      this.detailMinDirectInput = false;
    }
  };

  @action setDetailMaxBudget = (val) => {
    this.input_detail_max_budget = val;

    if (val.label === "직접 입력") {
      this.detailMaxDirectInput = true;
    } else {
      this.detailMaxDirectInput = false;
    }
  };

  @action setCategory = (val) => {
    this.input_category = val;

    if (val.value === "전체") {
      this.search_class = "전체";
    } else if (val.value === "만든 제품") {
      this.search_class = "만든 제품";
    } else {
      this.search_class = "";
    }
  };

  @action setLoading = () => {
    this.loading = 1;
  };

  @action init = async () => {
    CategoryAPI.getMainCategory()
      .then(async (res) => {
        this.category_main_list = res.data.results;
        this.big_category_all = res.data.results;
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
    // 초기화
    this.reset();
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

    this.search_category = [];
    this.search_develop = [];
    this.search_region = [];
    this.category_string = [];
    this.matching_image = "";
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
        this.detail = res.data;
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
    this.select_city = val;
    this.filter_region = val.id;

    this.partner_next = null;
    this.partner_count = null;

    this.currentPage = 1;
    this.resetDevCategory();
    this.getPartner();
  };

  @action setDetailCityCategory = (val) => {
    this.detail_select_city = val;
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

  @action search = async (container = "search") => {
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

    // shop에서 받았을 때
    if(container == "shop"){
      await PartnerAPI.search_shop(req)
      .then((res) => {
        this.partner_list = res.data.results;
        this.partner_count = res.data.count;
        this.partner_next = res.data.next;
        console.log(res)
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    }

    else{
      await PartnerAPI.search(req)
        .then((res) => {
          this.partner_list = res.data.results;
          this.partner_count = res.data.count;
          this.partner_next = res.data.next;
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    }
    
    // 검색 시 텍스트 저장 && 3초 내에 재검색 시 검색 안되도록
    if (this.search_text && !this.SearchLoading) {
      this.saveSearchText(this.search_text);
    }

    if(this.SearchLoading == false){
      this.SearchLoading = true;
      setTimeout(() => {
        this.SearchLoading = false;
      }, 3000);
    }
    
  };

  // 검색 시 중복 검색 제거
  @observable SearchLoading = false;

  @action saveSearchText = (text) => {
    const formData = new FormData();

    if (Auth.logged_in_user !== null) {
      formData.append("email", Auth.logged_in_user.username); // 로그인한 이메일
    }

    formData.append("text", text); // 입력 텍스트
    formData.append("count", this.partner_count); // 파트너 개수

    const req = {
      data: formData,
    };

    PartnerAPI.saveSearchText(req)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // 이미지 모달을 위한 state
  @observable image_modal_state = false;
  @observable matching_image = ""; // 이미지 검색 시 적합하게 나온 이미지 url

  // image search를 위한 함수
  @action ImageSearch = () => {
    // 데이터 만들기
    var formData = new FormData();

    if (Auth.logged_in_user !== null) {
      formData.append("email", Auth.logged_in_user.username); // 로그인한 이메일
    }

    formData.append("file", this.file);

    const req = {
      data: formData,
    };

    PartnerAPI.imagesearch(req)
      .then((res) => {
        this.partner_list = [];
        this.partner_list = res.data.partner;
        this.partner_count = res.data.partner.length;
        this.matching_image = res.data.img_url;

        // image modal state 초기화
        this.image_modal_state = false;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // 이미지 찾기 파일 설정
  @action set_searchfile = (obj) => {
    if (typeof obj == "object") {
      this.request_file_set.push(obj);
    } else {
      this.request_file = null;
    }
  };

  // 관심 제조사를 가져오는 함수
  @action BookmarkPartner = (clientid) => {
    const req = {
      params: { client: clientid },
    };

    PartnerAPI.BookmarkPartner(req)
      .then((res) => {
        this.partner_list = [];
        this.partner_list = res.data.results;
        this.partner_count = res.data.partner.length;

        // image modal state 초기화
        this.image_modal_state = false;
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

        this.city_ary = this.city_ary.concat(res.data.results);
        this.city_next = res.data.next;

        while (this.city_next) {
          const req = {
            nextUrl: this.city_next,
          };
          await PartnerAPI.getNextCityPage(req)
            .then((res) => {
              this.filter_city_ary = this.filter_city_ary.concat(
                res.data.results
              );
              this.city_ary = this.city_ary.concat(res.data.results);

              this.city_next = res.data.next;

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
  };

  // city를 id로 주고 있어서 이름 가져오기
  @action getCityName = (id) => {
    const req = {
      id: id,
    };

    PartnerAPI.getCityName(req)
      .then(async (res) => {
        console.log(res);
        this.city_name = res.data.maincategory;
        console.log(this.city_name);
        // return res.data.city
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // business를 id로 주고 있어서 이름 가져오기
  @action getBusinessName = (id) => {
    console.log(id);
    const req = {
      id: id,
    };

    PartnerAPI.getBusinessName(req.id)
      .then((res) => {
        console.log(res.data.category);
        this.business_name.push(res.data.category + "   ");
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

  /* 제조사 상세 페이지 - Q/A 기능 체크 용 함수 (파트너로 로그인해서 기능 확인) */
  @action getPartnerTemp = async () => {
    let req = { extraUrl: 7866 };
    console.log(req.extraUrl);

    await PartnerAPI.getPartner(req)
      .then(async (res) => {
        console.log(res);

        await this.partner_detail_list.push({ item: res.data, idx: 0 });
        this.recentPartnerId = res.data.id;

        Partner.getReviewByPartner(Partner.partner_detail_list[0]);
        console.log(toJS(this.partner_detail_list));
        // await this.getReviewByPartner(
        //   this.partner_detail_list[0].item.id,
        //   1,
        //   1
        // );
        // await this.getReviewByPartner(this.partner_detail_list[0].item.id);
        await this.getQuestion(this.partner_detail_list[0].item.id);
        await this.getCityName(this.partner_detail_list[0].item.city);

        Router.push("/search/detail");
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getPartner = async (page = 1, pre_page = "Search") => {
    // 전 페이지가 메인페이지면 필터 중복을 제외하기 위하여 reset
    if (pre_page == "Home") {
      await Category.reset();
    }
    // 초기화
    this.partner_count = "";
    this.partner_list = [];
    this.category_ary = [];
    // data 저장용
    this.business_string = [];
    this.category_string = [];
    this.city_string = [];
    this.develop_string = [];
    this.material_string = [];

    const token = localStorage.getItem("token");
    let req = { params: { page: page } };

    // 카테고리 선택되어 있을 때
    if (Category.business_selected.length) {
      toJS(Category.business_selected).map((data) => {
        this.business_string += data + ",";
        // console.log(this.business_string);
      });
      // 마지막 쉼표 제거하기 위함
      this.business_string = this.business_string.substr(
        0,
        this.business_string.length - 1
      );

      // 괄호를 없애서 전처리
      req.params.business = this.business_string;
    }

    // 업체 분류 선택되어 있을 때
    if (Category.category_selected.length) {
      // console.log(toJS(Category.category_selected));
      toJS(Category.category_selected).map((data) => {
        this.category_string += data + ",";
        // console.log(this.category_string);
      });
      // 마지막 쉼표 제거하기 위함
      this.category_string = this.category_string.substr(
        0,
        this.category_string.length - 1
      );
      // console.log(this.category_string);

      req.params.category = this.category_string;
    }

    // 지역 분류 선택되어 있을 때
    if (Category.city_selected.length) {
      toJS(Category.city_selected).map((data) => {
        this.city_string += data + ",";
        // console.log(this.city_string);
      });
      // 마지막 쉼표 제거하기 위함

      this.city_string = this.city_string.substr(
        0,
        this.city_string.length - 1
      );

      // 괄호를 없애서 전처리
      req.params.city = this.city_string;
    }

    // 공정 분류 선택되어 있을 때
    if (Category.develop_selected.length) {
      toJS(Category.develop_selected).map((data) => {
        this.develop_string += data + ",";
        // console.log(this.develop_string);
      });
      // 마지막 쉼표 제거하기 위함
      this.develop_string = this.develop_string.substr(
        0,
        this.develop_string.length - 1
      );

      // 괄호를 없애서 전처리
      req.params.develop = this.develop_string;
    }

    // 소재 분류 선택되어 있을 때
    if (Category.material_selected.length) {
      toJS(Category.material_selected).map((data) => {
        this.material_string += data + ",";
        // console.log(this.material_string);
      });
      // 마지막 쉼표 제거하기 위함
      this.material_string = this.material_string.substr(
        0,
        this.material_string.length - 1
      );

      // 괄호를 없애서 전처리
      req.params.material = this.material_string;
    }

    // shop에서 온 경우
    if(pre_page === "shop"){
        // console.log(req.params);
      PartnerAPI.getPartners_shop(req)
      .then(async (res) => {
        // console.log(res);
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
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    }

    else{
    // console.log(req.params);
    PartnerAPI.getPartners(req)
      .then(async (res) => {
        // console.log(res);
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
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    }

    this.check_loading_develop = true;

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

    await ReviewAPI.getReview(req)
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
          await ReviewAPI.getNextReviewPage(req)
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

  /* 
    제조사명의 일부를 입력하면 그에 대한 제조사 정보를 받아오는 함수
    제조사의 이름과 페이지 번호를 인자로 받음
  */

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

  /* 
    클라이언트 ID로 클라이언트 이름 가져오기 
    type이 question일 경우 Q/A에 해당되고 나머지는 default  
  */
  @action getClientNameById = async (id, idx, type = "default") => {
    console.log(id);
    console.log(idx);
    const req = {
      params: null,
    };

    await PartnerAPI.getClient(id, req).then(async (res) => {
      console.log(type);
      if (type === "default") {
        console.log(res.data);
        console.log(`${idx} : ${id} ============= ${res.data}`);
        this.clientInfoList = await this.clientInfoList.concat(res.data);

        console.log(this.clientInfoList);

        // this.clientInfoList[id] = res.data;

        // console.log(this.clientInfoList);

        if (!this.review_client_obj.hasOwnProperty(id)) {
          this.review_client_obj[idx] = [];
        }
        this.review_client_obj[idx] = await [
          ...this.review_client_obj[idx],
          res.data.user.username,
        ];
      }
      if (type === "question") {
        console.log(res.data);
        console.log(res.data.user.username);
        this.questionClientInfo[idx] = await res.data.user.username;
        console.log(toJS(this.questionClientInfo));
        // return res.data.user.username;
      }
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
      case "secret":
        this.secretIdx = !this.secretIdx;
        console.log(this.secretIdx);
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
      case "secret":
        console.log(this.secretIdx);
        if (this.secretIdx) {
          return true;
        } else {
          return false;
        }
        break;
    }
  };
  /* 
    호버될 때 일어나는 함수
 */
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

    if (!clientID) {
      clientID = 20;
    }

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

  /* 
    - 북마크한 제조사를 다시 해제하는 함수
  */

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

  /* 
    해당 제조사에 대해 북마크를 했는지 체크하는 함수
  */
  @action existBookmarkPartner = async (clientID, partnerID) => {
    console.log(typeof clientID);
    console.log(clientID);
    console.log(partnerID);

    if (!clientID) {
      clientID = 20;
    }

    if (!partnerID) {
      partnerID = 0;
    }

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
        // console.log(res);
        // console.log(res.data.count);
        this.totalPartnerBookmark = res.data.count;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action mergeQuestion = async () => {
    this.mergeQuestionList = [];
    // this.resetQuestionClientObj();
    await this.questionList.map(async (item, idx) => {
      console.log(item);

      // await this.getClientNameById(item.client, idx, "question");
      console.log(toJS(this.questionClientInfo));

      // item.client = this.questionClientInfo[idx];
      this.mergeQuestionList = this.mergeQuestionList.concat(item);
      console.log(toJS(this.mergeQuestionList));
      // console.log(item.client);
      if (item.reply) {
        await item.reply.map(async (subItem, subIdx) => {
          console.log(subItem);
          subItem.recomment = true;
          if (!subItem.client) {
            subItem.client = item.client;
          }
          if (!subItem.state) {
            // subItem.client = this.questionClientInfo[idx];
            subItem.client = item.client;
          }
          this.mergeQuestionList = this.mergeQuestionList.concat(subItem);
          console.log(toJS(this.mergeQuestionList));
        });
      }
    });
    console.log(toJS(this.mergeQuestionList));
    console.log(toJS(this.mergeQuestionList.length));
    for (let i = 0; i < this.mergeQuestionList.length; i++) {
      this.questionClientInfo[i] = "";
    }
    console.log(toJS(this.questionClientInfo));
    await this.mergeQuestionList.map(async (item, idx) => {
      await this.getClientNameById(item.client, idx, "question");

      console.log(toJS(this.questionClientInfo));
      // item.name = this.questionClientInfo[idx];
      // if (this.questionClientInfo[this.mergeQuestionList.length - 1] !== "") {
      //   this.questionLoadSuccess = 1;
      //   setTimeout(() => {
      //     this.questionLoadSuccess = 0;
      //   }, 1000);
      // }
    });
    console.log(toJS(this.mergeQuestionList));
    console.log("END");
  };

  @action getQuestion = async (partnerId, page = 1) => {
    console.log("getQuestion");
    this.questionList = [];
    const req = {
      params: {
        partnerID: partnerId,
        page: page,
      },
    };

    await PartnerAPI.getQuestion(req)
      .then(async (res) => {
        console.log(res);
        // console.log(res.data.count);
        this.questionCount = res.data.count;
        this.questionList = await this.questionList.concat(res.data.results);
        this.questionSaveSuccess = 1;
        // questionList
        this.questionPage = parseInt((this.questionCount - 1) / 5) + 1;

        await this.mergeQuestion();
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action setQuestion = async (clientID, partnerID, secret, content) => {
    console.log(clientID);
    console.log(partnerID);
    console.log(secret);
    console.log(content);
    const formData = new FormData();
    formData.append("clientID", clientID);
    formData.append("partnerID", partnerID);
    formData.append("secret", secret ? 1 : 0);
    formData.append("content", content);

    const req = {
      data: formData,
    };

    await PartnerAPI.setQuestion(req)
      .then((res) => {
        console.log(res);
        alert("글 작성이 완료되었습니다");
      })
      .catch((e) => {
        alert("글 작성을 실패했습니다");
        console.log(e);
        console.log(e.response);
      });
  };

  @action getBusinessCategory = async (id) => {
    const req = {
      id: id,
    };
    console.log(id);
    PartnerAPI.getBusinessCategory(req)
      .then((res) => {
        console.log(res);
        this.business_name = res.data.business;
        console.log(this.business_name);

        res.data.business.forEach((element) => {
          console.log(element);
          PartnerAPI.getBusinessName(element).then((res) => {
            this.hashBusinessCategory.push(res.data.category);
          });
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action setAnswerByQuestion = async (
    questionID,
    state,
    secret,
    content,
    clientID = ""
  ) => {
    console.log(questionID);
    console.log(state);
    console.log(secret);
    console.log(content);
    console.log(clientID);
    const formData = new FormData();
    formData.append("questionID", questionID);
    formData.append("state", state);
    formData.append("secret", secret ? 1 : 0);
    formData.append("content", content);
    formData.append("clientID", clientID);

    const req = {
      data: formData,
    };

    await PartnerAPI.setAnswerByQuestion(req)
      .then((res) => {
        console.log(res);
        alert("답변 작성이 완료되었습니다");
      })
      .catch((e) => {
        alert("답변 작성을 실패했습니다");
        console.log(e);
        console.log(e.response);
      });
  };

  @action deleteQuestion = async (clientID, partnerID, questionID) => {
    console.log(clientID);
    console.log(partnerID);
    console.log(secret);
    console.log(content);
    const formData = new FormData();
    formData.append("clientID", clientID);
    formData.append("partnerID", partnerID);
    formData.append("questionID", questionID);

    const req = {
      data: formData,
    };

    await PartnerAPI.deleteQuestion(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
  @action getRecentPartner = (id) => {
    PartnerAPI.detail(id)
      .then((res) => {
        console.log(res);
        this.recent_partner_name = res.data.name;
        this.recent_partner_img = res.data.portfolio_set[0].img_portfolio;
        console.log(this.recent_partner_name);
        console.log(this.recent_partner_img);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action BookmarkHandler = (idx) => {
    if (idx !== this.check_bookmark[idx]) {
      this.check_bookmark[idx] = idx;
      return this.check_bookmark[idx];
    } else {
      this.check_bookmark[idx] = -1;
      return this.check_bookmark[idx];
    }
  };

  @action checkedBookmark = async (clientId, partnerId, idx) => {
    if (this.check_bookmark[idx] !== -1) {
      await this.setBookmarkPartner(clientId, partnerId);
    } else {
      await this.deleteBookmarkPartner(clientId, partnerId);
    }
    await this.getBookmarkByClient(clientId);
    await this.getTotalBookmarkByPartner(partnerId);
  };

  @action existCheckedBookmark = async (clientID, partnerID, idx) => {
    if (!clientID) {
      clientID = 20;
    }

    if (!partnerID) {
      partnerID = 0;
    }

    const req = {
      params: {
        clientID: clientID,
        partnerID: partnerID,
      },
    };

    await PartnerAPI.existBookmarkPartner(req)
      .then((res) => {
        // console.log(res);
        // console.log(res.data.data);
        // console.log(typeof res.data.data);
        if (parseInt(res.data.data)) {
          this.check_bookmark[idx] = idx;
        } else {
          this.check_bookmark[idx] = -1;
        }
        // console.log(this.check_bookmark[idx]);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // PartnerCard && MainPagePartnerCard Active Handler
  @observable introduction = false;
  @observable call = false;
  @observable message = false;
  @observable active = false;

  @action PartnerCardactiveHandler = (type) => {
    switch (type) {
      case "file":
        if (this.introduction) {
          this.introduction = false;
        } else {
          this.introduction = true;
        }

        break;
      case "call":
        if (this.call) {
          this.call = false;
        } else {
          this.call = true;
        }
        break;
      case "message":
        if (this.message) {
          this.message = false;
        } else {
          this.message = true;
        }
        break;
      case "active":
        if (this.active) {
          this.active = false;
        } else {
          this.active = true;
        }
    }
  };

  // 제조사 찾기 페이지 스크롤 이벤트 상태선언
  @observable scrollActive = false;
}

export default new Partner();
