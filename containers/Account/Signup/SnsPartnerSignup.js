import React from "react";
import styled from "styled-components";
import Containerv1 from "../../../components/Containerv1";
import * as Title from "../../../components/Title";
import { inject, observer } from "mobx-react";
import InputComponent from "components/Input";

const signupdot = "/static/images/signupdot.svg";
const signupsearch = "/static/images/signupsearch.svg";
const dropdown = "/static/images/dropdown.svg";
const viewterms = "/static/images/viewterms.svg";

const AgreeContent = [
  { content: "만 14세 이상 입니다", essential: "(필수)", terms: 0 },
  { content: "이용약관 동의", essential: "(필수)", terms: 1 },
  { content: "개인정보 처리방침 동의", essential: "(필수)", terms: 1 },
  { content: "마케팅 정보 수신에 동의 합니다", essential: "(선택)", terms: 0 },
];

@inject("Auth")
@observer
class SnsPartnerSignupContainer extends React.Component {
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

    if (
      checkboxArr[0] === true &&
      checkboxArr[1] === true &&
      checkboxArr[2] === true
    ) {
      Auth.snsSignup();
      console.log("post!!!!");
    } else {
      alert("필수 이용약관에 동의해 주세요");
    }
  };

  render() {
    const { Auth } = this.props;

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <img src={signupdot} />

          <Title32 style={{ marginTop: "20px" }}>
            추가정보를 입력해 주세요.
          </Title32>

          {/* name */}
          <InputInnerBox>
            <Title18>이름</Title18>
            <CustomInput
              placeholder="이름을 입력해 주세요."
              onChange={Auth.setRealName}
              value={Auth.realName}
              style={{ marginTop: "0px" }}
            />
          </InputInnerBox>

          {/* company name */}
          <InputInnerBox style={{ position: "relative" }}>
            <Title18>상호명</Title18>

            <div style={{ display: "flex", alignItems: "center" }}>
              <CustomInput
                placeholder="등록하고자 하는 상호명을 입력해 주세요."
                onChange={Auth.setCompanyName}
                value={Auth.company_name}
                style={{ marginTop: "0px" }}
              />
              <ImgBox
                src={signupsearch}
                style={{ marginRight: "22px", marginBottom: "3px" }}
              />
            </div>
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
                  <Title14 style={{ color: "#999999", marginLeft: "4px" }}>
                    {item.essential}
                  </Title14>
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

export default SnsPartnerSignupContainer;

const ImgBox = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
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

const CustomInput = styled(InputComponent)`
  height: 42px;
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
