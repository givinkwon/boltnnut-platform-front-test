import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";
import Router from "next/router";
import { toJS } from "mobx";
import Answer from "stores/Manufacture/Answer";

const profile = "/static/images/project/user.svg";
const partnerbadge = "/static/images/project/partnerbadge.svg";

@inject("Request","Auth", "Project", "Answer")
@observer
class ContentSub extends React.Component {
  state = {
    activeOne: false,
    activeTwo: false,
    isAnswered: false,
  };
  async componentDidMount() {
    const { Project, Auth, Answer } = this.props;
    await Auth.checkLogin();
    if (this.props.user === "partner") {
      Answer.loadAnswerListByProjectId(Project.selectedProjectId).then(() => {
        console.log(toJS(Answer.answers));
        console.log(Auth.logged_in_partner);

        Answer.answers.forEach((answer) => {
          console.log(answer.partner);
          console.log(Auth.logged_in_partner.id);
          if (Auth.logged_in_partner.id === answer.partner) {
            console.log("RRR");
            this.setState({ isAnswered: true });
          }
        });
      });
    }
  }

  changeProject = () => {
    Router.push("/request");
  };

  exitProject = () => {
    this.props.Project.exitProject(this.props.Project.projectDetailData.id),
      console.log(this.props.Project.projectDetailData.id);
    alert("상담 모집이 종료되었습니다.");
  };

  activeHandler = (active) => {
    if (active === "activeOne") {
      if (this.state.activeOne) {
        this.setState({ activeOne: false });
      } else {
        this.setState({ activeOne: true });
      }
    } else {
      if (this.state.activeTwo) {
        this.setState({ activeTwo: false });
      } else {
        this.setState({ activeTwo: true });
      }
    }
  };

  render() {
    const { Auth, Project, user, Request } = this.props;

    return (
      <ContainerSub>
        {/* 클라이언트일 때 + 본인이 만든 프로젝트일 때 */}
        {user === "client" &&
        Project.projectDetailData.request_set[0].client ==
          Auth.logged_in_client.id ? (
          <>
            <Box3
              style={{ marginBottom: 20 }}
              active={this.state.activeOne}
              onMouseOver={() => this.activeHandler("activeOne")}
              onMouseOut={() => this.activeHandler("activeOne")}
              onClick={async () => {
                console.log("click!");
                Request.requestTabIdx = 1;
                Request.edit_state = 1;
                Request.request_id = Project.projectDetailData.request_set[0].id;
                Router.push('/request');
              }}
            >
              <Font18
                style={{ fontWeight: "bold" }}
                active={this.state.activeOne}
              >
                제조문의 수정하기
              </Font18>
            </Box3>
            <Box3
              active={this.state.activeTwo}
              onMouseOver={() => this.activeHandler("activeTwo")}
              onMouseOut={() => this.activeHandler("activeTwo")}
              onClick={async () => {
                console.log("click!");
                this.exitProject();
              }}
            >
              <Font18
                style={{ fontWeight: "bold" }}
                active={this.state.activeTwo}
              >
                프로젝트 종료하기
              </Font18>
            </Box3>
          </>
        ) : (
          user === "partner" && (
            <>
              
                <Box3
                  style={{ marginTop: 50, marginBottom: 90 }}
                  active={this.state.activeOne}
                  onMouseOver={() => this.activeHandler("activeOne")}
                  onMouseOut={() => this.activeHandler("activeOne")}
                  onClick={async () => {
                    await Answer.CreateAnswer(Project.projectDetailData.id, Auth.logged_in_partner.id, Project.projectDetailData.request_set[0].id)
                    alert("모바일 환경에서 클라이언트와의 채팅은 준비중입니다. 의뢰자에게 답변 메세지가 발송되었으니, 데스크탑으로 로그인하여 제안을 해보세요.")
                  }}
                >
                  <Font18
                    style={{ fontWeight: "bold" }}
                    active={this.state.activeOne}
                  >
                    {!this.state.isAnswered ? "제조문의 답변하기" : "채팅 이어하기"}
                  </Font18>
                </Box3>
              
            </>
          )
        )}
      </ContainerSub>
    );
  }
}

export default ContentSub;

const ContainerSub = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Box3 = styled(Buttonv1)`
  border-radius: 5px;
  display: flex;
  width: 100% !important;
  height: 46px !important;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  justify-content: center;
  align-items: center;
  border: solid 1px #0933b3;
  box-sizing: border-box;
  background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};
`;

const PartnerContainer = styled.div`
  margin-top: 48px;
  display: inline-flex;
  flex-direction: row;
  padding-bottom: 22px;
  border-bottom: solid 2px #e1e2e4;
`;
const ApplicationStatus = styled.div`
  display: inline-flex;
  flex-direction: row;
  margin-top: 13px;
  justify-content: space-between;
  > div {
    flex-direction: column;
    > p {
      margin-bottom: 12px;
    }
  }
`;
const Font16 = styled(Content.FontSize16)`
  font-weight: normal;
  letter-spacing: -0.4px !important;
  color: #282c36;
  line-height: 1.5;
`;

const Font18 = styled(Content.FontSize18)`
  color: ${(props) => (props.active ? "#ffffff" : "#0933b3")};

  display: flex;
  align-items: center;
  line-height: 1.5;
  justify-content: center;
  letter-spacing: -0.45px !important;
`;
