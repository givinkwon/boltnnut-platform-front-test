import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import Slider from "react-slick";
import { inject, observer } from "mobx-react";
import SearchBar from "../SearchBar";
import * as Title from "components/Title";
import * as Content from "components/Content";

import Container from "components/Containerv1";
import ProposalCard from "components/ProposalCard";
import Background from "components/Background";
import RadioBox from "../RadioBox";
import { toJS } from "mobx";

const pass1 = "static/images/pass1.png";
const pass2 = "static/images/pass2.png";
const pass4 = "static/images/pass4.png";

const left = "static/icon/left-arrow.png";
const right = "static/icon/right-arrow.png";

@inject("Project", "Auth")
@observer
class ProjectContentContainer extends React.Component {
  handleIntersection = (event) => {
    if (event.isIntersecting) {
      console.log("추가 로딩을 시도합니다");
    }
  };

  pushToDetail = async (id) => {
    const { Project } = this.props;
    console.log(id);

    await Project.getProjectDetail(id);
    Project.newIndex = 1;
    Project.selectedProjectId = id;
    // await Router.push(`/project/${id}`);
    Project.setProjectDetailData(id);
  };

  async componentDidMount() {
    const { Project, Auth } = this.props;
    Project.newIndex = 0;
    Project.search_text = "";
    Project.currentPage = 1;

    console.log("did mount");

    await Auth.checkLogin();
    if (Auth.logged_in_partner) {
      Project.getProjectByPrice();
    }
  }

  movePage = (e) => {
    const { Project, Auth } = this.props;
    e.preventDefault();
    // Project.category_reset()
    const newPage = e.target.innerText * 1;

    Project.currentPage = newPage;
    Project.getProjectByPrice(Project.search_text, newPage);
  };

  pageNext = (e) => {
    const { Project, Auth } = this.props;
    e.preventDefault();
    if (Project.currentPage < Project.project_page) {
      // Project.category_reset()
      const nextPage = Project.currentPage + 1;
      Project.currentPage = nextPage;
      Project.getProjectByPrice(Project.search_text, Project.currentPage);
    }
  };

  pagePrev = (e) => {
    const { Project } = this.props;
    e.preventDefault();
    if (Project.currentPage > 1) {
      // Project.category_reset()
      const newPage = Project.currentPage - 1;
      Project.currentPage = newPage;
      Project.getProjectByPrice(Project.search_text, Project.currentPage);
    }
  };

  render() {
    const { Project } = this.props;
    const current_set = parseInt((Project.currentPage - 1) / 5) + 1;
    const gray = "#f9f9f9";
    const usertype = "partner";

    return (
      <>
        <Background id="MyBackground">
          <Container style = {{flexDirection: "column"}}>
            <SearchBar />
            <>
            <Body>
              <Filter style={{ paddingTop: "32px" }}>
                <Font20>필터</Font20>
                <RadioBox data={request_data} />
              </Filter>

              {/* <Background> */}
              {/* { Project.projectDataList.length > 0 && Project.projectDataList.slice(5*(Project.currentPage), 5*(Project.currentPage +1)).map((item, idx) => {                             */}
              <Main>
                <Header style={{ paddingTop: "32px" }}>
                  <Font20 style={{ marginLeft: "-9px" }}>
                    <span style={{ fontWeight: "bold" }}>
                      {Project.project_count}개
                    </span>
                    의 상담 요청 프로젝트가 있습니다.
                  </Font20>
                  {/* <span>
              <Font14>모든 제조의뢰</Font14>
              <img src={pass4}/>
            </span> */}
                </Header>
                {Project.projectDataList &&
                  Project.currentPage > 0 &&
                  Project.projectDataList.map((item, idx) => {
                    {
                      console.log(toJS(item));
                    }
                    return (
                      <Background style={{ marginBottom: "34px" }}>
                        <div
                          style={{ cursor: "pointer", width: "100%" }}
                          onClick={() => this.pushToDetail(item.id)}
                        >
                          {console.log(toJS(item))}
                          {console.log("아이템")}
                          <ProposalCard
                            data={item}
                            middleCategory={Project.middle_category_name[idx]}
                            mainCategory={Project.main_category_name[idx]}
                            newData={Project.data_dt[idx]}
                            checkTotal={Project.filter_price}
                            handleIntersection={this.handleIntersection}
                            customer="partner"
                          />
                        </div>
                      </Background>
                    );
                  })}
              </Main>
            </Body>
            </>
          </Container>
        </Background>
        <PageBar>
          <img
            src={pass1}
            style={{
              opacity: current_set == 1 && Project.currentPage <= 1 ? 0.4 : 1,
              cursor: "pointer",
            }}
            onClick={this.pagePrev}
          />
          <PageCount
            onClick={this.movePage}
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
            onClick={this.movePage}
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
            onClick={this.movePage}
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
            onClick={this.movePage}
          >
            {" "}
            {5 * (current_set - 1) + 5}{" "}
          </PageCount>
          {/* <PageCount> ... </PageCount> */}
          <img
            src={pass2}
            style={{
              opacity: Project.project_page == Project.currentPage ? 0.4 : 1,
              cursor: "pointer",
            }}
            onClick={this.pageNext}
          />
        </PageBar>
      </>
    );
  }
}

const request_data = [
  {
    id: "1",
    name: "전체",
    checked: "false",
  },
  {
    id: "2",
    name: "상담요청",
    checked: "false",
  },
  {
    id: "3",
    name: "견적문의",
    checked: "false",
  },
  {
    id: "4",
    name: "업체수배",
    checked: "false",
  },
];

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
  margin-top: 40px;
`;
const Main = styled.div`
  width: 984px;
`;
const Filter = styled.div`
  width: 220px;
  border-right: 1px solid #e1e2e4;
  margin-right: 33px;
  padding-right: 9px;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 993px;
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  position: relative;
  > span {
    position: absolute;
    left: 88%;
    display: flex;
    align-items: center;
    > img {
      width: 14px;
      height: 7px;
      margin-left: 10px;
    }
  }
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

export default ProjectContentContainer;
