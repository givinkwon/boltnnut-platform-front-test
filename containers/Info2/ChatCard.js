import React from "react";
import styled, { css } from "styled-components";

class ChatCardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    text: "",
  };
  componentDidMount() {}
  onChange(e) {
    this.setState({ text: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("onsubmit()");
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }
  executeScroll = () =>
    this.myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  checkRead = (fullMessage, currentMessage) => {
    // console.log(fullMessage);
    // console.log(currentMessage);
    // console.log(this.props.currentUserType);

    fullMessage.forEach((element) => {
      if (
        currentMessage.member != element.member &&
        element.time <= currentMessage.time
      ) {
        element.bRead = true;
      }
    });
  };
  renderMessage(message) {
    // this.checkRead(this.props.messages, message);

    const { member, text, time, bRead } = message;
    const { currentUserType } = this.props;
    const messageFromMe = member === currentUserType;
    // setTimeout(this.executeScroll, 100);
    // const messageFromMe = true; //임시
    const scrollTo = (ref) => {
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    return (
      <Messages_li fromMe={messageFromMe}>
        {/* <span
          className="avatar"
          //   style={{ backgroundColor: member.clientData.color }}
          style={{ backgroundColor: "red" }}
        /> */}
        <MessageContent ref={scrollTo} fromMe={messageFromMe}>
          {!messageFromMe && <Message_User>상대</Message_User>}
          <Message_text>{text}</Message_text>
          <Message_Info>
            {bRead && (
              <>
                읽음
                <br />
              </>
            )}
            {time}
          </Message_Info>
        </MessageContent>
      </Messages_li>
    );
  }

  render() {
    const { messages } = this.props;
    // console.log(this.props.messages);
    return (
      <Card>
        <MessageList>
          <div style={{ padding: "0 10px 0 10px" }}>
            {messages.map((m) => this.renderMessage(m))}
          </div>
        </MessageList>
        <div>
          <SubmitForm onSubmit={(e) => this.onSubmit(e)}>
            <InputBox
              onChange={(e) => this.onChange(e)}
              value={this.state.text}
              type="text"
              placeholder="Enter your message and press ENTER"
              autofocus="true"
            />
            <SendButton>Send</SendButton>
            {/* <div
              onClick={() => {
                this.setState({ f: 3 });
                // console.log(this.props.messages);
                // this.setState({ f: 3 });
                // this.props.messages.forEach((element) => {
                //   // if (
                //   //   currentMessage.member != element.member &&
                //   //   element.time <= currentMessage.time
                //   // ) {
                //   element.bRead = true;
                //   // }
                // });
              }}
            >
              f
            </div> */}
          </SubmitForm>
        </div>
      </Card>
    );
  }
}

export default ChatCardContainer;

const Messages_li = styled.li`
  display: flex;
  margin-top: 10px;
  flex-direction: ${(props) => (!props.fromMe ? "row" : "row-reverse")};
  text-align: ${(props) => (!props.fromMe ? "left" : "right")};
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: ${(props) => (!props.fromMe ? "row" : "row-reverse")};
`;
const Message_Info = styled.div`
  display: flex;
  align-items: flex-end;
  //   margin-left: 10px;
  margin-right: 10px;
`;

const Message_User = styled.div`
  display: block;
  color: gray;
  font-size: 14px;
  padding-bottom: 4px;

  padding: 10px;
  max-width: 400px;
  margin: 0;
  border-radius: 12px;
  background-color: purple;
  color: white;
  display: inline-block;

  //   margin-right: 10px;
  margin-right: 10px;
`;
const Message_text = styled.div`
  padding: 10px;
  max-width: 400px;
  margin: 0;
  border-radius: 12px;
  background-color: cornflowerblue;
  color: white;
  display: inline-block;
  margin-right: 10px;
`;

const MessageList = styled.ul`
  padding: 20px 0;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  list-style: none;
  padding-left: 0;
  flex-grow: 1;
  overflow: auto;
  border: 2px solid gray;
  margin-bottom: 10px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50vh;
`;

const InputBox = styled.input`
  padding: 5px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid orangered;
  flex-grow: 1;
`;

const SubmitForm = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto 40px;
`;

const SendButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  background-color: orangered;
  color: white;
  border: none;
  border-radius: 8px;
  margin-left: 10px;
`;
