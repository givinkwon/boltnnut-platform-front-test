import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Container";
import ButtonComponent from "components/Button";
import InputComponent from "components/Input";
import CheckBoxComponent from "components/LoginCheckBox";
import ButtonSpinnerComponent from "components/ButtonSpinner";

import Router from "next/router";

import * as Text from "components/Text";
import { WHITE, PRIMARY } from "static/style";

const logo_ic = "/static/images/logo_marine.png";
const line = "/static/images/line.png";

@inject("Auth", "Home")
@observer
class FormConatiner extends React.Component {
  state = {
    search: "",
    width: 0,
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  searchText = (e) => {
    this.setState({ search: e.target.value });
  };
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // TODO 검색 API
      console.log("검색");
      this.props.Auth.login();
    }
  };
  toSignUp = () => {
    this.props.Auth.setStep(0);
    Router.push("/signup");
  };
  toForgotID = () => {
    this.props.Auth.reset();
    Router.push("/forget_id");
  };
  toForgotPW = () => {
    this.props.Auth.reset();
    Router.push("/forget_password");
  };
  render() {
    const { search, width } = this.state;
    const { Auth, Home } = this.props;
    return (
      <Form>
        <Container>
          {width > 767.98 ? (
            <>
              <Logo src={logo_ic} />
              <Text.FontSize24 color={"#0a2165"} style={{ marginBottom: 90 }}>
                온라인 제조 상담 플랫폼
              </Text.FontSize24>
              <Input
                id="custom-css-outlined-input"
                placeholder="아이디"
                onChange={Auth.setEmail}
              />
              <Input
                id="custom-css-outlined-input"
                placeholder="비밀번호"
                type="password"
                onChange={Auth.setPassword}
                onKeyDown={this.handleKeyDown}
              />
              <ButtonBox>
                <ButtonComponent
                  backgroundColor={"#0a2165"}
                  borderColor={WHITE}
                  borderRadius={3}
                  borderWidth={1}
                  onClick={Auth.login}
                >
                  {Auth.loading ? (
                    <ButtonSpinnerComponent primary />
                  ) : (
                    <Text.FontSize24 color={WHITE} fontWeight={500}>
                      로그인
                    </Text.FontSize24>
                  )}
                </ButtonComponent>
                <ButtonComponent
                  id="sign_up_button"
                  backgroundColor={WHITE + "00"}
                  borderRadius={3}
                  borderWidth={1}
                  onClick={this.toSignUp}
                >
                  <Text.FontSize24 color={"#505050"} fontWeight={500}>
                    회원가입
                  </Text.FontSize24>
                </ButtonComponent>
              </ButtonBox>
              <More>
                <CheckBoxComponent
                  onChange={(state) => (Auth.always_login = state)}
                >
                  <p style={{ color: "#9999", fontSize: 20, fontWeight: 400 }}>
                    로그인 상태 유지
                  </p>
                </CheckBoxComponent>
                <Fotget onClick={this.toForgotID}>아이디 찾기</Fotget>
                {/* 로그인미완 */}
                <Line src={line} />
                <Fotget onClick={this.toForgotPW}>비밀번호 찾기</Fotget>
              </More>
            </>
          ) : (
            <>
              <span class="header" color={"#0a2165"}>
                로그인
              </span>
              <span class="title">이메일</span>
              <Input
                id="custom-css-outlined-input"
                placeholder="이메일"
                onChange={Auth.setEmail}
              />
              <span class="title">비밀번호</span>
              <Input
                id="custom-css-outlined-input"
                placeholder="비밀번호"
                type="password"
                onChange={Auth.setPassword}
                onKeyDown={this.handleKeyDown}
              />
              <ButtonBox>
                <ButtonComponent
                  backgroundColor={"#0a2165"}
                  borderColor={WHITE}
                  borderRadius={3}
                  borderWidth={1}
                  onClick={Auth.login}
                >
                  {Auth.loading ? (
                    <ButtonSpinnerComponent primary />
                  ) : (
                    <span class="buttonText">로그인</span>
                  )}
                </ButtonComponent>
                <ButtonComponent
                  id="sign_up_button"
                  backgroundColor={WHITE + "00"}
                  borderRadius={3}
                  borderWidth={1}
                  onClick={this.toSignUp}
                >
                  <span class="buttonText">회원가입</span>
                </ButtonComponent>
              </ButtonBox>
              <More>
                <CheckBoxComponent
                  onChange={(state) => (Auth.always_login = state)}
                >
                  <p style={{ color: "#9999", fontSize: 14, fontWeight: 400 }}>
                    로그인 상태 유지
                  </p>
                </CheckBoxComponent>
              </More>
              <More>
                <Fotget onClick={this.toForgotID}>아이디 찾기</Fotget>
                {/* 로그인미완 */}
                <Line src={line} />
                <Fotget onClick={this.toForgotPW}>비밀번호 찾기</Fotget>
              </More>
            </>
          )}
        </Container>
      </Form>
    );
  }
}

export default FormConatiner;

const Logo = styled.img`
  /* cursor: pointer; */
  width: 383px;
  height: 60px;
  margin-bottom: 15px;
`;
const Line = styled.img`
  width: 1px;
  height: 24px;
  padding: 0 10px;
`;
const Fotget = styled.p`
  color: #0a2165;
  cursor: pointer;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.7;
  letter-spacing: -0.5px;

  :hover {
    color: #0933b3;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    :nth-of-type(1) {
      margin-right: auto;
    }
    :nth-of-type(2) {
      margin-left: auto;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
    font-size: 20px;
    margin-left: auto;
  }
`;
const More = styled.div`
  max-width: auto;
  display: flex;
  align-items: center;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 15px;
    width: 100%;
    :nth-of-type(1) {
      margin-top: 24px;
    }
    :nth-of-type(2) {
      margin-top: 39px;
    }
    .MuiTypography-root.MuiFormControlLabel-label > p {
      font-size: 14px !important;
    }

    .MuiSvgIcon-root {
      width: 0.8em !important;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }
  @media (min-width: 1300px) {
    width: 588px;
    margin-top: 20px;
    margin-bottom: 50px;
    p:nth-of-type(2) {
      margin-left: 0px;
    }
  }
`;

const Input = styled(InputComponent)`
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    margin-top: 0px !important;
    margin-bottom: 8px !important;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 588px;
  }

  /* @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 8px 0 !important;
  } */
`;

const ButtonBox = styled.div`
  width: 588px;
  justify-content: space-between;
  display: inline;

  div {
    margin-top: 35px;
    width: auto;
    border: solid 1px #c7c7c7;
    border-radius: 3px;

    :nth-of-type(1) {
      :hover {
        background-color: #0933b3;
      }
    }
    :nth-of-type(2) {
      :hover {
        border: solid 1px #0933b3;
        p {
          color: #0933b3;
        }
      }
    }
    p {
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.42;
      letter-spacing: -0.6px;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    > div:nth-of-type(1) > span {
      color: #ffffff;
    }
    > div:nth-of-type(2) > span {
      color: #505050;
    }
    .buttonText {
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.42;
      letter-spacing: -0.6px;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 588px;
  }
`;
const Form = styled.div`
  /* background-image: url('/static/images/banner.jpg');
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #ffffff;
  overflow: hidden;
  background-position: center;
  background-size: cover; */
  min-height: 500px;
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    > span {
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      :nth-of-type(1) {
        font-weight: 700;
        color: #0a2165;
        margin-bottom: 24px;
      }
      :nth-of-type(2) {
        line-height: 2.43;
        letter-spacing: -0.35px;
        margin-bottom: 8px;
        color: #505050;
        margin-right: auto;
      }
      :nth-of-type(3) {
        line-height: 2.43;
        letter-spacing: -0.35px;
        margin-bottom: 8px;
        color: #505050;
        margin-right: auto;
      }
    }
    @media (min-width: 0px) and (max-width: 767.98px) {
      padding-top: 90px;
      margin-bottom: 50px;
      width: 82%;

      .header {
        font-size: 20px;
        font-weight: 700;
      }
      .title {
        font-size: 14px;
      }
      > p:nth-of-type(1) {
        font-size: 20px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.42;
        letter-spacing: -0.6px;
        margin-bottom: 24px;
      }
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
    }
    @media (min-width: 992px) and (max-width: 1299.98px) {
    }
    @media (min-width: 1300px) {
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin: 130px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin: 150px 0px;
  }
  @media (min-width: 1300px) {
    margin: 200px 0px;
  }
`;
