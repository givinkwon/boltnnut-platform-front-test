import React from "react";
import ClientContentContainer from "./Client/Content";
import ClientMobileContentContainer from "./Client/ProjectDetail/Mobile/MobileProject";
import ProjectSearch from "./Partner/Content";
import PartnerMobileContentContainer from "./Partner/Mobile/MobileProject";
import BannerContainer from "./Banner";
import NavContainer from "./Nav.js";

import ProjectDetailContainer from "./Client/ProjectDetail/ProjectDetail";
import MobileProjectDetailContainer from "./Client/ProjectDetail/Mobile/MobileProjectDetail";
import styled, {css} from "styled-components";
import RequestComplete from "./RequestComplete";
import PartnerAnswer from "./Partner/PartnerAnswer";
import MobilePartnerAnswer from "./Partner/Mobile/MobilePartnerAnswer";
import AnswerCompleteContainer from "./Partner/AnswerComplete"; 
import MobileAnswerCompleteContainer from "./Partner/Mobile/MobileAnswerComplete"; 
import AnswerComplete from "./Partner/AnswerComplete";
import * as Content from 'components/Content';
import * as PartnerAPI from "axios/Partner";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import PartnerMyProject from "./Partner/MyProject";
import ClientChatting from "./Client/ClientChatting";

// import ClientMyProject from "./Client/MyProject";
import ProjectDivider from "./ProjectDivider";

@inject("Project", "Auth", "Partner")
@observer
class ProjectContainer extends React.Component {
  async componentDidMount() {
    const { Auth, Project, Partner } = this.props;
    Project.newIndex = 0;
    Project.myIndex = 1;
    await Auth.checkLogin();

  };


  render() {
    const { Auth, Project } = this.props;
    console.log(Project.chattingIndex);
    return (
      <>
        {Auth.logged_in_client &&
          (this.props.width && this.props.width > 1279.98 ? (
            <div style={{ overflow: "visible" }}>
              <BannerContainer />
              {console.log(Project.chattingIndex)}
              {Project.chattingIndex == 1 && <ClientChatting/>}
              {/* {Project.newIndex == 0 && (
                <>
                
                <ProjectDivider/>
                {Project.myIndex == 0 && <ProjectSearch length={this.props.length}/>}
                {Project.myIndex == 1 && <ClientContentContainer length={this.props.length} />}
              </>
              )}
              {Project.newIndex == 1 && (
                <ProjectDetailContainer user="client" />
              )}
               */}


            </div>
          ) : (
            <div>
              {Project.newIndex == 0 && (
                <ClientMobileContentContainer width={this.props.width} />
              )}

              {Project.newIndex == 1 && (
                <MobileProjectDetailContainer user="client" />
              )}
            </div>
          ))}
        {Auth.logged_in_partner &&
          (this.props.width && this.props.width > 1279.98 ? (
            <div style={{ overflow: "visible" }}>
              <BannerContainer />
                
              {Project.newIndex == 0 && (
                <>
                  <ProjectDivider/>
                    {Project.myIndex == 0 && <ProjectSearch length={this.props.length}/>}
                    {Project.myIndex == 1 && <PartnerMyProject/>}   
                </>
              )}
              {Project.newIndex == 1 && (
                <ProjectDetailContainer user="partner" />
              )}
              {Project.newIndex == 2 && <PartnerAnswer />}
              {Project.newIndex == 3 && <AnswerCompleteContainer />}

              
            </div>
          ) : (
            <div>
              {Project.newIndex == 0 && (
                <PartnerMobileContentContainer width={this.props.width} />
              )}
              {Project.newIndex == 1 && (
                <MobileProjectDetailContainer user="partner" />
              )}
              {Project.newIndex == 2 && <MobilePartnerAnswer />}
              {Project.newIndex == 3 && <MobileAnswerCompleteContainer />}

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



// const ProjectDivider = styled.div`
// width: 100%;
//   display: flex;
//   flex-direction: row;
//   border-bottom: 1px solid #c6c7cc;
// `
const DividingSelect = styled.div`
  margin-top: 42px;
  display: flex;
  // height: 85px;
  cursor: pointer;
  width: 144px;
  justify-content: center;

  ${props => props.active && css` 
    border-bottom: 3px solid #0933b3;
  `}
`


const Font22 = styled(Content.FontSize22)`
  
font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.82;
  letter-spacing: -0.55px;
  ${props => props.active
    ? css`
        color: #0933b3 !important;
        font-size: 22px;
        
      `
    : css`
        font-size: 20px;
        color: #999999 !important;
  `}
`