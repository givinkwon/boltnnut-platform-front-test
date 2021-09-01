import React from "react";
import styled from "styled-components";


import Background from "components/Background";

import { inject, observer } from "mobx-react";
import * as ChatAPI from "axios/Manufacture/Chat"; 

import ChatInputBox from "./ChatInpuBox"

const LogoNo = "/static/images/chat/logono.png"

@inject("Auth", "Project", "Chat")
@observer
class ChattingContent extends React.Component {
  ChatAreaRef = React.createRef();
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.handleScrollChange = this.handleScrollChange.bind(this);
  }

  state = {
    text: "",
    value: "",
    rows: 1,
    minRows: 1,
    maxRows: 20,
    height: 576,
    chatPageCount: 1,
  };

  // 스크롤을 위로 올리면 이전 채팅이 로딩되도록
  handleScrollChange() {
    if (this.ChatAreaRef.current) {
      if (
        this.ChatAreaRef.current.scrollTop <= 0 &&
        this.props.chatPageLimit - 1 > this.state.chatPageCount
      ) {
      }
    }
  }

  async componentDidMount() {
    const { Chat } = this.props;
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
    // 스크롤을 위로 올리면 이전 채팅이 로딩되도록
    document.addEventListener("scroll", this.handleScrollChange, true);

    // 시간 설정하기
    let temp = new Date();
    temp.setMinutes(temp.getMinutes() + temp.getTimezoneOffset() * -1);
    Chat.current_time = temp;

    // 채팅창이 선택된 경우
    if(Chat.answerId > 0 ) {
      // 채팅 소켓 링크 설정
      chatSocket = new WebSocket(
          `wss://api.boltnnut.com/ws/chat/` + `${Chat.answerId}` + "/"
      );

      // 소켓 OPEN 
      this.chatSocket.onopen = async () => {

      // 클라이언트 정보 가져오기
      await this.props.Partner.getClientInfo(
          Project.projectDetailData.request_set[0].client
      );

      // 유저 타입 체크
      if (this.props.Auth.logged_in_user) {
          this.userType = this.props.Auth.logged_in_user.type;
      }

      // 0.5초 이후(비동기 방지) 접속완료 메세지 보내기
      setTimeout(() => {
          this.chatSocket.send(
          JSON.stringify({
              message: "접속완료",
              type: this.userType,
              time: Chat.current_time,
              bReceive: true,
              file: this.state.currentFile,
              chatType: 0,
          })
          );
      }, 500);
      };
      // 소켓 OPEN 끝
      console.log(1)
      
      // 소켓 onmessage
      this.chatSocket.onmessage = (e) => {
      // redis에서 온 data
      const data = JSON.parse(e.data);
      const messages = this.props.Project.chatMessages;

      console.log(toJS(messages));
      // 읽음 표시가 안되있다면
      if (!data.bReceive) {
          // 해당 메세지가 본인의 type이 아니라면
          if (data.type != this.userType) {
          // 수신 완료 메세지를 보내서 체크하기
          this.chatSocket.send(
              JSON.stringify({
              message: "수신완료",
              type: this.userType,
              time: this.props.Chat.current_time,
              bReceive: true,
              file: this.state.currentFile,
              chatType: 0,
              })
          );
          }
          
          // 최근 메세지가 현재 메시지가 아니라면
          if (
          !(
              data.time === messages[messages.length - 1].time &&
              data.type === messages[messages.length - 1].member
          )
          ) 
          // 메세지 저장하기
          {
          messages.push({
              member: data["type"],
              text: data["message"],
              time: data["time"],
              bRead: false,
          });
          } else {
          console.log(data);
          console.log(messages[messages.length - 1]);
          console.log("중복 발생!");
          }
      }

      // 읽음 표시 처리하기
      {
          this.checkRead(this.props.Project.chatMessages, data);
      }


      let tempAnswerNum = roomNum;
      let chatCount = 0;

      // 데이터 메세지가 "접속완료" "수신완료"가 아닌 실제 메세지인 경우
      if (data.message != "접속완료" && data.message != "수신완료") {
          // 내가 보낸 메세지면
          if (data.type === this.userType) {
          // 현재 메세지 저장하기
          const req = {
              text_content: data.message,
              user_type: data.type,
              chat_type: 0,
              answer: tempAnswerNum,
          };
          ChatAPI.saveChat(req).then((res) => {
              console.log(res);
          });
          }
      }
      // 소켓 onclose 시작
      this.chatSocket.onclose = (e) => {
      };
      // 소켓 onclose 끝
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    document.removeEventListener("scroll", this.handleScrollChange);
  }

  // width 조절
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };


  onChangeHandler = (event) => {
    const textareaLineHeight = 34;
    const { minRows, maxRows } = this.state;
    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      text: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
      height:
        currentRows < maxRows
          ? currentRows === 1
            ? 576 - (currentRows - 1) * 32
            : 576 - (currentRows - 2) * 32
          : 0,
    });
  };

  // 메세지를 입력할 때
  onChange(e) {
    this.setState({ text: e.target.value });
  }

  // 메세지를 보낼 때
  onSubmit(e) {
    e.preventDefault();

    // 텍스트 초기화
    this.setState({ text: "" });

    // 빈메세지 제거
    if (this.state.text.length > 0) {
      this.props.onSendMessage(this.state.text);
    }
  }

  // 메세지 읽음 처리
  checkRead = (fullMessage, currentMessage) => {

    fullMessage.forEach((element) => {
      if (
        currentMessage.member != element.member &&
        element.time <= currentMessage.time
      ) {
        element.bRead = true;
      }
    });
  };

  render() {
    const { Auth, Project, Chat } = this.props;
    console.log(Chat.chatcontent_arr.count)
    return (
      <Background
      
        backgroundColor={"#ffffff"}
        style={{height: 1016, width: 840, marginRight: "auto"}}
      >
        <ContentTitle>
        </ContentTitle>

        <ContentBody>
          {Chat.chatcontent_arr.count > 0 && Chat.chatcontent_arr.results.map((data) => {
            console.log(data)
            return (
                <>
                
                  {/* 파트너일 때 ? 클라이언트일 때 */}
                  {Auth.logged_in_partner ? 
                    ( data.user_type == 0 ? 
                      <Left>
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
 
                      <Text state={"Left"} >{data.text_content}</Text>
                      </Left>
                    : 
                      <Right>
                      <Text state={"Right"}>{data.text_content}</Text>
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
                      </Right> 
                    )
                  :
                    ( data.user_type == 1 ? 
                      <Right>
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
 
                      <Text state={"Right"}>{data.text_content}</Text>
                      </Right>
                    : 
                      <Left>
                      <Text state={"Left"}>{data.text_content}</Text>
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
                      </Left> 
                    )
                  }
                  
                </>
              )
            })
          }
        </ContentBody>
        <ChatInputBox/>

      
      </Background>
    );
  }
}

export default ChattingContent;

const ContentLogo = styled.div`
  width : 37px;
  height : 37px;
  margin-right : 16px;
  margin-left : 16px;
  > img {
    width : 100%;
  }
`
const ContentTitle = styled.div`
  width : 100%;
  height: 63px;
  border: solid 1px #e1e2e4;

`;

const ContentBody = styled.div`
  width : 100%;
  height : 809px;
  > div {
    display : flex;
  }
`;

const Left = styled.div`
  margin-left : 24px;
  margin-top : 44px;
`

const Right = styled.div`
  justify-content : flex-end;
  margin-top : 24px;
  margin-left : auto;
  margin-right : 16px;
`

const Text = styled.div`
  width: 434px;
  padding: 10px 13px 10px 16px;
  background-color: #eee;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.16px;
  text-align: left;
  color: #1e2222;
  border-radius : ${(props) => (props.state == "Left" ? "0px 10px 10px 10px;" : " 10px 0px 10px 10px;")}
`