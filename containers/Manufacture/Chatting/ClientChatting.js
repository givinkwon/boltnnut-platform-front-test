import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Container from "components/Containerv1";
import Background from "components/Background";
import ChatItemContainer from "components/ChatItem";
import ChatTestContainer from "containers/Manufacture/Chatting/Info2/ChatTest";
import * as PartnerAPI from "axios/Manufacture/Partner";

@inject("Project", "Auth", "Answer")
@observer
class ClientChatting extends React.Component {
  state = {
    selectedRoom: null,
    answerDetailList: [],
    partnerList: [],
  };

  async componentDidMount() {
    const { Auth, Project } = this.props;
    // 로그인되어 있는 지 체크하기
    await Auth.checkLogin();

    // 채팅 내역 보는 창 index = 1
    Project.chattingIndex = 1;

    // 클라이언트 로그인이 되어 있으면 프로젝트 호출하여 데이터 담은 후 answer 데이터 담기
    if (Auth.logged_in_client) {
      // 프로젝트 데이터 호출
      await Project.getProject("myproject", Auth.logged_in_client.id);
      
      // 담은 데이터 map
      Project.projectDataList.map((data, idx) => {
        // answer_set에 있는 파트너 id 가지고 오기
        data.answer_set.map((answer, idx) => {
          // 파트너 id로 파트너 정보 호출
          PartnerAPI.detail(answer.partner)
            .then((res) => {
              // 데이터에 내용 담기 >> 채팅에 표시될 answer 리스트
              Project.answerDetailList.push({
                logo: res.data.logo,
                name: res.data.name,
                id: answer.id,
                content: answer.content1,
                project: data.id,
              });

              Project.projectQuickView.push({
                check: null,
              });
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        });
      })
    }

    // 파트너 로그인이 되어 있으면 프로젝트 호출하여 데이터 담은 후 answer 데이터 담기
    if (Auth.logged_in_partner) {
      // 프로젝트 데이터 호출
      await Project.getProject("myproject", "", Auth.logged_in_partner.id);
      
      // 담은 데이터 map
      Project.projectDataList.map((data, idx) => {
        // answer_set에 있는 파트너 id 가지고 오기
        data.answer_set.map((answer, idx) => {
          // 파트너 id로 파트너 정보 호출
          PartnerAPI.detail(answer.partner)
            .then((res) => {
              console.log(res)
              // 데이터에 내용 담기 >> 채팅에 표시될 answer 리스트
              Project.answerDetailList.push({
                logo: res.data.logo,
                name: res.data.name,
                id: answer.id,
                content: answer.content1,
                project: data.id,
              });
              Project.projectQuickView.push({
                check: null,
              });
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        });
      })
    }
  }



  // 채팅방 클릭 시에 채팅방 active 값을 활성 비활성 결정
  modalHandler = (id) => {
    this.setState({ selectedRoom: id });
    const { Project } = this.props;

    Project.chatModalActive = !Project.chatModalActive;
  };

  render() {
    const { Project, Auth } = this.props;
    
    return (
      <Background>
        <Container style={{ display: "flex", flexDirection: "column" }}>
          {Project.chatModalActive && (
            <Layer onClick={() => this.modalHandler()}>
              <ChatTestContainer
                roomName={this.state.selectedRoom}
              ></ChatTestContainer>
            </Layer>
          )}

                <ProjectContainer>
                  {Project.answerDetailList &&
                    Project.answerDetailList.map((data, idx) => {
                      return (
                        <>
                          {data.project == item.id && (
                            <>
                              <ChatItemContainer
                                logo={data.logo}
                                name={data.name}
                                id={data.id}
                                content={data.content}
                                modalHandler={this.modalHandler}
                                user={Auth}
                              />
                            </>
                          )}
                        </>
                      );
                    })}
                </ProjectContainer>


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
`;

const Font24 = styled(Content.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.17 !important;
  letter-spacing: -0.6px !important;
  text-align: left;
  color: #282c36;
  span {
    color: #0933b3;
    margin-left: 8px;
  }
  border-bottom: solid 1px #c6c7cc;
  margin-bottom: 14px;
`;
