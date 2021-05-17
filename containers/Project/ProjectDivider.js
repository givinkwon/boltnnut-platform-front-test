import styled, {css} from "styled-components";
import * as Content from 'components/Content';
import { inject, observer } from "mobx-react";
import Container from "components/Containerv1";
import Background from "components/Background";

@inject("Auth", "Project")
@observer
class ProjectDivider extends React.Component{
  state = {
    width: null,

  }

  componentDidMount() {
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  checkOn = (idx) =>{
    const { Project } = this.props;
    Project.myIndex = idx;
  };

  render(){
    const { Project } = this.props;
    return(
      <Background>
        <Container>

        <ProjectDiv>
          <DividingSelect active = {Project.myIndex === 0} onClick = {() => this.checkOn(0)}>
            <span active = {Project.myIndex === 0}>전체 프로젝트</span>
          </DividingSelect>
          <DividingSelect  active = {Project.myIndex === 1} onClick = {() => this.checkOn(1)} >
            <span active = {Project.myIndex === 1}>내 프로젝트</span>
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
display: flex;
justify-content: center;
@media (min-width: 0px) and (max-width: 767.89px){
  margin-top: 16px;
}
@media (min-width: 768px) {
  margin-top: 42px;
}

// height: 85px;
cursor: pointer;
width: 144px;
span{
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.82;
  letter-spacing: -0.55px;
}
${props => props.active ? css` 
    border-bottom: 3px solid #0933b3;
    span{
      color: #0933b3 !important;
        font-size: 22px;
    }
  `:
  css`
    span{
      font-size: 20px;
      color: #999999 !important;
    }

  `
}
@media(min-width: 0px) and (max-width: 767.98px){
  span{
    font-size: 18px;
  }
}
@media(min-width: 768px){
  span{
    font-size: 22px;
  }
}

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
        
      `
    : css`
        color: #999999 !important;
  `}
`