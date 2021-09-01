import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";

import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

const file_img = "static/images/chat/file.png";


@inject("Project", "Partner", "Chat")
@observer
class ChatInputBox extends React.Component {
  state = {
    text: "",
  };

  // 메세지를 입력할 때
  onChange(e) {
    this.setState({ text: e.target.value });
  }

  // 메세지를 보낼 때
  onSubmit(e) {
    const { Chat } = this.props;
    e.preventDefault();

    // 텍스트 초기화
    this.setState({ text: "" });

    // 빈메세지 제거
    if (this.state.text.length > 0) {
      Chat.SendMessage(this.state.text);
    }
  }

  // 채팅 검색창을 렌더해주는 함수
  render() {
    return (
      <Container>
              <TypingBox>
                <SubmitForm
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      this.onSubmit(e);
                    }
                  }}
                >
                  <textarea
                    placeholder="메세지를 입력하세요."
                    autofocus="true"
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder = "메세지를 입력하세요.")
                    }
                    type="text"
                    className={"textarea"}
                    placeholderStyle={{ fontWeight: "400" }}
                    onChange={(e) => this.onChange(e)}
                    value={this.state.text}
                  />

                <ChatTool>
                  <img
                    src={file_img}
                    onClick={() => {
                      const realInput = document.querySelector("#FileInput");
                      console.log(realInput);
                      realInput.click();
                    }}
                    onChange={(e) => {
                        console.log("onChange");
                        this.onChangeFile(e);
                    }}
                  ></img>
                  <SendButton
                    style={{marginLeft : "auto", marginRight : 16, marginBottom : 12}}
                    onClick={(e) => {
                      this.setState({ ...this.state, rows: 1, height: 576 });
                      this.onSubmit(e);
                    }}
                  >
                    전송
                  </SendButton>
                </ChatTool>
                </SubmitForm>
              </TypingBox>
            
      </Container>
    );
  }
}

export default ChatInputBox;

const TypingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 26px;
  margin-right: 22px;
  width : 846px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width : 100%;
`;

const ChatTool = styled.div`
  display: flex;
`
const SubmitForm = styled.form`
    width : 100%;
    height: 114px;
    border-radius: 5px;
    border: solid 0.8px #c6c7cc;
    background-color: #fff;
    
  > textarea {
    width : 95%;
    font-size: 15px;
    letter-spzcing: -0.45px;
    color: #282c36;
    border: none;
    overflow: auto;
    height : 38px;
    font-family: inherit;
    resize : none;
    margin : 12px 0px 12px 16px;

    :focus {
      outline: none;
    }
    :placeholder {
      font-weight: 300;
    }
    white-space: pre-line;
  }
  > input {
  }
  > div > img {
    margin : 12px 0px 12px 16px;
    width : 22px;
    height : 22px;
  }

`;

const SendButton = styled.button`
  font-size: 16px;
  background-color: #0933b3;
  color: white;
  border: none;
  border-radius: 21px;
  height: 36px;
  width: 71px;
`;

