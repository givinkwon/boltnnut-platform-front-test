import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { withRouter } from "next/router";
import Router from "next/router";
import Background from "components/Background";
import Container from "components/Containerv1";
import Buttonv1 from "components/Buttonv1";

const profileimg = "/static/images/profileimg2.svg";

@inject("Partner", "Auth", "Project", "Common", "Request", "Search")
@observer
class ReviewManagement extends React.Component {
  render() {
    const { Auth } = this.props;
    return (
      <>
        <Background
          style={{ backgroundColor: "#f6f6f6", paddingBottom: 277 }}
          id="MyBackground"
        >
          <Header>
            <HeaderTitle>
              <div style={{ marginBottom: 12 }}>
                후기 관리 > 작성 가능한 후기
              </div>
            </HeaderTitle>
          </Header>
          <Container>
            <Body>
              <Aside>
                {/* <AsideHeader>{Auth.logged_in_user.username}</AsideHeader> */}
                <AsideHeader>{Auth.logged_in_user && Auth.logged_in_user.username}</AsideHeader>
                <AsideBody>
                  <div>작성 가능한 후기</div>
                  <div>내가 작성한 후기</div>
                </AsideBody>
              </Aside>
              <Main>
                {/* 작성 가능한 후기일 때 */}
                <Partner>
                  <Title>실리콘 반려견 샤워헤드</Title>
                  <ReviewBox>
                    <Left>
                      <img src={profileimg}></img>
                      <PartnerName>하이젠어스</PartnerName>
                      <Content>
                        " 프로젝트 보고 연락드립니다 . 비공개 자료 공개해주실수
                        있나요 "{" "}
                      </Content>
                    </Left>
                    <WriteButton>후기쓰기</WriteButton>
                  </ReviewBox>
                </Partner>
              </Main>
            </Body>
          </Container>
        </Background>
      </>
    );
  }
}

export default ReviewManagement;

const Header = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 116px;
`;

const HeaderTitle = styled.div`
  margin: 0px auto 0px auto;
  width: 1200px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.4px;
  text-align: left;
  color: #555963;
}
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: NotoSansCJKkr;
`;

const Aside = styled.div`
  width: 230px;
`;

const AsideHeader = styled.div`
  padding-top: 50px;
  padding-bottom: 16px;
  border-bottom: solid 1px #e1e2e4;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #0933b3;
`;

const AsideBody = styled.div`
  padding-top: 16px;
  font-size: 14px;
  line-height: 1.73;
  letter-spacing: -0.38px;
  text-align: left;
  color: #767676;
`;

const Main = styled.div`
  width: 100%;
  padding-left: 72px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -0.5px;
  text-align: left;
  color: #282c36;
`;

const Partner = styled.div`
  width: 100%;
  margin-top: 54px;
`;

const PartnerName = styled.div`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.45px;
  text-align: left;
  color: #282c36;
  margin-left: 21px;
`;

const ReviewBox = styled.div`
  border-radius: 3px;
  border: solid 1px #e1e2e4;
  background-color: #fff;
  padding: 12px 26px 13px 28px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  font-size: 16px;
  letter-spacing: -0.4px;
  text-align: left;
  color: #86888c;
  margin-left: 32px;
`;

const WriteButton = styled(Buttonv1)`
  width: 110px !important;
  height: 38px !important;
  border-radius: 5px !important;
  background-color: #ffffff !important;
  border: solid 1px #c6c7cc;
  box-shadow: none !important;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.4px;
  color: #0933b3;
  &:hover {
    border: solid 1px #0933b3;
  }
`;
