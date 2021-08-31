import React from "react";
import styled from "styled-components";
import Containerv1 from "../../../components/Containerv1";
import * as Title from "../../../components/Title";
import { inject, observer } from "mobx-react";
import ButtonSpinnerComponent from "components/ButtonSpinner";
import InputComponent from "components/Input";

const signupdot = "/static/images/signupdot.svg";
const signupsearch = "/static/images/signupsearch.svg";
const success = "/static/images/success.svg";
const viewterms = "/static/images/viewterms.svg";

const AgreeContent = [
  { content: "만 14세 이상 입니다", essential: "(필수)", terms: 0 },
  { content: "이용약관 동의", essential: "(필수)", terms: 1 },
  { content: "개인정보 처리방침 동의", essential: "(필수)", terms: 1 },
];
const MarketingContent = [
  { content: "마케팅 정보 수신에 동의 합니다", essential: "(선택)", terms: 0 },
];

@inject("Auth", "Signup")
@observer
class SnsSignupContent extends React.Component {
  componentDidMount() {
    this.props.Auth.getPathData();
    this.props.Auth.getBusinessData();
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
    // this.props.Signup.passwordInvalidhandler();
  }

  componentWillUnmount() {
    const { Signup } = this.props;
    // Signup.reset();
  }

  render() {
    const { Auth, Signup } = this.props;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <img src={signupdot} />

          <Title32 style={{ marginTop: "20px" }}>
            추가정보를 입력해 주세요.
          </Title32>

          {/* name */}
          <InputInnerBox style={{ marginTop: 80 }}>
            <Title18>이름</Title18>
            <CustomInput
              placeholder="이름을 입력해 주세요."
              onChange={(e) => {
                Signup.setRealName(e.currentTarget.value);
                Signup.textInvalid("name", e.currentTarget.value);
              }}
              active={Signup.realNameInputState}
            />
            <InvalidImgBox src={success} active={Signup.realNameInvalid} />
            {Signup.realName && (
              <InvalidTitle14 active={Signup.realNameInvalid}>
                특수문자는 입력할 수 없습니다.
              </InvalidTitle14>
            )}
          </InputInnerBox>

          {/* company name */}
          {/* 클라이언트는 회사명, 파트너는 상호명 */}
          <InputInnerBox>
            <Title18>{Auth.type === "client" ? "회사명" : "상호명"}</Title18>
            <CustomInput
              placeholder="근무하고 계신 회사명을 입력해 주세요."
              onChange={(e) => {
                Signup.setCompanyName(e.currentTarget.value);
                Signup.textInvalid("companyName", e.currentTarget.value);
              }}
              active={Signup.company_nameInputState}
              defaultValue={Signup.individual}
            />
            <InvalidImgBox
              src={success}
              style={{ bottom: "40%" }}
              active={Signup.company_nameInvalid}
            />
            {Auth.type === "client" && (
              <div style={{ display: "inline-flex", marginTop: "12px" }}>
                <CustomCheckBox
                  type="checkbox"
                  onClick={() => {
                    Signup.individualhandler(Signup.individualState);
                    Signup.company_name = "개인";
                  }}
                />
                <Title15>개인일 경우 체크해 주세요.</Title15>
              </div>
            )}
          </InputInnerBox>

          {/* rank */}
          {Auth.type === "client" && (
            <InputInnerBox style={{ marginTop: "15px" }}>
              <Title18>직급</Title18>
              <CustomInput
                placeholder="직급을 입력해 주세요."
                onChange={(e) => {
                  Signup.setTitle(e.currentTarget.value);
                  Signup.textInvalid("title", e.currentTarget.value);
                }}
                active={Signup.titleInputState}
              />
              <InvalidImgBox src={success} active={Signup.titleInvalid} />
              {Signup.title && (
                <InvalidTitle14 active={Signup.titleInvalid}>
                  특수문자는 입력할 수 없습니다.
                </InvalidTitle14>
              )}
            </InputInnerBox>
          )}

          {/* agree */}
          <AgreeContainer>
            <Title18>이용약관동의</Title18>

            <AllAgreeInnerBox>
              <CustomCheckBox
                type="checkbox"
                checked={Signup.allCheckState}
                onChange={(e) => {
                  this.setState({ allCheckState: e.currentTarget.checked });
                }}
                onClick={() => Signup.fullConsent()}
              />
              <Title15>전체 동의합니다.</Title15>
            </AllAgreeInnerBox>

            <BottomLineDiv />
            {AgreeContent.map((item, idx) => {
              return (
                <AgreeInnerBox style={{ width: "588px", position: "relative" }}>
                  <CustomCheckBox
                    type="checkbox"
                    checked={Signup.checkboxState}
                    onChange={(e) => {
                      Signup.checkboxState = e.currentTarget.checked;
                    }}
                  />
                  <Title15 style={{ color: "#999999" }}>{item.content}</Title15>
                  <Title14 style={{ color: "#999999", marginLeft: "4px" }}>
                    {item.essential}
                  </Title14>
                  {item.terms != 0 && <ImgBox src={viewterms} />}
                </AgreeInnerBox>
              );
            })}

            {MarketingContent.map((item, idx) => {
              return (
                <AgreeInnerBox style={{ width: "588px", position: "relative" }}>
                  <CustomCheckBox
                    type="checkbox"
                    checked={Signup.marketingcheckboxState}
                    onChange={(e) => {
                      Signup.marketingcheckboxState = e.currentTarget.checked;
                    }}
                    // 초기값이 안맞아서 역순으로 해야함
                    onClick={() =>
                      Signup.setMarketing(!Signup.marketingcheckboxState)
                    }
                  />
                  <Title15 style={{ color: "#999999" }}>{item.content}</Title15>
                  <Title14 style={{ color: "#999999", marginLeft: "4px" }}>
                    {item.essential}
                  </Title14>
                  {item.terms != 0 && <ImgBox src={viewterms} />}
                </AgreeInnerBox>
              );
            })}
          </AgreeContainer>
          {Auth.loading ? (
            <ButtonSpinnerComponent scale="50%" primary />
          ) : (
            <SubmitButton
              onClick={() => {
                Signup.snsSignup();
              }}
            >
              <ButtonText>가입하기</ButtonText>
            </SubmitButton>
          )}
        </Container>
      </div>
    );
  }
}

export default SnsSignupContent;

const ImgBox = styled.img`
  position: absolute;
  right: 0;
  cursor: pointer;
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
`;

const KakaoImgBox = styled.div`
  position: absolute;
  left: 0;
`;

const CustomInput = styled.input`
  border-radius: 3px;
  border: ${(props) =>
    props.active ? "1px solid #c7c7c7" : "1px solid #e53c38"};
  padding-left: 10px;
  width: 578px;
  height: 42px;
  font-size: 16px;

  ::placeholder {
    color: #c7c7c7;
  }

  :focus {
    background-color: #edf4fe;
    outline: none;
  }
`;

const DropDownSelectorsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relactive
  width: 602px;
`;

const SectorsInput = styled(InputComponent)`
  border: none;
  padding-left: 10px;
  width: 588px;
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
  border: none;
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
  height: 42px;
  border-radius: 3px;
  border: solid 1px #c7c7c7;
  background-color: #ffffff;
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
  width: 100%;
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

const InvalidImgBox = styled.img`
  display: ${(props) => (props.active ? "block" : "none")};
  position: absolute;
  right: 0;
  bottom: 18%;
  margin-right: 16px;
`;

const InvalidTitle14 = styled(Title.FontSize14)`
  color: #e53c38;
  margin-top: 10px;
  font-weight: normal;
  display: ${(props) => (props.active ? "none" : "block")};
`;
