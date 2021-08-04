import React from "react";
import ClientContentContainer from "./Client/Content";
import ClientMobileContentContainer from "./Client/ProjectDetail/Mobile/MobileProject";
import ProjectSearch from "./Partner/Content";
import MobileProjectSearch from "./Partner/Mobile/MobileProject";
import MobileMyProject from "./Partner/Mobile/MobileMyProject";

import ProjectDetailContainer from "./Client/ProjectDetail/ProjectDetail";
import MobileProjectDetailContainer from "./Client/ProjectDetail/Mobile/MobileProjectDetail";
import styled, { css } from "styled-components";
import PartnerAnswer from "./Partner/PartnerAnswer";
import MobilePartnerAnswer from "./Partner/Mobile/MobilePartnerAnswer";
import AnswerCompleteContainer from "./Partner/AnswerComplete";
import MobileAnswerCompleteContainer from "./Partner/Mobile/MobileAnswerComplete";
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import PartnerMyProject from "./Partner/MyProject";
import ProjectDivider from "./Common/ProjectDivider";

// cookie 추가
import Cookies from "js-cookie";
import MyProject from "./Partner/Mobile/MobileMyProject";

@inject("Project", "Auth", "Partner", "Cookie")
@observer
class ProjectContainer extends React.Component {
  async getProject(data) {
    const { Project } = this.props;
    await Project.getAllProject(data);
  }
  
  async componentDidMount() {
    const { Auth, Project, Cookie } = this.props;

    // 로그인 체크하기
    await Auth.checkLogin();
    if (Auth.logged_in_client) {
      Project.getPage(Auth.logged_in_client.id);
    }
    // 로그인 체크 끝

    // 처음 페이지로 index init
    Project.set_step_index(0)


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

  }

  render() {
    const { Auth, Project } = this.props;

    return (
      <>
        {/* 웹 */}
        {this.props.width && this.props.width > 767.98 ? (
          <>

            <div style={{ overflow: "visible" }}>

                
              {/* 내 프로젝트 */}
              {Project.step_index == 0 && <MyProject/>}
              {/* 전체 프로젝트 */}
              {Project.step_index == 1 && <AllProject />}
              {/* 프로젝트 상세 */}

              {/* 클라이언트로 로그인 */}
              {Project.step_index == 2 && Auth.logged_in_client && <ProjectDetail user="client" /> }
              
              {/* 파트너로 로그인 */}
              {Project.step_index == 2 && Auth.logged_in_partner && <ProjectDetail user="partner" />}

            </div>

          </>

        ) : (

          <>

            {/* 모바일 */}
            <div>

              {/* 내 프로젝트 */}
              {Project.step_index == 0 && <MobileMyProject width={this.props.width} />}
              {/* 전체 프로젝트 */}
              {Project.step_index == 1 &&  <MobileAllProject width={this.props.width} />}
              {/* 프로젝트 상세 */}

              {/* 클라이언트로 로그인 */}
              {Project.step_index == 2 && Auth.logged_in_client && <MobileProjectDetail user="client" />}
                    
              {/* 파트너로 로그인 */}
              {Project.step_index == 2 && Auth.logged_in_partner && <MobileProjectDetail user="partner" />}

            </div>
          </>
        )
        }
      </>
    )
  }
}

export default ProjectContainer;

const DividingSelect = styled.div`
  margin-top: 42px;
  display: flex;
  // height: 85px;
  cursor: pointer;
  width: 144px;
  justify-content: center;
  ${(props) =>
    props.active &&
    css`
      border-bottom: 3px solid #0933b3;
    `}
`;

const Font22 = styled(Content.FontSize22)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.82;
  letter-spacing: -0.55px;
  ${(props) =>
    props.active
      ? css`
          color: #0933b3 !important;
          font-size: 22px;
        `
      : css`
          font-size: 20px;
          color: #999999 !important;
        `}
`;
