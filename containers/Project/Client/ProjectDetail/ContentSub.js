import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";
import Router from "next/router";
import { toJS } from "mobx";

const profile = "/static/images/project/user.svg";
const partnerbadge = "/static/images/project/partnerbadge.svg";

@inject("Request", "ManufactureProcess", "Auth", "Schedule", "Project")
@observer
class ContentSub extends React.Component {
  state = {
    activeOne: false,
    activeTwo: false,
  };
  changeProject = () => {
    this.props.ManufactureProcess.changeProject = true;
    this.props.ManufactureProcess.checkFileUpload = true;
  };

  exitProject = () => {
    this.props.Project.exitProject(this.props.Project.projectDetailData.id),
      console.log(this.props.Project.projectDetailData.id);
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
    return (
      <ContainerSub>
        {this.props.user === "client" ? (
          <>
            <Box3
              style={{ marginBottom: 20 }}
              active={this.state.activeOne}
              onMouseOver={() => this.activeHandler("activeOne")}
              onMouseOut={() => this.activeHandler("activeOne")}
              onClick={async () => {
                console.log("click!");
                this.changeProject();
                await Router.push(`/request`);

                //this.props.ManufactureProcess.checkFileUpload = true;
              }}
            >
              <Font18
                style={{ fontWeight: "bold" }}
                active={this.state.activeOne}
              >
                프로젝트 수정하기
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
          <>
            <Box3
              style={{ marginBottom: 20 }}
              active={this.state.activeOne}
              onMouseOver={() => this.activeHandler("activeOne")}
              onMouseOut={() => this.activeHandler("activeOne")}
              onClick={async () => {
                console.log(this.props.Project.newIndex);
                this.props.Project.newIndex = 2;
                // await Router.push(`/request`);

                //this.props.ManufactureProcess.checkFileUpload = true;
              }}
            >
              <Font18
                style={{ fontWeight: "bold" }}
                active={this.state.activeOne}
              >
                프로젝트 답변하기
              </Font18>
            </Box3>
            <Box3
              active={this.state.activeTwo}
              onMouseOver={() => this.activeHandler("activeTwo")}
              onMouseOut={() => this.activeHandler("activeTwo")}
              onClick={async () => {
                console.log("click!");
              }}
            >
              <Font18
                style={{ fontWeight: "bold" }}
                active={this.state.activeTwo}
              >
                비공개 자료 요청
              </Font18>
            </Box3>
          </>
        )}

        {/* <PartnerContainer>
          <img src={profile} style={{ width: 42, height: 35 }}></img>
          <img src={partnerbadge} style={{ marginLeft: 22 }}></img>
        </PartnerContainer>
        <ApplicationStatus>
          <div>
            <Font16>프로젝트 지원</Font16>
            <Font16>관심 프로젝트</Font16>
          </div>
          <div>
            <Font16 style={{ color: "#0933b3" }}>2</Font16>
            <Font16 style={{ color: "#0933b3" }}>4</Font16>
          </div>
        </ApplicationStatus> */}
      </ContainerSub>
    );
  }
}

export default ContentSub;

const ContainerSub = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  margin-left: 24px;
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
