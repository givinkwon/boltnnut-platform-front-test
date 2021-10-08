import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { withRouter } from "next/router";
import Router from "next/router";
import * as Title from "components/Title";
// components
import * as Text from "./Text";

import { PRIMARY, WHITE, DARKGRAY } from "static/style";
import Buttonv1 from "components/Buttonv1";
import Home from "../pages";
import KSLink from "./KSLink";

const close_ic = "/static/images/components/MobileNav/close_ic.svg";
const hamburger_ic = "/static/images/components/MobileNav/hamburger.svg";
const logo_ic = "/static/images/components/MobileNav/MobileLogo.svg";

@inject("Auth", "Partner", "Home", "Common")
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
    if (localStorage.getItem("expiry")) {
      localStorage.removeItem("expiry");
    }

    window.location.href = "/";
  };
  async componentDidMount() {
    const { Auth, Home } = this.props;
    const token = await localStorage.getItem("token");
    const { route, pathname } = Router.router;
    const splitedRoute = route.split("/");
    const requestId = window.location.pathname.split("/").pop();

    // 사용자 접근 제어
    if (token) {
      this.alreadyLoggedin.forEach((url) => {
        if (url === splitedRoute[1]) {
          alert("이미 로그인한 사용자입니다");

          // Router.push("/");
          location.href = this.props.Common.makeUrl("");
        }
        // /offered 에서 tab 1을 거치지 않고 tab 2로 들어온 사용자 리다이렉트
        else if ("offered" === splitedRoute[1]) {
          let currentTab = 0;
          const queryParams = window.location.href.split("?").pop();

          // 'http://localhost:3000/offered?tab=1&state=2'이면
          // queryParams = 'tab=1&state=2'
          queryParams.split("&").forEach((param) => {
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
    } else {
      this.needPermission.forEach((url) => {
        if (url === splitedRoute[1]) {
          if (requestId != 923) {
            alert("로그인이 필요합니다");
            // Router.push("/login");
            location.href = this.props.Common.makeUrl("login");
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
      this.setState({ ...this.state, is_open: false });
    } else {
      this.setState({ ...this.state, is_open: true });
    }
  };

  render() {
    const { Auth, Partner, width, Hom, Common } = this.props;
    const { url, is_open, is_profile, token } = this.state;
    return (
      <NavBox>
        {is_open && (
          <Modal>
            <ProfileMenu width={this.props.width} onClick={() => this.setState({ is_open: false })}>
              <ModalHeader>
                <div style={{ marginBottom: 50, width: "100%" }}>
                  <BoltLogo>
                    <Logo
                      onClick={() => {
                        if (is_open == true) {
                          // Router.push("/");
                          location.href = Common.makeUrl("");
                        }
                      }}
                      src={logo_ic}
                      style={{ float: "left" }}
                    />
                  </BoltLogo>
                  <img src={close_ic} style={{ float: "right" }} />
                </div>
                {/* {Auth.logged_in_partner ? (
                  <FreeButton onClick={() => Router.push("/project")}>
                    <span style={{ marginTop: 1 }}>프로젝트 찾아보기</span>
                  </FreeButton>
                ) : (
                  <FreeButton onClick={() => Router.push("/request")}>
                    <span style={{ marginTop: 1 }}>
                      바로 견적 받고 업체 비교
                    </span>
                  </FreeButton>
                )} */}

                {/* : Auth.home_index === 2 ? (
                  <FreeButton onClick={() => Router.push("/search")}>
                    <span style={{ marginTop: 1 }}>제조사 찾아보기</span>
                  </FreeButton>
                ) : Auth.home_index === 3 ? (
                  <FreeButton onClick={() => Router.push("/request")}>
                    <span style={{ marginTop: 1 }}>무료 상담 및 견적 받기</span>
                  </FreeButton>
                ) : (
                  <FreeButton onClick={() => Router.push("/search")}>
                    <span style={{ marginTop: 1 }}>제조사 찾아보기</span>
                  </FreeButton>
                )} */}
              </ModalHeader>
              <>
                <ModalContent>
                  {Auth.logged_in_partner ? <KSLink step_index={1} url={"project"} content={"제조문의 보기"} /> :  <KSLink url={"request"} content={"제조 문의하기"} />}
                  <KSLink url={"search"} content={"제조사 찾기"}/>
                  {/* <KSLink url={"shop"} content={"공장 직거래"} />
                  <KSLink url={"autoestimate"} content={"AI 자동 견적"} /> */}

                  {Auth.logged_in_user && <KSLink url={"chatting"} content={"채팅하기"} />}
                </ModalContent>
              </>
              <ModalContent2>
                <KSLink url={"term/policy"} content={"이용약관"} />
                <br />
                <KSLink url={"term/personal"} content={"개인정보 처리 방침"} />
              </ModalContent2>
              {Auth.logged_in_user ? (
                <Footer>
                  <div onClick={this.logout}> 로그아웃 </div>
                </Footer>
              ) : (
                <Footer>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRight: "solid 1px #e1e2e4",
                      height: 32,
                    }}
                    onClick={() => (location.href = Common.makeUrl("login"))}
                  >
                    로그인
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 32,
                    }}
                    onClick={() => (location.href = Common.makeUrl("signup"))}
                  >
                    회원가입
                  </div>
                </Footer>
              )}
            </ProfileMenu>
          </Modal>
        )}
        <Container>
          <NavWrap2>
            {this.props.src === "/static/images/components/MobileNav/MobileLogo.svg" ? (
              <BoltLogo>
                <Logo src={this.props.src} onClick={() => (location.href = Common.makeUrl(""))} />
              </BoltLogo>
            ) : (
              <BoltLogo>
                <Logo src={this.props.src} onClick={() => Router.back()} />
              </BoltLogo>
            )}

            <HeadText>{this.props.headText}</HeadText>
            <Icon src={hamburger_ic} onClick={this.menuClick} />
          </NavWrap2>
        </Container>
      </NavBox>
    );
  }
}

export default MobileNav;

const Modal = styled.div`
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ProfileMenu = styled.div`
  width: 70%;
  padding: 22px 22px;
  height: 100%;
  position: absolute;
  background-color: white;
  z-index: 10000;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  width: 100%;
  // height: 160px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px #e1e2e4;
  align-items: center;
  > div {
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    color: #111111;
    text-align: center;
    white-space: nowrap;
  }
`;

const ModalContent = styled.button`
  border: none;
  background: none;
  width: 100%;
  height: 100px;
  // height: 110px;
  display: flex;
  border-bottom: solid 1px #e1e2e4;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  > a {
    font-family: NotoSansCJKkr;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.27;
    letter-spacing: -0.38px;
    text-align: center;
    color: #111111;
    cursor: pointer;
  }
`;

const HeadText = styled.div`
  z-index: 9998;
  width: 100%;
  height: 29px;
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
  margin-top: 2px;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  justify-content: space-evenly;
  width: 70%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: solid 1px #e1e2e4;
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
    cursor: pointer;
  }
`;

const FreeButton = styled(Buttonv1)`
  margin-top: 8px;
  cursor: pointer;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 270px;
    height: 43px;
  }
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
  }
`;

const ModalContent2 = styled.button`
  border: none;
  background: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 27px;
  justify-content: center;
  text-align: center;
  > a {
    font-family: NotoSansCJKkr;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.3px;
    color: #282c36;
    margin-bottom: 22px;
    cursor: pointer;
    text-align: center;
  }
`;

const Container = styled.div`
  height: 50px;
  margin-right: auto;
  margin-left: auto;
`;

const NavBox = styled.div`
  position: fixed;
  height: 50px;
  width: 100%;
  background-color: ${WHITE};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  z-index: 300;
`;

const NavWrap2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #ffffff;
  padding-left: 18px;
  padding-right: 18px;
`;

const BoltLogo = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  margin-top: 2px;
`;

const Logo = styled.img`
  cursor: pointer;
  z-index: 9999;
`;

const Icon = styled.img`
  display: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  z-index: 9999;

  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
    width: 21px;
    height: 13px;
  }
`;
