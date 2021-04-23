import React from "react";
import ChatTestContainer from "./ChatTest";

class ChatIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "",
      isIn: true,
    };
    this.roomHandler = this.roomHandler.bind(this);
    this.enterHandler = this.enterHandler.bind(this);
  }

  roomHandler = (e) => {
    this.setState({
      room: e.target.value,
    });
  };

  enterHandler = () => {
    if (this.state.isIn) {
      this.setState({
        isIn: false,
      });
    } else {
      this.setState({
        isIn: true,
      });
    }
  };

  render() {
    return (
      <>
        {this.state.isIn ? (
          <ChatTestContainer roomName={this.state.room} />
        ) : (
          <>
            채팅방 입력 하세요
            <br />
            <input
              id="room-name-input"
              type="text"
              size="100"
              onChange={this.roomHandler}
            />
            <br />
            <input
              id="room-name-submit"
              type="button"
              value="Enter"
              onClick={this.enterHandler}
            />
          </>
        )}
      </>
    );
  }
}

export default ChatIndexContainer;
