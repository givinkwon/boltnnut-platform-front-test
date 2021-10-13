import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import Slider from "react-slick";
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";
import * as Content from "components/Content";

import Container from "components/Containerv1";
import ProjectCard from "./ProjectCard";
import Background from "components/Background";
import SearchBar from "./SearchBar";
import { toJS } from "mobx";

// Cookie 추가
import Cookies from "js-cookie";
const pass1 = "static/images/pass1.png";
const pass2 = "static/images/pass2.png";
const pass4 = "static/images/pass4.png";

const left = "static/icon/left-arrow.png";
const right = "static/icon/right-arrow.png";

const userImg = "/static/images/search/user.svg";
const Remove = "/static/images/project/remove.png";

@inject("Project", "Auth", "Partner", "Cookie")
@observer
class AllProject extends React.Component {
  handleIntersection = (event) => {
    if (event.isIntersecting) {
      console.log("추가 로딩을 시도합니다");
    }
  };

  async componentDidMount() {
    const { Project, Auth, Cookie } = this.props;

    // 프로젝트 초기화
    await Project.reset();
    Project.newIndex = 0;
    Project.search_text = "";
    Project.currentPage = 1;

    console.log("did mount");

    await Auth.checkLogin();
    Project.getProject("allproject");

    // Cookie 값 가지고 와서 리스트에 먼저 저장
    let project_view_data = [];
    project_view_data = await Cookies.get("project_view");
    // list 전처리
    console.log(project_view_data);
    if (project_view_data) {
      project_view_data = project_view_data
        .replace("[", "")
        .replace("]", "")
        .split(",");
    }

    if (project_view_data !== undefined && project_view_data !== "undefined") {
      project_view_data.map((data) => Cookie.add_project_view(data));
    }
    // Cookie 값 저장 끝

    // Cookie 값에 저장된 프로젝트 불러오기
    Cookie.get_recent_project();

    // subbox 프로젝트 개수 호출
    Project.getProject("subbox");

    Project.loading = true;
  }

  render() {
    const { Project, Partner, Auth, Cookie, width } = this.props;
    const current_set = parseInt((Project.currentPage - 1) / 5) + 1;
    const gray = "#f9f9f9";
    const usertype = "partner";
    console.log(Project.projectDataList)
    return (
      <>
        {Project.loading &&
        <>
        <Background id="MyBackground">
          <Container style={{ flexDirection: "column", marginTop: 80 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: 80,
              }}
            >
              <Font32 style={{ marginBottom: 60 }}>제조문의 찾기</Font32>
              <SearchBar />
            </div>
            <Header>
              <Font20>
                <span style={{ fontWeight: "bold" }}>
                  {Project.project_count}개
                </span>
                의 상담 요청 프로젝트가 있습니다.
              </Font20>
            </Header>
          </Container>
        </Background>

        <Background style={{ backgroundColor: "#f6f6f6" }}>
          <Container style={{ flexDirection: "column", marginTop: 0 }}>
            <Body>
              <Main>
                {Project.projectDataList &&
                  Project.currentPage > 0 &&
                  Project.projectDataList.map((item, idx) => {
                    {
                      console.log(toJS(item.request_set.length));
                    }
                    return (
                      <>
                        {toJS(item.request_set.length > 0) && (
                          <Background style={{ marginBottom: "24px" }}>
                            <div
                              style={{ cursor: "pointer", width: "100%" }}
                              onClick={() => Project.pushToDetail(item.id)}
                            >
                              <ProjectCard
                                data={item}
                                handleIntersection={this.handleIntersection}
                                customer="partner"
                              />
                            </div>
                          </Background>
                        )}
                      </>
                    );
                  })}
              </Main>
              
              {width > 768 && <SubCard>
                <SubCardContainer>
                  <SubCardTitle>
                    <div>
                      {" "}
                      최근 본 프로젝트 &nbsp; &nbsp; &nbsp;{" "}
                      {Project.recent_project_list.length}
                    </div>
                  </SubCardTitle>
                  <SubCardProject>
                    {Project.recent_project_list.map((item, idx) => {
                      return (
                        <div style={{ display: "flex" }}>
                          <span onClick={() => Project.pushToDetail(item.id)}>
                            {item.request_set
                              ? item.request_set[0].name
                              : item.title}
                          </span>
                          <img
                            onClick={() => {
                              console.log(item.id);
                              Cookie.delete_project_view(item.id);
                              // 쿠키 저장하기
                              const expires = new Date();
                              console.log(Cookie.project_view_list);
                              expires.setMinutes(expires.getMinutes() + 2440);
                              Cookies.set(
                                "project_view",
                                Cookie.project_view_list,
                                {
                                  path: "/",
                                  expires,
                                }
                              );
                              // 변경된 쿠키에 따라서 재설정
                              Cookie.get_recent_project();
                            }}
                            src={Remove}
                          />
                        </div>
                      );
                    })}
                  </SubCardProject>
                </SubCardContainer>

                <ShowItem>
                  <UserBox>
                    <img src={userImg} />
                    {Auth.logged_in_user ? (
                      <div>{Auth.logged_in_user.username.split("@")[0]}</div>
                    ) : (
                      <div>로그인 해주세요.</div>
                    )}
                  </UserBox>
                  <SubItem>
                    <span>제조 문의</span>
                    <span>{Project.subbox_project_count}</span>
                  </SubItem>
                  <SubItem>
                    <span>관심 업체 등록</span>
                    <span>{Partner.totalClientBookmark}</span>
                  </SubItem>
                </ShowItem>
              </SubCard>
              }
            </Body>
          </Container>
        </Background>
        <PageBar>
          <img
            src={pass1}
            style={{
              opacity: current_set == 1 && Project.currentPage <= 1 ? 0.4 : 1,
              cursor: "pointer",
            }}
            onClick={() => {
              Project.pagePrev(false);
            }}
          />
          <PageCount
            onClick={(e) => {
              Project.movePage(e, false);
            }}
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
            onClick={(e) => {
              Project.movePage(e, false);
            }}
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
            onClick={(e) => {
              Project.movePage(e, false);
            }}
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
            onClick={(e) => {
              Project.movePage(e, false);
            }}
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
            onClick={(e) => {
              Project.movePage(e, false);
            }}
          >
            {" "}
            {5 * (current_set - 1) + 5}{" "}
          </PageCount>
          <img
            src={pass2}
            style={{
              opacity: Project.project_page == Project.currentPage ? 0.4 : 1,
              cursor: "pointer",
            }}
            onClick={() => {
              Project.pageNext(false);
            }}
          />
        </PageBar>
        </>
      }
      </>
    );
  }
}

// subcard 관련
const SubCard = styled.div`
  display: block;
`;

const SubCardContainer = styled.div`
  width: 180px;
  margin-top: 21px;
  height: 784px;
  margin: 0 0 21px 24px;
  padding: 0 0 524px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
`;

const SubCardTitle = styled.div`
  width: 180px;
  height: 40px;
  object-fit: contain;
  background-color: #e1e2e4;
  border-radius: 10px 10px 0px 0px;
  > div {
    padding: 11px 12px 9px 12px;
  }
`;

const SubCardProject = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 163px;
  height: 40px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.35px;
  text-align: left;
  color: #86888c;
  > div {
    padding: 24px 0px 24px 0px;
    border-bottom: 1px solid #e1e2e4;
    > span {
      margin-right: auto;
      cursor: pointer;
    }
    > img {
      width: 16px;
      height: 16px;
      margin-left: 13px;
      cursor: pointer;
    }
  }
`;

const ShowItem = styled.div`
  margin-left:auto;
  width: 180px;
  height: 123px;
  margin
`;

const UserBox = styled.div`
  border-bottom: 1px solid #e1e2e4;
  // padding-bottom: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  > div {
    font-size: 14px;
    line-height: 77px;
    letter-spacing: -0.35px;
    color: #999999;
    font-weight: normal;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 60px;
    > img {
      width: 30px;
    }
  }
`;

const SubItem = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  > span:last-child {
    color: #0933b3;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > span {
      font-size: 13px;
    }
  }
`;

// 페이지 관련
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
const Body = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #e1e2e4;
  border-bottom: 1px solid #e1e2e4;
  margin-top: 25px;
`;
const Main = styled.div``;
const Filter = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) and (max-width: 1298px) {
    width: 140px;
    border-right: 1px solid #e1e2e4;
    // margin-right: 33px;
    // padding-right: 9px;
    box-sizing: border-box;
    > span {
      font-size: 18px;
      font-weight: 500 !important;
      font-stretch: normal !important;
      font-style: normal !important;
      line-height: 40px !important;
      letter-spacing: -0.5px !important;
      color: #282c36;
    }
  }
  @media (min-width: 1300px) {
    width: 180px;
    border-right: 1px solid #e1e2e4;
    // margin-right: 33px;
    // padding-right: 9px;
    box-sizing: border-box;
    > span {
      font-size: 20px;
      font-weight: 500 !important;
      font-stretch: normal !important;
      font-style: normal !important;
      line-height: 40px !important;
      letter-spacing: -0.5px !important;
      color: #282c36;
    }
  }
`;

const Header = styled.div`
  display: flex;
  margin-right: auto;
  margin-bottom: 17px;
  position: relative;
`;

const Font20 = styled(Title.FontSize20)`
  font-weight: 500 !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 40px !important;
  letter-spacing: -0.5px !important;
  color: #282c36;
`;

const Font14 = styled(Content.FontSize14)`
  font-weight: bold !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 30px !important;
  letter-spacing: -0.14px !important;
  color: #0933b3;
`;

const Font32 = styled(Title.FontSize32)`
  font-weight: 500;
  color: #000000;
`;

export default AllProject;
