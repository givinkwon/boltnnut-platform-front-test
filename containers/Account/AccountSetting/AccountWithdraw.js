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

const circlecheck = "./static/images/request/circlecheck.svg";
const circlecheckblue = "./static/images/request/circlecheck_blue.svg";

@inject("Auth")
@observer
class PasswordChange extends Component {
  state = {
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
  };
  onKeyPress = (e) => {
    if (e.key === "Enter") {
      const { Auth } = this.props;
      Auth.changePassword();
    }
  };

  activeHandler = (flag) => {
    if (flag == "check1") {
      if (this.state.check1) {
        this.setState({ check1: false });
      } else {
        this.setState({
          check1: true,
          check2: false,
          check3: false,
          check4: false,
          check5: false,
        });
      }
    }
    if (flag == "check2") {
      if (this.state.check2) {
        this.setState({ check2: false });
      } else {
        this.setState({
          check2: true,
          check1: false,
          check3: false,
          check4: false,
          check5: false,
        });
      }
    }
    if (flag == "check3") {
      if (this.state.check3) {
        this.setState({ check3: false });
      } else {
        this.setState({
          check3: true,
          check1: false,
          check2: false,
          check4: false,
          check5: false,
        });
      }
    }
    if (flag == "check4") {
      if (this.state.check4) {
        this.setState({ check4: false });
      } else {
        this.setState({
          check4: true,
          check1: false,
          check2: false,
          check3: false,
          check5: false,
        });
      }
    }
    if (flag == "check5") {
      if (this.state.check5) {
        this.setState({ check5: false });
      } else {
        this.setState({
          check5: true,
          check1: false,
          check2: false,
          check3: false,
          check4: false,
        });
      }
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
          <div>회원 탈퇴</div>
        </MainHeader>
        <MainBox>
          <MainSubbox>
            <MainBoxTitle>회원 탈퇴 확인 사항</MainBoxTitle>
            <TextBox>
              <span>
                1. 탈퇴 시 회원님이 작성한 프로필 정보, 프로젝트 정보 등 모든
                내용이 삭제되며, 추후 재가입 하시더라도 복구되지 않습니다.
              </span>
              <br />
              <sapn>
                2. 볼트앤너트 이용에 불편이 있어 탈퇴를 고민하신다면,
                boltnnut@boltnnut.cm 또는{" "}
                <span style={{ color: "#0933b3" }}>02-926-6637</span>로 문의
                바랍니다.{" "}
              </sapn>
            </TextBox>
          </MainSubbox>
          <MainSubbox>
            <MainBoxTitle>볼트앤너트를 떠나는 이유를 알려주세요.</MainBoxTitle>
            <CheckBox
              style={{ marginTop: 22 }}
              active={this.state.check1}
              onClick={() => {
                this.activeHandler("check1");
              }}
            >
              <img src={this.state.check1 ? circlecheckblue : circlecheck} />
              <CheckboxText>사용하기 어려워요.</CheckboxText>
            </CheckBox>
            <CheckBox
              active={this.state.check2}
              onClick={() => {
                this.activeHandler("check2");
              }}
            >
              <img src={this.state.check2 ? circlecheckblue : circlecheck} />
              <CheckboxText>서비스 퀄리티가 낮아요.</CheckboxText>
            </CheckBox>
            <CheckBox
              active={this.state.check3}
              onClick={() => {
                this.activeHandler("check3");
              }}
            >
              <img src={this.state.check3 ? circlecheckblue : circlecheck} />
              <CheckboxText>비매너 회원을 만났어요.</CheckboxText>
            </CheckBox>
            <CheckBox
              active={this.state.check4}
              onClick={() => {
                this.activeHandler("check4");
              }}
            >
              <img src={this.state.check4 ? circlecheckblue : circlecheck} />
              <CheckboxText>잦은 오류가 발생해요.</CheckboxText>
            </CheckBox>
            <CheckBox
              style={{ marginBottom: 0 }}
              active={this.state.check5}
              onClick={() => {
                this.activeHandler("check5");
              }}
            >
              <img src={this.state.check5 ? circlecheckblue : circlecheck} />
              <CheckboxText>기타</CheckboxText>
            </CheckBox>
          </MainSubbox>
        </MainBox>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <WithdrawBtn onClick={() => {Auth.deactivateUser()}} style={{ marginTop: 76 }}>회원 탈퇴</WithdrawBtn>
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
color: #505050;
}
`;

const TextBox = styled.div`
  border-radius: 5px;
  border: solid 1px #c6c7cc;
  background-color: #fff;
  font-size: 16px;
  line-height: 2;
  letter-spacing: -0.4px;
  text-align: left;
  color: #1e2222;
  padding: 26px 26px 28px 18px;
  margin-top: 20px;
`;

const MainBox = styled.div`
  width: 894px;
  border-radius: 15px;
  border: solid 1px #e1e2e4;
  background-color: #fff;
  padding: 40px 51px 41px;
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
  margin-bottom: 45px;
  .MuiInputBase-root {
    height: 42px;
  }
`;

const CheckBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 29px;
  font-size: 16px;
  letter-spacing: -0.4px;
  text-align: left;
  color: #555963;
  cursor: pointer;
}
`;

const CheckboxText = styled.div`
  margin-left: 11px;
`;

const WithdrawBtn = styled(Buttonv1)`
  width: 230px !important;
  height: 48px !important;
  border-radius: 5px !important;
  font-size: 18px;
  line-height: 1.89;
  background-color: #0933b3 !important;
`;
