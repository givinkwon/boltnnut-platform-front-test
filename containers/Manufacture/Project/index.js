import React from "react";
import ClientContentContainer from "./Client/Content";
import ClientMobileContentContainer from "./Client/ProjectDetail/Mobile/MobileProject";
import ProjectSearch from "./Partner/Content";
import MobileProjectSearch from "./Partner/Mobile/MobileProject";
<<<<<<< HEAD:containers/Manufacture/Project/index.js
import MobileMyProject from "./Partner/Mobile/MobileMyProject"
import BannerContainer from "./Common/Banner";
=======
import MobileMyProject from "./Partner/Mobile/MobileMyProject";
import BannerContainer from "./Banner";
>>>>>>> aa3fe0357b5d3bb3c30f57dc1c2af8dbea5742d9:containers/Project/index.js

import ProjectDetailContainer from "./Client/ProjectDetail/ProjectDetail";
import MobileProjectDetailContainer from "./Client/ProjectDetail/Mobile/MobileProjectDetail";
import styled, { css } from "styled-components";
import RequestComplete from "./Common/RequestComplete";
import PartnerAnswer from "./Partner/PartnerAnswer";
import MobilePartnerAnswer from "./Partner/Mobile/MobilePartnerAnswer";
import AnswerCompleteContainer from "./Partner/AnswerComplete";
import MobileAnswerCompleteContainer from "./Partner/Mobile/MobileAnswerComplete";
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import PartnerMyProject from "./Partner/MyProject";
import ProjectDivider from "./Common/ProjectDivider";
import NoProject from "./Common/NoProject";
import SearchBarConatiner from "./Common/SearchBar";

@inject("Project", "Auth", "Partner")
@observer
class ProjectContainer extends React.Component {
  async getProject(data) {
    const { Project } = this.props;
    await Project.getAllProject(data);
  }
  async componentDidMount() {
    const { Auth, Project } = this.props;

    await Auth.checkLogin();
    if (Auth.logged_in_client) {
      Project.getPage(Auth.logged_in_client.id);
    }

    Project.newIndex = 0;
    Project.myIndex = 1;
  }

  render() {
    const { Auth, Project } = this.props;

    return (
      <>
        {this.props.width && this.props.width > 767.98 ? (
          <>
            <div style={{ overflow: "visible" }}>
              <BannerContainer />
              {Auth.logged_in_client && (
                <>
                  {Project.newIndex == 0 && (
                    <>
                      <ProjectDivider />
                      {Project.myIndex == 0 && (
                        <ProjectSearch length={this.props.length} />
                      )}
                      {Project.myIndex == 1 && (
                        <ClientContentContainer length={this.props.length} />
                      )}
                    </>
                  )}
                  {Project.newIndex == 1 && (
                    <ProjectDetailContainer user="client" />
                  )}
                </>
              )}

              {Auth.logged_in_partner && (
                <>
                  {Project.newIndex == 0 && (
                    <>
                      <ProjectDivider />
                      {Project.myIndex == 0 && (
                        <ProjectSearch length={this.props.length} />
                      )}
                      {Project.myIndex == 1 && <PartnerMyProject />}
                    </>
                  )}
                  {Project.newIndex == 1 && (
                    <ProjectDetailContainer user="partner" />
                  )}
                  {Project.newIndex == 2 && <PartnerAnswer />}
                  {Project.newIndex == 3 && <AnswerCompleteContainer />}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {Auth.logged_in_client && (
              <div>
                {Project.newIndex == 0 && (
                  <>
                    <ProjectDivider />
                    {Project.myIndex == 0 && (
                      <MobileProjectSearch width={this.props.width} />
                    )}
                    {Project.myIndex == 1 && (
                      <ClientMobileContentContainer width={this.props.width} />
                    )}
                  </>
                )}

                {Project.newIndex == 1 && (
                  <MobileProjectDetailContainer user="client" />
                )}
              </div>
            )}
            {Auth.logged_in_partner && (
              <div>
                {Project.newIndex == 0 && (
                  <>
                    <ProjectDivider />
                    {Project.myIndex == 0 && (
                      <MobileProjectSearch width={this.props.width} />
                    )}
                    {Project.myIndex == 1 && <MobileMyProject />}
                  </>
                )}
                {Project.newIndex == 1 && (
                  <MobileProjectDetailContainer user="partner" />
                )}
                {Project.newIndex == 2 && <MobilePartnerAnswer />}
                {Project.newIndex == 3 && <MobileAnswerCompleteContainer />}
              </div>
            )}
          </>
        )}
      </>
    );
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
