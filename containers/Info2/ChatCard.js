import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
//import Button from "components/Buttonv2";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import * as ChatAPI from "axios/Chat";

const star_img = "static/images/main/star_gray.png";
const prevent_img = "static/images/info.png";
const search_img = "static/images/crown.png";
const logo_img = "static/images/crown.png";
const close_img = "static/images/badge_close.png";
const clip_img = "static/images/clip.png";
const camera_img = "static/images/camera.png";
const emoticon_img = "static/images/emoticon.png";
const pass2_img = "static/images/pass2.png";

@inject("Project", "Partner")
@observer
class ChatCardContainer extends React.Component {
  chatSocket = new WebSocket("wss://test.boltnnut.com/ws/chat/" + `1234` + "/");
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    text: "",
    value: "",
    rows: 1,
    minRows: 1,
    maxRows: 20,
    height: 576,
  };
  async componentDidMount() {
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  onChangeHandler = (event) => {
    const textareaLineHeight = 34;
    const { minRows, maxRows } = this.state;
    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      text: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
      height:
        currentRows < maxRows
          ? currentRows === 1
            ? 576 - (currentRows - 1) * 32
            : 576 - (currentRows - 2) * 32
          : 0,
      //height: this.state.height > 35 ? 580 - (currentRows - 1) * 35 : 0,
    });
    // console.log(currentRows);
    // console.log(this.state.height);
  };

  onChange(e) {
    this.setState({ text: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("onsubmit()");
    this.setState({ text: "" });

    // 빈메세지 제거
    if (this.state.text.length > 0) {
      //console.log(this.state.text);
      this.props.onSendMessage(this.state.text);
    }
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

  onChangeFile = async (e) => {};

  renderMessage(message) {
    // this.checkRead(this.props.messages, message);
    //console.log(toJS(message));

    const { member, text, time, bRead } = message;
    const { currentUserType } = this.props;
    const messageFromMe = member === currentUserType;
    const text_message = { text };
    const temp = text;

    // console.log(member);
    // console.log(currentUserType);
    //const temp2 = text.split("/").pop();

    //const messageFromMe = true;
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
          {!messageFromMe && (
            <Message_User>
              <img src={logo_img} />
            </Message_User>
          )}
          {/* {!messageFromMe && <Message_User>상대</Message_User>} */}
          {text_message.text && text_message.text.indexOf("https://") > -1 ? (
            <Message_text fromMe={messageFromMe}>
              {console.log("파일")}
              {console.log(text_message.text.split("/").pop())}
              <a href={temp} download>
                {decodeURI(text_message.text.split("/").pop())}
              </a>
              {/* <img src={temp} /> */}
            </Message_text>
          ) : (
            <Message_text fromMe={messageFromMe}>{text}</Message_text>
          )}
          <Message_Info>
            {bRead && (
              <>
                읽음
                <br />
              </>
            )}
            {time && time.slice(0, 10) + " " + time.slice(11, 16)}
          </Message_Info>
        </MessageContent>
      </Messages_li>
    );
  }

  render() {
    const { messages, Partner } = this.props;
    const { width } = this.state;
    // console.log(this.props.messages);
    return (
      <Container>
        <Card>
          <ChattingRoom>
            <Chat>
              <Header>
                <Font24>
                  {width > 779.98
                    ? Partner.partnerdata && Partner.partnerdata.name
                    : ""}
                </Font24>
                <img src={prevent_img} />
                <img src={star_img} />
              </Header>
              <MessageList height={this.state.height}>
                <div style={{ padding: "0 10px 0 10px", height: "80%" }}>
                  {messages.map((m) => this.renderMessage(m))}
                </div>
              </MessageList>
              <TypingBox>
                <SubmitForm
                  // onSubmit={(e) => this.onSubmit(e)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      this.onSubmit(e);
                    }
                  }}
                  bottom={this.state.rows}
                  // onKeyPress={() => console.log("RR")}
                >
                  <textarea
                    placeholder="메세지를 입력하세요."
                    autofocus="true"
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder = "메세지를 입력하세요.")
                    }
                    rows={this.state.rows}
                    type="text"
                    className={"textarea"}
                    placeholderStyle={{ fontWeight: "400" }}
                    onChange={(e) => this.onChangeHandler(e)}
                    value={this.state.text}
                  />
                  {/* // onClick={(event) => fileSelector({nextTitle: 8}, 1)}
                  /> */}
                  <input
                    id="FileInput"
                    style={{ border: "1px solid red", display: "none" }}
                    type="file"
                    onChange={(e) => {
                      console.log("onChange");
                      this.onChangeFile(e);
                    }}
                  />
                  <img
                    src={clip_img}
                    onClick={() => {
                      const realInput = document.querySelector("#FileInput");
                      console.log(realInput);
                      realInput.click();
                      //realInput.innerHTML = "";
                    }}
                  ></img>
                  <img src={camera_img} />
                  <img src={emoticon_img} />
                  <SendButton
                    onClick={(e) => {
                      // e.preventDefault();
                      console.log("hellp");
                      this.setState({ ...this.state, rows: 1, height: 576 });
                      this.onSubmit(e);
                    }}
                  >
                    전송
                  </SendButton>
                  {/* <div onClick={this.executeScroll}>f</div> */}
                </SubmitForm>
              </TypingBox>
            </Chat>
            {width > 779.98 ? (
              <Info>
                <Profile>
                  <img
                    src={close_img}
                    onClick={() => {
                      console.log(this.props.Project.chatModalActive);
                      this.props.Project.chatModalActive = false;
                      this.props.socketClose();
                    }}
                  />
                  <ProfileImg>
                    <img
                      src={Partner.partnerdata && Partner.partnerdata.logo}
                    />
                  </ProfileImg>
                  <Font20>
                    {Partner.partnerdata && Partner.partnerdata.name}
                  </Font20>
                  <Font18>
                    {Partner.partnerdata && Partner.partnerdata.user.phone}
                  </Font18>
                  <a
                    href={Partner.partnerdata && Partner.partnerdata.file}
                    download
                  >
                    <Button style={{ marginBottom: "20px" }}>
                      회사 소개서 보러가기
                      <img src={pass2_img} />
                    </Button>
                  </a>
                  <Button onClick={this.props.shareButtonClick}>
                    비공개 정보 공개하기
                  </Button>
                </Profile>
                <PartnerList>
                  <Font20 style={{ alignSelf: "flex-start" }}>
                    파트너 목록
                  </Font20>
                  <PartnerContainer></PartnerContainer>
                </PartnerList>
              </Info>
            ) : (
              ""
            )}
          </ChattingRoom>
        </Card>
      </Container>
    );
  }
}

export default ChatCardContainer;

const Messages_li = styled.li`
  display: flex;
  margin-top: 10px;
  flex-direction: ${(props) => (!props.fromMe ? "row" : "row-reverse")};
  text-align: ${(props) => (!props.fromMe ? "left" : "right")};
  padding-bottom: 10px;
`;

const MessageContent = styled.div`
  word-break: break-all;
  display: flex;
  flex-direction: ${(props) => (!props.fromMe ? "row" : "row-reverse")};
`;
const Message_Info = styled.div`
  display: flex;
  align-items: flex-end;
  //   margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  line-height: 30px;
  letter-spacing: -0.14px;
  color: #999999;
`;

const Message_User = styled.div`
  display: block;
  color: gray;
  font-size: 14px;
  padding-bottom: 4px;

  padding: 10px;
  max-width: 400px;
  margin: 0;
  border-radius: 34px;
  width: 34px;
  height: 34px;

  //background-color: purple;
  border: 1px solid #c6c7cc;

  color: white;
  display: inline-block;

  //   margin-right: 10px;
  margin-right: 10px;
  align-self: center;
  position: relative;
  box-sizing: border-box;
  > img {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 15%;
    left: 15%;
  }
`;
const Message_text = styled.div`
  //padding: 10px;
  padding: 0 24px;
  max-width: 400px;
  margin: 0;
  border-radius: ${(props) =>
    props.fromMe ? "7px 7px 0 7px" : "7px 7px 7px 0"};
  background-color: ${(props) => (props.fromMe ? "#0933b3" : "#f6f6f6")};
  //color: white;
  color: ${(props) => (props.fromMe ? "#ffffff" : "#282c36")};
  font-weight: 500;
  display: inline-block;
  margin-right: 10px;
  min-height: 55px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 40px;
  letter-spacing: -0.45px;
  > a {
    color: ${(props) => (props.fromMe ? "#ffffff" : "#282c36")};
  }
`;

const ChattingRoom = styled.div`
  //padding: 20px 0;
  //max-width: 900px;
  background-color: white;
  width: 100%;
  margin: 0 auto;
  //list-style: none;
  padding-left: 0;
  //flex-grow: 1;
  //overflow: auto;
  //border: 2px solid gray;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin-bottom: 10px;
  //border: 3px solid green;
  display: flex;
  height: 80%;
`;
const MessageList = styled.ul`
  padding: 20px 0;
  //max-width: 900px;
  width: 100%;
  margin: 0 auto;
  list-style: none;
  padding-left: 0;
  flex-grow: 1;
  overflow: auto;
  // border: 2px solid gray;
  margin-bottom: 10px;
  //border: 3px solid blue;
  //height: 60%;
  //height: 580px;
  height: ${(props) => (props.height ? props.height : "0")}px;
  border: 1px solid #c6c7cc;
  border-left: none;
  border-right: none;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const TypingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 147px;
  padding: 30px 28px 35px 28px;
  box-sizing: border-box;
  //position: relative;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 80vw;
  margin-top: 160px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InputBox = styled.input`
  padding: 5px;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 3px;
  //border: 1px solid orangered;
  flex-grow: 1;
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  height: 100%;
`;

const SubmitForm = styled.form`
  display: flex;
  width: 90%;
  justify-content: space-between;
  //max-width: 900px;
  margin: 0 auto;
  height: 82px;
  background-color: #f6f6f6;
  //background-color: #d6d6d6;
  align-items: center;
  //position: relative;
  position: absolute;
  bottom: 5%;
  > textarea {
    padding: 5px;
    box-sizing: border-box;
    font-size: 16px;
    border-radius: 3px;
    //border: 1px solid orangered;
    flex-grow: 1;
    background-color: #f6f6f6;
    //background-color: #d6d6d6;
    //border: 1px solid #ffffff;
    border: none;
    //height: 100%;

    resize: none;

    //width: 100%;

    font-size: 15px;
    line-height: 34px;
    letter-spzcing: -0.45px;
    color: #282c36;

    overflow: auto;
    height: auto;
    font-family: inherit;

    position: absolute;
    bottom: ${(props) => (props.bottom === 1 ? "20" : "0")}px;
    width: 100%;
    padding-right: 180px;
    padding-left: 24px;

    :focus {
      outline: none;
    }
    :placeholder {
      font-weight: 300;
    }
    white-space: pre-line;
  }
  > input {
    position: absolute;
    //left: 75%;
    right: 140px;
    width: 30px;
  }
  > img {
    position: absolute;
  }
  > img:nth-of-type(1) {
    //left: 75%;
    right: 140px;
  }
  > img:nth-of-type(2) {
    //left: 80%;
    right: 110px;
  }
  > img:nth-of-type(3) {
    //left: 85%;
    right: 80px;
  }
`;

const SendButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  background-color: #0933b3;
  color: white;
  border: none;
  border-radius: 2px;
  margin-left: 10px;
  height: 38px;
  width: 69px;
  position: absolute;
  //left: 90%;
  right: 10px;
`;

const Chat = styled.div`
  //border: 3px solid #133245;
  flex-grow: 3;
  //height: 100%;
  position: relative;
`;

const Info = styled.div`
  //border: 3px solid #abc324;
  //flex-grow: 1;
  border-left: 1px solid #c6c7cc;
  //border-top: none;
  //border-bottom: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  height: 86px;
  display: flex;
  align-items: center;
  padding-left: 26px;
  padding-right: 46px;
  > img {
    margin-left: 16px;
  }
`;

const Font24 = styled(Content.FontSize24)`
  color: #282c36;
  font-weight: bold;
  width: 85%;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  > img {
    width: 34px;
    height: 34px;
    align-self: flex-end;
  }
`;
const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #e1e2e4;
  border-radius: 134px;
  position: relative;
  margin-bottom: 10px;
  margin-top: 30px;
  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
  }
`;

const Font20 = styled(Title.FontSize20)`
  color: #282c36;
  font-weight: 500;
  margin-bottom: 6px;
`;

const Font18 = styled(Content.FontSize18)`
  color: #86888c;
  font-weight: 500;
  margin-bottom: 33px;
`;

const Button = styled.button`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  width: 249px;
  height: 41px;
  background-color: #ffffff;
  font-size: 18px;
  line-height: 40px;
  letter-spacing: -0.45px;
  color: #86888c;
  font-weight: normal;
  margin: 0 18px;
`;

const PartnerList = styled.div`
  margin-top: 126px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const PartnerContainer = styled.div`
  width: 100%;
`;
const PartnerCard = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #e1e2e4;
  border-bottom: 1px solid #e1e2e4;
  height: 73px;
  //padding: 12px 20px 11px 18px;
  box-sizing: border-box;
  justify-content: space-between;
  > div {
    width: 46px;
    height: 46px;
    position: relative;
    //background-color: blue;
    border: 1px solid #c6c7cc;
    border-radius: 46px;
    > img {
      position: absolute;
      width: 32px;
      height: 32px;
      top: 15%;
      left: 15%;
    }
  }
  > span:last-child {
    font-size: 10px;
    line-height: 40px;
    letter-spacing: -0.25px;
    color: #999999;
  }
`;
