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

const alarm_on = "static/images/alarmon.svg";

@inject("Auth")
@observer
class NotificationSetting extends Component {
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
          <div>알림 설정</div>
        </MainHeader>
        <MainBox>
          <MainBoxHeader>
            <span>업체정보, 견적서, 채팅</span>
            <sapn
              style={{
                fontSize: 15,
                color: "#767676",
                letterSpacing: -0.38,
                marginLeft: 13,
                fontWeight: "normal",
              }}
            >
              업체 정보, 견적서, 채팅 등 알림을 받아보세요.{" "}
            </sapn>
          </MainBoxHeader>
          <MainBoxBody>
            <BodyBox style={{ marginTop: 42 }}>
              <Title>카카오톡 알림</Title>
              <img src={alarm_on}></img>
            </BodyBox>
            <BodyBox>
              <Title>이메일</Title>
              <img src={alarm_on}></img>
            </BodyBox>
            <BodyBottom>
              <span>
                ※회원님의 계정보안, 서비스주문, 약관변경, 고객 지원 요청 등과
                관련된 중요 정보는 수신 동의와 상관없이 발송됩니다.
              </span>
            </BodyBottom>
          </MainBoxBody>
        </MainBox>
      </>
    );
  }
}

export default NotificationSetting;

const BodyBox = styled.div`
  width: 100%;
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  ont-size: 16px;
  font-weight: 500;
  line-height: 2.13;
  letter-spacing: -0.4px;
  text-align: left;
  color: #000;
`;

const BodyBottom = styled.div`
  font-size: 14px;
  line-height: 2.43;
  letter-spacing: -0.35px;
  text-align: left;
  color: #767676;
  margin-top: 74px;
  border-top: solid 1px #e1e2e4;
}

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
const MainBox = styled.div`
  width: 894px;
  border-radius: 15px;
  border: solid 1px #e1e2e4;
  background-color: #fff;
  padding: 40px 51px 50px;
`;

const MainBoxHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #000;
  border-bottom: solid 1px #e1e2e4;
  padding-bottom: 18px;
`;

const MainBoxBody = styled.div``;
