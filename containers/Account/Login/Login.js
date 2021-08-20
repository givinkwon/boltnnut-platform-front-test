import React from "react";
import styled from "styled-components";
import Containerv1 from "../../../components/Containerv1";
import * as Title from "../../../components/Title";
import ButtonComponent from "components/Button";
import InputComponent from "components/Input";
import { inject, observer } from "mobx-react";
import Router from "next/router";
const signupbnlogo = "/static/images/signupbnlogo.svg";
const line1 = "/static/images/line1.svg";
const signupkakao = "/static/images/signupkakao.svg";

@inject("Auth", "Home")
@observer
class LoginContainer extends React.Component {
  toKakaoSignUp = () => {
    this.props.Auth.kakaoLogin();
    // Router.push("/signup/kakao");
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // TODO 검색 API
      console.log("검색");
      this.props.Auth.login();
    }
  };

  render() {
    const { Auth } = this.props;

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <img src={signupbnlogo} />

          <Title18 style={{ marginTop: "18px", color: "#282c36" }}>
            <b style={{ color: "#0933b3" }}>로그인</b>해주세요.
          </Title18>

          {/* email */}
          <EmailContainer>
            <Title18 style={{ color: "#505050" }}>이메일</Title18>
            <CustomInput
              placeholder="이메일"
              onChange={Auth.setEmail}
              style={{ marginTop: "0px" }}
            />
          </EmailContainer>

          {/* password */}
          <PasswordContainer>
            <Title18 style={{ color: "#505050" }}>비밀번호</Title18>
            <CustomInput
              placeholder="비밀번호"
              onChange={Auth.setPassword}
              onKeyDown={this.handleKeyDown}
              type="password"
              style={{ marginTop: "0px" }}
            />
          </PasswordContainer>

          {/* loginstate && find ID/PW */}
          <LoginStateContainer>
            <LoginStateInnerBox style={{ width: "150px" }}>
              <CustomCheckBox type="checkbox" />
              <Title16>로그인 상태 유지</Title16>
            </LoginStateInnerBox>

            <LoginStateInnerBox style={{ width: "200px" }}>
              <Title16 style={{ cursor: "pointer" }}>아이디 찾기</Title16>
              <img src={line1} />
              <Title16 style={{ cursor: "pointer" }}>비밀번호 찾기</Title16>
            </LoginStateInnerBox>
          </LoginStateContainer>

          <ButtonContainer>
            <SignupBtn
              onClick={() => {
                Router.push(`/signup`);
              }}
            >
              <Title18 style={{ color: "#0933b3" }}>회원가입</Title18>
            </SignupBtn>

            <LoginBtn onClick={Auth.login}>
              <Title18 style={{ color: "#ffffff" }}>로그인</Title18>
            </LoginBtn>
          </ButtonContainer>

          <SnsLoginContainer>
            <LineDiv />
            <Title14 style={{ margin: "0px 28px 0px 28px", color: "#505050" }}>
              SNS 간편 로그인
            </Title14>
            <LineDiv />
          </SnsLoginContainer>

          <KakaoSignUp onClick={this.toKakaoSignUp}>
            <KakaoSignUpInnerBox>
              <KakaoImgBox>
                <img src={signupkakao} />
              </KakaoImgBox>

              <Title16 style={{ color: "#1e2222" }}>
                카카오 계정으로 로그인
              </Title16>
            </KakaoSignUpInnerBox>
          </KakaoSignUp>
        </Container>
      </div>
    );
  }
}

export default LoginContainer;

const Container = styled(Containerv1)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 180px;
`;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 588px;
  margin-top: 61px;
  width: 588px;
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 588px;
  margin-top: 40px;
`;

const LoginStateContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  margin-top: 12px;
  width: 588px;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 588px;
  margin-top: 41px;
`;

const LoginStateInnerBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;

const Title18 = styled(Title.FontSize18)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
`;

const Title16 = styled(Title.FontSize16)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.13;
  letter-spacing: -0.4px;
  color: #999999;
`;

const Title14 = styled(Title.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.43;
  letter-spacing: -0.35px;
`;

const CustomInput = styled(InputComponent)`
  height: 42px;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
  background-color: #edf4fe;
  padding: 0 20px;
  margin-top: 10px;
  background: #ffffff;

  ::placeholder {
    font-size: 16px;
  }
`;

const CustomCheckBox = styled.input`
  width: 18px;
  height: 18px;
  border: solid 1px #999999;
`;

const SignupBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 286px;
  height: 48px;
  border-radius: 24px;
  border: solid 1px #0933b3;
  background: #ffffff;
  cursor: pointer;
`;

const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 286px;
  height: 48px;
  border-radius: 24px;
  border: solid 1px #0933b3;
  background: #0933b3;
  cursor: pointer;

  :hover {
    background-color: #174aee;
  }
`;

const SnsLoginContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 80px;
`;

const LineDiv = styled.div`
  width: 213px;
  border: solid 1px #c6c7cc;
`;

const KakaoSignUp = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 588px;
  height: 48px;
  margin-top: 24px;
  border: none;
  border-radius: 24px;
  background-color: #e1e2e4;
  margin-bottom: 300px;
  cursor: pointer;
`;

const KakaoSignUpInnerBox = styled.div`
  display: flex;
  justify-content: center;
  width: 540px;
  position: relative;
`;

const KakaoImgBox = styled.div`
  position: absolute;
  left: 0;
`;
