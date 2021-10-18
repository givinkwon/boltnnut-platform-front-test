import React from "react";
import styled from "styled-components";

import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import Switch from "react-switch";
import { inject, observer } from "mobx-react";
import Router from "next/router";
// images
const emailIcon = "/static/images/login/mobile/emailicon.svg";
const passwordIcon = "/static/images/login/mobile/passwordicon.svg";

@inject("Auth", "Home")
@observer
class MobileLoginContainer extends React.Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  toKakaoSignUp = () => {
    this.props.Auth.kakaoLogin();
    // Router.push("/signup/kakao");
  };

  handleChange(checked) {
    this.setState({ checked });
  }

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.props.Auth.login();
    }
  };

  render() {
    const { Auth } = this.props;

    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 150 }}>
        <Container>
          <img src="/static/images/login/mobile/logo.svg" style={{ width: 140, height: 28 }} />

          <IconImgContainer>
            <IconImgBox src={emailIcon} />
            <InputBox placeholder="이메일" onChange={(e) => Auth.setEmail(e.target.value)} />
          </IconImgContainer>

          <IconImgContainer style={{ marginTop: 25 }}>
            <IconImgBox src={passwordIcon} />
            <InputBox type="password" placeholder="비밀번호" onChange={(e) => Auth.setPassword(e.target.value)} onKeyDown={this.handleKeyDown} />
          </IconImgContainer>

          <InnerBox style={{ margin: "13px 0px 0px 16px", justifyContent: "flex-start" }}>
            <Font12 style={{ marginRight: 12 }}>자동 로그인</Font12>
            <Switch
              onChange={this.handleChange}
              checked={this.state.checked}
              offColor="#e1e2e4"
              onColor="#174aee"
              checkedIcon={false}
              uncheckedIcon={false}
              width={28}
              height={16}
            />
          </InnerBox>

          <LoginBtn onClick={Auth.login}>로그인</LoginBtn>

          <InnerBox style={{ width: "75%", cursor: "pointer", justifyContent: "center", alignItems: "center", marginTop: 17 }}>
            <Font12 
              style={{ paddingTop: 2 }}
              onClick={() => {
                Router.push(`/signup`);
              }}
            >회원가입</Font12>
            <LineDivShort />

            <Font12 style={{ paddingTop: 2, cursor: "pointer" }}>아이디찾기</Font12>
            <LineDivShort />

            <Font12 style={{ paddingTop: 2, cursor: "pointer" }}>비밀번호찾기</Font12>
          </InnerBox>

          <InnerBox style={{ width: 341, justifyContent: "space-between", alignItems: "center", marginTop: 54 }}>
            <LineDivLong />
            <Font12>SNS 간편 로그인</Font12>
            <LineDivLong />
          </InnerBox>

          <KaKaoLoginBtn onClick={this.toKakaoSignUp}>
            <KaKaoLogo src="/static/images/login/mobile/kakaologo.svg" />
            <Font14>카카오로 시작하기</Font14>
          </KaKaoLoginBtn>
        </Container>
      </div>
    );
  }
}

export default MobileLoginContainer;

const Font12 = styled(Title.FontSize12)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
  color: #505050;
`;

const Font14 = styled(Title.FontSize14)`
  font-family: NotoSansCJKkr;
  font-weight: 500;
  color: #1e2222;
`;

const Container = styled(Containerv1)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerBox = styled.div`
  width: 319px;
  display: flex;
`;

const IconImgContainer = styled.div`
  display: inline-flex;
  align-items: center;
  width: 319px;
  height: 44px;
  border-radius: 23px;
  border: solid 1.3px #e1e2e4;
  margin-top: 40px;
  padding-left: 20px;
  gap: 7px;
`;

const IconImgBox = styled.img`
  width: 16px;
  height: 16px;
  margin-bottom: 3px;
`;

const InputBox = styled.input`
  width: 100%;
  height: 90%;
  border-radius: 23px;
  border: none;
  background-color: #fff;
  font-family: NotoSansCJKkr;
  font-size: 14px;

  ::placeholder {
    color: #c6c7cc;
    font-family: NotoSansCJKkr;
    font-size: 14px;
  }

  :focus {
    outline: none;
  }
`;

const LoginBtn = styled.button`
  width: 341px;
  height: 44px;
  margin-top: 18px;
  border-radius: 23px;
  border: none;
  background-color: #0933b3;
  cursor : pointer;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
`;

const LineDivShort = styled.div`
  width: 0;
  height: 8px;
  margin: 0px 12px 0px 12px;
  object-fit: contain;
  border: solid 1px #c6c7cc;
`;

const LineDivLong = styled.div`
  width: 116px;
  height: 0;
  border: solid 0.5px #c6c7cc;
`;

const KaKaoLoginBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 341px;
  height: 44px;
  margin-top: 12px;
  margin-bottom: 90px;
  border: none;
  border-radius: 23px;
  background-color: #e1e2e4;
`;

const KaKaoLogo = styled.img`
  margin: 0px 70px 0px 20px;
`;
