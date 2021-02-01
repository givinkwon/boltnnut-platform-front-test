import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { withRouter } from 'next/router'
import Router from "next/router";
import * as Title from "components/Title";
// components
import * as Text from "./Text";

import { PRIMARY, WHITE, DARKGRAY } from "static/style";
import Buttonv1 from "components/Buttonv1";

const close_ic = "/static/icon/close.svg";
// const hamburger_ic = "/static/icon/hamburger.png";
const hamburger_ic = "/static/images/components/MobileNav/hamburger.png";

const x_ic = "/static/images/components/MobileNav/xBtn.png";
const profile = "/static/images/profile.png";
const logo_ic = "/static/images/components/MobileNav/MobileLogo.png";
//...
@inject("Auth", "Partner")
@observer
class MobileNav extends React.Component {
  state = {
    token: null,
    url: "/",
    is_profile: false,
    is_open: false,
  };

  alreadyLoggedin = ["login", "signup"];
  needPermission = ["profile", "answer", "proposal", "offered", "account"];
  logout = () => {
    localStorage.removeItem("token");
    if(localStorage.getItem("expiry")) {
      localStorage.removeItem("expiry");
    }
    window.location.href = "/";
  };
  async componentDidMount() {
    const { Auth } = this.props;
    const token = await localStorage.getItem("token");
    const { route, pathname } = Router.router;
    const splitedRoute = route.split("/");
    const requestId = window.location.pathname.split('/').pop()

    // 사용자 접근 제어
    if (token) {
      this.alreadyLoggedin.forEach((url) => {
        if (url === splitedRoute[1]) {
          alert("이미 로그인한 사용자입니다");
          Router.push("/");
        }
        // /offered 에서 tab 1을 거치지 않고 tab 2로 들어온 사용자 리다이렉트
        else if ("offered" === splitedRoute[1]) {
          let currentTab = 0;
          const queryParams = window.location.href.split("?").pop();

          // 'http://localhost:3000/offered?tab=1&state=2'이면
          // queryParams = 'tab=1&state=2'
          queryParams.split("&").forEach((param) => {
            // name = 'tab', 'state'
            // value = '1', '2'
            const [name, value] = param.split("=");
            if (name === "tab") {
              currentTab = value;
            }
          });

          let prevTab = 0;
          const prevQueryParams = document.referrer.split("?").pop();

          prevQueryParams.split("&").forEach((param) => {
            const [name, value] = param.split("=");
            if (name === "tab") {
              prevTab = value;
            }
          });

          // 현재 tab이 2인데 이전 tab이 1이 아니면
          if (currentTab == 2 && prevTab != 1) {
            Router.push(pathname + "?tab=1");
          }
        }
      });
    } else
     {
      // 로그인 하지 않고 /partner/[id]로 들어오는 사용자 리다이렉트
      //if(splitedRoute[1] === 'partner' && splitedRoute.length >= 3) {
      //  alert("로그인이 필요합니다");
      //  Router.push("/login");
      //}
      console.log(requestId)
      this.needPermission.forEach((url) => {
        if (url === splitedRoute[1]) {
          if(requestId != 923){
          alert("로그인이 필요합니다");
          Router.push("/login");
          }
        }
      });
     }

    // 토큰은 있는데 userInfo가 mobx에 없으면 리로딩
    await Auth.checkLogin();

    this.setState({
      url: route,
      token: token,
    });
    // 토큰은 있는데 userInfo가 mobx에 없으면 리로딩
    Auth.checkLogin();
  }
  menuClick = () => {
    const { is_open } = this.state;
    if (is_open === true) {
      this.setState({...this.state, is_open : false});
    } else {
      this.setState({...this.state, is_open: true});
    }
  }
  render () {
    const { Auth, Partner,width } = this.props;
    const { url, is_open, is_profile, token } = this.state;
    return (
      <NavBox>
        {is_open && (
          <Modal>
            <ProfileMenu width={this.props.width} onClick={() => this.setState({is_open: false})}>
              <ModalHeader>
                <div style={{marginBottom: 50, width: '100%'}}>
                  <Logo src={logo_ic} onClick={() => Router.push("/")} style={{float:'left'}}/>
                  <img src={ x_ic } style={{float: 'right'}}/>
                </div>
                <div>내 제품 제작 비용 지금 바로 전문가를 만나 보세요.</div>
                <FreeButton onClick={() => Router.push("/request")}>
                  <span>지금 무료 가견적 받기</span>
                </FreeButton>
              </ModalHeader>
              <ModalContent>
                <p>내 의뢰 관리</p>
                <p>제조 인사이트</p>
                <p>회사소개</p>
              </ModalContent>
              <ModalContent2>
                <p>자주찾는 질문</p>
                <p onClick={() => Router.push("/term/policy")}>이용약관</p>
                <p onClick={() => Router.push("/term/personal")}>개인정보 처리 방침</p>
              </ModalContent2>
              <Footer>
                <div onClick={this.logout}> 로그아웃 </div>
              </Footer>
            </ProfileMenu>
          </Modal>
          )}
        <Container>
          <NavWrap2>
            <Logo src={this.props.src} onClick={() => Router.push("/")} />
            <HeadText>{this.props.headText}</HeadText>
            {
              !this.props.Auth.logged_in_user ? (
              //   <NavLink
              //     onClick={() => {
              //       Router.push("/login"), Auth.reset();
              //     }}
              //     active={url.indexOf("login") > -1}
              //   >
              //     로그인
              // </NavLink>
                <>
                <Icon
                  src={hamburger_ic}
                  onClick={this.menuClick}
                />
                </>
              ) : (
              <>
              <Icon
                src={hamburger_ic}
                onClick={this.menuClick}
              />
              </>
              )
            }
          </NavWrap2>
        </Container>
      </NavBox>
    );
  }
}
const Modal = styled.div`
  position: fixed; 
  z-index: 3; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgba(0,0,0,0.4); 
`
const ProfileMenu = styled.div`
  width: 70%;
  padding: 22px 24px;
  height: 100%%;
  position: absolute;
  background-color: white;
  z-index: 3;
  top: 0;
  right: 0;
  // transform: translate3d(${props => props.width ? props.width - 156 : 10}px, calc(55%), 0);
  display: flex;
  flex-direction: column;
  }
`
const ModalHeader = styled.div`
  width: 100%;
  height: 182px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px #e1e2e4;
  align-items: center;
  
  > div {
    font-family: NotoSansCJKkr;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    color: #111111;
    text-align: center;
  }
`
const ModalContent = styled.div`
  width: 100%;
  height: 158px;
  display: flex;
  border-bottom: solid 1px #e1e2e4;
  flex-direction: column;
  justify-content: space-evenly;
  
  > p {
    font-family: NotoSansCJKkr;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.27;
    letter-spacing: -0.38px;
    text-align: left;
    color: #111111;
  }
`
const HeadText = styled.div`
  z-index: 0;
  width: 100%;
  height:29px; 
  position: absolute;
  color: #0a2165;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  left: 0;
`
const Footer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  > div {
    width: 100%;
    font-family: NotoSansCJKkr;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.46;
    letter-spacing: -0.33px;
    text-align: center;
    color: #111111;
  }
`
const FreeButton = styled(Buttonv1)`
  margin-top: 8px;
  > span {
    font-family: NotoSansCJKkr;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: -0.4px;
    text-align: center;
    color: #ffffff;
    @media (min-width: 0px) and (max-width: 767.98px) {
      width: 270px;
      height: 43px;
    }
  }
  
`
const ModalContent2 = styled.div`
  width: 100%;
  height: 310px;
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px #e1e2e4;
  margin-top: 27px;

  > p {
    font-family: NotoSansCJKkr;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.3px;
    color: #282c36;
    margin-bottom: 22px;
  }
`
const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
`
const NavBox = styled.div`
  height: 54px;
  width: 100%;
  background-color: ${WHITE};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;
const NavWrap2 = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  background-color: #ffffff; // #f3f3f3
  padding-left: 18px;
  padding-right: 18px;
`;
const Logo = styled.img`
  cursor: pointer;
  z-index: 1;
`;
const Icon = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: none;
  background-color: '#f3f3f3';
  z-index: 1;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
    width: 21px;
    height: 13px;
  }
`;

export default MobileNav;
