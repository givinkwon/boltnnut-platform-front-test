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