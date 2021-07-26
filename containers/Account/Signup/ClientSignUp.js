import React from "react";
import styled from "styled-components";
import Containerv1 from "../../../components/Containerv1";
import * as Title from "../../../components/Title";

const signupdot = "/static/images/signupdot.svg";
const signupkakao = "/static/images/signupkakao.svg";
const gol = "/static/images/gol.svg";
const dropdown = "/static/images/dropdown.svg";

class ClientSignUpContainer extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <img src={signupdot} />

          <Title32 style={{ marginTop: "20px" }}>
            <b style={{ color: "#0933b3" }}>회원가입</b>을 진행해 주세요.
          </Title32>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "60px" }}>
            <LineDiv />
            <Title14 style={{ margin: "0px 28px 0px 28px" }}>SNS 간편 회원가입</Title14>
            <LineDiv />
          </div>

          <KakaoSignUp>
            <div style={{ display: "flex", justifyContent: "center", width: "540px", position: "relative" }}>
              <KakaoImgBox>
                <img src={signupkakao} />
              </KakaoImgBox>

              <Title16>카카오 회원가입</Title16>
              <div />
            </div>
          </KakaoSignUp>

          {/* email */}
          <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", marginTop: "80px", width: "600px" }}>
            <Title18>이메일</Title18>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <CustomInput placeholder="ex.boltnnut" style={{ paddingLeft: "10px", width: "282px" }} />
              <img src={gol} style={{ margin: "0px 5px 0px 5px" }} />

              <DropDownEmailBox>
                <CustomInput placeholder="선택해주세요" style={{ width: "282px", paddingLeft: "10px", border: "none" }} />

                <img src={dropdown} style={{ marginRight: "15px" }} />
              </DropDownEmailBox>
            </div>
          </div>

          {/* password */}
          <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", marginTop: "32px" }}>
            <Title18>비밀번호</Title18>

            <CustomInput placeholder="비밀번호를 입력해 주세요." type="password" style={{ paddingLeft: "10px", width: "588px" }} />
          </div>

          {/* password confirm */}
          <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", marginTop: "32px" }}>
            <Title18>비밀번호 확인</Title18>

            <CustomInput placeholder="비밀번호를 한 번 더 입력해 주세요." type="password" style={{ paddingLeft: "10px", width: "588px" }} />
          </div>

          {/* name */}
          <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", marginTop: "32px" }}>
            <Title18>이름</Title18>

            <CustomInput placeholder="이름을 입력해 주세요." style={{ paddingLeft: "10px", width: "588px" }} />
          </div>

          {/* phone number */}
          <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", marginTop: "32px" }}>
            <Title18>휴대전화</Title18>

            <CustomInput placeholder="- 없이 입력해 주세요" type="tel" style={{ paddingLeft: "10px", width: "588px" }} />
          </div>

          {/* company name */}
          <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", marginTop: "32px" }}>
            <Title18>회사명</Title18>

            <CustomInput placeholder="- 없이 입력해 주세요" style={{ paddingLeft: "10px", width: "588px" }} />

            <div style={{ display: "inline-flex", marginTop: "14px" }}>
              <CustomCheckBox type="checkbox" />
              <Title15>개인일 경우 체크해 주세요.</Title15>
            </div>
          </div>

          {/* sectors */}
          <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", marginTop: "32px" }}>
            <Title18>업종</Title18>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <DropDownSelectorsBox>
                <CustomInput placeholder="선택해주세요" style={{ width: "282px", paddingLeft: "10px", border: "none", width: "588px" }} />

                <img src={dropdown} style={{ marginRight: "15px" }} />
              </DropDownSelectorsBox>
            </div>
          </div>

          {/* agree */}
          <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", marginTop: "48px" }}>
            <Title18>이용약관동의</Title18>

            <div style={{ display: "inline-flex", marginTop: "24px" }}>
              <CustomCheckBox type="checkbox" />
              <Title15>전체 동의합니다.</Title15>
            </div>

            <div style={{ width: "588px", border: "1px solid #c6c7cc", marginTop: "12px" }} />
          </div>
        </Container>
      </div>
    );
  }
}

export default ClientSignUpContainer;

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
  color: #505050;
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
  height: 1px;
  border: solid 0.5px #c6c7cc;
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
`;

const DropDownEmailBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 3px;
  border: solid 1px #c7c7c7;
`;

const DropDownSelectorsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 3px;
  border: solid 1px #c7c7c7;
  width: 600px;
`;

const CustomCheckBox = styled.input`
  width: 18px;
  height: 18px;
  border: solid 1px #999999;
  margin-right: 18px;
`;
