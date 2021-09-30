import React from "react";
import styled from "styled-components";


import Background from "components/Background";
import Router from "next/router";

import { inject, observer } from "mobx-react";
import Buttonv1 from "components/Buttonv1";


const ChatNo = "/static/images/chat/chatno.png"
@inject("Project", "Auth", "Chat")
@observer
class NoChatting extends React.Component {
  async componentDidMount() {
    const { Auth, Project, Partner } = this.props;
    // 로그인되어 있는 지 체크하기
    await Auth.checkLogin();
    console.log(Auth.logged_in_partner)
  }

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
                <img src={ChatNo}/>
                <span>{Auth.logged_in_partner ? "제조 문의를 살펴보고 적합한 일감을 찾아보세요" : "제조문의 사항을 등록하고 전문 제조사를 만나보세요!"}</span>
            </ContentBody>
            
            <Button onClick={() => {
            // 클라이언트인 경우
            if(Auth.logged_in_client){
              Router.push('/request')
            }
            else {
              Project.step_index = 1
              Router.push('/project')
            }
            }
            }>
              {Auth.logged_in_partner ? "제조문의 보기" : "제조문의 등록"}
          </Button>
          
          </Background>
        );
      }
    }
export default NoChatting;

const Button = styled(Buttonv1)`
  width: 158px !important;
  height: 44px !important;
  font-size: 16px;
  font-family: NotoSansCJKkr !important;
  line-height: 1.5;
  letter-spacing: -0.4px;
  margin-top: 22px;
  margin-bottom: 66px;
  z-index: 2;
  :hover {
    background-color: #174aee;
  }
`;

const ContentTitle = styled.div`
  width : 100%;
  height: 63px;
  border: solid 1px #e1e2e4;

`;

const ContentBody = styled.div`
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