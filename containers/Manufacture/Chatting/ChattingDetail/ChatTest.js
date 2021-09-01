import React from "react";

import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";
import ChatCardContainer from "./ChatCard";
import * as ChatAPI from "axios/Manufacture/Chat";
import * as PartnerAPI from "axios/Manufacture/Partner";
import * as RequestAPI from "axios/Manufacture/Request";
import { ROOT_URL } from "axios/index";
import { toJS } from "mobx";

@inject("Auth", "Project", "Partner", "Chat")
@observer
class ChatTestContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIn: false, // 입장 state
      messages: [],
      currentTime: null, // 현재 시간
      currentFile: null, 
      chatPageLimit: null,
    };
  }

  // 
  onChangeFile = async (e) => {
    const { Chat } = this.props;

    let fileName;

    let file = [];
    // 파일인 경우에는 파일 처리하기
    if (e.currentTarget.files[0]) {
      fileName = e.currentTarget.files[0].name;
      await this.setState({ currentFile: e.currentTarget.files[0] });

      console.log(this.userType);

      console.log(this.state.currentFile);
      console.log(this.state.currentFile.name.split(".").pop());
      const extension = this.state.currentFile.name.split(".").pop();

      // 이미지인 경우
      if (
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "png" ||
        extension === "gif"
      ) {
        file.push({
          chat_type: 1,

          answer: Chat.answerId,
          origin_file: this.state.currentFile,
          type: this.userType,
        });
        
      // 일반 파일인 경우
      } else {
        file.push({
          chat_type: 2,
          answer: Chat.answerId,
          origin_file: this.state.currentFile,
          type: this.userType,
        });
      }

      // 채팅 로그 저장하기
      var formData = new FormData();

      formData.append("chat_type", file[0].chat_type);
      formData.append("answer", file[0].answer);
      formData.append("file", file[0].origin_file);
      formData.append("user_type", 0);

      const Token = localStorage.getItem("token");
      const req = {
        data: formData,
      };

      ChatAPI.saveFile(req)
        .then((res) => {
          console.log(res);

          const file_url = res.data.file;

          // 소켓으로 채팅 보내기
          this.chatSocket.send(
            JSON.stringify({
              type: this.userType,
              message: file_url,
              chatType: res.data.chat_type,
              time: this.props.Chat.current_time,
              bReceive: false,
              file: file_url,
            })
          );
          console.log("send");
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    }
  };
  
  // 소켓 통신 종료
  socketClose = () => {
    this.chatSocket.close();
  };

  // 채팅 소켓 링크 설정
  chatSocket = new WebSocket(
    `wss://api.boltnnut.com/ws/chat/` + `${this.props.roomName}` + "/"
  );
  userType = null;

  // 메세지 읽음 표시 함수 => currentMessage는 수신 완료 메세지, fullMessage는 지금 있는 전체 메세지
  checkRead = async (fullMessage, currentMessage, flag = 1) => {

    // 전체 메세지(기존 메세지)에 메세지가 있으면
    if (fullMessage.length > 0) {
      
      // 메세지 for 문
      fullMessage.forEach((element) => {
        
        // 두 개의 메세지 모두 도착하면 
        if (element.time && currentMessage.time) {
          
          // 수신 완료 메세지의 type이 다른 경우 => 본인 메세지가 아닌 경우   
          if (
            currentMessage.type != element.member &&
            // currentMessage 시간이 element 시간보다 높을 때 >> 읽음 표시
            element.time.slice(0, 19) <= currentMessage.time.slice(0, 19)
          ) {
            element.bRead = true;
          }
        }
      });
    }

    // 메세지를 보낸 경우에 체크하여 카카오톡 보내기
    if (
      // 메세지가 있는 경우 && "접속완료" 메세지가 온 경우 && 마지막 메세지만 읽지 않은 경우 => 읽지 않은 메세지가 여러 개일 때, 1개만 보내기 위함
      fullMessage.length > 0 &&
      currentMessage.message != "접속완료" &&
      toJS(fullMessage)[fullMessage.length - 1].bRead == false &&
      toJS(fullMessage)[fullMessage.length - 2].bRead == true
    ) {
      //접속되어있는지 판단하기 위해 조건이 참이 됐을 때의 마지막 메시지 인덱스를 저장 => 메세지를 또 보내면 fullMessage가 갱신되므로
      const checkIdx = fullMessage.length - 1;

      setTimeout(() => {
        // 5초 뒤에도 그 인덱스가 false면 => 읽지 않음 상태면 카카오톡 보내기
        if (!fullMessage[checkIdx].bRead) {
          
          //파트너에게 카카오톡 보내기
          let req;
          if (this.userType === 0) {
            req = {
              phoneNum: this.props.Partner.partnerdata.user.phone,
              requestTitle:
                this.props.Project.projectDetailData.request_set[0].name,
              name: "클라이언트 님", //클라이언트 이름
              text: fullMessage[checkIdx].text,
            };
          } 
          
          //클라이언트에게 카카오톡 보내기
          else {
            req = {
              phoneNum: this.props.Partner.clientInfo.user.phone,
              requestTitle:
                this.props.Project.projectDetailData.request_set[0].name,
              name: this.props.Partner.partnerdata.name, //파트너 이름
              text: fullMessage[checkIdx].text,
            };
          }

          RequestAPI.sendKakaoTalk(req)
            .then((res) => console.log(res))
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });

          // 잔디 hook으로 메세지 보내기
          const jandiReq = {
            // headers
            headers: {
              Accept: "application/vnd.tosslab.jandi-v2+json",
              "Content-Type": "application/json",
            },
            // params
            params: {
              body: `[볼트앤너트] ${req.name}(으)로부터 <${this.props.Project.projectDetailData.request_set[0].name}>에 대한 채팅이 도착하였습니다.\n채팅 내용: '${req.text}'`,
            },
          };

          ChatAPI.sendJandi(jandiReq)
            .then((res) => console.log(res))
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
      }, 5000);
    }
  };

  // 렌더링될 때마다 현재 시간 갱신
  async componentDidUpdate() {
    let temp = new Date();

    temp.setMinutes(temp.getMinutes() + temp.getTimezoneOffset() * -1);

    this.props.Chat.current_time = temp;
  }

  // 이전 채팅 메세지 가져오기
  loadPrevMessages = async (count) => {
    const loadChatReq = {
      extraUrl: `${this.props.roomName}`,
      params: {
        page: count,
      },
    };

    // 채팅방(answerId에 따라 채팅 로그 불러오기)
    ChatAPI.loadChat(loadChatReq)
      .then((res) => {
        const reverseChat = res.data.results;
        // 채팅 개수 가져오기
        ChatAPI.loadChatCount(this.props.roomName).then((m_res) => {
          // answer data 가져오기
          const req = {
            extraUrl: m_res.data.partner + `/`,
            params: {},
          };
          var Temp = [];
          const Messages = this.props.Project.chatMessages;
          reverseChat.forEach(async (message) => {
            let readState = true;
            if (message.user_type === 0) {

              if (
                m_res.data.check_time_partner.slice(0, 19) <
                message.createdAt.slice(0, 19)
              ) {
                readState = false;
              }
            } else {
              if (
                m_res.data.check_time_client.slice(0, 19) <
                message.createdAt.slice(0, 19)
              ) {
                readState = false;
              }
            }

            // 배열 값 앞에 추가하기
            await Messages.unshift({
              member: message.user_type,
              text: message.text_content,
              time: message.createdAt,
              bRead: readState,
            });
            this.setState({ f: 3 });
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async componentDidMount() {
    // RoomNumber 체크하기
    const { Partner, Project } = this.props;
    const roomNum = this.props.roomName;
    let clientPhone = "";
    // 현재 시간 초기화
    this.props.Chat.current_time = null;

    // 시간 셋팅하기
    let temp = new Date();
    let timezone = temp.getTimezoneOffset();
    temp.setMinutes(temp.getMinutes() + temp.getTimezoneOffset() * -1);
    this.setState({ messages: [], currentTime: temp });
    this.props.Chat.current_time = temp;
    
    this.props.Project.chatMessages = [];
   
    // 채팅 로그 가져오기
    const loadChatReq = {
      extraUrl: `${this.props.roomName}`,
      params: {
        page: 1,
        order: [["id", "DESC"]], //DESC
      },
    };

    ChatAPI.loadChat(loadChatReq).then((res) => {
      // 채팅 리스트 역순으로 만들기
      const reverseChat = res.data.results.reverse();
      
      // 채팅 카운트 관련
      if (res.data.count % 10 === 0) {
        this.setState({ chatPageLimit: res.data.count / 10 });
      } else {
        this.setState({ chatPageLimit: Math.floor(res.data.count / 10) + 1 });
      }

      // 이전 메세지 로딩하기
      for (let i = 2; i <= this.state.chatPageLimit; i++) {
        this.loadPrevMessages(i);
      }

      ChatAPI.loadChatCount(roomNum).then((m_res) => {
        const req = {
          extraUrl: m_res.data.partner + `/`,
          params: {},
        };
        // 파트너 데이터 가져오기
        PartnerAPI.getPartner(req).then((res) => {
          Partner.partnerdata = res.data;
          console.log(res.data);
          //콘솔 그룹
          const Color = "skyBlue";

          clientPhone =
            Partner.clientInfo &&
            Partner.clientInfo.user &&
            Partner.clientInfo.user.phone;
          console.group("%c 채팅창 정보", `color:${Color}; font-size:30px`);
          console.log(
            `%c채팅 번호(Answer id) = ${roomNum}\n클라이언트 휴대폰번호 = ${clientPhone}\n파트너 휴대폰번호 = ${this.props.Partner.partnerdata.user.phone}\n프로젝트 이름 = ${this.props.requestTitle}\n`,
            `color: ${Color}; font-size: 20px;`
          );
          console.groupEnd("그룹 종료");
          //콘솔 그룹
        });

        reverseChat.forEach(async (message) => {
          const Messages = this.props.Project.chatMessages;
          let readState = true;
          if (message.user_type === 0) {
            // console.log(m_res.data.check_time_partner); // 이건 밀리세컨드고
            // console.log(message.createdAt); // 이건 파이썬에서 그냥 표준 시간형식으로 저장돼서 둘 중 하나 바꿔줘야함 비교할때
            //여기서 바꿔줘야함

            if (
              m_res.data.check_time_partner.slice(0, 19) <
              message.createdAt.slice(0, 19)
            ) {
              readState = false;
            }
          } else {
            if (
              m_res.data.check_time_client.slice(0, 19) <
              message.createdAt.slice(0, 19)
            ) {
              readState = false;
            }
          }

          Messages.push({
            member: message.user_type,
            text: message.text_content,
            time: message.createdAt,
            bRead: readState,
          });
          this.setState({ f: 3 });
        });
      });
    });

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
            time: this.props.Chat.current_time,
            bReceive: true,
            file: this.state.currentFile,
            chatType: 0,
          })
        );
      }, 500);
    };
    // 소켓 OPEN 끝

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
      this.checkRead(this.props.Project.chatMessages, data);
      


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
  // 소켓 onmessage 끝
  

  //redis에서 메세지 뿌려줄 때
  onSendMessage = (myMessage) => {

    // 서버에 저장하기
    this.chatSocket.send(
      JSON.stringify({
        message: myMessage,
        type: this.userType,
        time: this.props.Chat.current_time,
        bReceive: false,
        file: this.state.currentFile,
        chatType: 0,
      })
    );
  };
  }
  
  render() {
    return (
      <>
        <input
          id="FileInput"
          type="file"
          onChange={(e) => {
            this.onChangeFile(e);
          }}
          style={{ display: "none" }}
        />
        <ChatCardContainer
          messages={this.props.Project.chatMessages}
          onSendMessage={this.onSendMessage}
          currentUserType={this.userType}
          shareButtonClick={this.shareButtonClick}
          socketClose={this.socketClose}
          loadPrevMessages={this.loadPrevMessages}
          chatPageLimit={this.state.chatPageLimit}
        />
      </>
    );
  }
}

export default ChatTestContainer;
