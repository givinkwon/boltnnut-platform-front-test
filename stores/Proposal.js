import { observable, action } from "mobx";
import Router from "next/router";
import * as ProposalAPI from "axios/Proposal";
import * as PartnerAPI from "axios/Partner";
import * as SelectAPI from "../axios/Select";

class Proposal {
  constructor() {
    //makeObservable(this);
  }
  @observable order = 0;

  @observable current_request = null;
  @observable requests_count = 0;
  @observable requests_next = null;
  @observable requests_prev = null;
  @observable requests = [];

  @observable projects_count = 0;
  @observable projects_next = null;
  @observable projects_prev = null;
  @observable projects = [];

  @observable user_answers = [];
  @observable user_answers_next = null;

  // 제안서 작성 폼
  @observable category = "";
  @observable people = "";
  @observable price = "";
  @observable strategy = "";
  @observable period = "";
  @observable day = "";
  @observable all_price = "";
  @observable expert = "";

  @observable select_saves = [];
  @observable select_saves_next = null;

  //견적서(규석)
  @observable estimateData = [];
  @observable estimate_year = "";
  @observable estimate_month = "";
  @observable estimate_day = "";
  @observable estimate_price = "";

  @action loadEstimateInfo = async (index) => {
    await ProposalAPI.getEstimateInfo(index).then((res) => {
      this.estimateData = res.data;
      console.log(res.data);
    });
    this.setEstimateInfo();
  };

  @action setEstimateInfo = () => {
    this.estimate_year = this.estimateData.createAt.split("-")[0];
    this.estimate_month = this.estimateData.createAt.split("-")[1];
    this.estimate_day = this.estimateData.createAt
      .split("-")[2]
      .substring(0, 2);
    this.estimate_price = this.estimateData.price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  @action setCategory = (e) => {
    this.category = e.target.value;
    console.log("category: " + this.category);
  };

  @action setPeople = (e) => {
    this.people = e.target.value;
    console.log("people: " + this.people);
  };

  @action setPrice = (e) => {
    this.price = e.target.value;
    console.log("price: " + this.price);
  };

  @action setStrategy = (e) => {
    this.strategy = e.target.value;
    console.log("strategy: " + this.strategy);
  };

  @action setPeriod = (e) => {
    this.period = e.target.value;
    console.log("period: " + this.period);
  };

  @action setDay = (e) => {
    this.day = e.target.value;
    console.log("day: " + this.day);
  };

  @action setAll_price = (e) => {
    this.all_price = e.target.value;
    console.log("all_price: " + this.all_price);
  };

  @action setExpert = (e) => {
    this.expert = e.target.value;
    console.log("expert: " + this.expert);
  };

  @action setFile = (val) => {
    this.file = val;
  };

  order_enum = [
    { id: 0, name: "마감 임박 순" },
    { id: 1, name: "예산 높은 순" },
    { id: 2, name: "지원자 적은 순" },
  ];

  @action resetRequests = () => {
    this.current_request = null;
    this.requests = [];
    this.requests_count = 0;
    this.requests_next = null;
    this.requests_prev = null;
  };
  @action resetProjects = () => {
    this.projects = [];
    this.projects_count = 0;
    this.projects_next = null;
    this.projects_prev = null;
  };
  @action resetSelectSaves = () => {
    this.select_saves = [];
    this.select_saves_next = null;
  };

  @action setOrder = (newOrder) => {
    this.order = newOrder;
    this.loadOrderedRequests();
  };

  @action setCurrentRequest = (requestId) => {
    const idx = this.requests.findIndex((item) => item.id == requestId);
    this.current_request = this.requests[idx];

    this.resetSelectSaves();
    this.loadAllSelectSave();

    console.log("현재 보고 있는 요청서");
    console.log(this.current_request);
  };

  @action setProjectsAndRequests = (data) => {
    this.projects = data.results;
    this.projects_prev = data.previous;
    this.projects_next = data.next;
    this.projects_count = data.count;
    this.projects.forEach((project) => {
      if (project.request_set.length != 0) {
        this.requests.push(project.request_set[0]);
      }
    });
  };

  // 사용 안 함
  // 페이지네이션에 관계 없이 모든 requests를 가져옴
  @action loadAllRequests = () => {
    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      // params
      params: {
        ordering: "id",
      },
    };

    ProposalAPI.getRequests(req)
      .then(async (res) => {
        console.log("1페이지의 요청 목록 get 성공");
        this.requests = res.data.results;
        this.requests_prev = res.data.previous;
        this.requests_next = res.data.next;
        this.requests_count = res.data.count;

        while (this.requests_next) {
          await this.loadNextRequests();
        }
      })
      .catch((e) => {
        console.log(e.response);
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };
  @action loadNextRequests = async () => {
    // 지원자 적은 순의 경우 프로젝트 데이터를 먼저 받아옴
    if (this.projects_next) {
      this.loadNextRequestsByProject();
      return;
    }

    if (!this.requests_next) {
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      nextUrl: this.requests_next,
      // params
    };

    await ProposalAPI.getNextPage(req)
      .then((res) => {
        this.requests = this.requests.concat(res.data.results);
        this.requests_prev = res.data.previous;
        this.requests_next = res.data.next;
        this.requests_count = res.data.count;
        console.log("추가 후 requests count: " + this.requests.length);
      })
      .catch((e) => {
        console.log(e.response);
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };
  @action loadNextRequestsByProject = () => {
    if (!this.projects_next) {
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      nextUrl: this.projects_next,
    };

    ProposalAPI.getNextPage(req)
      .then((res) => {
        console.log("프로젝트의 다음 페이지 가져오기 성공");
        console.log(res.data);

        this.setProjectsAndRequests(res.data);
      })
      .catch((e) => {
        console.log(e.response);
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };

  // 페이지 로딩 시 처음 실행되는 코드
  @action loadOrderedRequests = (callback = null) => {
    this.resetProjects();
    this.resetRequests();

    if (this.order === 0) {
      this.loadImpendingRequests();
    } else if (this.order === 1) {
      this.loadHighPriceRequests();
    } else if (this.order === 2) {
      this.loadLowApplicantRequests();
    }
  };

  // 높은 가격순
  @action loadHighPriceRequests = () => {
    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      // params
      params: {
        ordering: "-all_price,id",
      },
    };

    ProposalAPI.getRequests(req)
      .then(async (res) => {
        this.requests = res.data.results;
        this.requests_prev = res.data.previous;
        this.requests_next = res.data.next;
        this.requests_count = res.data.count;

        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.response);
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };
  // 마감 임박 순
  @action loadImpendingRequests = () => {
    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      // params
      params: {
        ordering: "-created_at,id",
        active: "true",
      },
    };

    ProposalAPI.getRequests(req)
      .then(async (res) => {
        this.requests = res.data.results;
        this.requests_prev = res.data.previous;
        this.requests_next = res.data.next;
        this.requests_count = res.data.count;

        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.response);
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };
  // 지원자 적은 순
  @action loadLowApplicantRequests = () => {
    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        ordering: "answer_count",
      },
    };

    ProposalAPI.getProject(req)
      .then((res) => {
        this.setProjectsAndRequests(res.data);
      })
      .catch((e) => {
        console.log(e.response);
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };

  //프로젝트만 로드
  @action loadProjects = () => {
    ProposalAPI.getMyProject()
      .then((res) => {
        this.projects_count = res.data.count * 3 + 997;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action loadPartnerAnswers = (partnerId) => {
    const token = localStorage.getItem("token");
    const req = {
      params: {
        partner__id: partnerId,
      },
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    PartnerAPI.getPartnerAnswer(req)
      .then(async (res) => {
        this.user_answers = res.data.results;
        this.user_answers_next = res.data.next;

        while (this.user_answers_next) {
          const req = {
            headers: {
              Authorization: `Token ${token}`,
            },
            nextUrl: this.user_answers_next,
          };

          await PartnerAPI.getNextPage(req)
            .then((res) => {
              this.user_answers = this.user_answers.concat(res.data.results);
              this.user_answers_next = res.data.next;
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

  // post 성공하면 뭐해야되지?
  // /offered?tab=1로 리다이렉트 하자
  @action postProposal = (partnerId) => {
    const token = localStorage.getItem("token");
    var formData = new FormData();

    formData.append("client", this.current_request.client);
    formData.append("project", this.current_request.project);
    formData.append("partner", partnerId);

    /*formData.append("category", this.category);
        formData.append("people", this.people);
        formData.append("price", this.price);
        formData.append("strategy", this.strategy);
        formData.append("period", this.period);
		formData.append("day", parseInt(this.day));
		formData.append("all_price", parseInt(this.all_price));
		formData.append("expert", this.expert);
        if (this.file){
		    formData.append("file", this.file);
		}

		formData.append("state", 0);
		formData.append("active", false);*/

    /*const data = {
			price: parseInt(this.price),
			day: parseInt(this.day),
			expert: this.expert,
			strategy: this.strategy,

			client: this.current_request.client,
			project: this.current_request.project,
			partner: partnerId,
			state: 0,	// 미팅 x
			active: false,
			file: this.file,
		}*/

    const req = {
      data: formData,
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    ProposalAPI.postProposal(req)
      .then(async (res) => {
        console.log(res.data);
        //await this.sendKakaoTalkToClient()
        await this.minusCoin();

        alert(
          "신청이 완료되었습니다. 클라이언트가 정보 확인 후 전화드릴 예정입니다."
        );
        Router.push("/offered/?tab=1");
      })
      .catch((e) => {
        console.log(e.response);
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };

  @action sendKakaoTalkToClient = async () => {
    const token = localStorage.getItem("token");
    const req = {
      data: {
        client: this.current_request.client,
      },
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    await ProposalAPI.sendKakaoTalkToClient(req)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
  @action minusCoin = async () => {
    const token = localStorage.getItem("token");
    const req = {
      data: {
        coin: this.current_request.coin,
      },
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    await ProposalAPI.minusCoin(req)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  /* 중복 */
  @action loadAllSelectSave = () => {
    console.log(`loadAllSelectSave()`);

    const request = this.current_request;
    request.category.forEach(async (categoryId, idx) => {
      await this.loadSelectSave(request.id, categoryId);
    });
  };
  @action loadSelectSave = async (requestId, categoryId) => {
    console.log(`loadSelectSave(${requestId}, ${categoryId})`);

    const token = localStorage.getItem("token");
    const req = {
      // params
      params: {
        request: requestId,
        category: categoryId,
      },
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    this.select_saves.push({
      category: categoryId,
      selects: [],
    });

    await SelectAPI.getSelectSave(req)
      .then(async (res) => {
        const select_save = this.getSelectsByCategoryId(categoryId);
        res.data.results.forEach((select) => {
          select_save.selects.push(select);
        });

        console.log("선택질문 로딩");
        console.log(res.data);

        this.select_saves_next = res.data.next;

        while (this.select_saves_next) {
          const req = {
            nextUrl: this.select_saves_next,
            // headers
            headers: {
              Authorization: `Token ${token}`,
            },
          };

          await ProposalAPI.getNextPage(req)
            .then((res) => {
              res.data.results.forEach((select) => {
                select_save.selects.push(select);
              });

              this.select_saves_next = res.data.next;
            })
            .catch((e) => {
              console.log(e.response);
            });
        }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  getRequestById = (id) => {
    if (id === -1) {
      return;
    }

    console.log(`getRequestById(${id})`);
    const idx = this.requests.findIndex((request) => request.id == id);
    return this.requests[idx];
  };
  getSelectsByCategoryId = (categoryId) => {
    if (categoryId === -1) {
      return;
    }

    console.log(`getSelectsByCategoryId(${categoryId})`);
    const idx = this.select_saves.findIndex(
      (select_save) => select_save.category == categoryId
    );

    return this.select_saves[idx];
  };

  isAlreadyOffered = () => {
    const request = this.current_request;
    const projectId = request.project;

    const filtered = this.user_answers.filter(
      (answer) => answer.project === projectId
    );
    console.log(filtered);

    // 0이면 false, 1이면 true
    return filtered.length !== 0;
  };
}

export default new Proposal();
