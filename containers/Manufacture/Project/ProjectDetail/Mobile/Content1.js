import React from "react";
import styled from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Content4 from "./Content4";
import { inject, observer } from "mobx-react";

import { toJS } from "mobx";
import ChatTestContainer from "containers/Manufacture/Chatting/ChattingDetail/ChatTest";
import ChatItemContainer from "components/ChatItem";
const money = "/static/images/project/money.svg";
const calendar = "/static/images/project/period.svg";
const applicant = "/static/images/project/applicant.svg";
const fileimg = "/static/images/project/fileimg.svg";
const logoImg = "/static/images/project/Logo.png";
const toolBarImg = "/static/images/project/ToolBar.svg";
const callImg = "/static/images/project/Call.svg";
const messagesImg = "/static/images/project/Messages.svg";

// cookie 추가
import Cookies from "js-cookie";

@inject("Project", "Auth", "Answer", "Partner", "Cookie")
@observer
class Content1 extends React.Component {
  state = {
    item: [],
    partnerList: [],
    modalActive: false,
    selectedRoom: null,
    partnerDetailList: [],
  };
  handler = {
    get(item, property, itemProxy) {
      console.log(`Property ${property} has been read.`);
      return target[property];
    },
  };

  getToday(date) {
    console.log(date);
  }
  modalHandler = (id) => {
    this.setState({ selectedRoom: id });
    const { Project } = this.props;
    Project.chatModalActive = !Project.chatModalActive;
  };
  async componentDidMount() {
    const { Project, Auth, Cookie } = this.props;

    console.log(Project.selectedProjectId);
    console.log("<Web> did mount");

    this.getToday(
      Project.projectDetailData &&
        Project.projectDetailData.request_set[0].deadline
    );
    await Auth.checkLogin();

    // 쿠기 값 리스트에 저장
    if (Project.projectDetailData) {
      Cookie.add_project_view(Project.projectDetailData.id);
    }

    // 쿠키 저장하기
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 2440);
    Cookies.set("project_view", Cookie.project_view_list, {
      path: "/",
      expires,
    });
  }

  render() {
    const { Project, Partner, user, Auth } = this.props;

    const { projectDetailData } = Project;

    let name = "";
    let date = "";
    let period = "";
    let estimate = "";
    let applicantnumber = "";
    let category = Project.category;
    let maincategory = "";
    let categoryname = "";
    let maincategoryname = "";

    return (
      <>
        <Container1>

          <InnerContainer>
            <Top>
              <Box1>
                <Font18
                  style={{
                    color: "#ffffff",
                    fontWeight: "500",
                    letterSpacing: -0.18,
                  }}
                >
                  {projectDetailData &&
                    projectDetailData.request_set[0].request_state}
                </Font18>
              </Box1>
              <div style={{ display: "inline-flex", flexDirection: "row" }}>
                <Font16 style={{ color: "#999999", marginRight: 17 }}>
                  등록 일자
                </Font16>{" "}
                <Font16 style={{ color: "#999999" }}>
                  {projectDetailData &&
                    projectDetailData.request_set[0].createdAt
                      .substr(0, 10)
                      .replaceAll("-", ".")}
                </Font16>
              </div>
            </Top>
            <Head>
              <Font26
                style={{ height: 38, fontWeight: "bold", letterSpacing: -0.65 }}
              >
                {projectDetailData && projectDetailData.request_set[0].name}
              </Font26>
              <div>
                <Font17 style={{ color: "#86888c" }}>
                  {category}
                  {categoryname}
                </Font17>
              </div>
            </Head>
            <Box2Container>
              <Box2 style={{marginRight : 20}}>
                <Box2ImageContainer>
                  <img src={money}></img>
                </Box2ImageContainer>
                <div style={{ marginBottom: 27 }}>
                  <Font18 style={{ color: "#86888c" }}>예상 금액</Font18>
                  <Font18 style={{ fontWeight: "bold" }}>
                    {projectDetailData && projectDetailData.request_set[0].price
                      ? projectDetailData.request_set[0].price.toLocaleString(
                          "ko-KR"
                        )
                      : "미정"}
                  </Font18>
                </div>
              </Box2>

              <Box2>
                <Box2ImageContainer>
                  <img src={calendar}></img>
                </Box2ImageContainer>
                <div style={{ marginBottom: 27 }}>
                  <Font18 style={{ color: "#86888c" }}>희망 문의 마감 시간</Font18>
                  <Font18 style={{ fontWeight: "bold" }}>
                    {projectDetailData &&
                      projectDetailData.request_set[0].deadline
                        .slice(2, 10)
                        .replace(/-/gi, ".") != "20.11.11" ? 
                      (projectDetailData.request_set[0].deadline
                        .slice(2, 10)
                        .replace(/-/gi, ".") 
                      ) : (
                        "미정"
                      )
                    }
                  </Font18>
                </div>
              </Box2>
            </Box2Container>
            {/* 지원한 파트너 */}
            <AppliedPartner>
              <Font20
                style={{
                  color: "#282c36",
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                지원한 파트너
                {user == "client" &&
                  projectDetailData.request_set[0].client ==
                    Auth.logged_in_client.id && (
                    <p style={{ color: "#0933b3", marginLeft: 6 }}>
                      {this.state.partnerList.length}
                    </p>
                  )}
              </Font20>
              {/* 프로젝트의 해당 클라이언트인 경우와 아닌 경우   */}
              {user == "client" &&
              projectDetailData.request_set[0].client ==
                Auth.logged_in_client.id ? (
                <>
                  {this.state.partnerList.map((data, idx) => {
                    return (
                      <>
                        {this.state.partnerDetailList[idx] && (
                          <ChatItemContainer
                            logo={this.state.partnerDetailList[idx].logo}
                            name={this.state.partnerDetailList[idx].name}
                            id={data.id}
                            content={data.content1}
                            modalHandler={this.modalHandler}
                            user={Auth}
                          />
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <BlackBox>
                    <span>'해당 프로젝트 담당자만 확인할 수 있습니다.'</span>
                    <div style={{ filter: "blur(5px)" }}>
                      <PartnerBox>
                        <img
                          src={
                            "https://boltnnutplatform.s3.amazonaws.com/media/partner/1.png"
                          }
                          width={36}
                          height={36}
                        />
                      </PartnerBox>
                      <PartnerBox>
                        <img
                          src={
                            "https://boltnnutplatform.s3.amazonaws.com/media/partner/1.png"
                          }
                          width={36}
                          height={36}
                        />
                      </PartnerBox>
                      <PartnerBox>
                        <img
                          src={
                            "https://boltnnutplatform.s3.amazonaws.com/media/partner/1.png"
                          }
                          width={36}
                          height={36}
                        />
                      </PartnerBox>
                    </div>
                  </BlackBox>
                </>
              )}
            </AppliedPartner>
            <Content4 user={user} />
          </InnerContainer>
        </Container1>
      </>
    );
  }
}

export default Content1;

const PartnerBox = styled.div`
  margin-bottom: 12px;
  // width: 100%;
  height: 56px;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: var(--white);
  display: flex;
  // justify-content: space-around;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px 0 28px;
`;
const AppliedPartner = styled.div`
  margin-bottom: 90px;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 54px 32px 52px 32px;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  background-color: var(--white);
`;
const InnerContainer = styled.div`
  width: 100%;
  // padding: 54px 0 52px 0;
`;
const Top = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 28px;
`;
const Box1 = styled.div`
  border-radius: 3px;
  display: flex;
  width: 101px;
  height: 40px;
  background-color: #0933b3;
  justify-content: center;
  align-items: center;
`;

const Head = styled.div`
  word-break: break-all;
  div {
    display: inline-flex;
    flex-direction: row;
    margin-top: 12px;
  }
  div:nth-of-type(1) {
    padding-right: 24.5px;
  }
  div:nth-of-type(2) {
    height: 15px;
    border-right: solid 1px #a4aab4;
  }
  div:nth-of-type(3) {
    padding-left: 24.5px;
  }
`;

const Box2Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 50px 0 60px;
`;

const Box2 = styled.div`
  width: 50%;
  height: 199px;
  border-radius: 10px;
  border: solid 1px #c6c7cc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Box2ImageContainer = styled.div`
  height: 60px;
  margin-top: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BlackBox = styled.div`
  position: relative;
  > span {
    font-size: 18px;
    color: #0933b3;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: normal;
  letter-spacing: -0.4px !important;
  color: #282c36;
  line-height: 1.5;
`;

const Font17 = styled(Content.FontSize17)`
  line-height: 1.5;
`;
const Font18 = styled(Content.FontSize18)`
  color: #282c36;
  display: flex;
  align-items: center;
  line-height: 1.5;
  justify-content: center;
  letter-spacing: -0.45px !important;
`;
const Font20 = styled(Title.FontSize20)`
  color: #86888c;
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  line-height: 1.5;
  align-items: center;
`;
const Font26 = styled(Title.FontSize26)`
  line-height: 1.5;
  display: flex;
  align-items: center;
`;
