import React from "react";
import styled from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Content4 from "./Content4";
import { inject, observer } from "mobx-react";
import Background from "components/Background";
import Container from "components/Containerv1";
import ProposalCard from "components/ProposalCard";
import { Toolbar } from "material-ui";
import { toJS } from "mobx";
import ChatTestContainer from "containers/Chatting/Info2/ChatTest";
import * as PartnerAPI from "axios/Partner";
import ChatItemContainer from "components/ChatItem";
const money = "/static/images/project/money.svg";
const calendar = "/static/images/project/period.svg";
const applicant = "/static/images/project/applicant.svg";
const fileimg = "/static/images/project/fileimg.svg";
const logoImg = "/static/images/project/Logo.png";
const toolBarImg = "/static/images/project/ToolBar.svg";
const callImg = "/static/images/project/Call.svg";
const messagesImg = "/static/images/project/Messages.svg";

@inject("Project", "Auth", "Answer", "Partner")
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
    const { Project, Auth, Answer } = this.props;

    console.log(Project.selectedProjectId);
    console.log("<Web> did mount");

    this.getToday(
      Project.projectDetailData &&
        Project.projectDetailData.request_set[0].deadline
    );
    await Auth.checkLogin();

    Answer.loadAnswerListByProjectId(Project.selectedProjectId).then(() => {
      console.log(toJS(Answer.answers));
      this.setState({ partnerList: Answer.answers });

      Answer.answers.forEach((answer) => {
        const PartnerDetailList = this.state.partnerDetailList;
        PartnerAPI.detail(answer.partner)
          .then((res) => {
            PartnerDetailList.push({
              logo: res.data.logo,
              name: res.data.name,
            });
            this.setState({ partnerDetailList: PartnerDetailList });
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
          });
      });
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

    Project.projectDataList &&
      Project.currentPage > 0 &&
      Project.projectDataList.map((item, idx) => {
        console.log("전체 프로젝트 데이터 리스트");
        console.log(toJS(Project.projectDataList));
        if (idx === 0) {
          name = item.request_set[0].name ? item.request_set[0].name : "미지정";
          date = item.request_set[0].createdAt
            ? item.request_set[0].createdAt.substr(0, 10).replaceAll("-", ".")
            : "미지정";
          period = item.request_set[0].period
            ? item.request_set[0].period + " 달"
            : "미지정";
          estimate = item.request_set[0].price
            ? item.request_set[0].price
            : "미지정";
          category = Project.category;
          maincategory = Project.maincategory;
          categoryname = Project.categoryname;
          maincategoryname = Project.maincategoryname;
          console.log("아이템");
          console.log(toJS(item));
        }
      });

    return (
      <>
        <Container1>
          {console.log("projectDetailData")}
          {console.log(toJS(projectDetailData))}
          {Project.chatModalActive && (
            <Layer>
              <ChatTestContainer
                roomName={this.state.selectedRoom}
                requestTitle={
                  this.props.Project.projectDetailData.request_set[0].name
                }
              ></ChatTestContainer>
            </Layer>
          )}

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
              <Box2>
                <Box2ImageContainer>
                  <img src={money}></img>
                </Box2ImageContainer>
                <div style={{ marginBottom: 27 }}>
                  <Font18 style={{ color: "#86888c" }}>예상 금액</Font18>
                  <Font18 style={{ fontWeight: "bold" }}>
                    {projectDetailData && projectDetailData.request_set[0].price
                      ? projectDetailData.request_set[0].price.toLocaleString(
                          "ko-KR"
                        ) + "원"
                      : "미정"}
                  </Font18>
                </div>
              </Box2>

              <Box2>
                <Box2ImageContainer>
                  <img src={calendar}></img>
                </Box2ImageContainer>
                <div style={{ marginBottom: 27 }}>
                  <Font18 style={{ color: "#86888c" }}>희망 납기</Font18>
                  <Font18 style={{ fontWeight: "bold" }}>
                    {projectDetailData &&
                      projectDetailData.request_set[0].deadline
                        .slice(2, 10)
                        .replace(/-/gi, ".")}
                  </Font18>
                </div>
              </Box2>

              <Box2>
                <Box2ImageContainer>
                  <img src={applicant}></img>
                </Box2ImageContainer>
                <div style={{ marginBottom: 27 }}>
                  <Font18 style={{ color: "#86888c" }}>지원자 수</Font18>
                  <Font18 style={{ fontWeight: "bold" }}>
                    {this.state.partnerList.length} 명
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
const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #00000080;
`;
const Icon = styled.div`
  position: relative;
`;
const Font14 = styled(Content.FontSize14)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.86;
  letter-spacing: -0.35px;
  text-align: left;
  color: #ffffff;
`;
const ChatNotice = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  // bottom: 15px;
  bottom: 8px;
  left: 12px;
  border-radius: 50%;
  // padding: 3px 7px 2px;
  display: ${(props) => (props.active ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  object-fit: contain;
  background-color: #ff3400;
`;
const IconBox = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
`;
const PartnerInfo = styled.div`
  display: flex;
`;
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
  width: 936px;
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
  width: 293px;
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
const Info = styled.div`
  display: inline-flex;
  flex-direction: row;
  > div {
    display: flex;
    flex-direction: column;
    > p {
      margin-bottom: 12px;
    }
    > p:nth-of-type(3) {
      margin-bottom: 0;
    }
    > div {
      margin-bottom: 12px;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
    }
  }
  padding-bottom: 50px;
  border-bottom: solid 2px #e1e2e4;
`;

const InfoDetail = styled.div`
  padding-top: 40px;
  > p:nth-of-type(1) {
    margin-bottom: 20px;
  }
  > p:nth-of-type(3) {
    margin-bottom: 20px;
  }
  > div p {
    margin-bottom: 12px;
  }
  > div p:last-of-type {
    margin-bottom: 0;
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
