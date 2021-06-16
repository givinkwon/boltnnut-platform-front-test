import { observable, action } from "mobx";
import Router from "next/router";
import * as AnswerAPI from "axios/Answer";
import * as RequestAPI from "axios/Request";
import * as CategoryAPI from "axios/Category";
import * as SelectAPI from "axios/Select";
import * as PartnerAPI from "axios/Partner";
import { PRIMARY } from "../static/style";

/*
  API 실행 흐름
*/
/*
  /answer 페이지
  - loadClientRequestList(clientId)
  : 클라이언트의 요청 목록을 가져와서 보여줌

  - loadNextClientRequestList(clientId)
  : 1페이지를 로딩한 이후 사용자가 다음 페이지의 내용을
    보려고 할 때 실행
*/
/*
  /answer/[request_id] 페이지
  - loadClientRequestList(clientId)
  : 클라이언트의 요청 목록 1페이지를 가져와 요청 레코드의
    총 개수가 몇 개인지 저장

  - loadOneRequest(requestId)
  : 1페이지만 불러와서는 2페이지 이상에 있는 의뢰 내용을
    알 수 없기 때문에 호출

  - loadAnswerList(requestId)
  : 의뢰에 해당되는 제안서 목록을 불러옴

  - for(loadPartnerInfo(answer.partner))
  : 제안서를 작성한 파트너사의 정보를 읽어옴

  - loadNextAnswerList()
  : 1페이지를 로딩한 이후 사용자가 다음 페이지의 내용을
    보려고 할 때 실행

  - for(loadPartnerInfo(answer.partner))
  : 2번째 또는 그 이후의 페이지를 읽어올 경우
    해당 제안서 목록의 파트너사 정보를 읽어옴

  + first_active
*/
/*
  /answer/[request_id]/detail/[answer_id]

  - loadClientRequest(requestId)
  : 해당되는 의뢰 정보를 읽어옴

  - loadAllAnswerList(requestId)
  : 모든 제안서 리스트 불러움. 사용자가 많아질 경우를 생각한다면 수정 필요
  => 다음 제안서를 activate시키기 위해 모든 제안서 목록이 필요함

  - loadAnswer(answerId)
  : 해당되는 제안서 내용 읽어옴

  - loadPartnerInfo(answer.partner)
  : 제안서를 작성한 파트너사의 정보 읽어옴

  + change_active, accept/rejectMeeting, postReview

  - seeAnswer(answerId, click)
  : 제안서를 본 경우 체크해줌
*/

class Answer {
  constructor() {
    //makeObservable(this);
  }
  @observable develop_big_categories = [];
  @observable develop_big_categories_next = null;
  @observable develop_categories = [];
  @observable develop_categories_next = null;

  @observable subclasses = [];
  @observable subclasses_next = null;

  @observable main_categories = [];
  @observable main_categories_next = null;
  @observable categories = [];
  @observable categories_next = null;

  @observable city_list = [];

  @observable requests_next = null;
  @observable requests_prev = null;

  @observable requests = [];
  @observable current_request_id = -1;

  @observable active_answer = -1; // answer_id
  @observable active_review = null;

  @observable answers_count = 0;
  @observable answers_next = null;
  @observable answers_prev = null;
  @observable answers = [];

  @observable partners = [];
  @observable current_partner = null;

  @observable select_saves = [];
  @observable select_saves_next = null;

  // 파트너 회원가입 분야 체크
  //  @observable possible_list = []
  //  @observable possible_subclass_list = []
  //  @observable possible_category_list = []
  //  @observable possible_main_list = []

  @observable history_list = [];
  @observable history_subclass_list = [];
  @observable history_category_list = [];
  @observable history_main_list = [];

  @observable content1 = "";

  // 2021년 5월 8일 새로 작성
  @action CreateAnswer = async (
    projectInfo,
    partnerName,
    project,
    partner,
    request,
    content1
  ) => {
    const token = localStorage.getItem("token");
    let clientPhone = null;
    const req = {
      data: {
        project: project,
        partner: partner,
        request: request,
        content1: content1,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const t = {
      params: null,
    };
    // console.log(projectInfo.request_set[0].name);

    await PartnerAPI.getClient(projectInfo.request_set[0].client, t)
      .then((res) => {
        clientPhone = res.data.user.phone;
      })
      .catch((e) => console.log(e));

    await AnswerAPI.CreateAnswer(req)
      .then((res) => {
        console.log(`1 : ${res.data}`);
        const req = {
          phoneNum: clientPhone,
          requestTitle: projectInfo.request_set[0].name,
          name: partnerName, //보내는사람
          text: content1,
        };
        RequestAPI.sendKakaoTalk(req)
          .then((res) => console.log(res))
          .catch((e) => console.log(e));

        //sendKaKaoTalk 끝
      })
      .catch(async (e) => {
        alert("정상적으로 제안서가 생성되지 않았습니다.");
        // console.log(e);
      });
  };

  // 제안서를 본 경우
  @action seeAnswer = (answerId, click) => {
    const answer = this.getAnswerById(answerId);
    console.log(answerId, click);
    const req = {
      data: {
        answer_click: click,
        answer_id: answerId,
      },
    };
    AnswerAPI.checkAnswer(req);
  };

  @action loadClientRequest = async (clientId, requestId, callback = null) => {
    // 이미 불러온 것
    if (this.getRequestById(requestId)) {
      console.log("loadClientRequest Quit()");
      return;
    }

    if (requestId != 923) {
      const token = localStorage.getItem("token");
      console.log(requestId);
      const req = {
        extraUrl: `${requestId}/`,
        params: {
          client__id: clientId,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      await AnswerAPI.getClientRequest(req)
        .then((res) => {
          this.requests = this.requests.concat(res.data);
          console.log("getRequest");
          console.log(res.data);
        })
        .catch(async (e) => {
          alert("존재하지 않는 페이지입니다");

          // await Router.push("/");
          await Router.push("/project");
          await Router.reload();
        });
    }

    if (requestId == 923) {
      console.log(requestId);
      const req = {
        extraUrl: `${requestId}/`,
        params: {
          client__id: clientId,
        },
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };

      await AnswerAPI.getClientRequest(req)
        .then((res) => {
          this.requests = this.requests.concat(res.data);
          console.log("getRequest");
          console.log(res.data);
        })
        .catch(async (e) => {
          alert("존재하지 않는 페이지입니다");
          // await Router.push("/");
          await Router.push("/project");
          await Router.reload();
        });
    }
  };
  @action loadClientRequestList = async (clientId, callback = null) => {
    const requestId = window.location.pathname.split("/").pop();
    console.log(requestId);

    if (requestId != 923) {
      const token = localStorage.getItem("token");
      const req = {
        params: {
          client__id: clientId,
          ordering: "-id",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      await AnswerAPI.getClientRequestList(req)
        .then((res) => {
          this.requests_next = res.data.next;
          this.requests_prev = res.data.previous;
          this.requests = res.data.results;

          if (callback) {
            callback();
          }

          console.log("의뢰서 목록 카운트 : " + this.requests.length);
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }

    if (requestId == 923) {
      const req = {
        params: {
          client__id: clientId,
          ordering: "-id",
        },
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };
      await AnswerAPI.getClientRequestList(req)
        .then((res) => {
          this.requests_next = res.data.next;
          this.requests_prev = res.data.previous;
          this.requests = res.data.results;

          if (callback) {
            callback();
          }

          console.log("의뢰서 목록 카운트 : " + this.requests.length);
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }
  };
  @action loadNextClientRequestList = async (callback = null) => {
    if (!this.requests_next) {
      return;
    }
    const requestId = window.location.pathname.split("/").pop();
    console.log(requestId);

    if (requestId != 923) {
      const token = localStorage.getItem("token");
      const req = {
        nextUrl: this.requests_next,
        // params
        // headers
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      await AnswerAPI.getNextClientRequestList(req)
        .then((res) => {
          this.requests_count = res.data.count;
          this.requests_next = res.data.next;
          this.requests_prev = res.data.previous;
          this.requests = this.requests.concat(res.data.results);

          if (callback) {
            callback();
          }

          console.log("의뢰서 목록 카운트 : " + this.requests.length);
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }

    if (requestId == 923) {
      const req = {
        nextUrl: this.requests_next,
        // params
        // headers
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };
      await AnswerAPI.getNextClientRequestList(req)
        .then((res) => {
          this.requests_count = res.data.count;
          this.requests_next = res.data.next;
          this.requests_prev = res.data.previous;
          this.requests = this.requests.concat(res.data.results);

          if (callback) {
            callback();
          }

          console.log("의뢰서 목록 카운트 : " + this.requests.length);
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }
  };

  @action loadAnswer = async (answerId) => {
    // 이미 불러온
    if (this.getAnswerById(answerId)) {
      return;
    }

    if (requestId != 923) {
      const token = localStorage.getItem("token");

      const req = {
        extraUrl: `${answerId}/`,
        // params
        // headers
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      await AnswerAPI.getAnswer(req, answerId)
        .then((res) => {
          this.answers.push(res.data);
          this.answers_count += 1;
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }

    if (requestId == 923) {
      const req = {
        extraUrl: `${answerId}/`,
        // params
        // headers
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };

      await AnswerAPI.getAnswer(req, answerId)
        .then((res) => {
          this.answers.push(res.data);
          this.answers_count += 1;
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }
  };
  @action loadAnswerList = async (requestId, callback = null) => {
    console.log(`loadAnswerList(${requestId})`);

    let request;
    // await this.loadClientRequest(969, requestId).then(() => {
    //   request = this.getRequestById(requestId);
    //   console.log(request);
    //   if (!request) {
    //     console.log("RETURN!!!!!!!!!");
    //     return;
    //   }
    // });
    request = this.getRequestById(requestId);
    // console.log(request);
    if (!request) {
      console.log("RETURN!!!!!!!!!");
      return;
    }
    // const request = this.getRequestById(requestId);
    // console.log(request);
    const projectId = request.project;
    if (requestId != 923) {
      const token = localStorage.getItem("token");

      const req = {
        // params
        params: {
          project__id: projectId,
        },
        // headers
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      await AnswerAPI.getAnswerList(req)
        .then((res) => {
          this.answers_count = res.data.count;
          this.answers_next = res.data.next;
          this.answers_prev = res.data.previous;
          this.answers = res.data.results;
          console.log(res.data.results);
          if (callback) {
            callback();
          }

          console.log("제안서 목록 카운트 : " + this.answers.length);
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }

    if (requestId == 923) {
      const req = {
        // params
        params: {
          project__id: projectId,
        },
        // headers
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };

      await AnswerAPI.getAnswerList(req)
        .then((res) => {
          this.answers_count = res.data.count;
          this.answers_next = res.data.next;
          this.answers_prev = res.data.previous;
          this.answers = res.data.results;

          if (callback) {
            callback();
          }

          console.log("제안서 목록 카운트 : " + this.answers.length);
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }
  };

  @action loadAnswerListByProjectId = async (projectId, callback = null) => {
    console.log(`loadAnswerListByProjectId(${projectId})`);

    const token = localStorage.getItem("token");
    const req = {
      extraUrl: `?project=${projectId}`,
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    await AnswerAPI.getAnswer(req)
      .then((res) => {
        this.answers_count = res.data.count;
        this.answers_next = res.data.next;
        this.answers_prev = res.data.previous;
        this.answers = res.data.results;
        if (callback) {
          callback();
        }

        console.log("제안서 목록 카운트 : " + this.answers.length);
      })
      .catch((e) => {
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };

  @action loadAnswerListByPartnerId = async (partnerId, callback = null) => {
    console.log(`loadAnswerListByPartnerId(${partnerId})`);

    const token = localStorage.getItem("token");
    const req = {
      extraUrl: `?partner=${partnerId}`,
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    await AnswerAPI.getAnswer(req)
      .then((res) => {
        this.answers_count = res.data.count;
        this.answers_next = res.data.next;
        this.answers_prev = res.data.previous;
        this.answers = res.data.results;
        if (callback) {
          callback();
        }

        console.log("제안서 목록 카운트 : " + this.answers.length);
      })
      .catch((e) => {
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };

  // 기존의 this.answers를 덮어씀
  // 추가로 미팅하기 버튼을 클릭했을 경우
  @action loadNextAnswerPage = () => {
    //if(!this.answers_next) { alert('더 이상 보여줄 제안서가 없습니다'); return; }
    // 현재 페이지의 모든 제안서를 확인하지 않은 경우
    //if(!this.allAnswersActive()) {
    //  alert('제안된 파트너의 미팅 신청 여부를 모두 결정하시고나면 재신청하실 수 있습니다')
    //  return
    //}
    if (requestId != 923) {
      const token = localStorage.getItem("token");
      const req = {
        nextUrl: this.answers_next,
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      // changeActiveAnswer에서 첫번째 제안서를 active 시키도록
      this.active_answer = -1;

      console.log("loadNextAnswerPage()");
      AnswerAPI.getNextAnswerList(req)
        .then((res) => {
          this.answers_count = res.data.count;
          this.answers_next = res.data.next;
          this.answers_prev = res.data.previous;
          this.answers = this.answers.concat(res.data.results);

          console.log("다음 페이지 제안서 목록 길이: " + this.answers.length);
          //this.changeActiveAnswer()

          // 추가된 answer 레코드의 partner 정보도 같이 로딩
          res.data.results.forEach((answer) => {
            this.loadPartnerInfo(answer.partner);
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
    }

    if (requestId == 923) {
      const req = {
        nextUrl: this.answers_next,
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };

      // changeActiveAnswer에서 첫번째 제안서를 active 시키도록
      this.active_answer = -1;

      console.log("loadNextAnswerPage()");
      AnswerAPI.getNextAnswerList(req)
        .then((res) => {
          this.answers_count = res.data.count;
          this.answers_next = res.data.next;
          this.answers_prev = res.data.previous;
          this.answers = this.answers.concat(res.data.results);

          console.log("다음 페이지 제안서 목록 길이: " + this.answers.length);
          //this.changeActiveAnswer()

          // 추가된 answer 레코드의 partner 정보도 같이 로딩
          res.data.results.forEach((answer) => {
            this.loadPartnerInfo(answer.partner);
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
    }
  };
  // 기존의 this.answers에 덧붙임
  @action loadNextAnswerList = async (change = true) => {
    if (!this.answers_next) {
      return;
    }

    if (requestId != 923) {
      const token = localStorage.getItem("token");

      const req = {
        nextUrl: this.answers_next,
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      console.log("loadNextAnswerList()");
      await AnswerAPI.getNextAnswerList(req)
        .then((res) => {
          this.answers_count = res.data.count;
          this.answers_next = res.data.next;
          this.answers_prev = res.data.previous;
          this.answers = this.answers.concat(res.data.results);
          //if(change) {
          //  this.changeActiveAnswer()
          //}

          console.log("추가 후 제안서 목록 길이: " + this.answers.length);

          // 추가된 answer 레코드의 partner 정보도 같이 로딩
          res.data.results.forEach((answer) => {
            this.loadPartnerInfo(answer.partner);
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
    }

    if (requestId == 923) {
      const req = {
        nextUrl: this.answers_next,
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };

      console.log("loadNextAnswerList()");
      await AnswerAPI.getNextAnswerList(req)
        .then((res) => {
          this.answers_count = res.data.count;
          this.answers_next = res.data.next;
          this.answers_prev = res.data.previous;
          this.answers = this.answers.concat(res.data.results);
          //if(change) {
          //  this.changeActiveAnswer()
          //}

          console.log("추가 후 제안서 목록 길이: " + this.answers.length);

          // 추가된 answer 레코드의 partner 정보도 같이 로딩
          res.data.results.forEach((answer) => {
            this.loadPartnerInfo(answer.partner);
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
    }
  };
  @action loadAllAnswerList = async (requestId, callback = null) => {
    console.log(`loadAnswerList(${requestId})`);

    const request = this.getRequestById(requestId);
    let projectId = -1;
    if (request.project) {
      projectId = request.project;
      console.log("프로젝트 id: " + projectId);
    } else {
      return;
    }

    if (requestId != 923) {
      const token = localStorage.getItem("token");

      const req = {
        // params
        params: {
          project__id: projectId,
        },
        // headers
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      await AnswerAPI.getAnswerList(req)
        .then(async (res) => {
          this.answers_count = res.data.count;
          this.answers_next = res.data.next;
          this.answers_prev = res.data.previous;
          this.answers = res.data.results;

          console.log("제안서 목록 카운트 : " + this.answers.length);
          while (this.answers_next) {
            await this.loadNextAnswerList(false);
          }

          if (callback) {
            callback();
          }
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }

    if (requestId == 923) {
      const req = {
        // params
        params: {
          project__id: projectId,
        },
        // headers
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };

      await AnswerAPI.getAnswerList(req)
        .then(async (res) => {
          this.answers_count = res.data.count;
          this.answers_next = res.data.next;
          this.answers_prev = res.data.previous;
          this.answers = res.data.results;

          console.log("제안서 목록 카운트 : " + this.answers.length);
          while (this.answers_next) {
            await this.loadNextAnswerList(false);
          }

          if (callback) {
            callback();
          }
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }
  };

  @action loadPartnerInfo = async (partnerId, callback = null) => {
    if (partnerId === -1) {
      return;
    }
    if (this.getPartnerById(partnerId)) {
      return;
    }
    const requestId = window.location.pathname.split("/").pop();

    if (requestId != 923) {
      const token = localStorage.getItem("token");

      const req = {
        extraUrl: `${partnerId}/`,
        // params
        // headers
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      console.log(`loadPartnerInfo(${partnerId})`);
      await AnswerAPI.getPartnerInfo(req)
        .then((res) => {
          this.partners.push(res.data);
          console.log("this.partners.length: " + this.partners.length);

          if (callback) {
            callback();
          }
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }

    if (requestId == 923) {
      const req = {
        extraUrl: `${partnerId}/`,
        // params
        // headers
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };

      console.log(`loadPartnerInfo(${partnerId})`);
      await AnswerAPI.getPartnerInfo(req)
        .then((res) => {
          this.partners.push(res.data);
          console.log("this.partners.length: " + this.partners.length);

          if (callback) {
            callback();
          }
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
        });
    }
  };

  @action loadCategories = () => {
    // 자주 안 변하는 데이터
    if (this.develop_categories.length === 0) {
      this.loadDevelopCategories();
    }
    if (this.develop_big_categories.length === 0) {
      this.loadDevelopBigCategories();
    }
    if (this.subclasses.length === 0) {
      this.loadSubclasses();
    }
    // 밖으로 빼도 괜찮지 않을까?
    if (this.city_list.length === 0) {
      this.loadCityList();
    }
    if (this.main_categories.length === 0) {
      this.loadMainCategories();
    }
    if (this.categories.length === 0) {
      this.loadProductCategories();
    }
  };

  @action loadAllSelectSave = (requestId) => {
    console.log(`loadAllSelectSave(${requestId})`);

    const request = this.getRequestById(requestId);
    request.category.forEach(async (categoryId, idx) => {
      await this.loadSelectSave(requestId, categoryId);
    });
  };
  @action loadSelectSave = async (requestId, categoryId) => {
    console.log(`loadSelectSave(${requestId}, ${categoryId})`);

    if (requestId != 923) {
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

            await AnswerAPI.getNextPage(req)
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
    }

    if (requestId == 923) {
      const req = {
        // params
        params: {
          request: requestId,
          category: categoryId,
        },
        // headers
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
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
                Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
              },
            };

            await AnswerAPI.getNextPage(req)
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
    }
  };

  @action loadAnswerListPage = async (clientId, requestId, callback) => {
    console.log(`loadAnswerListPage(${clientId}, ${requestId})`);

    this.current_request_id = requestId;

    // 한 페이지만 읽어 this.answers_count를 저장
    console.log(1);
    await this.loadClientRequestList(clientId);
    console.log(2);
    await this.loadClientRequest(clientId, requestId);
    console.log(3);
    this.loadAllSelectSave(requestId);
    console.log(4);
    await this.loadAnswerList(requestId);

    // 자주 안 변하는 데이터
    this.loadCategories();

    if (this.answers.length === 0) {
      console.log("의뢰에 해당되는 제안서가 아직 없음");
      callback();
      return;
    } else {
      //this.changeActiveAnswer()
    }

    for (let i = 0; i < this.answers.length; i++) {
      console.log("파트너 id " + this.answers[i].partner);

      if (i === this.answers.length - 1) {
        await this.loadPartnerInfo(this.answers[i].partner, callback);
      } else {
        this.loadPartnerInfo(this.answers[i].partner);
      }
    }
  };
  @action loadAnswerDetailPage = async (
    clientId,
    requestId,
    answerId,
    callback
  ) => {
    console.log(`loadAnswerDetailPage(${clientId}, ${requestId}, ${answerId})`);

    await this.loadClientRequest(clientId, requestId);
    this.current_request_id = requestId;
    this.loadAllSelectSave(requestId);

    // 자주 안 변하는 데이터
    this.loadCategories();

    await this.loadAllAnswerList(requestId);
    const answer = this.getAnswerById(answerId);
    if (answer && answer.writed_review) {
      this.getReview(answer.project, answer.partner);
    }

    if (this.answers.length !== 0) {
      //  this.findActiveAnswer()
    }

    if (!answer) {
      // await Router.push("/");
      await Router.push("/project");
      await Router.reload();
    }
    await this.loadPartnerInfo(answer.partner, callback);
  };

  getAnswerById = (id) => {
    console.log(`getAnswerById(${id})`);
    console.log(this.answers.length);

    const idx = this.answers.findIndex((answer) => answer.id == id);
    console.log(this.answers[idx]);

    return this.answers[idx];
  };
  getPartnerById = (partnerId) => {
    if (partnerId === -1) {
      return;
    }

    console.log(`getPartnerById(${partnerId})`);
    console.log(this.partners.length);

    const idx = this.partners.findIndex((partner) => partner.id == partnerId);
    console.log(idx);

    return this.partners[idx];
  };
  getRequestById = (id) => {
    if (id === -1) {
      return;
    }

    console.log(`getRequestById(${id})`);
    const idx = this.requests.findIndex((request) => request.id == id);

    console.log(this.requests[idx]);
    return this.requests[idx];
  };
  getDevelopBigCategoryById = (id) => {
    if (id === -1) {
      return;
    }

    console.log(`getDevelopBigCategoryById(${id})`);
    const idx = this.develop_big_categories.findIndex(
      (category) => category.id == id
    );
    return this.develop_big_categories[idx];
  };
  getDevelopCategoryById = (id) => {
    if (id === -1) {
      return;
    }

    console.log(`getDevelopCategoryById(${id})`);
    const idx = this.develop_categories.findIndex(
      (category) => category.id == id
    );
    return this.develop_categories[idx];
  };
  getSubclassById = (id) => {
    if (id === -1) {
      return;
    }

    console.log(`getSubclassById(${id})`);
    const idx = this.subclasses.findIndex((subclass) => subclass.id == id);

    return this.subclasses[idx];
  };
  getMainCategoryById = (id) => {
    if (id === -1) {
      return;
    }

    console.log(`getMainCategoryById(${id})`);
    const idx = this.main_categories.findIndex((category) => category.id == id);
    return this.main_categories[idx];
  };
  getCategoryById = (id) => {
    if (id === -1) {
      return;
    }

    console.log(`getCategoryById(${id})`);
    const idx = this.categories.findIndex((category) => category.id == id);
    return this.categories[idx];
  };
  getCityById = (id) => {
    if (id === -1) {
      return;
    }

    console.log(`getCityById(${id})`);
    const idx = this.city_list.findIndex((city) => city.id == id);

    return this.city_list[idx];
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

  //allAnswersActive = () => {
  //  let isActive = true

  //  for(let i=0; i<this.answers.length; i++) {
  //    if (!this.answers[i].active) {
  //      isActive = false
  //    }
  //  }

  //  return isActive
  //}

  @action acceptMeeting = (answerId) => {
    console.log(`acceptMeeting(${answerId})`);

    const token = localStorage.getItem("token");

    let answer = this.getAnswerById(answerId);
    let partner = answer && this.getPartnerById(answer.partner);
    const req = {
      extraUrl: `${answerId}/`,
      //data
      data: {
        state: 1,
      },
      //headers
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    AnswerAPI.patchAnswer(req)
      .then((res) => {
        if (res.data.state === 1) {
          if (answer.state === 0) {
            this.patchMeetingCount(partner.id, partner.success + 1);
          } else if (answer.state === 2) {
            this.patchMeetingCount(
              partner.id,
              partner.success + 1,
              partner.fail - 1
            );
          }

          answer.state = 1;
          answer.down_chage = true;
          console.log("미팅 신청 성공");
          console.log(answer);

          if (answer.id == this.active_answer) {
            //this.changeActiveAnswer()
          }
        } else {
          console.log("미팅 신청 api 실패");
        }
      })
      .catch((e) => {
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };
  @action rejectMeeting = (answerId) => {
    console.log(`rejectMeeting(${answerId})`);

    const token = localStorage.getItem("token");
    let answer = this.getAnswerById(answerId);
    let partner = answer && this.getPartnerById(answer.partner);

    const req = {
      extraUrl: `${answerId}/`,
      //data
      data: {
        state: 2,
      },
      //headers
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    AnswerAPI.patchAnswer(req)
      .then((res) => {
        if (res.data.state === 2) {
          if (answer.state === 0) {
            this.patchMeetingCount(partner.id, null, partner.fail + 1);
          } else if (answer.state === 1) {
            this.patchMeetingCount(
              partner.id,
              partner.success - 1,
              partner.fail + 1
            );
          }

          answer.state = 2;
          answer.down_chage = true;
          console.log("미팅 거부 성공");
          console.log(answer);

          //this.changeActiveAnswer()
        } else {
          console.log("미팅 거부 api 실패");
        }
      })
      .catch((e) => {
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };

  @action getReview = (projectId, partnerId) => {
    if (requestId != 923) {
      const token = localStorage.getItem("token");
      const req = {
        params: {
          project__id: projectId,
          partner__id: partnerId,
        },
        // headers
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      console.log(req);

      AnswerAPI.getReview(req)
        .then((res) => {
          console.log("리뷰 가져오기 성공");
          console.log(res.data);
          this.active_review = res.data.results[0];
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    }

    if (requestId == 923) {
      const req = {
        params: {
          project__id: projectId,
          partner__id: partnerId,
        },
        // headers
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };

      console.log(req);

      AnswerAPI.getReview(req)
        .then((res) => {
          console.log("리뷰 가져오기 성공");
          console.log(res.data);
          this.active_review = res.data.results[0];
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    }
  };
  @action patchReview = () => {
    const token = localStorage.getItem("token");

    const req = {
      id: this.active_review.id,
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        ...this.active_review,
      },
    };

    console.log(req);

    AnswerAPI.patchReview(req)
      .then((res) => {
        console.log(res.data);
        alert("리뷰를 수정했습니다");

        this.active_review = res.data;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action patchMeetingCount = (
    partnerId,
    successCount = null,
    failCount = null
  ) => {
    const token = localStorage.getItem("token");
    let data = {};
    const partner = this.getPartnerById(partnerId);
    if (successCount) {
      data["success"] = successCount;
    }
    if (failCount) {
      data["fail"] = failCount;
    }

    const req = {
      id: partnerId,
      //data
      data: { ...data },
      //headers
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    PartnerAPI.patch(req)
      .then((res) => {
        console.log("patchMeetingCount 성공");
        partner.success = res.data.success;
        partner.fail = res.data.fail;
        partner.meeting = res.data.meeting;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action postReview = (answerId, params) => {
    const token = localStorage.getItem("token");

    let data = params;
    let answer = this.getAnswerById(answerId);

    data["client"] = answer.client;
    data["project"] = answer.project;
    data["partner"] = answer.partner;

    const req = {
      data: data,
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    AnswerAPI.postReview(req)
      .then((res) => {
        alert("리뷰가 작성되었습니다");
        console.log("리뷰 업로드 성공");
        console.log(res.data);

        answer.writed_review = true;

        this.getReview(answer.project, answer.partner);
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

  @action loadMainCategories = () => {
    const token = localStorage.getItem("token");
    const req = {
      headers: {
        // Authorization: token && `Token ${token}`,
      },
      // params
    };

    AnswerAPI.getMainCategories(req)
      .then(async (res) => {
        this.main_categories = res.data.results;
        this.main_categories_next = res.data.next;

        console.log(
          "loadMainCategories: 카테고리 길이 : " + this.main_categories.length
        );

        while (this.main_categories_next) {
          const req = {
            nextUrl: this.main_categories_next,
            // headers
            headers: {
              // Authorization: token && `Token ${token}`,
            },
          };

          await AnswerAPI.getNextPage(req)
            .then((res) => {
              this.main_categories = this.main_categories.concat(
                res.data.results
              );
              this.main_categories_next = res.data.next;

              console.log(
                "loadMainCategories: 카테고리 길이 : " +
                  this.main_categories.length
              );
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
  @action loadProductCategories = () => {
    const token = localStorage.getItem("token");
    const req = {
      headers: {
        // Authorization: token && `Token ${token}`,
      },
      // params
    };

    AnswerAPI.getCategories(req)
      .then(async (res) => {
        this.categories = res.data.results;
        this.categories_next = res.data.next;

        console.log(
          "loadProductCategories: 카테고리 길이 : " + this.categories.length
        );

        while (this.categories_next) {
          const req = {
            nextUrl: this.categories_next,
            // headers
            headers: {
              // Authorization: token && `Token ${token}`,
            },
          };

          await AnswerAPI.getNextPage(req)
            .then((res) => {
              this.categories = this.categories.concat(res.data.results);
              this.categories_next = res.data.next;

              console.log(
                "loadProductCategories: 카테고리 길이 : " +
                  this.categories.length
              );
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
  @action loadDevelopCategories = () => {
    const token = localStorage.getItem("token");
    const req = {
      headers: {
        // Authorization: token && `Token ${token}`,
      },
      // params
    };

    AnswerAPI.getDevelopCategories(req)
      .then(async (res) => {
        this.develop_categories = res.data.results;
        this.develop_categories_next = res.data.next;

        console.log(
          "loadDevelopCategories: 카테고리 길이 : " +
            this.develop_categories.length
        );

        while (this.develop_categories_next) {
          const req = {
            nextUrl: this.develop_categories_next,
            // headers
            headers: {
              // Authorization: token && `Token ${token}`,
            },
          };

          await AnswerAPI.getNextPage(req)
            .then((res) => {
              this.develop_categories = this.develop_categories.concat(
                res.data.results
              );
              this.develop_categories_next = res.data.next;

              console.log(
                "loadDevelopCategories: 카테고리 길이 : " +
                  this.develop_categories.length
              );
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
  @action loadDevelopBigCategories = () => {
    const token = localStorage.getItem("token");
    const req = {
      // headers
      headers: {
        // Authorization: token && `Token ${token}`,
      },
    };

    AnswerAPI.getDevelopBigCategories(req)
      .then(async (res) => {
        this.develop_big_categories = res.data.results;
        this.develop_big_categories_next = res.data.next;

        console.log(
          "loadDevelopBigCategories: 카테고리 길이 : " +
            this.develop_big_categories.length
        );

        while (this.develop_big_categories_next) {
          const req = {
            nextUrl: this.develop_big_categories_next,
            // headers
            headers: {
              // Authorization: token && `Token ${token}`,
            },
          };

          await AnswerAPI.getNextPage(req)
            .then((res) => {
              this.develop_big_categories = this.develop_big_categories.concat(
                res.data.results
              );
              this.develop_big_categories_next = res.data.next;

              console.log(
                "loadDevelopBigCategories: 카테고리 길이 : " +
                  this.develop_big_categories.length
              );
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
      })
      .catch((e) => {
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };
  @action loadSubclasses = () => {
    const token = localStorage.getItem("token");
    const req = {
      // params
      // headers
      headers: {
        // Authorization: token && `Token ${token}`,
      },
    };

    AnswerAPI.getSubclass(req)
      .then(async (res) => {
        this.subclasses = res.data.results;
        this.subclasses_next = res.data.next;

        console.log(
          "loadSubclasses: 카테고리 길이 : " + this.subclasses.length
        );

        while (this.subclasses_next) {
          const req = {
            nextUrl: this.subclasses_next,
            // headers
            headers: {
              // Authorization: token && `Token ${token}`,
            },
          };

          await AnswerAPI.getNextPage(req)
            .then((res) => {
              this.subclasses = this.subclasses.concat(res.data.results);
              this.subclasses_next = res.data.next;

              console.log(
                "loadSubclasses: 카테고리 길이 : " + this.subclasses.length
              );
            })
            .catch((e) => {
              try {
                alert(e.response.data.message);
              } catch {
                console.log(e);
                console.log(e.response);
              }
            });
        }
      })
      .catch((e) => {
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  };
  @action loadCityList = async () => {
    const token = localStorage.getItem("token");

    const req = {
      // params
      // headers
      headers: {
        // Authorization: token && `Token ${token}`,
      },
    };

    await AnswerAPI.getCityList(req)
      .then((res) => {
        this.city_list = res.data.results;
        console.log("city 목록 카운트: " + this.city_list.length);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  /*
  사용하지 않음
  @action activeFirst = (requestId) => {
    const token = localStorage.getItem('token')
    const request = this.getRequestById(requestId)
    if(!request) { return }

    const req = {
      // params
      params: {
        project__id: request.project,
      },
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
    }

    AnswerAPI.activeFirst(req)
      .then(res => {
        console.log('activeFirst 성공')
        console.log(res.data)
        // this.active_answer에 id값 저장
      })
      .catch(e => {
        console.log(e.response)
        try {
          alert(e.response.data.message)
        }
        catch {
          console.log(e)
          console.log(e.response)
        }
      })
  }
  */

  @action patchAddMeeting = () => {
    const token = localStorage.getItem("token");

    const req = {
      // params
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      id: this.current_request_id,
      // data
      data: {
        add_meeting: true,
      },
    };

    AnswerAPI.patchRequest(req)
      .then((res) => {
        const request = this.getRequestById(this.current_request_id);
        request.add_meeting = true;

        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  //@action findActiveAnswer = () => {
  //  for(let i = this.answers.length-1; i >= 0; i--) {
  //    if(this.answers[i].active) {
  //      this.active_answer = this.answers[i].id
  //      break;
  //    }
  //  }
  //}

  // 미팅하기나 미팅하지 않기를 클릭
  // 현재 active된 제안서의 다음 제안서를 active 시킴
  //@action changeActiveAnswer = () => {
  //  const token = localStorage.getItem('token')

  //  let data = null
  //  let nextActiveAnswerId = -1

  // 첫번째 제안서를 activate
  //  if(this.active_answer === -1 && this.answers_count) {
  /*
      let allActiveAndSubmitted = true
      this.answers.forEach(answer => {
        if(answer.active && answer.state === 0) {
          allActiveAndSubmitted = false
        }
      })

      // 이미 active인 제안서가 모두 미팅 신청/거절을 택한경우
      // active가 false인 것 중에서 맨 위에것 선택
      if (allActiveAndSubmitted) {
        const idx = this.answers.findIndex(answer => !answer.active)
        if(idx === -1) { return }

        data = {
          project_id: this.answers[idx].project,
          partner_id: this.answers[idx].partner,
        }
        nextActiveAnswerId = this.answers[idx].id
      }
      */
  //    data = {
  //      project_id: this.answers[0].project,
  //      partner_id: this.answers[0].partner,
  //    }
  //    nextActiveAnswerId = this.answers[0].id
  //  }
  //  else {
  /*
      let idx = 0;
      for(let i = this.answers.length-1; i >= 0; i--) {
        if(this.answers[i].active) {
          idx = i + 1;
          break;
        }
      }
      */

  //    const idx = this.answers.findIndex(answer => answer.id === this.active_answer)

  // 더 이상 다음 answer이 없음
  //    if(idx === (this.answers.length-1)) {
  //      console.log('더 이상 activate할 answer이 없음')
  //      console.log(idx)
  //      console.log(this.answers.length)
  //      return
  //    }
  //    else {
  //      data = {
  //        project_id: this.answers[idx + 1].project,
  //        partner_id: this.answers[idx + 1].partner,
  //      }
  //      console.log(data);

  //      nextActiveAnswerId = this.answers[idx + 1].id
  //    }
  //  }
  //  console.log('req 데이터')
  //  console.log(data)

  //  const req = {
  // params
  // headers
  //    headers: {
  //      Authorization: `Token ${token}`,
  //    },
  // data
  //    data: data,
  //  }

  //  console.log(req)

  //  AnswerAPI.changeActiveAnswer(req)
  //    .then(res => {
  //      console.log('changeActive 성공')
  //      console.log(res.data)

  //      this.active_answer = nextActiveAnswerId
  //      const idx = this.answers.findIndex(
  //        answer => answer.id == this.active_answer
  //      )
  //     this.answers[idx].active = true

  //      console.log('활성화된 제안서')
  //      console.log(this.active_answer)
  //    })
  //    .catch(e => {
  //      console.log(e.response)
  //      try {
  //        alert(e.response.data.message)
  //      }
  //      catch {
  //        console.log(e)
  //        console.log(e.response)
  //      }
  //    })
  //}

  @action searchSubclass = async (type, value) => {
    //   this.possible_list = []
    this.history_list = [];
    //   this.possible_subclass_list = []
    this.history_subclass_list = [];

    const req = {
      // params
      // headers
      headers: {
        // Authorization: `Token ${token}`,
      },
      // params
      params: {
        search: value,
      },
    };

    return CategoryAPI.getSubclass(req)
      .then(async (res) => {
        console.log(res.data);

        let next = res.data.next;
        let subclasses = res.data.results;

        while (next) {
          const req = {
            nextUrl: next,
          };

          await CategoryAPI.getNextPage(req)
            .then((res) => {
              next = res.data.next;
              subclasses = subclasses.concat(res.data.results);
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
        console.log("로딩 끝");

        // 색칠하기
        const re = new RegExp(value, "g");
        subclasses.forEach((subclassObj) => {
          subclassObj.subclass = subclassObj.subclass.replace(
            re,
            `<span style="color: ${PRIMARY};">${value}</span>`
          );
        });

        subclasses.forEach((subclass) => {
          let main = null;
          //    if(type === 'possible') {
          //      main = this.possible_subclass_list.find(main => main.id === subclass.maincategory);
          //    }
          if (type === "history") {
            main = this.history_subclass_list.find(
              (main) => main.id === subclass.maincategory
            );
          }
          if (!main) {
            main = { ...this.getMainCategoryById(subclass.maincategory) };
            let category = { ...this.getCategoryById(subclass.category) };
            main.category_set = [category];
            category.subclass_set = [subclass];

            //      if(type === 'possible') {
            //        this.possible_subclass_list.push(main)
            //      }
            if (type === "history") {
              this.history_subclass_list.push(main);
            }
          } else {
            let category = main.category_set.find(
              (category) => category.id === subclass.category
            );
            console.log(`${main.maincategory}: ${main.category_set.length}`);
            if (!category) {
              category = { ...this.getCategoryById(subclass.category) };
              category.subclass_set = [subclass];
              main.category_set.push(category);
            } else {
              let alreadyExists = category.subclass_set.find(
                (subclassObj) => subclassObj.id === subclass.id
              );
              if (!alreadyExists) {
                category.subclass_set.push(subclass);
              }
            }
          }
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
  @action searchCategory = async (type, value) => {
    //  this.possible_category_list = []
    this.history_category_list = [];

    const req = {
      // params
      // headers
      headers: {
        // Authorization: `Token ${token}`,
      },
      // params
      params: {
        search: value,
      },
    };

    return CategoryAPI.getCategoryMiddle(req)
      .then(async (res) => {
        console.log(res.data);

        let next = res.data.next;
        let categories = res.data.results;

        while (next) {
          const req = {
            nextUrl: next,
          };

          await CategoryAPI.getNextPage(req)
            .then((res) => {
              next = res.data.next;
              categories = categories.concat(res.data.results);
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
        console.log("로딩 끝");

        // 색칠하기
        const re = new RegExp(value, "g");
        categories.forEach((categoryObj) => {
          categoryObj.category = categoryObj.category.replace(
            re,
            `<span style="color: ${PRIMARY};">${value}</span>`
          );
        });

        categories.forEach((category) => {
          let main = null;
          //    if(type === 'possible') {
          //      main = this.possible_category_list.find(main => main.id === category.maincategory);
          //    }
          if (type === "history") {
            main = this.history_category_list.find(
              (main) => main.id === category.maincategory
            );
          }

          if (!main) {
            main = { ...this.getMainCategoryById(category.maincategory) };
            main.category_set = [category];

            //      if(type === 'possible') {
            //        // 중복 제거
            //        this.possible_subclass_list.forEach(main => {
            //          const categoryObj = main.category_set.find(categoryObj => categoryObj.id === category.id)
            //          if(!categoryObj) { return }

            //          categoryObj.subclass_set.forEach(subclass => {
            //            category.subclass_set = category.subclass_set.filter(subclassObj => subclassObj.id !== subclass.id)
            //          })
            //        })

            //        this.possible_category_list.push(main)
            //      }
            if (type === "history") {
              // 중복 제거
              this.history_subclass_list.forEach((main) => {
                const categoryObj = main.category_set.find(
                  (categoryObj) => categoryObj.id === category.id
                );
                if (!categoryObj) {
                  return;
                }

                categoryObj.subclass_set.forEach((subclass) => {
                  category.subclass_set = category.subclass_set.filter(
                    (subclassObj) => subclassObj.id !== subclass.id
                  );
                });
              });

              this.history_category_list.push(main);
            }
          } else {
            //      if(type === 'possible') {
            //        // 중복 제거
            //        this.possible_subclass_list.forEach(main => {
            //          const categoryObj = main.category_set.find(categoryObj => categoryObj.id === category.id)
            //          if(!categoryObj) { return }
            //
            //          categoryObj.subclass_set.forEach(subclass => {
            //            category.subclass_set = category.subclass_set.filter(subclassObj => subclassObj.id !== subclass.id)
            //          })
            //        })
            //      }
            if (type === "history") {
              // 중복 제거
              this.history_subclass_list.forEach((main) => {
                const categoryObj = main.category_set.find(
                  (categoryObj) => categoryObj.id === category.id
                );
                if (!categoryObj) {
                  return;
                }

                categoryObj.subclass_set.forEach((subclass) => {
                  category.subclass_set = category.subclass_set.filter(
                    (subclassObj) => subclassObj.id !== subclass.id
                  );
                });
              });
            }

            main.category_set.push(category);
          }
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
  @action searchMainCategory = async (type, value) => {
    this.possible_main_list = [];
    this.history_main_list = [];

    const req = {
      // params
      // headers
      headers: {
        // Authorization: `Token ${token}`,
      },
      // params
      params: {
        search: value,
      },
    };

    return CategoryAPI.getCategory(req)
      .then(async (res) => {
        console.log(res.data);

        let next = res.data.next;
        let categories = res.data.results;

        while (next) {
          const req = {
            nextUrl: next,
          };

          await CategoryAPI.getNextPage(req)
            .then((res) => {
              next = res.data.next;
              categories = categories.concat(res.data.results);
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }

        console.log("로딩 끝");

        const re = new RegExp(value, "g");
        categories.forEach((categoryObj) => {
          categoryObj.maincategory = categoryObj.maincategory.replace(
            re,
            `<span style="color: ${PRIMARY};">${value}</span>`
          );
        });

        //  if(type === 'possible') {
        //    categories.forEach(main => {
        //      this.possible_category_list.forEach(mainObj => {
        //        mainObj.category_set.forEach(categoryObj => {
        //          main.category_set = main.category_set.filter(category => category.id !== categoryObj.id)
        //        })
        //      })

        //      this.possible_main_list.push(main)
        //    })
        //  }
        if (type === "history") {
          categories.forEach((main) => {
            this.history_category_list.forEach((mainObj) => {
              mainObj.category_set.forEach((categoryObj) => {
                main.category_set = main.category_set.filter(
                  (category) => category.id !== categoryObj.id
                );
              });
            });

            this.history_main_list.push(main);
          });
        }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  getCityNameById = (id) => {
    if (id == -1) {
      return;
    }

    const idx = this.city_list.findIndex((city) => city.id == id);

    // 못 찾았을 경우
    if (idx === -1) {
      return "";
    }

    return this.city_list[idx].city;
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
}

export default new Answer();
