import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import Slider from "react-slick";
import { inject, observer } from "mobx-react";

import Container from "components/Containerv1";
import ProposalCard from "components/ProposalCard";
import Background from "components/Background";
import NoProject from "../Common/NoProject";
import { toJS } from "mobx";
import ProjectNoneContainer from "./ProjectNone";

const pass1 = "static/images/pass1.png";
const pass2 = "static/images/pass2.png";

const left = "static/icon/left-arrow.png";
const right = "static/icon/right-arrow.png";

@inject("Project", "Auth")
@observer
class ProjectContentContainer extends React.Component {
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
  };

  handleIntersection = (event) => {
    if (event.isIntersecting) {

    }
  };

  async componentDidMount() {
    const { Project, Auth } = this.props;
    console.log("<Web> did mount");
    console.log(Project.newIndex);
    Project.newIndex = 0;
    this.props.Project.currentPage = 1;

    await Auth.checkLogin();
    if (Auth.logged_in_client) {
      Project.getPage(Auth.logged_in_client.id);
      Project.loggedInClientId = Auth.logged_in_client.id;
    }
    console.log(Auth.logged_in_client);
  }

  render() {
    const { Project, Auth } = this.props;
    const current_set = parseInt((Project.currentPage - 1) / 5) + 1;
    const gray = "#f9f9f9";

    return (
      <>
        <Background
          style={{ backgroundColor: "#f9f9f9", paddingTop: "49px" }}
          id="MyBackground"
        >
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
                    <Background
                      style={{ marginTop: 34, backgroundColor: "#f9f9f9" }}
                    >
                      <Container>
                        <div
                          style={{ cursor: "pointer", width: "100%" }}
                          onClick={() => Project.pushToDetail(item.id)}
                        >
                          <ProposalCard
                            data={item}
                            middleCategory={Project.middle_category_name[idx]}
                            mainCategory={Project.main_category_name[idx]}
                            newData={Project.data_dt[idx]}
                            handleIntersection={this.handleIntersection}
                          />
                        </div>
                      </Container>
                    </Background>
                    }
                    </>
                  );
                })}
              <PageBar>
                <img
                  src={pass1}
                  style={{
                    opacity:
                      current_set == 1 && Project.currentPage <= 1 ? 0.4 : 1,
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
                      Project.project_page == Project.currentPage ? 0.4 : 1,
                    cursor: "pointer",
                  }}
                  onClick={Project.pageNext}
                />
              </PageBar>
            </>
          ) : (
            <NoProject />
          )}
        </Background>
      </>
    );
  }
}

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

export default ProjectContentContainer;
