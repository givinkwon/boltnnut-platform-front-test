import React from "react";
import styled from "styled-components";


import Background from "components/Background";

import { inject, observer } from "mobx-react";
import Chat from "../../../../stores/Manufacture/Chat";


@inject("Auth", "Project", "Chat")
@observer
class ChattingHeader extends React.Component {
  async componentDidMount() {
    const { Auth, Project } = this.props;
    // 로그인되어 있는 지 체크하기
    await Auth.checkLogin();

    // 클라이언트 로그인이 되어 있으면 프로젝트 호출하여 데이터 담은 후 answer 데이터 담기
    if (Auth.logged_in_client) {
        // 프로젝트 데이터 호출
        await Project.getProject("myproject", Auth.logged_in_client.id);
    }

    // 파트너 로그인이 되어 있으면 프로젝트 호출하여 데이터 담은 후 request 데이터 담기
    if (Auth.logged_in_partner) {
      // 프로젝트 데이터 호출
        await Project.getProject("myproject", "", Auth.logged_in_partner.id);
    }
  }

  // 채팅 카드를 클릭했을 때 => 카드 활성화 및 채팅 로그 가져오기
  clickchatcard  = (data) => {
    const {Auth, Project, Chat} = this.props;
    // active를 위한 active 값 수정
    Chat.chatcard_index = data.id;

    // 채팅 로그 가져오기
    Chat.getChat(data)
    
  }

  render() {
    const { Auth, Project, Chat } = this.props;
    return (
      <Background
      
        backgroundColor={"#ffffff"}
        style={{height: 1016, width: 360, marginLeft: "auto", border: "solid 1px #e1e2e4"}}
      >
        <HeaderTitle>
                <span>프로젝트 목록</span>
        </HeaderTitle>

        {/* 클라이언트인 경우 => 제안서 정보 가져오기 */}
        {Auth.logged_in_client &&
          Project.projectDataList.map((data, idx) => {
             
            {/* 카드 클릭 시 채팅 로그 불러오면서 active => 채팅 로그에는 answer만 저장되어 있어서 answer 데이터를 이용해야함*/}
            return (
                // answer_set에 있는 정보 가져오기      

                <HeaderContent onClick = {() => this.clickchatcard(data.answer_set[0])} active={Chat.chatcard_index == data.answer_set[0].id}>
                  <span>{data.answer_set[0] && data.answer_set[0].content1.length > 15 ? (data.answer_set[0].content1.substring(0,15)+ "...") :  (data.answer_set[0].content1)}</span>
                </HeaderContent>
                
              
            )
          })
          
        }

        {/* 파트너인 경우 => 의뢰서 정보 가져오기 */}
        {Auth.logged_in_partner &&
          Project.projectDataList.map((data) => {
            {/* 카드 클릭 시 채팅 로그 불러오면서 active => 채팅 로그에는 answer만 저장되어 있어서 answer 데이터를 이용해야함*/}

            return (
                // request_set에 있는 정보 가져오기      

                <HeaderContent onClick = {() => this.clickchatcard(data.answer_set[0])} active={Chat.chatcard_index == data.answer_set[0].id}>
                  <span>{data.request_set[0] && data.request_set[0].name.length > 15 ? (data.request_set[0].name.substring(0,15)+ "...") :  (data.request_set[0].name)}</span>
                </HeaderContent>
                
              
            )
          })
          
        }

      
      </Background>
    );
  }
}

export default ChattingHeader;

const HeaderTitle = styled.div`
  width : 100%;
  height: 63px;
  border-bottom: solid 1px #e1e2e4;
  > span {
    font-size: 19px;
    width: 106px;
    height: 28px;
    margin: 18px 154px 17px 16px;
    object-fit: contain;
    font-family: NotoSansCJKkr;
    font-size: 19px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.74;
    letter-spacing: -0.48px;
    text-align: left;
    color: #282c36;
  }
`;

const HeaderContent = styled.div`
width : 100%;
height: 63px;
border-bottom: solid 1px #e1e2e4;
background-color: ${(props) => (props.active ? "#eeeeee" : "#ffffff")};
cursor : pointer;
> span {
  font-size: 15px !important;
  width: 106px;
  height: 28px;
  margin: 18px 0px 17px 16px;
  object-fit: contain;
  font-family: NotoSansCJKkr-Bold;
  font-size: 19px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.74;
  letter-spacing: -0.48px;
  text-align: left;
  color: #282c36;
}
`;
