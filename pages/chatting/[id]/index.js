import React, { Component } from "react";
import { render } from "react-dom";
import { ChatFeed, Message } from "react-chat-ui";
import { inject, observer } from "mobx-react";

@inject("Auth")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        new Message({ id: 1, message: "Hi", senderName: "Partner" }), // Gray bubble
        new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
      ],
    };
  }

  componentDidMount() {
    const { Auth } = this.props;
    const roomName = location.pathname.substr(1);
    console.log(roomName);
    Auth.reloadUserInfo;
    console.log(Auth);
    var socketPath = "wss://api.boltnnut.com" + "/ws/" + roomName;

    const chatSocket = new WebSocket(socketPath);

    chatSocket.onmessage = (e) => {
      const { Auth } = this.props;
      const messages = this.state;

      var data = JSON.parse(e.data);
      var message = { text: data.message };
      console.log(Auth.type);
      this.state.messages.push(new Message({ id: 0, message: data.message }));
      this.setState({ messages: this.state.messages });
    };

    chatSocket.onclose = (e) => {
      console.error("Chat socket closed unexpectedly");
    };

    document.querySelector("#chat-message-input").focus();
    document.querySelector("#chat-message-input").onkeyup = (e) => {
      this.clickSubmitMessage;
    };

    document.querySelector("#chat-message-submit").onclick = (e) => {
      var messageInputDom = document.querySelector("#chat-message-input");
      var message = messageInputDom.value;

      chatSocket.send(
        JSON.stringify({
          message: message,
        })
      );
      messageInputDom.value = "";
    };
  }

  render() {
    const { Auth } = this.props;

    return (
      <div>
        <ChatFeed
          messages={this.state.messages} // Boolean: list of message objects
          isTyping={false} // Boolean: is the recipient typing
          hasInputField={false} // Boolean: use our input, or use your own
          showSenderName // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={{
            text: {
              fontSize: 30,
            },
            chatbubble: {
              borderRadius: 70,
              padding: 40,
            },
          }}
        />

        <input id="chat-message-input" type="text" size="100" />
        <br />
        <input
          id="chat-message-submit"
          type="button"
          className="button"
          value="Send"
        />
      </div>
    );
  }
}

export default App;
