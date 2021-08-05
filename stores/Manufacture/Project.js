import { observable, action } from "mobx";

import * as ProjectAPI from "axios/Manufacture/Project";
import * as AccountAPI from "axios/Account/Account";
import { toJS } from "mobx";

class Project {

  // 프로젝트 데이터 관련 변수
  @observable projectDataList = [];
  @observable projectData = [];
  @observable project_next = null;
  @observable project_count = null;
  @observable project_status = "";
  @observable projectDetailData = "";
  @observable selectedProjectId = null;
  
  // 페이지 관련 변수
  @observable project_page = ["", "", "", "", ""];
  @observable currentPage = 1;

  @observable chattingIndex = 0;

  // 검색 관련 변수
  @observable search_text = "";

  //채팅 관련 변수
  @observable chatModalActive = false;
  @observable chatMessages = [];

  // 제안서 별 채팅방 연결 관련 변수
  @observable answerDetailList = [];

  // 채팅하기 페이지 간략히 보기 및 자세히 보기 관련 변수
  @observable projectQuickView = [];

  //로그인 된 클라이언트 id
  @observable loggedInClientId = null;


  @action movePage = (e, isMyProject = true) => {
    const newPage = e.target.innerText * 1;

    this.currentPage = newPage;
    isMyProject
      ? this.getPage(this.loggedInClientId, newPage)
      : this.getProjectByPrice(this.search_text, this.currentPage);
  };

  // 다음 페이지로 이동
  @action pageNext = (isMyProject = true) => {
    if (this.currentPage < this.project_page) {
      const nextPage = this.currentPage + 1;
      this.currentPage = nextPage;
      isMyProject
        ? this.getPage(this.loggedInClientId, newPage)
        : this.getProjectByPrice(this.search_text, this.currentPage);
    }
  };

  // 이전 페이지로 이동
  @action pagePrev = (isMyProject = true) => {
    if (this.currentPage > 1) {
      const newPage = this.currentPage - 1;
      this.currentPage = newPage;
      isMyProject
        ? this.getPage(this.loggedInClientId, newPage)
        : this.getProjectByPrice(this.search_text, this.currentPage);
    }
  };

  // 카드를 클릭했을 때 가져오기
  @action pushToDetail = async (id) => {
    this.selectedProjectId = id;
    // 디테일 데이터 가져오기
    await this.getProjectDetail(id);
    // 상세 페이지로 이동
    this.set_step_index(2)
  };


  /* 클라이언트 - project API 데이터 가져오기 */
  @action getPage = (clientId, page = 1) => {
    this.projectDataList = [];

    console.log(toJS(clientId));
    if (!clientId) {
      return;
    }
    const token = localStorage.getItem("token");
    const req = {
      params: {
        request__client: clientId,
        page: page,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    ProjectAPI.getProjects(req)
      .then((res) => {
        this.projectDataList = res.data.results;
        console.log(res.data.results);
        this.project_next = res.data.next;
        this.project_count = res.data.count;
        this.project_page = parseInt((this.project_count - 1) / 5) + 1;
        this.getCategory();
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  /* 해당 클라이언트의 모든 프로젝트 가져오기 */
  @action getAllProject = async (clientId) => {
    this.projectDataList = [];
    console.log(toJS(clientId));
    if (!clientId) {
      return;
    }
    const token = localStorage.getItem("token");
    const req = {
      params: {
        request__client: clientId,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    await ProjectAPI.getProjects(req)
      .then((res) => {
        this.projectDataList = res.data.results;
        console.log(res.data.results);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  /* 파트너 - 전체 + 가격 별 + search별 다 포함시켰음 */
  /**
   * @author Oh Kyu Seok
   * @email cane1226@gmail.com
   * @create date 2021-07-13 15:44:26
   * @modify date 2021-07-13 15:44:26
   * @desc 전체 프로젝트 가져오기. getProjectByPrice라는 이름에서 혼동할수도 있지만 가격으로 가져오는 함수는 아닙니다.
   * 전체 프로젝트 / 내 프로젝트에서 전체 프로젝트를 가져오는 함수입니다.(함수 작성자 이상원)
   */
  @action getProjectByPrice = (search_text, page = 1) => {
    this.projectDataList = [];
    this.data_dt = [];
    const token = localStorage.getItem("token");
    const req = {
      params: {
        request__request_state: this.filter === "전체" ? "" : this.filter,
        search: search_text,
        page: page,
        ordering: "-id",
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    ProjectAPI.getProjects(req)
      .then((res) => {
        this.projectDataList = [];
        /* 오래된 데이터 제외하기 위함 */

        this.projectDataList = res.data.results;
        this.project_next = res.data.next;
        this.project_count = res.data.count;
        this.project_page = parseInt((this.project_count - 1) / 5) + 1;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };


  // 프로젝트 디테일 데이터를 가져오기
  @action getProjectDetail = async (id) => {
    const req = {
      id: id,
    };
    await ProjectAPI.getProjectDetail(req)
      .then((res) => {
        this.projectDetailData = res.data;
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };


  // 프로젝트 모집을 종료 버튼 눌렀을 때
  @action exitProject = (id) => {
    const req = {
      id: id,
      data: {
        status: "모집종료",
      },
    };
    ProjectAPI.exitProject(req)
      .then((res) => {
        this.projectDetailData = res.data;
        console.log(res.data);
        console.log(toJS(this.projectDetailData));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };


  @observable myproject_state = 0 // 내 프로젝트 보기에서 전체 보기의 경우 0, 진행 중인 프로젝트 보기의 경우 1, 종료된 프로젝트 보기의 경우 2
  
  @action set_myproject_state = (state) => {
    this.myproject_state = state
  }


  @observable step_index = 0; // 프로젝트 페이지에 따른 index, 
  // 0인 경우에는 내 프로젝트
  // 1인 경우에는 전체 프로젝트
  // 2인 경우에는 프로젝트 상세  

  @action set_step_index = (idx) => {
    this.step_index = idx
    console.log(idx)
    
  }
}

export default new Project();
