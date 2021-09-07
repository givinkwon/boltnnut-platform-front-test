import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import Slider from "react-slick";
import { inject, observer } from "mobx-react";

import Container from "components/Containerv1";
import ProposalCard from "components/ProposalCard";
import Background from "components/Background";
import ProjectNone from "containers/Manufacture/Project/MyProject/ProjectNone";
import { toJS } from "mobx";

const pass1 = "static/images/pass1.png";
const pass2 = "static/images/pass2.png";

const left = "static/icon/left-arrow.png";
const right = "static/icon/right-arrow.png";

@inject("Project", "Auth")
@observer
class MyProject extends React.Component {
  constructor(props) {
    super(props);
    this.props.Project.pushToDetail =
      this.props.Project.pushToDetail.bind(this);
  }

  state = {
    current: 0,
    next: true,
    prev: true,
    count: 0,
    myproject_state: 0,
  };

  async componentDidMount() {
    const { Project, Auth } = this.props;
    console.log("<Web> did mount");
    this.props.Project.currentPage = 1;

    await Auth.checkLogin();
    if (Auth.logged_in_client) {
      Project.getProject("myproject", Auth.logged_in_client.id);
    }
    console.log(Auth.logged_in_client);
  }

  render() {
    const { Project, Auth } = this.props;
    const current_set = parseInt((Project.currentPage - 1) / 5) + 1;
    const gray = "#f9f9f9";
    console.log(Auth.logged_in_user);

    return (
      <>
        <Background
          style={{ backgroundColor: "#f6f6f6", paddingBottom: 217 }}
          id="MyBackground"
        >
          <Header>
            <HeaderTitle>
              <div style={{ marginBottom: 12 }}>
                나의 제조문의 >{" "}
                {Project.myproject_state == 1
                  ? " 진행중 프로젝트"
                  : " 종료된 프로젝트"}
              </div>
            </HeaderTitle>
          </Header>
          <Container>
            <Body>
              <Aside>
                <AsideHeader>
                  {Auth.logged_in_user && Auth.logged_in_user.username}
                </AsideHeader>
                <AsideBody>
                  <div
                    onClick={() => Project.set_myproject_state(1)}
                    style={{ marginBottom: 12 }}
                  >
                    진행중 프로젝트
                  </div>
                  <div onClick={() => Project.set_myproject_state(2)}>
                    종료된 프로젝트
                  </div>
                </AsideBody>
              </Aside>
              <Main>
                <MainHeader>
                  <div>
                    {Project.myproject_state == 1
                      ? "진행중 프로젝트"
                      : "종료된 프로젝트"}
                  </div>
                </MainHeader>
                {Project.project_existence &&
                Project.projectDataList &&
                Project.projectDataList[0] ? (
                  <>
                    {Project.currentPage > 0 &&
                      Project.projectDataList.map((item, idx) => {
                        {
                          console.log(toJS(item));
                        }
                        return (
                          <>
                            {toJS(item.request_set.length > 0) &&
                              // 진행 중인 프로젝트 선택 시 >> 진행 중 프로젝트만 보여주기
                              Project.myproject_state == 1 &&
                              item.status == "모집중" && (
                                <Background
                                  style={{
                                    marginTop: 24,
                                    backgroundColor: "#f6f6f6",
                                  }}
                                >
                                  <div
                                    style={{ cursor: "pointer", width: "100%" }}
                                    onClick={() =>
                                      Project.pushToDetail(item.id)
                                    }
                                  >
                                    <ProposalCard
                                      state={Project.myproject_state}
                                      data={item}
                                    />
                                  </div>
                                </Background>
                              )}

                            {toJS(item.request_set.length > 0) &&
                              // 종료된 프로젝트 선택 시 >> 종료된 프로젝트만 보여주기
                              Project.myproject_state == 2 &&
                              item.status == "모집종료" && (
                                <Background
                                  style={{
                                    marginTop: 24,
                                    backgroundColor: "#f6f6f6",
                                  }}
                                >
                                  <div
                                    style={{ cursor: "pointer", width: "100%" }}
                                    onClick={() =>
                                      Project.pushToDetail(item.id)
                                    }
                                  >
                                    <ProposalCard
                                      state={Project.myproject_state}
                                      data={item}
                                    />
                                  </div>
                                </Background>
                              )}
                          </>
                        );
                      })}
                    {/* <PageBar>
                      <img
                        src={pass1}
                        style={{
                          opacity:
                            current_set == 1 && Project.currentPage <= 1
                              ? 0.4
                              : 1,
                          cursor: "pointer",
                        }}
                        onClick={Project.pagePrev}
                      />
                      <PageCount
                        onClick={Project.movePage}
                        value={5 * (current_set - 1)}
                        active={Project.currentPage % 5 == 1}
                        style={{
                          display:
                            Project.project_page < 5 * (current_set - 1) + 1
                              ? "none"
                              : "block",
                        }}
                      >
                        {" "}
                        {5 * (current_set - 1) + 1}{" "}
                      </PageCount>
                      <PageCount
                        value={5 * (current_set - 1) + 1}
                        active={Project.currentPage % 5 == 2}
                        style={{
                          display:
                            Project.project_page < 5 * (current_set - 1) + 2
                              ? "none"
                              : "block",
                        }}
                        onClick={Project.movePage}
                      >
                        {" "}
                        {5 * (current_set - 1) + 2}{" "}
                      </PageCount>
                      <PageCount
                        value={5 * (current_set - 1) + 2}
                        active={Project.currentPage % 5 == 3}
                        style={{
                          display:
                            Project.project_page < 5 * (current_set - 1) + 3
                              ? "none"
                              : "block",
                        }}
                        onClick={Project.movePage}
                      >
                        {" "}
                        {5 * (current_set - 1) + 3}{" "}
                      </PageCount>
                      <PageCount
                        value={5 * (current_set - 1) + 3}
                        active={Project.currentPage % 5 == 4}
                        style={{
                          display:
                            Project.project_page < 5 * (current_set - 1) + 4
                              ? "none"
                              : "block",
                        }}
                        onClick={this.movePage}
                      >
                        {" "}
                        {5 * (current_set - 1) + 4}{" "}
                      </PageCount>
                      <PageCount
                        value={5 * (current_set - 1) + 4}
                        active={Project.currentPage % 5 == 0}
                        style={{
                          display:
                            Project.project_page < 5 * (current_set - 1) + 5
                              ? "none"
                              : "block",
                        }}
                        onClick={Project.movePage}
                      >
                        {" "}
                        {5 * (current_set - 1) + 5}{" "}
                      </PageCount>
                      <img
                        src={pass2}
                        style={{
                          opacity:
                            Project.project_page == Project.currentPage
                              ? 0.4
                              : 1,
                          cursor: "pointer",
                        }}
                        onClick={Project.pageNext}
                      />
                    </PageBar> */}
                  </>
                ) : (
                  <>
                    <ProjectNone />
                  </>
                )}
              </Main>
            </Body>
          </Container>
        </Background>
      </>
    );
  }
}

const Header = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 116px;
`;

const HeaderTitle = styled.div`
  height: 100%;
  width: 1200px;
  margin-right: auto;
  margin-left: auto;

  display: flex;
  align-items: flex-end;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.4px;
  text-align: left;
  color: #555963;
}
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: NotoSansCJKkr;
`;

const Aside = styled.div`
  width: 234px;
`;

const AsideHeader = styled.div`
  padding-top: 50px;
  padding-bottom: 16px;
  border-bottom: solid 1px #e1e2e4;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #0933b3;
`;

const AsideBody = styled.div`
  padding-top: 16px;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: -0.38px;
  text-align: left;
  color: #1e2222;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      font-weight: 700;
      color: #1e2222;
    `}
`;

const Main = styled.div`
  width: 100%;
  padding-left: 72px;
`;

const MainHeader = styled.div`
padding-top: 45px;
padding-bottom: 16px;
border-bottom: solid 1px #e1e2e4;
font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  text-align: left;
  color: #1e2222;
}
`;

const PageBar = styled.div`
  width: 351px;
  margin-top: 109px;
  margin-bottom: 157px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
`;

const PageCount = styled.span`
  width: 14px;
  height: 30px;
  font-size: 25px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: 0.63px;
  text-align: left;
  color: #999999;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      font-weight: 700;
      color: #0933b3;
    `}
`;

export default MyProject;
