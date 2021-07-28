import React from "react";
import styled from "styled-components";
import Containerv1 from "../../../components/Containerv1";
import * as Title from "../../../components/Title";

const signupdot = "/static/images/signupdot.svg";
const signupsearch = "/static/images/signupsearch.svg";
const dropdown = "/static/images/dropdown.svg";
const viewterms = "/static/images/viewterms.svg";

const aa = [
  { content: "만 14세 이상입니다", test: "(필수)" },
  { content: "이용약관 동의", test: "(필수)" },
  { content: "만ㅁㄴㅇㅁㄴㅇㅁㄴㅇ", test: "(선택)" },
];

// const checkboxState = [false, false, false];
class SnsClientSignupContainer extends React.Component {
  state = {
    checkboxState: [false, false, false],
  };
  render() {
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
            <CustomInput placeholder="이름을 입력해 주세요." />
          </InputInnerBox>

          {/* company name */}
          <InputInnerBox style={{ position: "relative" }}>
            <Title18>회사명</Title18>

            <div style={{ display: "flex", alignItems: "center" }}>
              <CustomInput placeholder="근무하는 회사명을 입력해 주세요." />
              <ImgBox src={signupsearch} style={{ marginRight: "22px" }} />
            </div>

            <div style={{ display: "inline-flex", marginTop: "14px" }}>
              <CustomCheckBox type="checkbox" />
              <Title15>개인일 경우 체크해 주세요.</Title15>
            </div>
          </InputInnerBox>

          {/* sectors */}
          <InputInnerBox>
            <Title18>업종</Title18>
            <DropDownSelectorsBox>
              <SectorsInput placeholder="옵션을 선택해 주세요." />
              <img src={dropdown} style={{ marginRight: "15px" }} />
            </DropDownSelectorsBox>
          </InputInnerBox>

          {/* agree */}
          <AgreeContainer>
            <Title18>이용약관동의</Title18>

            <AllAgreeInnerBox>
              <CustomCheckBox type="checkbox" />
              <Title15>전체 동의합니다.</Title15>
            </AllAgreeInnerBox>

            <BottomLineDiv />

            {aa.map((item, idx) => {
              return (
                <AgreeInnerBox style={{ marginTop: "14px" }}>
                  <CustomCheckBox
                    type="checkbox"
                    onChange={(e) => {
                      // this.state.checkboxState[idx] = e.currentTarget.checked;
                      const a = this.state.checkboxState;
                      a[idx] = e.currentTarget.checked;
                      this.setState({ checkboxState: a });
                    }}
                  />
                  <Title15>{item.content}</Title15>
                  <Title14 style={{ color: "#999999", marginLeft: "4px" }}>
                    {item.test}
                  </Title14>
                </AgreeInnerBox>
              );
            })}

            {this.state.checkboxState.map((item, idx) => {
              return <>{item.toString()} / </>;
            })}
            {/* <AgreeInnerBox style={{ marginTop: "14px" }}>
              <CustomCheckBox type="checkbox" />
              <Title15>만 14세 이상입니다</Title15>
              <Title14 style={{ color: "#999999", marginLeft: "4px" }}>
                (필수)
              </Title14>
            </AgreeInnerBox>

            <AgreeInnerBox style={{ width: "588px", position: "relative" }}>
              <CustomCheckBox type="checkbox" />
              <Title15>이용약관 동의</Title15>
              <Title14 style={{ color: "#999999", marginLeft: "4px" }}>
                (필수)
              </Title14>
              <ImgBox src={viewterms} />
            </AgreeInnerBox>

            <AgreeInnerBox style={{ width: "588px", position: "relative" }}>
              <CustomCheckBox type="checkbox" />
              <Title15>개인정보 처리방침 동의</Title15>
              <Title14 style={{ color: "#999999", marginLeft: "4px" }}>
                (필수)
              </Title14>
              <ImgBox src={viewterms} />
            </AgreeInnerBox>

            <AgreeInnerBox>
              <CustomCheckBox
                type="checkbox"
                onChange={(e) => console.log(e.currentTarget.checked)}
              />
              <Title15>마케팅 정보 수신에 동의합니다</Title15>
              <Title14 style={{ color: "#999999", marginLeft: "4px" }}>
                (선택)
              </Title14>
            </AgreeInnerBox> */}
          </AgreeContainer>

          <SubmitButton>
            <ButtonText>가입하기</ButtonText>
          </SubmitButton>
        </Container>
      </div>
    );
  }
}

export default SnsClientSignupContainer;

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
