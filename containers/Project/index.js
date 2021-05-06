import React from "react";
import ClientContentContainer from "./Client/Content";
import ClientMobileContentContainer from "./Client/MobileProject";
import PartnerContentContainer from "./Partner/Content";
import PartnerMobileContentContainer from "./Partner/MobileProject";
import BannerContainer from "./Banner";
import NavContainer from "./Nav.js";
import SearchBar from "./SearchBar";
import ProjectDetailContainer from "./Client/ProjectDetail/ProjectDetail";
import styled from "styled-components";
import RequestComplete from "./RequestComplete";
import PartnerAnswer from "./PartnerAnswer";

import { inject, observer } from "mobx-react";

@inject("Project", "Auth")
@observer
class ProjectContainer extends React.Component {
  async componentDidMount() {}
  render() {
    const { Auth, Project } = this.props;
    return (
      <>
        {Auth.logged_in_client &&
          (this.props.width && this.props.width > 767.99 ? (
            <div style={{ overflow: "visible" }}>
              <BannerContainer />
              {/* <PartnerAnswer /> */}
              {/* <RequestComplete /> */}
              {/* <NavContainer style={{ marginTop: "50px" }} /> */}

              {console.log(Project.newIndex)}

              {Project.newIndex == 0 && <ClientContentContainer />}
              {/* <ClientContentContainer length={this.props.length} /> */}

              {Project.newIndex == 1 && (
                <ProjectDetailContainer user="client" />
              )}
              {/* <ProjectDetailContainer></ProjectDetailContainer> */}
            </div>
          ) : (
            <div>
              <ClientMobileContentContainer width={this.props.width} />
            </div>
          ))}
        {Auth.logged_in_partner &&
          (this.props.width && this.props.width > 767.99 ? (
            <div style={{ overflow: "visible" }}>
              <BannerContainer />

              {Project.newIndex == 0 && (
                <>
                  <SearchBar />
                  <PartnerContentContainer length={this.props.length} />
                </>
              )}
              {Project.newIndex == 1 && (
                <ProjectDetailContainer user="partner" />
              )}
            </div>
          ) : (
            <div>
              <PartnerMobileContentContainer width={this.props.width} />
            </div>
          ))}
      </>
    );
  }
}

export default ProjectContainer;

// const Header = styled.div`
//   margin-top: 90px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `
