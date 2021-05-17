import { observable, action } from "mobx";
import Router from "next/router";
import * as OfferedAPI from "axios/Offered";
import * as SelectAPI from "../axios/Select";
import * as ProposalAPI from "../axios/Proposal";
import * as AnswerAPI from "../axios/Answer";

class Offered {
  constructor() {
    //makeObservable(this);
  }
  orderEnum = [
    { id: 0, name: "미팅 대기중" },
    { id: 1, name: "미팅 완료" },
    { id: 2, name: "취소된 의뢰" },
  ];
  @observable order = 0;

  @observable answers_count = 0;
  @observable answers_next = null;
  @observable answers_prev = null;
  @observable answers = [];

  @observable projects = [];
  @observable requests = [];

  @observable current_project = null;
  @observable current_request = null;
  @observable current_answer = null;
  @observable current_review = null;
  @observable current_client = null;

  @observable select_saves = [];
  @observable select_saves_next = null;

  @observable load_input = false;
  @observable input_category = "";
  @observable input_people = "";
  @observable input_strategy = "";
  @observable input_price = "";
  @observable input_period = "";

  @observable input_day = 0;
  @observable input_all_price = 0;
  @observable input_expert = "";

  @action resetSelectSaves = () => {
    this.select_saves = [];
    this.select_saves_next = null;
  };
  @action reset = () => {
    this.answers_count = 0;
    this.answers_next = null;
    this.answers_prev = null;
    this.answers = [];

    this.projects = [];
    this.requests = [];
  };
  @action setOrder = (partnerId, newOrder) => {
    this.order = newOrder;
    this.reset();
    this.resetSelectSaves();
    this.loadPartnerAnswerList(partnerId);
  };

  @action setCurrent = (requestId) => {
    this.current_request = this.getRequestById(requestId);
    this.current_project = this.getProjectById(this.current_request.project);
    this.current_answer = this.getAnswerByProject(this.current_request.project);
    this.loadReview(this.current_answer.project, this.current_answer.partner);

    this.loadAllSelectSave();

    console.log("Current 세팅");
    console.log(this.current_project);
    console.log(this.current_request);
    console.log(this.current_answer);
  };

  // 페이지 로딩 시 처음으로 실행되는 부분
  @action loadPartnerAnswerList = async (partnerId, callback = null) => {
    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      // params
      params: {
        partner__id: partnerId,
        state: this.order,
        ordering: "-id",
      },
    };

    await OfferedAPI.getAnswerList(req)
      .then((res) => {
        console.log("파트너의 제안서 목록 로드");
        console.log(res.data);

        this.answers = res.data.results;
        this.answers_count = res.data.count;
        this.answers_next = res.data.next;
        this.answers_prev = res.data.previous;

        res.data.results.forEach(async (answer, idx) => {
          // 마지막이면 callback 함수 실행
          if (idx === res.data.results.length - 1) {
            await this.loadRequestByProject(answer.project, callback);
          } else {
            await this.loadRequestByProject(answer.project);
          }
        });
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

  // 제안서에 해당되는 프로젝트와 의뢰 정보를 같이 가져옴
  @action loadNextAnswerList = async () => {
    if (!this.answers_next) {
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      nextUrl: this.answers_next,
      // params
    };

    await OfferedAPI.getNextPage(req)
      .then((res) => {
        console.log("파트너의 제안서 목록 추가 로드");
        console.log(res.data);

        this.answers = this.answers.concat(res.data.results);
        this.answers_count = res.data.count;
        this.answers_next = res.data.next;
        this.answers_prev = res.data.previous;

        res.data.results.forEach(async (answer, idx) => {
          await this.loadRequestByProject(answer.project);
        });
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

  @action loadRequestByProject = async (projectId, callback = null) => {
    if (this.getProjectById(projectId)) {
      if (callback) {
        callback();
      }
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      extraUrl: `${projectId}/`,
      // params
    };

    await OfferedAPI.getProject(req)
      .then((res) => {
        console.log("프로젝트 + 제안한 의뢰 로딩");
        console.log(res.data);

        this.projects = this.projects.concat(res.data);
        this.requests = this.requests.concat(res.data.request_set[0]);

        if (callback) {
          callback();
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

  @action loadReview = (projectId, partnerId) => {
    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      // params
      params: {
        project__id: projectId,
        partner__id: partnerId,
      },
    };

    OfferedAPI.getReview(req)
      .then((res) => {
        if (res.data.count != 0) {
          // 리뷰를 작성한 클라이언트 정보 가지고 올
          this.current_review = res.data.results[0];
          this.loadClient(this.current_review.client);

          console.log("리뷰 불러오기 성공");
          console.log(this.current_review);
        } else {
          console.log("해당 제안서에 리뷰 없음");
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

  @action loadClient = (clientId) => {
    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      extraUrl: `${clientId}/`,
      // params
    };

    OfferedAPI.getClient(req)
      .then((res) => {
        this.current_client = res.data;
        console.log("클라이언트 정보 로딩 성공");
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

  @action updateAnswer = () => {
    const token = localStorage.getItem("token");
    const req = {
      extraUrl: `${this.current_answer.id}/`,
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      // data
      data: {
        category: this.input_category && this.input_category,
        people: this.input_people && this.input_people,
        strategy: this.input_strategy && this.input_strategy,
        price: this.input_price && this.input_price,
        period: this.input_period && this.input_period,
        day: this.input_day && this.input_day,
        all_price: this.input_all_price && this.input_all_price,
        expert: this.input_expert && this.input_expert,
      },
    };

    AnswerAPI.patchAnswer(req)
      .then((res) => {
        this.current_answer = res.data;

        const idx = this.answers.findIndex(
          (answer) => answer.id == this.current_answer.id
        );
        this.answers[idx] = res.data;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  getProjectById = (projectId) => {
    if (projectId === -1) {
      return;
    }

    console.log(`getProjectById(${projectId})`);
    const idx = this.projects.findIndex((project) => project.id == projectId);
    return this.projects[idx];
  };
  getAnswerById = (answerId) => {
    if (answerId === -1) {
      return;
    }

    console.log(`getAnswerById(${answerId})`);
    const idx = this.answers.findIndex((answer) => answer.id == answerId);
    return this.answers[idx];
  };
  getRequestById = (requestId) => {
    if (requestId === -1) {
      return;
    }

    console.log(`getAnswerById(${requestId})`);
    const idx = this.requests.findIndex((request) => request.id == requestId);
    return this.requests[idx];
  };

  getAnswerByProject = (projectId) => {
    console.log("프로젝트 id로 제안서 찾기");
    console.log(projectId);

    let resultAnswer = null;

    this.answers.forEach((answer, idx) => {
      console.log(answer);
      if (answer.project == projectId) {
        resultAnswer = answer;
        return;
      }
    });

    return resultAnswer;
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
}

export default new Offered();
