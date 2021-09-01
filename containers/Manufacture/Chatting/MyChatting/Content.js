import React from "react";
import styled from "styled-components";


import Background from "components/Background";

import { inject, observer } from "mobx-react";
import * as ChatAPI from "axios/Manufacture/Chat"; 

import ChatInputBox from "./ChatInpuBox"

const LogoNo = "/static/images/chat/logono.png"

@inject("Auth", "Project", "Chat")
@observer
class ChattingContent extends React.Component {
  ChatAreaRef = React.createRef();
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.handleScrollChange = this.handleScrollChange.bind(this);
  }

  state = {
    text: "",
    value: "",
    rows: 1,
    minRows: 1,
    maxRows: 20,
    height: 576,
    chatPageCount: 1,
  };

  // 스크롤을 위로 올리면 이전 채팅이 로딩되도록
  handleScrollChange() {
    if (this.ChatAreaRef.current) {
      if (
        this.ChatAreaRef.current.scrollTop <= 0 &&
        this.props.chatPageLimit - 1 > this.state.chatPageCount
      ) {
      }
    }
  }

  async componentDidMount() {
    const { Chat } = this.props;
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
    // 스크롤을 위로 올리면 이전 채팅이 로딩되도록
    document.addEventListener("scroll", this.handleScrollChange, true);

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    document.removeEventListener("scroll", this.handleScrollChange);
  }

  // width 조절
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
    });
  };

  // 메세지를 입력할 때
  onChange(e) {
    this.setState({ text: e.target.value });
  }

  // 메세지를 보낼 때
  onSubmit(e) {
    e.preventDefault();

    // 텍스트 초기화
    this.setState({ text: "" });

    // 빈메세지 제거
    if (this.state.text.length > 0) {
      this.props.onSendMessage(this.state.text);
    }
  }

  // 메세지 읽음 처리
  checkRead = (fullMessage, currentMessage) => {

    fullMessage.forEach((element) => {
      if (
        currentMessage.member != element.member &&
        element.time <= currentMessage.time
      ) {
        element.bRead = true;
      }
    });
  };

  render() {
    const { Auth, Project, Chat } = this.props;
    console.log(Chat.chatcontent_arr.count)
    return (
      <Background
      
        backgroundColor={"#ffffff"}
        style={{height: 1016, width: 840, marginRight: "auto"}}
      >
        <ContentTitle>
        </ContentTitle>

        <ContentBody>
          {Chat.chatcontent_arr.count > 0 && Chat.chatcontent_arr.results.map((data) => {
            console.log(data)
            return (
                <>
                
                  {/* 파트너일 때 ? 클라이언트일 때 */}
                  {Auth.logged_in_partner ? 
                    ( data.user_type == 0 ? 
                      <Left>
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
 
                      <Text state={"Left"} >{data.text_content}</Text>
                      </Left>
                    : 
                      <Right>
                      <Text state={"Right"}>{data.text_content}</Text>
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
                      </Right> 
                    )
                  :
                    ( data.user_type == 1 ? 
                      <Right>
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
 
                      <Text state={"Right"}>{data.text_content}</Text>
                      </Right>
                    : 
                      <Left>
                      <Text state={"Left"}>{data.text_content}</Text>
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
                      </Left> 
                    )
                  }
                  
                </>
              )
            })
          }
        </ContentBody>
        <ChatInputBox/>

      
      </Background>
    );
  }
}

export default ChattingContent;

const ContentLogo = styled.div`
  width : 37px;
  height : 37px;
  margin-right : 16px;
  margin-left : 16px;
  > img {
    width : 100%;
  }
`
const ContentTitle = styled.div`
  width : 100%;
  height: 63px;
  border: solid 1px #e1e2e4;

`;

const ContentBody = styled.div`
  width : 100%;
  height : 809px;
  > div {
    display : flex;
  }
`;

const Left = styled.div`
  margin-left : 24px;
  margin-top : 44px;
`

const Right = styled.div`
  justify-content : flex-end;
  margin-top : 24px;
  margin-left : auto;
  margin-right : 16px;
`

const Text = styled.div`
  width: 434px;
  padding: 10px 13px 10px 16px;
  background-color: #eee;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.16px;
  text-align: left;
  color: #1e2222;
  border-radius : ${(props) => (props.state == "Left" ? "0px 10px 10px 10px;" : " 10px 0px 10px 10px;")}
`