import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import Slider from "react-slick";
import { inject, observer } from "mobx-react";
import Container from "components/Containerv1";
import ProposalCard from "components/ProposalCard";
import Background from "components/Background";
import Project from "stores/Project";
import { toJS } from "mobx";
import SearchBarConatiner from "../../SearchBar";
import * as Content from "components/Content";
const pass1 = "static/images/pass1.png";
const pass2 = "static/images/pass2.png";

@inject("Project", "Auth")
@observer
class MobileProjectContentContainer extends React.Component {
  state = {
    current: 0,
    next: true,
    prev: true,
    count: 0,
  };

  handleIntersection = (event) => {
    if (event.isIntersecting) {
      console.log("추가 로딩을 시도합니다");
    }
  };

  async componentDidMount() {
    const { Project, Auth } = this.props;
    Project.newIndex = 0;
    Project.search_text = "";
    Project.currentPage = 1;

    console.log("did mount");

    await Auth.checkLogin();
    Project.getProjectByPrice();
  }

  render() {
    const { Project } = this.props;
    const current_set = parseInt((Project.currentPage - 1) / 5) + 1;
    console.log(toJS(Project.projectDataList));

    return (
      <>
        <div>
          <SearchBarConatiner />
          <Background>
            <Container style={{ display: "flex", flexDirection: "column" }}>
              <Font15
                style={{ marginLeft: 14, marginTop: 27, marginBottom: 20 }}
              >
                {Project.project_count}개의 프로젝트
              </Font15>

              {Project.projectDataList &&
                Project.currentPage > 0 &&
                Project.projectDataList.map((item, idx) => {
                  return (
                    <div
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        marginBottom: 14,
                      }}
                      onClick={() => Project.pushToDetail(item.id)}
                    >
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
                  );
                })}

              <PageBar>
                <img
                  src={pass1}
                  style={{
                    opacity:
                      current_set == 1 && Project.currentPage <= 1 ? 0.4 : 1,
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
                    opacity:
                      Project.project_page == Project.currentPage ? 0.4 : 1,
                  }}
                  onClick={() => {
                    Project.pageNext(false);
                  }}
                />
              </PageBar>
            </Container>
          </Background>
        </div>
      </>
    );
  }
}

const PageBar = styled.div`
  width: 280px;
  margin-top: 109px;
  margin-bottom: 157px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  justify-content: space-around;
`;

const PageCount = styled.span`
  width: 14px;
  height: 30px;
  font-size: 18px;
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

const Header = styled.div`
  position: relative;
  width: auto;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Font15 = styled(Content.FontSize15)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.27 !important;
  letter-spacing: -0.38px !important;
  color: #282c36;
`;

const Font16 = styled(Content.FontSize16)`
  width: 90px;
  height: 24px;
  color: #0a2165;
  line-height: 18;
  letter-spacing: -0.4px;
  font-weight: bold;
`;

export default MobileProjectContentContainer;
