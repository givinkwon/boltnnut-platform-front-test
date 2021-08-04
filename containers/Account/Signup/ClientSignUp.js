import React from "react";
import styled from "styled-components";
import Containerv1 from "../../../components/Containerv1";
import * as Title from "../../../components/Title";
import * as Text from "components/Text";
import { inject, observer } from "mobx-react";
import { GRAY, DARKGRAY, PRIMARY, WHITE, BLACK } from "static/style";
import SelectComponent from "components/Select";
import Router from "next/router";
import InputComponent from "components/Input";

const signupdot = "/static/images/signupdot.svg";
const signupkakao = "/static/images/signupkakao.svg";
const success = "/static/images/success.svg";
const viewterms = "/static/images/viewterms.svg";

const AgreeContent = [
  { content: "만 14세 이상 입니다", essential: "(필수)", terms: 0 },
  { content: "이용약관 동의", essential: "(필수)", terms: 1 },
  { content: "개인정보 처리방침 동의", essential: "(필수)", terms: 1 },
  { content: "마케팅 정보 수신에 동의 합니다", essential: "(선택)", terms: 0 },
];

@inject("Auth", "Signup")
@observer
class ClientSignupContainer extends React.Component {
  componentDidMount() {
    this.props.Auth.getPathData();
    this.props.Auth.getBusinessData();
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    const { Auth } = this.props;
  }

  // 전체동의 핸들러 함수
  fullConsent = () => {
    const { Auth } = this.props;
    if (Auth.allCheckState === false) {
      Auth.allCheckState = true;

      Auth.checkboxState.forEach((item, idx) => {
        const checkbox = Auth.checkboxState;
        checkbox[idx] = true;
        Auth.checkboxState = checkbox;
        console.log("item : ", Auth.checkboxState);
      });
    } else {
      Auth.allCheckState = false;

      Auth.checkboxState.forEach((item, idx) => {
        const checkbox = Auth.checkboxState;
        checkbox[idx] = false;
        Auth.checkboxState = checkbox;
        console.log("item : ", Auth.checkboxState);
      });
    }
  };

  // 가입하기 submit 함수
  signupSubmit = () => {
    const { Auth } = this.props;
    const checkboxArr = Auth.checkboxState;

    if (checkboxArr[0] === true && checkboxArr[1] === true && checkboxArr[2] === true) {
      Auth.signup();
    } else {
      alert("필수 이용약관에 동의해 주세요");
    }
  };

  // 비밀번호 확인 일치 함수
  passwordInvalid = () => {
    const { Auth, Signup } = this.props;
    if (Auth.password === Auth.password2) {
      Signup.passwordInvalid = true;
    } else {
      Signup.passwordInvalid = false;
    }
  };

  // 이름, 회사명, 직급에 특수문자 유효성 검사
  textInvalid = () => {
    const { Auth, Signup } = this.props;
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

    if (regex.test(Auth.realName)) {
      Signup.realNameInvalid = true;
    } else {
      Signup.realNameInvalid = false;
    }
  };

  phoneInvalid = () => {
    const { Auth, Signup } = this.props;
    const regex = /^[A-Za-z0-9]{9,12}$/;

    if (regex.test(Auth.phone)) {
      Signup.phoneInvalid = true;
    } else {
      Signup.phoneInvalid = false;
    }
  };

  render() {
    const { Auth, Signup } = this.props;

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <img src={signupdot} />

          <Title32 style={{ marginTop: "20px" }}>
            <b style={{ color: "#0933b3" }}>회원가입</b>을 진행해 주세요.
          </Title32>

          <LineDivContainer>
            <LineDiv />
            <Title14 style={{ margin: "0px 28px 0px 28px", color: "#505050" }}>SNS 간편 회원가입</Title14>
            <LineDiv />
          </LineDivContainer>

          <KakaoSignUp
            onClick={() => {
              Router.push("/signup/snsclientsignup");
            }}
          >
            <KakaoSignupInnerBox>
              <KakaoImgBox>
                <img src={signupkakao} />
              </KakaoImgBox>

              <Title16>카카오 회원가입</Title16>
            </KakaoSignupInnerBox>
          </KakaoSignUp>

          {/* email */}
          <InputInnerBox style={{ marginTop: "80px" }}>
            <Title18>이메일</Title18>

            <EmailInnerContainer>
              <CustomInput placeholder="boltnnut@gmail.com" onChange={Auth.setEmail} value={Auth.email} style={{ width: "437px", marginTop: "0px" }} />

              <AuthenticateBtn>
                <AuthenticateBtnText>인증하기</AuthenticateBtnText>
              </AuthenticateBtn>
            </EmailInnerContainer>
          </InputInnerBox>

          {/* password */}
          <InputInnerBox>
            <Title18>비밀번호</Title18>
            <CustomInput placeholder="비밀번호를 입력해 주세요." type="password" onChange={Auth.setPassword} value={Auth.password} style={{ marginTop: "0px" }} />
            <PasswordInvalidImgBox src={success} active={Auth.password} />
          </InputInnerBox>

          {/* password confirm */}
          <InputInnerBox>
            <Title18>비밀번호 확인</Title18>
            <CustomInput
              placeholder="비밀번호를 한 번 더 입력해 주세요."
              type="password"
              onChange={(e) => {
                Auth.setPassword2(e);
                this.passwordInvalid();
              }}
              value={Auth.password2}
              style={{ marginTop: "0px" }}
            />
            <InvalidImgBox src={success} active={Signup.passwordInvalid} />
          </InputInnerBox>

          {/* name */}
          <InputInnerBox>
            <Title18>이름</Title18>
            <CustomInput
              placeholder="이름을 입력해 주세요."
              onChange={(e) => {
                Auth.setRealName(e);
                this.textInvalid();
              }}
              value={Auth.realName}
              style={{ marginTop: "0px" }}
            />
            <InvalidImgBox src={success} active={Signup.realNameInvalid} />
          </InputInnerBox>

          {/* phone number */}
          <InputInnerBox>
            <Title18>휴대전화</Title18>
            <CustomInput
              placeholder="- 없이 입력해 주세요"
              onChange={(e) => {
                Auth.setPhone(e);
                this.phoneInvalid();
              }}
              value={Auth.phone}
              type="tel"
              style={{ marginTop: "0px" }}
            />
            <InvalidImgBox src={success} active={Signup.phoneInvalid} />
          </InputInnerBox>

          {/* company name */}
          <InputInnerBox>
            <Title18>회사명</Title18>
            <CustomInput
              placeholder="- 없이 입력해 주세요"
              onChange={(e) => {
                Auth.setCompanyName(e);
                this.textInvalid();
              }}
              value={Auth.company_name}
              style={{ marginTop: "0px" }}
            />
            <InvalidImgBox src={success} style={{ bottom: "45%" }} active={Signup.company_nameInvalid} />

            <div style={{ display: "inline-flex", marginTop: "25px" }}>
              <CustomCheckBox type="checkbox" />
              <Title15>개인일 경우 체크해 주세요.</Title15>
            </div>
          </InputInnerBox>

          {/* rank */}
          <InputInnerBox>
            <Title18>직급</Title18>
            <CustomInput
              placeholder="직급을 입력해 주세요."
              onChange={(e) => {
                Auth.setTitle(e);
                this.textInvalid();
              }}
              value={Auth.title}
              style={{ marginTop: "0px" }}
            />
            <InvalidImgBox src={success} active={Signup.titlenameInvalid} />
          </InputInnerBox>

          {/* agree */}
          <AgreeContainer>
            <Title18>이용약관동의</Title18>

            <AllAgreeInnerBox>
              <CustomCheckBox
                type="checkbox"
                onChange={(e) => {
                  this.setState({ allCheckState: e.currentTarget.checked });
                }}
                onClick={() => this.fullConsent()}
              />
              <Title15>전체 동의합니다.</Title15>
            </AllAgreeInnerBox>

            <BottomLineDiv />

            {AgreeContent.map((item, idx) => {
              return (
                <AgreeInnerBox style={{ width: "588px", position: "relative" }}>
                  <CustomCheckBox
                    type="checkbox"
                    checked={Auth.checkboxState[idx]}
                    onChange={(e) => {
                      const check = Auth.checkboxState;
                      check[idx] = e.currentTarget.checked;

                      Auth.checkboxState = check;
                    }}
                  />
                  <Title15>{item.content}</Title15>
                  <Title14 style={{ color: "#999999", marginLeft: "4px" }}>{item.essential}</Title14>
                  {item.terms != 0 && <ImgBox src={viewterms} />}
                </AgreeInnerBox>
              );
            })}
          </AgreeContainer>

          <SubmitButton onClick={() => this.signupSubmit()}>
            <ButtonText>가입하기</ButtonText>
          </SubmitButton>
        </Container>
      </div>
    );
  }
}

export default ClientSignupContainer;

const ImgBox = styled.img`
  position: absolute;
  right: 0;
  cursor: pointer;
`;

const PasswordInvalidImgBox = styled.img`
  display: ${(props) => (props.active !== "" ? "inline-block" : "none")};
  position: absolute;
  right: 0;
  bottom: 20%;
  margin-right: 16px;
`;

const InvalidImgBox = styled.img`
  display: ${(props) => (props.active ? "block" : "none")};
  position: absolute;
  right: 0;
  bottom: 20%;
  margin-right: 16px;
`;

const Container = styled(Containerv1)`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const Title32 = styled(Title.FontSize32)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.06;
  letter-spacing: -0.8px;
  color: #282c36;
`;

const Title14 = styled(Title.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.43;
  letter-spacing: -0.35px;
`;

const Title15 = styled(Title.FontSize15)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  color: #505050;
`;

const Title16 = styled(Title.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.13;
  letter-spacing: -0.4px;
  color: #1e2222;
`;

const Title18 = styled(Title.FontSize18)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #1e2222;
  margin-bottom: 10px;
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
  cursor: pointer;
`;

const KakaoImgBox = styled.div`
  position: absolute;
  left: 0;
`;

const CustomInput = styled(InputComponent)`
  border-radius: 3px;
  border: solid 1px #c7c7c7;
  padding-left: 10px;
  width: 588px;

  ::placeholder {
    color: #c7c7c7;
  }
`;

const DropDownSelectorsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 3px;
  border: solid 1px #c7c7c7;
  width: 602px;
`;

const SectorsInput = styled.input`
  border: none;
  padding-left: 10px;
  width: 100%;
  height: 42px;

  ::placeholder {
    color: #c7c7c7;
  }
`;

const CustomCheckBox = styled.input`
  width: 18px;
  height: 18px;
  border: solid 1px #999999;
  margin-right: 18px;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 228px;
  height: 48px;
  border-radius: 24px;
  background-color: #0933b3;
  margin-top: 80px;
  margin-bottom: 300px;
  cursor: pointer;
`;

const ButtonText = styled(Title.FontSize18)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #ffffff;
`;

const AuthenticateBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 139px;
  height: 100%;
  border-radius: 3px;
  border: solid 1px #c7c7c7;
  background-color: #ffffff;
  cursor: pointer;
`;

const AuthenticateBtnText = styled(Title.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.13;
  letter-spacing: -0.4px;
  color: #1e2222;
`;

const BottomLineDiv = styled.div`
  width: 588px;
  border: 1px solid #c6c7cc;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const LineDivContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
`;

const KakaoSignupInnerBox = styled.div`
  display: flex;
  justify-content: center;
  width: 540px;
  position: relative;
`;

const EmailContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 80px;
  width: 600px;
`;

const EmailInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 588px;
`;

const InputInnerBox = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 32px;
`;

const AgreeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 48px;
`;

const AllAgreeInnerBox = styled.div`
  display: inline-flex;
  margin-top: 24px;
`;

const AgreeInnerBox = styled.div`
  display: inline-flex;
  align-items: center;
`;
