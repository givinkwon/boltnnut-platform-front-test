import React, { Fragment } from "react";
import styled, { css, keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { withRouter } from "next/router";
import Router from "next/router";
// components
import * as Text from "./Text";
import * as Content from "./Content";
import Containerv1 from "components/Containerv1";

import { PRIMARY, WHITE, DARKGRAY } from "static/style";
import Buttonv1 from "components/Buttonv1";
import KSLink from "components/KSLink";

const close_ic = "/static/icon/closeIcon.svg";
const close_clicked = "/static/icon/close_clicked.svg";
const signupIcon = "/static/images/signupIcon.svg";
const bnlogo = "/static/images/bnlogo.png";
const hamburger_ic = "/static/icon/hamburger.png";
const logo_ic = "/static/images/components/Nav/logo_ic.svg";
const profile = "/static/images/profile.png";
const signupBoxImg = "/static/images/SignupBox.png";

@inject("Auth", "Partner", "Project", "Home", "Request","Profile")
@observer
class Nav extends React.Component {
  state = {
    token: null,
    url: "/",
    is_profile: false,
    is_open: false,
    selectedRoom: null,
    partnerList: [],
    closeImgState: false,
    testState: false,
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
    const { Auth } = this.props;
    const token = await localStorage.getItem("token");
    const { route, pathname } = Router.router;
    const splitedRoute = route.split("/");
    const requestId = window.location.pathname.split("/").pop();

    // setTimeout(() => {
    //   this.setState({ testState: true });
    // }, 1000);

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
      if (splitedRoute[1] === "partner") {
        alert("접근할 수 없는 페이지입니다");
        Router.push("/login");
      }
      this.needPermission.forEach((url) => {
        if (url === splitedRoute[1]) {
          if (requestId != 923) {
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
  render() {
    const { Auth, Request, Home, Profile } = this.props;
    const { url, is_open, is_profile, token } = this.state;
    return (
      <>
        <NavBox>
          <Containerv1
            style={{
              display: "inline",
              justifyContent: "space-between",
            }}
          >
            <NavWrap>
              <BoltLogo style={{height : 24}}>
                <KSLink url={""} logoImg={bnlogo} />
              </BoltLogo>

              <Menu is_open={is_open}>
                <Close>
                  <Icon src={bnlogo} onClick={() => this.setState({ is_open: false })} />
                </Close>

                    <NavLink active={url.indexOf("autoestimate") > -1}>
                      <RouterWrapper>
                        <KSLink
                          url={"autoestimate"}
                          FontContent={() => {
                            return <Font16>부품 바로발주</Font16>;
                          }}
                        />
                      </RouterWrapper>
                    </NavLink>
              </Menu>
            </NavWrap>
          </Containerv1>
        </NavBox>
        <div style={{ height: 60 }} />
      </>
    );
  }
}
export default Nav;

const MoveBoxAnimation = keyframes`
  0% {transform:translate(0,0);}
  100% {transform:translate(0,10px);}
`;
const AnimationBox = styled.div`
  top: 70%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${MoveBoxAnimation} 1s 1s infinite alternate;
  animation-delay: 0s;
  cursor: pointer;
  /* :hover {
    animation-play-state: paused;
  } */
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: contain;
  border-radius: 19px;
  border: solid 1px #c6c7cc;
  height: 36px;
  width: 78px;
`;
const Font14 = styled(Content.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.14;
  letter-spacing: -0.14px;
  color: #1e2222;
  text-align: center;
  > span {
    font-weight: bold;
  }
`;
const RouterWrapper = styled.div`
  /* border: 1px solid black; //지우기 */
  /* padding: 20px 40px; */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* padding-top: 20px;
  padding-bottom: 20px; */
  height: 100%;
  padding-right: 34px;
  /* padding-left: 40px; */
  /* margin-right: 40px; */
`;
const SubMenu = styled.ul`
  margin-top: 4px;
  position: absolute;
  width: 120%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;

  > li {
    height: 44px;
    /* padding: 16px 16px; */
    /* background: green;
    border: 1px solid black; */
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
      background-color: #ededef;
    }
  }
  /* background: #182952; */
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease-in;
`;
const BoltLogo = styled.button`
  background: none;
  border: None;
`;
const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #00000080;
`;
const ProfileMenu = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 50px;
  width: 14em;
  > div:nth-of-type(2) {
    cursor: pointer;
    padding: 17px 0;
    display: flex;
    flex-direction: column;
    > div {
      padding: 6px 20px;
      :hover {
        background-color: #f3f3f3;
        > p {
          color: ${PRIMARY};
        }
      }
    }
  }
  > div:nth-of-type(3) {
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    color: #414550;
    font-weight: 500;
  }
`;
const Container = styled.div`
  padding-right: 0% !important;
  padding-left: 0% !important;
  margin-right: 0% !important;
  margin-left: 0% !important;
  width: 100%;
`;
const Avatar = styled.img`
  width: 56px;
  height: 32px;
  border-radius: 10px;
  padding: 0px 15px;
  /* padding-right: 33px; */
  cursor: pointer;
`;
const NavBox = styled.div`
  position: fixed;
  z-index: 101;
  /* height: 60px; */
  width: 100%;
  background-color: ${WHITE};
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.06);
  // box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  justify-content: center;
`;
const NavWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  > div:nth-of-type(1) {
    margin-left: 60px !important;
  }
`;
const Logo = styled.img`
  cursor: pointer;
  width: auto;
  height: auto;
`;
const Icon = styled.img`
  cursor: pointer;
  margin-left: auto;
  width: 40px;
  height: 40px;
  display: none;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
  }
`;
const Menu = styled.ul`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  /* align-items: center; */
  /* margin-left: auto; */
  margin-left: 40px;
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
`;
const NavLink = styled.li`
  /* display: flex;
  align-items: center; */
  float: left;
  position: relative;
  margin: 0px;
  height: 64px;
  cursor: pointer;
  color: #000000;

  /* border: 1px solid yellow;
  background: red !important; */

  /* display: flex; */
  /* align-items: center; */
  font-weight: 500;

  :hover {
    ${SubMenu} {
      opacity: 1;
      visibility: visible;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    font-weight: 500;
    width: 100%;
    justify-content: center;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    /* padding-left: 12px;
    padding-right: 12px; */
    font-size: 14px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    /* padding-left: 15px;
    padding-right: 15px; */
    font-size: 14px;
  }
  @media (min-width: 1300px) and (max-width: 1599.98px) {
    /* padding-left: 17px;
    padding-right: 15px; */
    font-size: 14px;
  }
  @media (min-width: 1600px) {
    /* padding-left: 19px;
    padding-right: 19px; */
    font-size: 14px;
  }
  ${(props) =>
    props.first &&
    css`
      margin-left: 0px !important;
    `}
  ${(props) =>
    props.active
      ? css`
          font-weight: 700;
          background-color: rgba(255, 255, 255, 0.1);
          color: #0a2165;
          font-size: 22px;
          border-bottom: 2px solid #1e2222;
          border-radius: 2px
          // border 때문에 2px 늘어나서 height 줄이기
          height: 62px;
        `
      : css`
          font-weight: 500;
          background-color: rgba(255, 255, 255, 0.1);
          font-size: 20px;
          font-weight: 500;
        `}
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const BG = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 800;
  top: 0;
  left: 0;
`;
const Close = styled.div`
  margin: 10px;
  width: calc(100% - 20px);
  display: none;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: flex;
  }
`;

const ButtonContainer = styled(Buttonv1)`
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
  font-weight: bold !important;
  line-height: 0.69 !important;
  letter-spacing: -0.4px !important;
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 110px;
    height: 41px;
    font-size: 14px;
    margin-left: 22px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 120px;
    height: 41px;
    font-size: 14px;
    margin-left: 26px;
  }
  @media (min-width: 1300px) and (max-width: 1599.98px) {
    width: 130px;
    height: 41px;
    font-size: 16px;
    margin-left: 30px;
  }
  @media (min-width: 1600px) {
    width: 130px;
    height: 41px;
    font-size: 16px;
    margin-left: 34px;
  }
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  text-align: left;
  color: #414550;
`;

const Font17 = styled(Content.FontSize17)`
  font-stretch: normal;
  font-style: normal;
  line-height: 1.76;
  letter-spacing: -0.17px;
  text-align: left;
`;

const Button = styled.button`
  background: none;
  border: none;
`;
