import { observable, action } from "mobx";

import * as ProjectAPI from "axios/Manufacture/Project";
import * as AccountAPI from "axios/Account/Account";
import { toJS } from "mobx";
import Auth from "stores/Account/Auth";
import Router from "next/router";

class Project {
  // 프로젝트 데이터 관련 변수
  @observable projectDataList = []; // 프로젝트 데이터 저장
  @observable project_next = null; // page index(다음)
  @observable project_count = null; // 프로젝트 개수
  @observable project_status = ""; // 프로젝트 모집 상태 index
  @observable projectDetailData = ""; // 특정 프로젝트 데이터 저장
  @observable selectedProjectId = null; // Project Id 저장
  @observable search_text = ""; // 프로젝트 검색 시 텍스트 저장
  @observable currentPage = 1; // page index(현재)
  @observable project_page = ["", "", "", "", ""]; // 페이지 관련 함수 작동을 위해 쓰는 변수
  @observable loading = false; // 로딩되면 true

  // 채팅 관련 변수

  @observable chatModalActive = false; // 채팅창을 키고 끄는 State
  @observable chatMessages = [];
  @observable chattingIndex = 0; // 채팅 state index
  @observable answerDetailList = []; // 채팅에 표시된 answer에 대한 변수
  @observable projectDetailData = []; // 채팅에서 사용되는 프로젝트 디테일 변수

  // 채팅하기 페이지 간략히 보기 및 자세히 보기 관련 변수
  @observable projectQuickView = [];
  // subbox에서 프로젝트 개수
  @observable subbox_project_count = 0;

  /* 프로젝트 가져오기 */
  // container : 1. allproject : 모든 프로젝트 가져오기에서 호출 2. myproject : 내 프로젝트 가져오기 / 채팅창에서 호출 3. subbox : subox에서 프로젝트 개수 호출
  // search_text : allproject에서 검색한 경우에 검색 텍스트 저장 후 필터 호출
  // clientId : 해당 클라이언트의 프로젝트 가져오기 | partnerId : 해당 파트너의 프로젝트 가져오기
  // page : page에 따라 호출
  @action getProject = async (
    container = "allproject",
    clientId = "",
    partnerId = "",
    page = 1,
    search_text = ""
  ) => {
    // 토큰 가져오기
    // const token = localStorage.getItem("token");
    // 모든 프로젝트 보기에서 호출한 경우
    if (container == "allproject") {
      const req = {
        params: {
          search: search_text,
          page: page,
          ordering: "-id",
        },
      };
      await ProjectAPI.getProjects(req)
        .then((res) => {
          // 과거 데이터 삭제
          this.projectDataList = [];
          this.projectDataList = res.data.results;
          this.project_next = res.data.next;
          this.project_count = res.data.count;
          this.project_page = parseInt((this.project_count - 1) / 5) + 1;
          console.log(res.data.results);
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    }

    // 내 프로젝트 가져오기에서 호출한 경우 or Subbox에서 프로젝트 개수 가져오는 경우

    // 클라이언트인 경우
    if ((container == "myproject" || container == "subbox") && clientId != "") {
      const req = {
        params: {
          request__client: clientId,
          page: page,
          ordering: "-id",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      await ProjectAPI.getProjects(req)
        .then((res) => {
          // 내 프로젝트 가져오기에서 호출한 경우
          if (container == "myproject") {
            // 과거 데이터 삭제
            this.projectDataList = [];
            this.projectDataList = res.data.results;
            this.project_next = res.data.next;
            this.project_count = res.data.count;
            this.project_page = parseInt((this.project_count - 1) / 5) + 1;
            console.log(res.data.results);
          }

          // subbox에서 프로젝트 개수 호출한 경우
          if (container == "subbox") {
            this.subbox_project_count = res.data.count;
          }
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    }

    // 파트너인 경우
    if (container == "myproject" && partnerId != "") {
      const req = {
        params: {
          answer__partner: partnerId,
          page: page,
          ordering: "-id",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      console.log(req);
      await ProjectAPI.getProjects(req)
        .then((res) => {
          // 과거 데이터 삭제
          this.projectDataList = [];
          this.projectDataList = res.data.results;
          this.project_next = res.data.next;
          this.project_count = res.data.count;
          this.project_page = parseInt((this.project_count - 1) / 5) + 1;
          console.log(partnerId)
          console.log(res.data.results);
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    }
  };

  // 카드를 클릭했을 때 호출하는 함수
  @action pushToDetail = async (id) => {
    // 비로그인 시에 경고창 띄우고 종료
    if (!Auth.logged_in_user) {
      alert(
        "프로젝트 상세 내용은 볼트앤너트에 등록된 파트너사 혹은 본인만 확인 가능합니다."
      );
      Auth.setType("partner");
      Auth.step = 1;
      Router.push('/signup');
      return false;
    }

    // 프로젝트 view 카운트 추가하기
    const req = {
      data: { project_id: id },
    };

    ProjectAPI.projectView(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));

    // 프로젝트 id 설정
    this.selectedProjectId = id;

    // 디테일 데이터 가져오기
    await this.getProjectDetail(id);

    // 상세 페이지로 이동
    this.set_step_index(2);
  };

  // Cookie로 작동되는 최근 제조사 정보
  @observable recent_project_list = [];

  // 프로젝트 디테일 데이터를 가져오기
  @action getProjectDetail = async (id, container = "Project") => {
    // 초기화
    this.recent_project_list = [];
    const req = {
      id: id,
    };
    await ProjectAPI.getProjectDetail(req)
      .then((res) => {
        this.projectDetailData = res.data;

        console.log(res.data);
        // 쿠키에서 최근 프로젝트를 가져오는 경우 저장
        if (container == "Cookie") {
          // 데이터 저장
          this.recent_project_list.push(res.data);
          console.log(this.recent_project_list);
        }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // 원하는 페이지로 이동
  @action movePage = (e, isMyProject = true) => {
    // 목표 페이지 가져오기
    const newPage = e.target.innerText * 1;
    this.currentPage = newPage;
    isMyProject
      ? // client인 경우 client 프로젝트를 partner인 경우 partner의 프로젝트를 가져오기
        Auth.logged_in_client
        ? this.getProject(
            "myproject",
            Auth.logged_in_client.id,
            "",
            this.currentPage
          )
        : this.getProject(
            "myproject",
            Auth.logged_in_partner.id,
            "",
            this.currentPage
          )
      : this.getProject(
          "allproject",
          "",
          "",
          this.currentPage,
          this.search_text
        );
  };

  // 다음 페이지로 이동
  @action pageNext = (isMyProject = true) => {
    if (this.currentPage < this.project_page) {
      // 목표 페이지 가져오기
      const nextPage = this.currentPage + 1;
      this.currentPage = nextPage;
      // myproject에서 온 경우
      isMyProject
        ? // client인 경우 client 프로젝트를 partner인 경우 partner의 프로젝트를 가져오기
          Auth.logged_in_client
          ? this.getProject(
              "myproject",
              Auth.logged_in_client.id,
              "",
              this.currentPage
            )
          : this.getProject(
              "myproject",
              Auth.logged_in_partner.id,
              "",
              this.currentPage
            )
        : this.getProject(
            "allproject",
            "",
            "",
            this.currentPage,
            this.search_text
          );
    }
  };

  // 이전 페이지로 이동
  @action pagePrev = (isMyProject = true) => {
    if (this.currentPage > 1) {
      // 목표 페이지 가져오기
      const newPage = this.currentPage - 1;
      this.currentPage = newPage;
      // myproject에서 온 경우
      isMyProject
        ? // client인 경우 client 프로젝트를 partner인 경우 partner의 프로젝트를 가져오기
          Auth.logged_in_client
          ? this.getProject(
              "myproject",
              Auth.logged_in_client.id,
              "",
              this.currentPage
            )
          : this.getProject(
              "myproject",
              Auth.logged_in_partner.id,
              "",
              this.currentPage
            )
        : this.getProject(
            "allproject",
            "",
            "",
            this.currentPage,
            this.search_text
          );
    }
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

  @observable myproject_state = 0; // 내 프로젝트 보기에서 전체 보기의 경우 0, 진행 중인 프로젝트 보기의 경우 1, 종료된 프로젝트 보기의 경우 2

  @action set_myproject_state = (state) => {
    this.myproject_state = state;
  };

  @observable step_index = 0; // 프로젝트 페이지에 따른 index,
  // 0인 경우에는 내 프로젝트
  // 1인 경우에는 전체 프로젝트
  // 2인 경우에는 프로젝트 상세

  @action set_step_index = (idx = 0) => {
    this.step_index = idx;
    console.log(idx);
  };

  @action reset = () => {
    this.projectDataList = []; // 프로젝트 데이터 저장
    this.project_next = null; // page index(다음)
    this.project_count = null; // 프로젝트 개수
    this.project_status = ""; // 프로젝트 모집 상태 index
    this.projectDetailData = ""; // 특정 프로젝트 데이터 저장
    this.selectedProjectId = null; // Project Id 저장
    this.search_text = ""; // 프로젝트 검색 시 텍스트 저장
    this.currentPage = 1; // page index(현재)
    this.project_page = ["", "", "", "", ""]; // 페이지 관련 함수 작동을 위해 쓰는 변수
    // 채팅 관련 변수
    this.chatModalActive = false; // 채팅창을 키고 끄는 State
    this.chatMessages = [];
    this.chattingIndex = 0; // 채팅 state index
    this.answerDetailList = []; // 채팅에 표시된 answer에 대한 변수
    this.projectDetailData = []; // 채팅에서 사용되는 프로젝트 디테일 변수

    // 채팅하기 페이지 간략히 보기 및 자세히 보기 관련 변수
    this.projectQuickView = [];
    this.recent_project_list = [];
    // subbox에서 프로젝트 개수
    this.subbox_project_count = 0;
  };
}

export default new Project();
