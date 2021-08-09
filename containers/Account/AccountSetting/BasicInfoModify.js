import React, { Component } from "react";
import styled from "styled-components";
import * as Text from "components/Text";
import { PRIMARY, WHITE } from "../../../static/style";
import { inject, observer } from "mobx-react";

import Background from "components/Background";
import Container from "components/Containerv1";
import InputComponent from "components/Input";
import CheckBoxComponent from "components/CheckBox";
import TabContainer from "AccountSetting/Tab";

const profile_img = "static/images/profileimg.svg";
const profile_modify = "static/images/profilemodify.svg";

@inject("Auth")
@observer
class ChangePassword extends Component {
  onKeyPress = (e) => {
    if (e.key === "Enter") {
      const { Auth } = this.props;
      Auth.changePassword();
    }
  };

  setTab = (val) => {
    this.props.setTab(val);
    window.history.pushState("", "", `/account?tab=${val}`);
  };

  render() {
    const { Auth, tab } = this.props;
    return (
      <>
        <MainHeader>
          <div>기본 정보 수정</div>
          <div style={{ fontSize: 16, color: "#0933b3" }}>수정하기</div>
        </MainHeader>
        <MainBox>
          <MainBoxHeader>
            <div>
              <img src={profile_img} />
              <img src={profile_modify} />
            </div>
            <span
              style={{
                marginTop: 56,
                marginBottom: 40,
                fontSize: 16,
                letterSpacing: -0.4,
                lineHeight: 1.38,
                color: "#767676",
              }}
            >
              프로필 사진을 등록하면 파트너가 더욱 신뢰감을 가집니다.
              <br />
              이미지 파일(.jpg, .jpeg, .png, 등)만 업로드할 수 있습니다.
            </span>
          </MainBoxHeader>
          <MainBoxBody>
            <BodyBox>
              <BodyBoxTitle>이메일</BodyBoxTitle>
              <InputComponent
                class="Input"
                onFocus={(e) => (e.target.placeholder = "")}
                // onChange={(e) => {}}
              />
            </BodyBox>
            <BodyBox style={{ display: "flex", justifyContent: "flex-start" }}>
              <BodySubBox>
                <BodyBoxTitle>이름</BodyBoxTitle>
                <InputComponent
                  class="Input"
                  onFocus={(e) => (e.target.placeholder = "")}
                  // onChange={(e) => {}}
                />
              </BodySubBox>
              <BodySubBox style={{ marginLeft: 52 }}>
                <BodyBoxTitle>휴대전화</BodyBoxTitle>
                <InputComponent
                  class="Input"
                  onFocus={(e) => (e.target.placeholder = "")}
                  // onChange={(e) => {}}
                />
              </BodySubBox>
            </BodyBox>
            <BodyBox>
              <BodyBoxTitle>회사명</BodyBoxTitle>
              <InputComponent
                class="Input"
                onFocus={(e) => (e.target.placeholder = "")}
                // onChange={(e) => {}}
              />
              <div style={{ marginTop: 14 }}>
                <CheckBoxComponent onChange={this.toggleCheckBox}>
                  <span
                    style={{
                      color: "#505050",
                      fontSize: 16,
                    }}
                  >
                    개인일 경우 체크해주세요.
                  </span>
                </CheckBoxComponent>
              </div>
            </BodyBox>
            <BodyBox>
              <BodyBoxTitle>직급</BodyBoxTitle>
              <InputComponent
                class="Input"
                onFocus={(e) => (e.target.placeholder = "")}
                // onChange={(e) => {}}
              />
            </BodyBox>
          </MainBoxBody>
        </MainBox>
      </>
    );
  }
}

export default ChangePassword;

const BodyBox = styled.div`
  margin-top: 32px;
  .MuiInputBase-root {
    height: 42px;
    width: 100%;
  }
`;

const BodySubBox = styled.div`
  width: 50%;
`;

const BodyBoxTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #1e2222;
  margin-bottom: 10px;
`;

const MainBox = styled.div`
  width: 894px;
  border-radius: 15px;
  border: solid 1px #e1e2e4;
  background-color: #fff;
  padding: 40px 51px 80px;
`;

const MainHeader = styled.div`
display: flex;
justify-content: space-between;
padding-top: 45px;
padding-bottom: 16px;
font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  text-align: left;
  color: #1e2222;
}
`;

const MainBoxHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MainBoxBody = styled.div``;
