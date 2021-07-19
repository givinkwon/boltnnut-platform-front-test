import React from "react";
import * as ProposalAPI from "axios/Proposal";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";
import ChatCardContainer from "./ChatCard";
import * as ChatAPI from "axios/Chat";
import * as PartnerAPI from "axios/Partner";
import * as RequestAPI from "axios/Request";
import { ROOT_URL } from "axios/index";
import { toJS } from "mobx";

@inject("Auth", "Project", "Partner", "Chat")
@observer
class ChatTestContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIn: false,
      messages: [],
      currentTime: null,
      currentFile: null,
      chatPageLimit: null,
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  onChangeFile = async (e) => {
    let fileName;

    let file = [];
    if (e.currentTarget.files[0]) {
      fileName = e.currentTarget.files[0].name;
      await this.setState({ currentFile: e.currentTarget.files[0] });

      console.log(this.userType);

      console.log(this.state.currentFile);
      console.log(this.state.currentFile.name.split(".").pop());
      const extension = this.state.currentFile.name.split(".").pop();
      if (
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "png" ||
        extension === "gif"
      ) {
        file.push({
          chat_type: 1,

          answer: 17378,
          origin_file: this.state.currentFile,
          type: this.userType,
        });
      }
      else {
        file.push({
          chat_type: 2,
          answer: 238,
          origin_file: this.state.currentFile,
          type: this.userType,
        });
      }

      var formData = new FormData();

      formData.append("chat_type", file[0].chat_type);
      formData.append("answer", file[0].answer);
      formData.append("file", file[0].origin_file);
      formData.append("user_type", 0);

      for (let key of formData.keys()) {
        console.log(key);
      }

      // FormData의 value 확인
      for (let value of formData.values()) {
        console.log(value);
      }
      const Token = localStorage.getItem("token");
      const req = {
        data: formData,
      };

      ChatAPI.saveFile(req)
        .then((res) => {
          console.log("dsfdfdsfdsfsdf");
          console.log(res);

          const file_url = res.data.file;

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
  shareButtonClick = () => {
    const req = {
      extraUrl: `238/`,
      params: {
        partner: 265,
        share_inform: true,
      },
    };
    ChatAPI.patchShareInform(req);
  };

  socketClose = () => {
    this.chatSocket.close();
  };

  chatSocket = new WebSocket(
    `wss://api.boltnnut.com/ws/chat/` + `${this.props.roomName}` + "/"
  );
  userType = null;

  // 메세지 읽음 표시 함수
  checkRead = async (fullMessage, currentMessage, flag = 1) => {
    console.log("================= Enter CheckRead ========================");

    console.log(toJS(fullMessage));
    console.log(fullMessage[0]);
    console.log(toJS(currentMessage));

    console.log(toJS(fullMessage).length);
    if (fullMessage.length > 0) {
      console.log("fullMessage forEach 돕니다");
      fullMessage.forEach((element) => {
        console.log("FULLMESSAGES");

        console.log(currentMessage.time);
        console.log(element.time);
        if (element.time && currentMessage.time) {
          if (
            currentMessage.type != element.member &&
            element.time.slice(0, 19) <= currentMessage.time.slice(0, 19)
          ) {
            element.bRead = true;
            console.log("READ complete");
          }
        }
      });
    }

    // 메세지를 보낸 경우에 체크하여 카카오톡 보내기

    if (
      fullMessage.length > 0 &&
      currentMessage.message != "접속완료" &&
      toJS(fullMessage)[fullMessage.length - 1].bRead == false &&
      toJS(fullMessage)[fullMessage.length - 2].bRead == true
    ) {
      //접속되어있는지 판단하기 위해 조건이 참이 됐을 때의 마지막 메시지 인덱스를 저장
      const checkIdx = fullMessage.length - 1;

      setTimeout(() => {
        //5초 뒤에도 그 인덱스가 false면 보냄
        if (!fullMessage[checkIdx].bRead) {
          //파트너에게 보내기
          let req;
          if (this.userType === 0) {
            req = {
              phoneNum: this.props.Partner.partnerdata.user.phone,
              requestTitle: this.props.Project.projectDetailData.request_set[0]
                .name,
              name: "클라이언트 님", //클라이언트 이름
              text: fullMessage[checkIdx].text,
            };
          } //클라이언트에게 보내기
          else {
            req = {
              phoneNum: this.props.Partner.clientInfo.user.phone,
              requestTitle: this.props.Project.projectDetailData.request_set[0]
                .name,
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

          console.log("Send Kakao and Jandi");
        }
      }, 5000);
    }

    console.log(toJS(fullMessage));

    console.log("================= Exit CheckRead ========================");
    console.log(fullMessage);
  };

  async componentDidUpdate() {
    let temp = new Date();

    temp.setMinutes(temp.getMinutes() + temp.getTimezoneOffset() * -1);

    this.props.Chat.current_time = temp;
  }

  loadPrevMessages = async (count) => {
    const loadChatReq = {
      extraUrl: `${this.props.roomName}`,
      params: {
        page: count,
      },
    };

    ChatAPI.loadChat(loadChatReq)
      .then((res) => {
        const reverseChat = res.data.results;
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
    this.props.Chat.current_time = null;
    let temp = new Date();
    let timezone = temp.getTimezoneOffset();
    temp.setMinutes(temp.getMinutes() + temp.getTimezoneOffset() * -1);
    console.log(temp);
    // 메세지 및 시간 초기화
    this.setState({ messages: [], currentTime: temp });
    this.props.Chat.current_time = temp;
    console.log(toJS(this.props.Chat.current_time));
    this.props.Project.chatMessages = [];
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    console.log(this.state.currentTime);

    const loadChatReq = {
      extraUrl: `${this.props.roomName}`,
      params: {
        page: 1,
        order: [["id", "DESC"]], //DESC
      },
    };

    ChatAPI.loadChat(loadChatReq).then((res) => {
      const reverseChat = res.data.results.reverse();
      if (res.data.count % 10 === 0) {
        this.setState({ chatPageLimit: res.data.count / 10 });
      } else {
        this.setState({ chatPageLimit: Math.floor(res.data.count / 10) + 1 });
      }
      for (let i = 2; i <= this.state.chatPageLimit; i++) {
        this.loadPrevMessages(i);
      }

      ChatAPI.loadChatCount(roomNum).then((m_res) => {
        const req = {
          extraUrl: m_res.data.partner + `/`,
          params: {},
        };
        PartnerAPI.getPartner(req).then((res) => {
          Partner.partnerdata = res.data;
          console.log(res.data);
          //콘솔 그룹
          const Color = "skyBlue";

          clientPhone = Partner.clientInfo.user.phone;
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

    //============================================= onopen 시작 ============================================================
    this.chatSocket.onopen = async () => {
      // alert("Open");
      await this.props.Project.getProjectDetail(this.props.projectId);

      await this.props.Partner.getClientInfo(
        Project.projectDetailData.request_set[0].client
      );
      console.log("onopen");
      console.log(toJS(this.props.Project.chatMessages));
      if (this.props.Auth.logged_in_user) {
        this.userType = this.props.Auth.logged_in_user.type;
        console.log(this.userType);
        if (this.userType === 0) {
          MyDataLayerPush({ event: "ClientChat" });
        } else {
          MyDataLayerPush({ event: "PartnerChat" });
        }
        console.log("로그인된 유저는 " + this.userType);
      }
      console.log("onOpen() 호출");

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

    //============================================= onopen 끝 ============================================================
    console.log(this.chatSocket);

    //============================================= onmessage 시작 ============================================================
    this.chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("===========redis에서 들어온 내용=============");
      console.log(data);
      console.log("===========redis에서 들어온 내용============");
      const messages = this.props.Project.chatMessages;
      console.log(toJS(messages));
      if (!data.bReceive) {
        if (data.type != this.userType) {
          console.log(
            "수신완료체크!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
          );
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
        console.log(toJS(messages));

        if (
          !(
            data.time === messages[messages.length - 1].time &&
            data.type === messages[messages.length - 1].member
          )
        ) {
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

      {
        this.checkRead(this.props.Project.chatMessages, data);
      }

      let tempAnswerNum = roomNum;
      let chatCount = 0;
      console.log(data.message);
      if (data.message != "접속완료" && data.message != "수신완료") {
        if (data.type === this.userType) {
          console.log("채팅 저장");
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
      ChatAPI.loadChatCount(tempAnswerNum).then((res) => {
        let clientChatCount = res.data.check_time_client;
        let partnerChatCount = res.data.check_time_partner;
        this.userType === 0
          ? (clientChatCount = new Date())
          : (partnerChatCount = new Date());
        const answerReq = {
          extraUrl: `${tempAnswerNum}/`,
          params: {
            partner: res.data.partner,
            check_time_client: clientChatCount,
            check_time_partner: partnerChatCount,
          },
        };
        ChatAPI.saveChatCount(answerReq);
        this.setState({ f: 3 });
      });
    };

    //============================================= onmessage 끝 ============================================================

    this.chatSocket.onclose = (e) => {
      console.error("Chat socket closed unexpectedly");
      console.log("Chat Socket Closed!!!!!!!!!!!!!!!!!!!!");
    };
  }

  //redis에서 뿌려줄 때
  onSendMessage = (myMessage) => {
    console.log(myMessage);
    console.log(this.userType);
    console.log(this.state.currentTime); // null

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
