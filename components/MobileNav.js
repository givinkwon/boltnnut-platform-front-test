import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { withRouter } from 'next/router'
import Router from "next/router";
// components
import * as Text from "./Text";

import { PRIMARY, WHITE, DARKGRAY } from "static/style";

const close_ic = "/static/icon/close.svg";
const hamburger_ic = "/static/icon/hamburger.png";
const logo_ic = "/static/images/logo2.jpg";
const profile = "/static/images/profile.png";
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
            <ProfileMenu width={this.props.width} onClick={() => this.setState({is_open: false})}>
                <span onClick={async () => await Router.push("/profile")}> 프로필 수정 </span>
                <span onClick={async () => await Router.push('/account?tab=1')}> 계정 관리 </span>
                <span onClick={this.logout}> 로그아웃 </span>
            </ProfileMenu>
          )}
        <Container>
          <NavWrap2>
            <Logo src={logo_ic} onClick={() => Router.push("/")} />
            {
              !this.props.Auth.logged_in_user ? (
              <NavLink
                  onClick={() => {
                    Router.push("/login"), Auth.reset();
                  }}
                  active={url.indexOf("login") > -1}
                >
                  로그인
              </NavLink>
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
          {/* <NavWrap3>
            <NavLink3
                  onClick={() => {
                    Router.push("/"), Auth.reset();
                  }}
                  active={url == '/'}
                >
                  홈
            </NavLink3>
            <NavLink3
                      first
                      //onClick={() => Router.push("/request?big=4&mid=")}
                      onClick={() => Router.push("/request")}
                      active={url.indexOf("request") > -1}
                    >
                      의뢰하기
            </NavLink3>
            <NavLink3
                    onClick={
                      async () => {
                        await Router.push("/partner");
                        if(Router.pathname === '/partner') {
                          Router.reload();
                        }
                      }
                    }
                    active={url.indexOf("partner") > -1}
                  >
                    제조사 찾기
            </NavLink3>
            
            
            <NavLink3
                  onClick={
                    async () => {
                      await Router.push("/info");
                      if(Router.pathname === '/info') {
                        Router.reload();
                      }
                    }
                  }
                  active={url.indexOf("info") > -1}>
                    서비스 소개
            </NavLink3>
            <NavLink3
                  onClick={() => {
                    Router.push("/magazine");
                  }}
                  active={url.indexOf("magazine") > -1}
                >
                  매거진
            </NavLink3>
          </NavWrap3> */}
        </Container>
      </NavBox>
    );
  }
}

const ProfileMenu = styled.div`
  width: 126px;
  height: 162px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  position: absolute;
  background-color: white;
  z-index: 3;
  transform: translate3d(${props => props.width ? props.width - 156 : 10}px, calc(55%), 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  > span {
    padding-bottom: 20px;
    :nth-of-type(3) {
      padding:0
    }
  }
`;
const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
`
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  padding: 0px 15px;
  cursor: pointer;
`;
const NavBox = styled.div`
  height: 54px;
  width: 100%;
  background-color: ${WHITE};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;
const NavWrap = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
`;
const NavWrap2 = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  background-color: #ffffff; // #f3f3f3
  padding-right: calc(10%);
  padding-left: calc(9%);
`;
const NavWrap3 = styled.div`
  display: inline-flex;
  align-items: center;
  height: 48px;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;
const Logo = styled.img`
  cursor: pointer;
  width: 113px;
`;
const Icon = styled.img`
  cursor: pointer;
  margin-left: auto;
  width: 40px;
  height: 40px;
  display: none;
  background-color: '#f3f3f3';
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
  }
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: none;
    flex-direction: column;

    width: 100%;
    max-width: 380px;
    height: 100vh;
    background-color: ${DARKGRAY};
    position: absolute;

    top: 0;
    right: -100%;
    transition: 0.8s;

    z-index: 900;
    ${(props) =>
      props.is_open &&
      css`
        display: flex;
        right: 0%;
      `}
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-right: -12px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-right: -25px;
  }
  @media (min-width: 1300px) and (max-width: 1599.98px) {
    margin-right: -25px;
  }
  @media (min-width: 1600px) {
    margin-right: -30px;
  }
`;
const NavLink = styled.p`
  margin: 0px;
  height: 100%;
  cursor: pointer;
  color: #000000;
  display: flex;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    justify-content: flex-end;
    text-align: right;
  }
  ${(props) =>
    props.first &&
    css`
      margin-left: 0px !important;
    `}
  ${(props) =>
    props.active ?
    (
    css`
      font-weight: 700;
      background-color: rgba(255, 255, 255, 0.1);
      color: #0a2165;
      font-size: 22px;
      border-bottom: 4px solid #0a2165;
    `) :
    (
    css`
      font-weight: 500;
      background-color: rgba(255, 255, 255, 0.1);
      font-size: 20px;
      font-weight: 500;
    `
    )
    }
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;
const NavLink3 = styled.div`
  margin: 0;
  height: 100%;
  cursor: pointer;
  color: #000000;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: -0.33px;
  text-align: center;
  color: #191919;
  display: flex;
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  ${(props) =>
    props.first &&
    css`
      margin-left: 0px !important;
    `}
  ${(props) =>
    props.active ?
    (
    css`
      font-weight: 700;
      background-color: rgba(255, 255, 255, 0.1);
      color: #0a2165;
      font-size: 13px;
      border-bottom: 2px solid #0a2165;
    `) :
    (
    css`
      font-weight: 500;
      background-color: rgba(255, 255, 255, 0.1);
      font-size: 13px;
      font-weight: 500;
    `
    )
    }
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;
const Close = styled.div`
  margin: 10px;
  width: calc(100% - 20px);
  display: none;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: flex;
  }
`;
export default MobileNav;
