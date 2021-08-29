import React from "react";
import styled from "styled-components";


import Background from "components/Background";

import { inject, observer } from "mobx-react";


@inject("Auth", "Project")
@observer
class ChattingHeader extends React.Component {
  async componentDidMount() {
    const { Auth, Project } = this.props;
    // 로그인되어 있는 지 체크하기
    await Auth.checkLogin();

    // 클라이언트 로그인이 되어 있으면 프로젝트 호출하여 데이터 담은 후 answer 데이터 담기
    if (Auth.logged_in_client) {
        // 프로젝트 데이터 호출

        await Project.getProject("myproject", Auth.logged_in_client.id);
        
        // 담은 데이터 map
        Project.projectDataList.map((data, idx) => {
        // answer_set에 있는 파트너 id 가지고 오기
        data.answer_set.map((answer, idx) => {
            console.log(answer)
            })
        })
    }

    // 파트너 로그인이 되어 있으면 프로젝트 호출하여 데이터 담은 후 answer 데이터 담기
    if (Auth.logged_in_partner) {
      // 프로젝트 데이터 호출
        await Project.getProject("myproject", "", Auth.logged_in_partner.id);
        
        
          // 채팅 로그 가져오기
          // const req = {
          //   params: {
          //     answer : answer_data.id,
          //   },
          // };
      
          // ChatAPI.getChat(req)
          // .then((res) => {
          //   console.log(res)
          //   })
        //  })
        //})
    }
  }
  render() {
    const { Auth, Project } = this.props;
    return (
      <Background
      
        backgroundColor={"#ffffff"}
        style={{height: 1016, width: 360, marginLeft: "auto", border: "solid 1px #e1e2e4"}}
      >
        <HeaderTitle>
                <span>프로젝트 목록</span>
        </HeaderTitle>

        {/* 파트너인 경우 => 의뢰서 정보 가져오기 */}
        {Auth.logged_in_partner &&
          Project.projectDataList.map((data, idx) => {
            // request_set에 있는 정보 가져오기
            data.request_set.map((request_data, idx) => {
              console.log(request_data.name)
              return(
                
                <HeaderContent>
                  {request_data.name}
                </HeaderContent>
                
              )
            })
          })
        }

      
      </Background>
    );
  }
}

export default ChattingHeader;

const HeaderTitle = styled.div`
  width : 100%;
  height: 63px;
  border-bottom: solid 1px #e1e2e4;
  > span {
    font-size: 19px;
    width: 106px;
    height: 28px;
    margin: 18px 154px 17px 16px;
    object-fit: contain;
    font-family: NotoSansCJKkr;
    font-size: 19px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.74;
    letter-spacing: -0.48px;
    text-align: left;
    color: #282c36;
  }
`;

const HeaderContent = styled.div`
width : 100%;
height: 63px;
border-bottom: solid 1px #e1e2e4;
> span {
  font-size: 19px;
  width: 106px;
  height: 28px;
  margin: 18px 154px 17px 16px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 19px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.74;
  letter-spacing: -0.48px;
  text-align: left;
  color: #282c36;
}
`;
