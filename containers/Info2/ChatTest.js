import React from "react";
import * as ProposalAPI from "axios/Proposal";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";
import ChatCardContainer from "./ChatCard";
import * as ChatAPI from "axios/Chat";
import * as PartnerAPI from "axios/Partner";
import * as RequestAPI from "axios/Request";


import { toJS } from "mobx";
@inject("Auth", "Project", "Partner")
@observer
class ChatTestContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIn: false,
      messages: [],
      currentTime: null,
      currentFile: null,
    };
  }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    };
  
    updateDimensions = () => {
      this.setState({ ...this.state, width: window.innerWidth });
    };

  onChangeFile = async (e) => {
    // let fileNameAvailable = ["stl", "stp"];
    let fileName;

    let file = [];
    // let fileNameAvailable = ["txt"];

    if (e.currentTarget.files[0]) {
      // !fileNameAvailable.includes(
      // e.currentTarget.files[0].name.split(".")[e.currentTarget.files.length];
      // )
      // {
      //   return alert("파일 확장자명 (stl, stp만 가능) 을 확인해주세요.");
      // }
      fileName = e.currentTarget.files[0].name;
      await this.setState({ currentFile: e.currentTarget.files[0] });

      // const extension = item.fileName.split(".");
      //console.log(e.currentTarget.files[0]);

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

          //message: "이미지",
          answer: 17378,
          origin_file: this.state.currentFile,
          type: this.userType,
        });

        // }else if(extension === "ppt" || extension==="pdf" || extension==="stl" || extension==="stp" || extension==="xlex"){
      }
      // else if (extension === "txt") {
      //   file.push({
      //     chat_type: 2,
      //     message: "텍스트",
      //     origin_file: this.state.currentFile,
      //   });
      // }
      else {
        file.push({
          chat_type: 2,
          // message: "파일",
          answer: 238,
          origin_file: this.state.currentFile,
          type: this.userType,
        });
      }

      // console.log(file);
      // console.log(file[0].answer);
      // console.log(file[0].origin_file);
      // console.log(this.userType);
      // console.log(file[0].type);

      var formData = new FormData();
      //formData.append("request_state", "업체수배");

      //formData.append("request_state", 1);

      formData.append("chat_type", file[0].chat_type);
      formData.append("answer", file[0].answer);
      formData.append("file", file[0].origin_file);
      formData.append("user_type", 0);
      //formData.append("user_type", this.userType);

      for (let key of formData.keys()) {
        console.log(key);
      }

      // FormData의 value 확인
      for (let value of formData.values()) {
        console.log(value);
      }
      // const req = {
      //   data: formData,
      // };

      const Token = localStorage.getItem("token");
      const req = {
        // headers: {
        //   Authorization: `Token ${Token}`,
        // },
        data: formData,
      };

      ChatAPI.saveFile(req)
        .then((res) => {
          console.log("dsfdfdsfdsfsdf");
          console.log(res);

          const file_url = res.data.file;

          this.chatSocket.send(
            JSON.stringify({
              //message: decodeURI(file_url.split("/").pop()),
              type: this.userType,
              message: file_url,
              chatType: res.data.chat_type,
              time: this.state.currentTime,
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
    "wss://test.boltnnut.com/ws/chat/" + `${this.props.roomName}` + "/"
  );
  userType = null;

  // 메세지 읽음 표시 함수
  checkRead = (fullMessage, currentMessage) => {
    console.log("CHECKREAD!!!!!!!");

    fullMessage.forEach((element) => {
      // console.log("FULLMESSAGES");
      if (
        currentMessage.type != element.member &&
        element.time <= currentMessage.time
      ) {
        element.bRead = true;
        console.log("READ complete");
      }
      // else {
      //   // console.log("읽지않음");
      // }
    });

    // 메세지를 보낸 경우에 체크하여 카카오톡 보내기
    if (
      fullMessage.length > 0 &&
      toJS(fullMessage)[fullMessage.length - 1].bRead == false &&
      toJS(fullMessage)[fullMessage.length - 2].bRead == true
    ) {
      {
        console.log("우왕");

        const req = {
          phoneNumber: "01041126637",
          username: "",
          title: "",
        };
        console.log("Send KAKAO");
        RequestAPI.sendKakaoTalk(req)
          .then((res) => console.log(res))
          .catch((e) => {
            console.log(e);
            console.log(e.response);
          });
      }
    }
  };

  async componentDidMount() {
    // RoomNumber 체크하기
    const {Partner} = this.props;
    const roomNum = this.props.roomName;
    let temp = new Date();
    let timezone = temp.getTimezoneOffset();
    temp.setMinutes(temp.getMinutes() + temp.getTimezoneOffset() * -1);
    // 메세지 및 시간 초기화
    this.setState({ messages: [], currentTime: temp });
    this.props.Project.chatMessages = [];
    //창 크기
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth});
    
    ChatAPI.loadChat(roomNum).then((res) => {
      const reverseChat = res.data.results.reverse();
      ChatAPI.loadChatCount(roomNum).then((m_res) => {
        console.log(m_res);
        // answer data 가져오기
        const req = {
          extraUrl: m_res.data.partner + `/`,
          params: {
          },
        };
        PartnerAPI.getPartner(req)
        .then((res) => {
          Partner.partnerdata = res.data;
        })

        reverseChat.forEach((message) => {
          const Messages = this.props.Project.chatMessages;
          let readState = true;
          if (message.user_type === 0) {
            console.log(m_res.data.check_time_partner); // 이건 밀리세컨드고
            // console.log(message.createdAt); // 이건 파이썬에서 그냥 표준 시간형식으로 저장돼서 둘 중 하나 바꿔줘야함 비교할때
            //여기서 바꿔줘야함
            if (m_res.data.check_time_partner < message.createdAt) {
              readState = false;
            }
          } else {
            if (m_res.data.check_time_client < message.createdAt) {
              readState = false;
            }
          }

          Messages.push({
            member: message.user_type,
            text: message.text_content,
            time: message.createdAt,
            bRead: readState,
          });
          // console.log(this.props.Project.chatMessages);
          // if (Messages[0].time < Messages[1].time) {
          //   console.log("asdnklasndlkasndlknaslkdnalksdnladsnkl");
          // }

          this.setState({ f: 3 });
        });
      });
    });
    // this.setState({ messages: [] });
    this.chatSocket.onopen = async () => {
      await this.props.Auth.checkLogin();
      if (this.props.Auth.logged_in_user) {
        this.userType = this.props.Auth.logged_in_user.type;
        console.log("로그인된 유저는 " + this.userType);
      }
      console.log("onOpen() 호출");
      this.chatSocket.send(
        JSON.stringify({
          message: "접속완료",
          type: this.userType,
          time: this.state.currentTime,
          bReceive: true,
          file: this.state.currentFile,
          chatType: 0,
        })
      );
    };
    // console.log(this.props.Auth.logged_in_user.type);

    console.log(this.chatSocket);

    this.chatSocket.onmessage = (e) => {
      // console.log("Aaaasdasd");
      const data = JSON.parse(e.data);

      const messages = this.props.Project.chatMessages;

      if (!data.bReceive) {
        //console.log(typeof(data.type), typeof(this.userType))
        if (data.type != this.userType) {
          console.log(
            "수신완료체크!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
          );
          this.chatSocket.send(
            JSON.stringify({
              message: "수신완료",
              type: this.userType,
              time: this.state.currentTime,
              bReceive: true,
              file: this.state.currentFile,
              chatType: 0,
            })
          );
        }
        console.log(toJS(messages));

        messages.push({
          member: data["type"],
          text: data["message"],
          time: data["time"],
          bRead: false,
        });
      }

      if (data.bReceive) {
        this.checkRead(this.props.Project.chatMessages, data);
      }
      // this.setState({ messages });

      let tempAnswerNum = roomNum;
      let chatCount = 0;
      console.log(data.message);
      if (data.message != "접속완료" && data.message != "수신완료") {
        if (data.type === this.userType) {
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
        // console.log(clientChatCount);
        let partnerChatCount = res.data.check_time_partner;
        // console.log(res);
        // console.log(res.data.partner);
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

    this.chatSocket.onclose = (e) => {
      console.error("Chat socket closed unexpectedly");
    };
  }

  onSendMessage = (myMessage) => {
    console.log(myMessage);
    console.log(this.userType);

    this.chatSocket.send(
      JSON.stringify({
        message: myMessage,
        type: this.userType,
        time: this.state.currentTime,
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
        />
      </>
    );
  }
}

export default ChatTestContainer;
