import { observable, action } from "mobx";
import Router from "next/router";
import * as AnswerAPI from "axios/Manufacture/Answer";
import * as RequestAPI from "axios/Manufacture/Request";
import * as CategoryAPI from "axios/Account/Category";
import * as PartnerAPI from "axios/Manufacture/Partner";
import { PRIMARY } from "static/style";

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

  @observable answers_count = 0;
  @observable answers_next = null;
  @observable answers_prev = null;
  @observable answers = [];


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

  // Answer id로 Answer data 가져오기
  getAnswerById = (id) => {
    console.log(`getAnswerById(${id})`);
    console.log(this.answers.length);

    const idx = this.answers.findIndex((answer) => answer.id == id);
    console.log(this.answers[idx]);

    return this.answers[idx];
  };


  // 리뷰 관련
  @observable active_answer = -1; // answer_id
  @observable active_review = null;

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

  // 프로젝트 상세 볼 때, answer 개수를 가지고와서 지원 파트너 숫자를 가져오는 함수
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

}

export default new Answer();


