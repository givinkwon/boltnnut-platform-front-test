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
import Buttonv1 from "components/Buttonv1";

const alarm_on = "static/images/alarmon.svg";

@inject("Auth")
@observer
class PasswordChange extends Component {
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
          <div>비밀번호 변경</div>
        </MainHeader>
        <MainBox>
          <MainSubbox>
            <MainBoxTitle>비밀번호</MainBoxTitle>
            <InputComponent
              class="Input"
              onFocus={(e) => (e.target.placeholder = "")}
              // onChange={(e) => {}}
            />
          </MainSubbox>
          <MainSubbox>
            <MainBoxTitle>비밀번호 변경</MainBoxTitle>
            <InputComponent
              class="Input"
              onFocus={(e) => (e.target.placeholder = "")}
              // onChange={(e) => {}}
            />
          </MainSubbox>
          <MainSubbox style={{ marginBottom: 0 }}>
            <MainBoxTitle>비밀번호 변경 확인</MainBoxTitle>
            <InputComponent
              class="Input"
              onFocus={(e) => (e.target.placeholder = "")}
              // onChange={(e) => {}}
            />
          </MainSubbox>
        </MainBox>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <ChangeButton style={{ marginTop: 76 }}>변경하기</ChangeButton>
        </div>
      </>
    );
  }
}

export default PasswordChange;

const MainBoxTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.89;
  letter-spacing: -0.45px;
  text-align: left;
  color: #1e2222;
}
`;

const Aside = styled.div`
  width: 230px;
  font-family: NotoSansCJKkr;
`;

const MainBox = styled.div`
  width: 894px;
  border-radius: 15px;
  border: solid 1px #e1e2e4;
  background-color: #fff;
  padding: 40px 51px 50px;
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

const MainSubbox = styled.div`
  margin-bottom: 40px;
  .MuiInputBase-root {
    height: 42px;
    width: 100%;
  }
`;

const ChangeButton = styled(Buttonv1)`
  width: 230px !important;
  height: 48px !important;
  border-radius: 5px !important;
  font-size: 18px;
  line-height: 1.89;
  letter-spacing: -0.45px;
`;
