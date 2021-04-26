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
    };
  }

  chatSocket = new WebSocket("wss://test.boltnnut.com/ws/chat/" + `1234` + "/");
  userType = null;
  // componentDidMount = () => {
  //   this.setState({ messages: [] });
  // };
  // messages = [{}];
  // onSendMessage = null;
  checkRead = (fullMessage, currentMessage) => {
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
    ChatAPI.loadChat(238).then((res) => {
      console.log(res.data.results);
      res.data.results.forEach((message) => {
        const Messages = this.state.messages;
        Messages.push({
          member: message.user_type,
          text: message.text_content,
          time: message.createdAt,
          bRead: true,
        });
      });
    });

    // this.setState({ messages: [] });
    this.chatSocket.onopen = async () => {
      await this.props.Auth.checkLogin();
      if (this.props.Auth.logged_in_user) {
        this.userType = this.props.Auth.logged_in_user.type;
      }
      console.log("onOpen() 호출");
      this.chatSocket.send(
        JSON.stringify({
          message: "접속완료",
          type: this.userType,
          time: Date.now(),
          bReceive: true,
        })
      );
    };
    // console.log(this.props.Auth.logged_in_user.type);

    console.log(this.chatSocket);

    this.chatSocket.onmessage = (e) => {
      // console.log("Aaaasdasd");
      const data = JSON.parse(e.data);
      console.log(data);
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

      console.log(data.bReceive);
      const messages = this.state.messages;
      if (!data.bReceive) {
        if (data.member != this.userType) {
          console.log(
            "수신완료체크!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
          );
          this.chatSocket.send(
            JSON.stringify({
              message: "수신완료",
              type: this.userType,
              time: Date.now(),
              bReceive: true,
            })
          );
        }
        messages.push({
          member: data["type"],
          text: data["message"],
          time: data["time"],
          bRead: false,
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

      if (data.message != "접속완료" && data.message != "수신완료") {
        if (data.type === this.userType) {
          const req = {
            text_content: data.message,
            user_type: data.type,
            chat_type: 0,
            answer: 238,
          };
          ChatAPI.saveChat(req);
          // console.log(this.state.messages.length);
          // AnswerAPI.getAnswerById(238).then((res) => console.log(res.data));
        }
      }

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
    // console.log(Date.now());

    this.chatSocket.send(
      JSON.stringify({
        message: myMessage,
        type: this.userType,
        time: Date.now(),
        bReceive: false,
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
        <ChatCardContainer
          messages={this.state.messages}
          onSendMessage={this.onSendMessage}
          currentUserType={this.userType}
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
