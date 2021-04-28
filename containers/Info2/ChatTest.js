import React from "react";
import * as ProposalAPI from "axios/Proposal";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";
import ChatCardContainer from "./ChatCard";
import * as ChatAPI from "axios/Chat";

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
  // messages = [{}];
  // onSendMessage = null;
  async componentDidMount() {
    this.chatSocket.onopen = async () => {
      await this.props.Auth.checkLogin();
      if (this.props.Auth.logged_in_user) {
        this.userType = this.props.Auth.logged_in_user.type;
      }
      console.log("onOpen() 호출");
      this.chatSocket.send(
        JSON.stringify({
          message: "접속",
          type: this.userType,
          time: Date.now(),
        })
      );
    };
    // console.log(this.props.Auth.logged_in_user.type);

    // console.log(this.chatSocket);

    this.chatSocket.onmessage = (e) => {
      // console.log("Aaaasdasd");
      const data = JSON.parse(e.data);
      console.log(data);
      // if (data.type != 2) {
      if (data.message != "접속") {
        const messages = this.state.messages;
        messages.push({ member: data["type"], text: data["message"] });
        this.setState({ messages });

        if (data.type === this.userType) {
          const req = {
            text_content: data.message,
            user_type: data.type,
            chat_type: 0,
            answer: 238,
          };
          ChatAPI.saveChat(req);
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
