import React from "react";
import styled from "styled-components";
import Containerv1 from "../../../components/Containerv1";
import * as Title from "../../../components/Title";
import { inject, observer } from "mobx-react";
import Router from "next/router";

const signupbnlogo = "/static/images/signupbnlogo.svg";
const partnersignupimg = "/static/images/partnersignupimg.svg";
const clientsignupimg = "/static/images/clientsignupimg.svg";

@inject("Auth")
@observer
class SignupContainer extends React.Component {
  render() {
    const { Auth } = this.props;
    console.log(Auth.signupType);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <img src={signupbnlogo} />

          <Title18 style={{ marginTop: "11px", color: "#282c36" }}>
            <b style={{ color: "#0933b3" }}>선택</b>해 주세요.
          </Title18>

          <SelectContainer>
            <SelectBox
              onClick={() => {
                Auth.type = "client";
                Auth.isSnsSignup ? Router.push("/signup/snsclientsignup") : Router.push("/signup/clientsignup");
              }}
            >
              <Title16>제조사를 찾고 싶어요.</Title16>
              <img src={clientsignupimg} />
              <Title20>클라이언트</Title20>

              <DescBox>
                <Title18 style={{ marginTop: "20px" }}>의뢰할 프로젝트가 있는</Title18>
                <Title18>기업 또는 개인</Title18>
              </DescBox>
            </SelectBox>

            <SelectBox
              onClick={() => {
                Auth.type = "partner";
                Auth.isSnsSignup ? Router.push("/signup/snspartnersignup") : Router.push("/signup/partnersignup");
              }}
            >
              <Title16>일거리를 찾고 있어요.</Title16>
              <img src={partnersignupimg} />
              <Title20>제조사</Title20>

              <DescBox>
                <Title18 style={{ marginTop: "20px" }}>프로젝트를 의뢰받고자 하는</Title18>
                <Title18>기업 또는 개인</Title18>
              </DescBox>
            </SelectBox>
          </SelectContainer>
        </Container>
      </div>
    );
  }
}

export default SignupContainer;

const Container = styled(Containerv1)`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 160px;
`;

const Title16 = styled(Title.FontSize16)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #999999;
`;

const Title18 = styled(Title.FontSize18)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
`;

const Title20 = styled(Title.FontSize20)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.5px;
  color: #191919;
`;

const SelectContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  margin-top: 80px;
  margin-bottom: 299px;
  width: 792px;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 480px;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  cursor: pointer;

  :hover {
    border: solid 2px #0933b3;
  }
`;

const DescBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  border-top: solid 1px #c6c7cc;
  width: 304px;
`;
