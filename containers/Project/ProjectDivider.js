import styled, {css} from "styled-components";
import * as Content from 'components/Content';
import { inject, observer } from "mobx-react";
import Container from "components/Containerv1";
import Background from "components/Background";

@inject("Project")
@observer
class ProjectDivider extends React.Component{
  checkOn = (idx) =>{
    const { Project } = this.props;
    Project.myIndex = idx;
  };

  render(){
    const {Project} = this.props;
    return(
      <Background>
        <Container>
        <ProjectDiv>
          <DividingSelect active = {Project.myIndex === 0} onClick = {() => this.checkOn(0)}>
            <Font22 active = {Project.myIndex === 0}>전체 프로젝트</Font22>
          </DividingSelect>
          <DividingSelect  active = {Project.myIndex === 1} onClick = {() => this.checkOn(1)} >
            <Font22 active = {Project.myIndex === 1}>내 프로젝트</Font22>
          </DividingSelect>
        </ProjectDiv>

        </Container>
      </Background>
      
    );
  }
}

export default ProjectDivider; 

const ProjectDiv = styled.div`
width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #c6c7cc;
`
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