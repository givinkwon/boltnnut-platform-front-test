import React from "react";
import styled from "styled-components";


import Background from "components/Background";

import { inject, observer } from "mobx-react";
import Chat from "../../../../stores/Manufacture/Chat";

const LogoNo = "/static/images/chat/logono.png"

@inject("Auth", "Project", "Chat", "Partner")
@observer
class ChattingHeader extends React.Component {
  async componentDidMount() {
    const { Auth, Project, Partner } = this.props;
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
  clickchatcard  = (answer_data, request_data="") => {
    const {Auth, Project, Chat, Partner} = this.props;
    
    // answer는 여러 개여서 파트너의 경우 본인의 answer를 id 찾아야함
    // 파트너인 경우
    if(Auth.logged_in_partner){

      for (let i = 0; i < answer_data.length; i++) {
        console.log(answer_data[i].partner, Auth.logged_in_partner.id)
        if(answer_data[i].partner == Auth.logged_in_partner.id){
          Chat.answerId = answer_data[i].id

        }
      }
      // active를 위한 active 값 수정
      Chat.chatcard_index = request_data[0].id;

      // 채팅창 타이틀 설정
      Chat.chat_title = request_data.name;
      // 채팅 로그 가져오기
      Chat.getChat()

    }
    
    // 클라이언트인 경우
    if(Auth.logged_in_client){

      // active를 위한 active 값 수정
      Chat.chatcard_index = answer_data.id;
      Chat.answerId = answer_data.id;

      // 채팅창 타이틀 설정
      Chat.chat_title = answer_data.name;
      // 채팅 로그 가져오기
      Chat.getChat()
    }

    // 채팅 소켓 링크 설정
    Chat.chatSocket = new WebSocket(
      `wss://api.boltnnut.com/ws/chat/` + `${Chat.answerId}` + "/"
    );
    
    // 시간 설정하기
    let temp = new Date();
    temp.setMinutes(temp.getMinutes() + temp.getTimezoneOffset() * -1);
    Chat.current_time = temp;

    // 소켓 OPEN 
    this.chatSocket.onopen = async () => {

    // 클라이언트 정보 가져오기
    await Partner.getClientInfo(
        Project.projectDetailData.request_set[0].client
    );

    // 0.5초 이후(비동기 방지) 접속완료 메세지 보내기
    setTimeout(() => {
        console.log(1)
        this.chatSocket.send(
        JSON.stringify({
            message: "접속완료",
            type: Auth.logged_in_user.type,
            time: Chat.current_time,
            bReceive: true,
            file: this.state.currentFile,
            chatType: 0,
        })
        );
    }, 500);
    };
    // 소켓 OPEN 끝

    // // 소켓 onmessage
    // this.chatSocket.onmessage = (e) => {
    // // redis에서 온 data
    // const data = JSON.parse(e.data);
    // const messages = this.props.Project.chatMessages;

    // console.log(toJS(messages));
    // // 읽음 표시가 안되있다면
    // if (!data.bReceive) {
    //     // 해당 메세지가 본인의 type이 아니라면
    //     if (data.type != this.userType) {
    //     // 수신 완료 메세지를 보내서 체크하기
    //     this.chatSocket.send(
    //         JSON.stringify({
    //         message: "수신완료",
    //         type: this.userType,
    //         time: this.props.Chat.current_time,
    //         bReceive: true,
    //         file: this.state.currentFile,
    //         chatType: 0,
    //         })
    //     );
    //     }
        
    //     // 최근 메세지가 현재 메시지가 아니라면
    //     if (
    //     !(
    //         data.time === messages[messages.length - 1].time &&
    //         data.type === messages[messages.length - 1].member
    //     )
    //     ) 
    //     // 메세지 저장하기
    //     {
    //     messages.push({
    //         member: data["type"],
    //         text: data["message"],
    //         time: data["time"],
    //         bRead: false,
    //     });
    //     } else {
    //     console.log(data);
    //     console.log(messages[messages.length - 1]);
    //     console.log("중복 발생!");
    //     }
    // }

    // // 읽음 표시 처리하기
    // {
    //     this.checkRead(this.props.Project.chatMessages, data);
    // }


    // let tempAnswerNum = roomNum;
    // let chatCount = 0;

    // // 데이터 메세지가 "접속완료" "수신완료"가 아닌 실제 메세지인 경우
    // if (data.message != "접속완료" && data.message != "수신완료") {
    //     // 내가 보낸 메세지면
    //     if (data.type === this.userType) {
    //     // 현재 메세지 저장하기
    //     const req = {
    //         text_content: data.message,
    //         user_type: data.type,
    //         chat_type: 0,
    //         answer: tempAnswerNum,
    //     };
    //     ChatAPI.saveChat(req).then((res) => {
    //         console.log(res);
    //     });
    //     }
    // }
    // // 소켓 onclose 시작
    // this.chatSocket.onclose = (e) => {
    // };
    // // 소켓 onclose 끝
    // }
    
  }

  render() {
    const { Auth, Project, Chat } = this.props;
    console.log(Project.projectDataList)
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
                data.map((answer_data, idx) => {
                  return (
                  <HeaderContentAll onClick = {() => this.clickchatcard(answer_data)} active={Chat.chatcard_index == answer_data.id}>
                    <HeaderLogo>
                      {answer_data[0].logo ? <img src = {answer_data[0].logo}></img> : <img src = {LogoNo}></img> }
                    </HeaderLogo>
                    <HeaderContent>
                      <span>{answer_data && answer_data.content1.length > 15 ? (answer_data.content1.substring(0,15)+ "...") :  (answer_data[0].content1)}</span>
                    </HeaderContent>
                  </HeaderContentAll>
                  )
                })
              
            )
          })
          
        }

        {/* 파트너인 경우 => 의뢰서 정보 가져오기 */}
        {Auth.logged_in_partner &&
          Project.projectDataList.map((data) => {
            {/* 카드 클릭 시 채팅 로그 불러오면서 active => 채팅 로그에는 answer만 저장되어 있어서 answer 데이터를 이용해야함*/}

            return (
                <HeaderContentAll onClick = {() => this.clickchatcard(data.answer_set, data.request_set)} active={Chat.chatcard_index == data.request_set[0].id}>
                <HeaderLogo>
                  <img src = {LogoNo}></img>
                </HeaderLogo>
                {/*request_set에 있는 정보 가져오기*/}      
                <HeaderContent>
                  <span>
                    {data.request_set[0] && data.request_set[0].name.length > 15 ? (data.request_set[0].name.substring(0,15)+ "...") :  (data.request_set[0].name)}
                    {/* 최근 채팅 시간 보여주기 */}
                    {data.answer_set.map((answer_data) => {
                      return (
                        <RecentTime>{answer_data.partner == Auth.logged_in_partner.id && answer_data.chat_set[answer_data.chat_set.length - 1] && answer_data.chat_set[answer_data.chat_set.length - 1].createdAt.substring(11,16)}</RecentTime>
                      ) 
                    })
                    } 
                  </span>

                  {/*본인에게 맞는 제안서의 채팅 최근값 도출*/}
                  {data.answer_set.map((answer_data) => {

                    return (
                      <SubTitle>{answer_data.partner == Auth.logged_in_partner.id && answer_data.chat_set[answer_data.chat_set.length - 1] && answer_data.chat_set[answer_data.chat_set.length - 1].text_content}</SubTitle>
                    ) 
                  })
                  
                  }

                </HeaderContent>
                </HeaderContentAll>
              
            )
          })
          
        }

      
      </Background>
    );
  }
}

export default ChattingHeader;

const HeaderContentAll = styled.div`
  display : flex;
  width : 100%;
  border-bottom: solid 1px #e1e2e4;
  background-color: ${(props) => (props.active ? "#eeeeee" : "#ffffff")};
  cursor : pointer;
`


const HeaderLogo = styled.div`
  width : 55px;
  margin : 16px auto 18px 15px;
  > img {
    width : 100%;
  }
`;
const HeaderTitle = styled.div`
  width : 100%;
  height: 63px;
  border-bottom: solid 1px #e1e2e4;
  > span {
    display : flex,
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
height: 89px;
> span {
  display : flex;
  font-size: 15px !important;
  height: 28px;
  margin: 18px 0px 0px 16px;
  object-fit: contain;
  font-family: NotoSansCJKkr-Bold;
  font-size: 19px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.48px;
  text-align: left;
  color: #282c36;

  > div {
    margin-left : auto;
    margin-right : 12px;
  }
}
`;

const SubTitle = styled.div`
font-size: 13px !important;
width: 194px;
height: 19px;
margin-bottom: 20px;
margin-left : 16px;
object-fit: contain;
font-family: NotoSansCJKkr;
font-weight: 700;
font-stretch: normal;
font-style: normal;
text-align: left;
color: #282c36;
`;

const RecentTime = styled.div`
  itme-align: end;
  height: 17px;
  margin: 0px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  color: #86888c;
`;
