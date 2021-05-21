import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Container from "components/Containerv1";
import Background from "components/Background";
import ChatItemContainer from "components/ChatItem";
import ChatTestContainer from "containers/Info2/ChatTest";
import * as PartnerAPI from "axios/Partner";

import NoProject from "containers/Project/NoProject";

@inject("Project", "Auth", "Answer")
@observer
class ClientChatting extends React.Component{

state = {
  selectedRoom: null,
  answerDetailList: [],
  partnerList:[],
}

async getProject(data){
  const { Project } = this.props;
  await Project.getAllProject(data)
  Project.projectDataList.map((data, idx) =>{
    data.answer_set.map((answer, idx) => {
      PartnerAPI.detail(answer.partner)
        .then((res) => {
          Project.answerDetailList.push({
            // project: res.
            logo: res.data.logo,
            name: res.data.name,
            id: answer.id,
            content: answer.content1,
            project: data.id,
          });
          Project.projectQuickView.push({
            // idx: idx,
            check: null,
          })
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
})})};

modalHandler = (id) => {
  this.setState({ selectedRoom: id });
  const { Project } = this.props;

  Project.chatModalActive = !Project.chatModalActive;
};

async componentDidMount() {
  const { Auth, Project} = this.props;
  console.log("ClientChatting <Web> did mount");
  await Auth.checkLogin();

  Project.chattingIndex = 1;
  if (Auth.logged_in_client) {
    this.getProject(Auth.logged_in_client.id)
  }
  
  // this.setState({ answerDetailList: AnswerDetailList });
  }
  activeHandler = (idx) => {
    const { Project } = this.props;
    if(Project.projectQuickView[idx].check){
      Project.projectQuickView[idx].check = false
    }
    else{
      Project.projectQuickView[idx].check = true
    }
  }

  render(){
    const { Project, Auth } = this.props;

    return(
      <Background>
        <Container style = {{display: "flex", flexDirection: "column"}}>
          {Project.chatModalActive && 
            <Layer onClick={this.modalHandler}>
              <ChatTestContainer
                roomName={this.state.selectedRoom}
              ></ChatTestContainer>
            </Layer>
          }
          {Project.projectDataList && Project.projectDataList[0] 
          ?
          Project.projectDataList.map((item, idx) => 
            {
            return(
              <ProjectContainer>  
              <Font24>
              {item.request_set[0].name}
              <span>{item.answer_set.length}</span>
              </Font24>

              {/* <div active = {Project.projectQuickView[idx].check} onClick = {this.activeHandler(idx)} >
                <div>간략히 보기</div>
                <div>자세히 보기</div>
              </div> */}
              {Project.answerDetailList && Project.answerDetailList.map((data, idx) =>
              {
                return(
                <>

              {data.project ==item.id && (
                <>
                <ChatItemContainer
                  logo={data.logo}
                  name={data.name}
                  id={data.id}
                  content={data.content}
                  modalHandler={this.modalHandler}
                  user = {Auth}
                  />
                  </>
              )}
              </>
              )}
              )}
              </ProjectContainer>  
            )
          })
        :
        <NoProject/>
        }
        </Container>
      </Background>
    );
  }
}

export default ClientChatting;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #00000080;
`;

const ProjectContainer = styled.div`
  margin: 80px 0 20px 0;

`


const Font24 = styled(Content.FontSize24)`
font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.17 !important;
  letter-spacing: -0.6px !important;
  text-align: left;
  color: #282c36;
  span{
    color: #0933b3;
    margin-left: 8px;
  }
  border-bottom: solid 1px #c6c7cc;
  margin-bottom: 14px;
  `
