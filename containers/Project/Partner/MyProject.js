import React from "react";
import styled, {css} from "styled-components";
import * as Content from 'components/Content';
import * as Title from 'components/Title';
import * as PartnerAPI from "axios/Partner";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Partner from "../../../stores/Partner";
import Container from "components/Containerv1";
import Background from "components/Background";
import ChatTestContainer from "containers/Info2/ChatTest";
import Router from "next/router";
import * as ProjectAPI from "axios/Project";
import Answer from "../../../stores/Answer";
import Project from "../../../stores/Project";
const toolBarImg = "/static/images/project/ToolBar.svg";
const callImg = "/static/images/project/Call.svg";
const messagesImg = "/static/images/project/Messages.svg";

@inject("Project", "Auth", "Partner")
@observer
class MyProject extends React.Component {
  state = {
    Answerlist: [],
    selectedRoom: null,
    Partnerprojectlist:[]

  };
  modalHandler = (id) => {
    this.setState({ selectedRoom: id });
    const { Project } = this.props;
  
    Project.chatModalActive = !Project.chatModalActive;
    // this.setState({ modalActive: !this.state.modalActive });
  };

  pushToDetail = async (id) => {
    const { Project } = this.props;

    await Project.getProjectDetail(id);
    Project.newIndex = 1;
    Project.selectedProjectId = id;
    // await Router.push(`/project/${id}`);
    Project.setProjectDetailData(id);
  };

  async getProject(data) {
    const {Project} = this.props;
    // const {Partnerprojectlist} = this.state;
    const partnerprojectlist = this.state.Partnerprojectlist;

    await Project.getProjectDetail(data.project);

    if(Project.projectDetailData){
      partnerprojectlist.push({
        name: Project.projectDetailData.request_set[0].name,
      })
      this.setState({Partnerprojectlist:partnerprojectlist})
    }
  };


  async componentDidMount() {
    const { Auth, Project, Partner } = this.props;
    await Auth.checkLogin();
    if (Auth.logged_in_partner) {

      Partner.answer_set = Auth.logged_in_partner.answer_set

      this.setState({Answerlist:Auth.logged_in_partner.answer_set})
      // Partner.answer_set.project

      this.state.Answerlist.map((data) => {
        this.getProject(data)
      })
    }
  };




  render(){
    const {Project, Partner, Auth} = this.props;
    return(
      <Background>
        <Container style = {{flexDirection: "column"}}>
          {Project.chatModalActive && (
              // <Layer onClick={this.modalHandler}>
              <Layer>
                {/* <Postcode /> */}
                <ChatTestContainer
                  roomName={this.state.selectedRoom}
                ></ChatTestContainer>
              </Layer>
            )}
      
      <>
       {Partner.answer_set &&Partner.answer_set.map((data, idx) => {
        return (
          <BoxContainer>
          <Font22>
            {this.state.Partnerprojectlist[idx] && this.state.Partnerprojectlist[idx].name}
          </Font22>
          <PartnerBox >
            <BoxLeft>
            <PartnerInfo>
              <img
                // src={
                //   this.state.partnerDetailList[idx] &&
                //   this.state.partnerDetailList[idx].logo
                // }
                src={
                  "https://boltnnutplatform.s3.amazonaws.com/media/partner/1.png"
                }
                width={65}
                height={51}
              ></img>
              <Font20 style={{ marginLeft: 10 }}>
                {Auth.logged_in_partner.name}
              </Font20>
            </PartnerInfo>
            
            <Font18 style = {{marginLeft: 80}}>
              " 프로젝트 보고 연락드립니다 . 비공개 자료 공개해주실수
              있나요 "
            </Font18>
          </BoxLeft>
              
            
            <IconBox>
              {/* <Icon>
                <img src={toolBarImg}></img>
              </Icon>
              <Icon>
                <img src={cal lImg}></img>
              </Icon> */}
              <GoToProject onClick={() => Router.push("/project")}
              >

                <Font16 onClick={() => this.pushToDetail(data.id)}>프로젝트 보기</Font16>

              </GoToProject>
              <Icon onClick={() => this.modalHandler(data.id)}>
                <img src={messagesImg} style = {{marginLeft: 30}}></img>
              </Icon>
                <ChatNotice>
                  <Font14>N</Font14>
                </ChatNotice>
              
            </IconBox>
            
            

          </PartnerBox>
          </BoxContainer>
        );
      })}
      </>
      </Container></Background>
      
  );
}
}

export default MyProject;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #00000080;
`;

const BoxContainer = styled.div`
margin-top: 52px;
margin-bottom: 98px;
`


const PartnerInfo = styled.div`
  display: flex;
`;

const PartnerBox = styled.div`
  margin-bottom: 12px;
  // width: 100%;
  height: 56px;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: var(--white);
  display: flex;
  // justify-content: space-around;
  justify-content: space-between;
  // align-items: center;
  padding: 0 28px 0 28px;
`;

const BoxLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

`
const IconBox = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 21px;
`;
const Icon = styled.div`
  position: relative;
  cursor: pointer;
`;
const ChatNotice = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  // bottom: 15px;
  bottom: 8px;
  left: 12px;
  border-radius: 50%;
  // padding: 3px 7px 2px;
  display: ${(props) => (props.active ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  object-fit: contain;
  background-color: #ff3400;
`;


const GoToProject = styled.div`
  cursor: pointer;

`

const Font14 = styled(Content.FontSize14)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.86;
  letter-spacing: -0.35px;
  text-align: left;
  color: #ffffff;
`;
const Font16 = styled(Content.FontSize16)`
  font-weight: normal;
  letter-spacing: -0.4px !important;
  color: #282c36;
  line-height: 1.5;
  border-bottom: 1px solid;
  white-space:nowrap;
`;

const Font18 = styled(Content.FontSize18)`
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 2.22;
letter-spacing: -0.45px;
color: #86888c;
`;

const Font20 = styled(Title.FontSize20)`
font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.5px;
  color: #282c36;

`
const Font22 = styled(Content.FontSize22)`
font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.36;
  letter-spacing: -0.55px;
  color: #282c36;
`