import React from "react";
import * as ProposalAPI from "axios/Proposal";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";
import ChatCardContainer from "./ChatCard";
import * as ChatAPI from "axios/Chat";
import * as AnswerAPI from "axios/Answer";

@inject("Auth")
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
          answer: 238,
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

      console.log(file);
      console.log(file[0].answer);
      console.log(file[0].origin_file);
      console.log(this.userType);
      console.log(file[0].type);

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
              type: res.data.chat_type,
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
  chatSocket = new WebSocket("wss://test.boltnnut.com/ws/chat/" + `1234` + "/");
  userType = null;
  // componentDidMount = () => {
  //   this.setState({ messages: [] });
  // };
  // messages = [{}];
  // onSendMessage = null;
  checkRead = (fullMessage, currentMessage) => {
    // console.log("CHECKREAD!!!!!!!");
    // console.log(fullMessage);
    // console.log(currentMessage);
    // console.log(this.props.currentUserType);
    fullMessage.forEach((element) => {
      if (
        currentMessage.type != element.member &&
        element.time <= currentMessage.time
      ) {
        element.bRead = true;
      }
    });
  };

  async componentDidMount() {
    let temp = new Date();
    let timezone = temp.getTimezoneOffset();
    temp.setMinutes(temp.getMinutes() + temp.getTimezoneOffset() * -1);
    this.setState({ messages: [], currentTime: temp });
    ChatAPI.loadChat(238).then((res) => {
      const reverseChat = res.data.results.reverse();
      ChatAPI.loadChatCount(238).then((m_res) => {
        console.log(m_res);
        reverseChat.forEach((message) => {
          const Messages = this.state.messages;
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
      //console.log(data);
      // if (data.type != 2) {

      // if (data.message != "receive") {
      //   this.chatSocket.send(
      //     JSON.stringify({
      //       message: "receive",
      //       type: this.userType,
      //       time: Date.now(),
      //     })
      //   );
      // }

      // console.log(data.bReceive);
      const messages = this.state.messages;
      // if (messages[0] && messages[1]) {
      //   console.log(messages[0].time);
      //   console.log(messages[1].time);
      //   if (messages[0].time > messages[1].time) {
      //     console.log("!!!!!!!!!!!");
      //   }
      // }

      // console.log(new Date().setHours(new Date().getHours() + 9));
      if (!data.bReceive) {
        if (data.member != this.userType) {
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
        messages.push({
          member: data["type"],
          text: data["message"],
          time: data["time"],
          bRead: false,
          // file: this.state.currentFile,
        });
      }

      // if (data.message == "receive") {
      //   this.checkRead(this.state.messages, data);
      // }
      if (data.bReceive) {
        this.checkRead(this.state.messages, data);
      }
      this.setState({ messages });
      // this.checkRead(this.state.messages, data);

      // this.checkRead(this.state.messages, data);
      // this.setState({ messages });
      // this.setState

      let tempAnswerNum = 238;
      let chatCount = 0;

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

          // console.log(this.state.messages.length);
          // AnswerAPI.getAnswerById(238).then((res) => console.log(res.data));
        }
      }
      ChatAPI.loadChatCount(tempAnswerNum).then((res) => {
        let clientChatCount = res.check_time_client;
        let partnerChatCount = res.check_time_partner;

        this.userType === 0
          ? (clientChatCount = new Date())
          : (partnerChatCount = new Date());
        const answerReq = {
          extraUrl: `${tempAnswerNum}/`,
          params: {
            partner: 265,
            check_time_client: clientChatCount,
            check_time_partner: partnerChatCount,
          },
        };
        ChatAPI.saveChatCount(answerReq);
        this.setState({ f: 3 });
        // ChatAPI.loadChat(tempAnswerNum).then((res) => {
        //   console.log("loadchat");
        //   this.userType === 0
        //     ? (clientChatCount = res.data.count)
        //     : (partnerChatCount = res.data.count);
        //   const answerReq = {
        //     extraUrl: `${tempAnswerNum}/`,
        //     params: {
        //       partner: 265,
        //       check_time_client: clientChatCount,
        //       check_time_partner: partnerChatCount,
        //     },
        //   };
        //   ChatAPI.saveChatCount(answerReq);
        // });
      });
      // const message = `${data["type"]}: ${data["message"]}`; //+ data["message"];
      // console.log(message);
      // document.querySelector("#chat-log").value += message + "\n";
    };

    this.chatSocket.onclose = (e) => {
      console.error("Chat socket closed unexpectedly");
      // ProposalAPI.getMyProject()
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //     console.log(e.response);
      //   });
    };

    // console.log("q");
  }

  onSendMessage = (myMessage) => {
    // const messageInput = document.querySelector("#chat-message-input");
    // const message = messageInput.value;
    console.log("front");
    // console.log(userType);
    // console.log("RR");
    // console.log(new Date()());

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
    // console.log("e");
    // messageInput.value = "";
  };

  render() {
    // this.onSendMessage("fff");
    return (
      <>
        {/* <textarea id="chat-log" cols="100" rows="20"></textarea>
        <br />
        <input id="chat-message-input" type="text" size="100" />
        <br />
        <input id="chat-message-submit" type="button" value="Send" /> */}
        <input
          id="FileInput"
          type="file"
          onChange={(e) => {
            this.onChangeFile(e);
          }}
          // onClick={(event) => fileSelector({nextTitle: 8}, 1)}
          style={{ display: "none" }}
        />
        <ChatCardContainer
          messages={this.state.messages}
          onSendMessage={this.onSendMessage}
          currentUserType={this.userType}
          shareButtonClick={this.shareButtonClick}
        />
      </>
    );
  }
}

export default ChatTestContainer;

// import React from "react";
// import * as ProposalAPI from "axios/Proposal";
// import { inject, observer } from "mobx-react";
// import styled, { css } from "styled-components";
// import ChatCardContainer from "./ChatCard";
// import * as ChatAPI from "axios/Chat";

// @inject("Auth")
// @observer
// class ChatTestContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isIn: false,
//       messages: [],
//     };
//   }

//   testMessage = [];
//   chatSocket = new WebSocket("wss://test.boltnnut.com/ws/chat/" + `1234` + "/");
//   userType = null;
//   // messages = [{}];
//   // onSendMessage = null;
//   checkRead = (fullMessage, currentMessage) => {
//     // console.log(fullMessage);
//     // console.log(currentMessage);
//     // console.log(this.props.currentUserType);
//     fullMessage.forEach((element) => {
//       if (
//         currentMessage.type != element.member &&
//         element.time <= currentMessage.time
//       ) {
//         element.bRead = true;
//       }
//     });
//     console.log("111111");
//     // this.setState({ messages: fullMessage });
//   };

//   // async componentDidMount() {
//   //   this.chatSocket.onopen = async () => {
//   //     await this.props.Auth.checkLogin();
//   //     if (this.props.Auth.logged_in_user) {
//   //       this.userType = this.props.Auth.logged_in_user.type;
//   //     }
//   //     console.log("onOpen() 호출");
//   //     this.chatSocket.send(
//   //       JSON.stringify({
//   //         message: "receive",
//   //         type: this.userType,
//   //         time: Date.now(),
//   //       })
//   //     );
//   //   };
//   //   // console.log(this.props.Auth.logged_in_user.type);

//   //   console.log(this.chatSocket);

//   //   this.chatSocket.onmessage = (e) => {
//   //     // console.log("Aaaasdasd");
//   //     const data = JSON.parse(e.data);
//   //     console.log(data);
//   //     // if (data.type != 2) {

//   //     // if (data.message != "receive") {
//   //     //   this.chatSocket.send(
//   //     //     JSON.stringify({
//   //     //       message: "receive",
//   //     //       type: this.userType,
//   //     //       time: Date.now(),
//   //     //     })
//   //     //   );
//   //     // }

//   //     if (data.message != "receive") {
//   //       if (data.member != this.userType)
//   //         this.chatSocket.send(
//   //           JSON.stringify({
//   //             message: "receive",
//   //             type: this.userType,
//   //             time: Date.now(),
//   //           })
//   //         );
//   //     }

//   //     const messages = this.state.messages;
//   //     messages.push({
//   //       member: data["type"],
//   //       text: data["message"],
//   //       time: data["time"],
//   //       bRead: false,
//   //     });

//   //     if (data.message == "receive") {
//   //       console.log("checkRead()!!!!!!!!");
//   //       this.checkRead(this.state.messages, data);
//   //     }
//   //     // this.checkRead(this.state.messages, data);
//   //     // if (data.bReceive) {
//   //     //   this.checkRead(this.state.messages, data);
//   //     // }
//   //     this.setState({ messages });
//   //     // this.checkRead(this.state.messages, data);

//   //     // this.checkRead(this.state.messages, data);
//   //     // this.setState({ messages });
//   //     // this.setState

//   //     // if (data.message != "접속") {
//   //     //   if (data.type === this.userType) {
//   //     //     const req = {
//   //     //       text_content: data.message,
//   //     //       user_type: data.type,
//   //     //       chat_type: 0,
//   //     //       answer: 238,
//   //     //     };
//   //     //     ChatAPI.saveChat(req);
//   //     //   }
//   //     // }

//   //     // const message = `${data["type"]}: ${data["message"]}`; //+ data["message"];
//   //     // console.log(message);
//   //     // document.querySelector("#chat-log").value += message + "\n";
//   //   };

//   //   this.chatSocket.onclose = (e) => {
//   //     console.error("Chat socket closed unexpectedly");
//   //     // ProposalAPI.getMyProject()
//   //     //   .then((res) => {
//   //     //     console.log(res.data);
//   //     //   })
//   //     //   .catch((e) => {
//   //     //     console.log(e);
//   //     //     console.log(e.response);
//   //     //   });
//   //   };

//   //   // console.log("q");
//   // }

//   componentDidMount() {
//     this.chatSocket.onopen = () => {
//       // await this.props.Auth.checkLogin();
//       // if (this.props.Auth.logged_in_user) {
//       //   this.userType = this.props.Auth.logged_in_user.type;
//       // }
//       this.userType = 0;
//       console.log("onOpen() 호출");
//       this.chatSocket.send(
//         JSON.stringify({
//           message: "receive",
//           type: this.userType,
//           time: Date.now(),
//         })
//       );
//     };
//     // console.log(this.props.Auth.logged_in_user.type);

//     console.log(this.chatSocket);

//     this.chatSocket.onmessage = async (e) => {
//       // console.log("Aaaasdasd");
//       const data = JSON.parse(e.data);
//       console.log(data);
//       // if (data.type != 2) {

//       // if (data.message != "receive") {
//       //   this.chatSocket.send(
//       //     JSON.stringify({
//       //       message: "receive",
//       //       type: this.userType,
//       //       time: Date.now(),
//       //     })
//       //   );
//       // }

//       if (data.message != "receive") {
//         // if (data.member != this.userType)
//         this.chatSocket.send(
//           JSON.stringify({
//             message: "receive",
//             type: this.userType,
//             time: Date.now(),
//           })
//         );
//       }

//       const messages = this.testMessage;
//       messages.push({
//         member: data["type"],
//         text: data["message"],
//         time: data["time"],
//         bRead: false,
//       });

//       // if (data.message == "receive") {
//       //   console.log("checkRead()!!!!!!!!");
//       //   await this.checkRead(this.state.messages, data);
//       // }
//       this.checkRead(this.testMessage, data);
//       // this.checkRead(this.state.messages, data);
//       // if (data.bReceive) {
//       //   this.checkRead(this.state.messages, data);
//       // }
//       // this.setState({ messages });
//       this.testMessage = messages;
//       this.setState({ f: 3 });
//       console.log("22222222");
//       // this.checkRead(this.state.messages, data);

//       // this.checkRead(this.state.messages, data);
//       // this.setState({ messages });
//       // this.setState

//       // if (data.message != "접속") {
//       //   if (data.type === this.userType) {
//       //     const req = {
//       //       text_content: data.message,
//       //       user_type: data.type,
//       //       chat_type: 0,
//       //       answer: 238,
//       //     };
//       //     ChatAPI.saveChat(req);
//       //   }
//       // }

//       // const message = `${data["type"]}: ${data["message"]}`; //+ data["message"];
//       // console.log(message);
//       // document.querySelector("#chat-log").value += message + "\n";
//     };

//     this.chatSocket.onclose = (e) => {
//       console.error("Chat socket closed unexpectedly");
//       // ProposalAPI.getMyProject()
//       //   .then((res) => {
//       //     console.log(res.data);
//       //   })
//       //   .catch((e) => {
//       //     console.log(e);
//       //     console.log(e.response);
//       //   });
//     };

//     // console.log("q");
//   }

//   onSendMessage = (myMessage) => {
//     // const messageInput = document.querySelector("#chat-message-input");
//     // const message = messageInput.value;
//     console.log("front");
//     // console.log(userType);
//     // console.log("RR");
//     // console.log(Date.now());

//     this.chatSocket.send(
//       JSON.stringify({
//         message: myMessage,
//         type: this.userType,
//         time: Date.now(),
//         // bReceive: false,
//       })
//     );
//     // console.log("e");
//     // messageInput.value = "";
//   };

//   render() {
//     // this.onSendMessage("fff");
//     return (
//       <>
//         {/* <textarea id="chat-log" cols="100" rows="20"></textarea>
//           <br />
//           <input id="chat-message-input" type="text" size="100" />
//           <br />
//           <input id="chat-message-submit" type="button" value="Send" /> */}
//         <ChatCardContainer
//           messages={this.testMessage}
//           onSendMessage={this.onSendMessage}
//           currentUserType={this.userType}
//         />
//       </>
//     );
//   }
// }

// export default ChatTestContainer;
