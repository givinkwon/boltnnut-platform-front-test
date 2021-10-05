import React from "react";
import styled from "styled-components";


import Background from "components/Background";

import { inject, observer } from "mobx-react";
import * as ChatAPI from "axios/Manufacture/Chat"; 

import ChatInputBox from "./ChatInpuBox"
import Chat from "../../../../stores/Manufacture/Chat";
import { NonceProvider } from "react-select";

const LogoNo = "/static/images/chat/logono.png"
const ChatNo = "/static/images/chat/chatno.png"
const file_img = "/static/images/project/fileimg.svg";

@inject("Auth", "Project", "Chat")
@observer
class ChattingContent extends React.Component {

  async componentDidMount() {
    const { Auth, Project, Partner } = this.props;
    // 로그인되어 있는 지 체크하기
    await Auth.checkLogin();
    console.log(Auth.logged_in_partner)

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

  // 변화 때마다 scrolltop를 변화시켜줌 => 이전 메세지 로딩
  onChangeHandler = (event) => {
    const { Chat } = this.props;
    console.log(event.target.scrollHeight, event.target.scrollTop, event.target.clientHeight)
    // 전체 hight - 스크롤에 숨겨진 사이즈 = 현재 보이는 사이즈 => 스크롤을 가장 위로 한 경우
    // if(event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight){
    // }

    // 전체 컨테이너가 선택되었을 때 + 가장 상단 스크롤
    if(event.target.scrollTop == 0 && event.target.scrollHeight){
      Chat.chatPageCount += 1
      Chat.loadPrevMessages(Chat.chatPageCount)
    }
  };
  
  render() {
    const { Auth, Project, Chat } = this.props;
    console.log(Chat.chatMessages)
    return (
      <Background
      
        backgroundColor={"#ffffff"}
        style={{height: 1016, width: 840, marginRight: "auto"}}
      >

         <ContentTitle style={{height: Chat.chatMessages.length == 0 ? ("118px") : ("68px") }}>
        </ContentTitle>

        {/* 채팅방을 선택하지 않았을 때 */}
        {Chat.chatMessages.length == 0 && 
        (
            <ContentBodyNO>
                <img src={ChatNo}/>
                <span>채팅방을 선택해주세요</span>
            </ContentBodyNO>

        )
        }

        <ContentBody onWheel={(e) => this.onChangeHandler(e)}>
          {Chat.chatMessages.length > 0 && Chat.chatMessages.map((data) => {
            console.log(Auth.logged_in_partner, data)
            return (
                <>

                  {/* 파트너일 때 ? 클라이언트일 때 */}
                  {Auth.logged_in_partner ? 
                    ( data.member == 0 ? 
                      <Left>
                      <div>{data.bRead && "읽음"}</div>
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
 
                      {/* 텍스트일 때 */}
                      {data.chat_type == 0 && <Text state={"Left"} >{data.text}</Text>}
                      {/* 파일일 때 */}
                      {data.chat_type == 1 && <Text state={"Left"} ><a href={data.file} download><img src={file_img}/>{data.file.split('/')[data.file.split('/').length -1]}</a></Text>}
                      {/* 이미지일 때 */}
                      {data.chat_type == 2 && <Text state={"Left"} ><a href={data.file} download><img src={file_img}/>{data.file.split('/')[data.file.split('/').length -1]}</a></Text>}
                     
                      </Left>
                    : 
                      <Right>
                      {/* 텍스트일 때 */}
                      {data.chat_type == 0 && <Text state={"Right"} >{data.text}</Text>}
                      {/* 파일일 때 */}
                      {data.chat_type == 1 && <Text state={"Right"} ><a href={data.file} download><img src={file_img}/>{data.file.split('/')[data.file.split('/').length -1]}</a></Text>}
                      {/* 이미지일 때 */}
                      {data.chat_type == 2 && <Text state={"Right"} ><a href={data.file} download><img src={file_img}/>{data.file.split('/')[data.file.split('/').length -1]}</a></Text>}
                     
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
                      <div>{data.bRead && "읽음"}</div>
                      </Right> 
                    )
                  :
                    ( data.member == 1 ? 
                      <Right>

                      {/* 텍스트일 때 */}
                      {data.chat_type == 0 && <Text state={"Left"} >{data.text}</Text>}
                      {/* 파일일 때 */}
                      {data.chat_type == 1 && <Text state={"Left"} ><a href={data.file} download><img src={file_img}/>{data.file.split('/')[data.file.split('/').length -1]}</a></Text>}
                      {/* 이미지일 때 */}
                      {data.chat_type == 2 && <Text state={"Left"} ><a href={data.file} download><img src={file_img}/>{data.file.split('/')[data.file.split('/').length -1]}</a></Text>}
                      
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
                                           
                      <div>{data.bRead && "읽음"}</div>
                      </Right>
                    : 
                      <Left>
                      <div>{data.bRead && "읽음"}</div>
                      <ContentLogo>
                        <img src = {LogoNo}></img>
                      </ContentLogo>
                      {/* 텍스트일 때 */}
                      {data.chat_type == 0 && <Text state={"Right"} >{data.text}</Text>}
                      {/* 파일일 때 */}
                      {data.chat_type == 1 && <Text state={"Right"} ><a href={data.file} download><img src={file_img}/>{data.file.split('/')[data.file.split('/').length -1]}</a></Text>}
                      {/* 이미지일 때 */}
                      {data.chat_type == 2 && <Text state={"Right"} ><a href={data.file} download><img src={file_img}/>{data.file.split('/')[data.file.split('/').length -1]}</a></Text>}
                     
                      </Left> 
                    )
                  }
                  
                </>
              )
            })
          }
        </ContentBody>
        {Chat.chatMessages.length > 0 && <ChatInputBox/> }

      
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
  padding-bottom : 10%;
  overflow-y : auto;
  overflow-x : hidden;
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
  word-break:break-all;
  border-radius : ${(props) => (props.state == "Left" ? "0px 10px 10px 10px;" : " 10px 0px 10px 10px;")}
`


const ContentBodyNO = styled.div`
  width : 100%;
  height : 809px;
  text-align : center;
  display : contents;
  
  > img {
    margin-top : 300px;
    margin-bottom : 26px;
    margin-left : auto;
    margin-right : auto;
    width : 140px;
    height : 140px;
  }

  > span {
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.89;
    letter-spacing: -0.45px;
    text-align: left;
    color: #282c36;
  }
`;