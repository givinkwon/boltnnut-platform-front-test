import React, { Component } from "react";
import styled from "styled-components";
import * as Text from "components/Text";
import { PRIMARY, WHITE } from "../../../static/style";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Router from "next/router";
import Background from "components/Background";
import Container from "components/Containerv1";
import InputComponent from "components/Input";
import CheckBoxComponent from "components/CheckBox";
import TabContainer from "AccountSetting/Tab";
import Profile from "../../../stores/Account/Profile";

const profile_img = "static/images/profileimg.svg";
const profile_modify = "static/images/profilemodify.svg";

@inject("Auth", "Profile")
@observer
class ChangePassword extends Component {
  async componentDidMount() {
    const { Auth } = this.props;
    const token = await localStorage.getItem("token");
    // 토큰은 있는데 userInfo가 mobx에 없으면 리로딩
    const { route, pathname } = Router.router;
    await Auth.checkLogin();

    console.log(Auth.logged_in_user)

    this.setState({
      url: route,
      token: token,
    });
    // 토큰은 있는데 userInfo가 mobx에 없으면 리로딩
    console.log(toJS(Auth.logged_in_user));
    console.log(toJS(Auth.logged_in_client));
  }

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
          <Button
            onClick = {() => Auth.save_account()}
          >저장하기
          </Button>
        </MainHeader>
        <MainBox>
          {/* <MainBoxHeader>
            <div>
              <img src={profile_img} />
              <img src={profile_modify} />
            </div>
            {Auth.logged_in_user && Auth.logged_in_user.type === 0 ? (
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
            ) : (
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
                프로필 사진을 등록하면 클라이언트가 더욱 신뢰감을 가집니다.
                <br />
                이미지 파일(.jpg, .jpeg, .png, 등)만 업로드할 수 있습니다.
              </span>
            )}
          </MainBoxHeader> */}
          
          <MainBoxBody>
            <BodyBox style={{ display: "flex", justifyContent: "flex-start" }}>
              <BodySubBox>
                <BodyBoxTitle>이름</BodyBoxTitle>
                <InputComponent
                  class="Input"
                  onFocus={(e) => (e.target.placeholder = "")}
                  value= {Auth.realName}
                  onChange={Auth.setRealName}
                />
              </BodySubBox>
              <BodySubBox style={{ marginLeft: 52 }}>
                <BodyBoxTitle>휴대전화</BodyBoxTitle>
                <InputComponent
                  class="Input"
                  onFocus={(e) => (e.target.placeholder = "")}
                  value= {Auth.phone}
                  onChange={Auth.setPhone}
                />
              </BodySubBox>
            </BodyBox>
            {/* 비밀번호 */}
            <BodyBox style={{ display: "flex", justifyContent: "flex-start" }}>
              <BodySubBox>
                <BodyBoxTitle>비밀번호</BodyBoxTitle>
                <InputComponent
                  class="Input"
                  type="password"
                  onFocus={(e) => (e.target.placeholder = "")}
                  value= {Auth.new_password}
                  onChange={Auth.setNewPassword}
                />
              </BodySubBox>
              <BodySubBox style={{ marginLeft: 52 }}>
                <BodyBoxTitle>비밀번호 확인</BodyBoxTitle>
                <InputComponent
                  class="Input"
                  type="password"
                  onFocus={(e) => (e.target.placeholder = "")}
                  value= {Auth.new_password2}
                  onChange={Auth.setNewPassword2}
                />
              </BodySubBox>
            </BodyBox>

            <BodyBox>
              <BodyBoxTitle>회사명</BodyBoxTitle>
              <InputComponent
                class="Input"
                onFocus={(e) => (e.target.placeholder = "")}
                value= {Auth.name}
                onChange={Auth.setName}
              />
            </BodyBox>
            {Auth.logged_in_client &&
            <BodyBox>
              <BodyBoxTitle>직급</BodyBoxTitle>
              <InputComponent
                class="Input"
                onFocus={(e) => (e.target.placeholder = "")}
                value= {Auth.title}
                onChange={Auth.setTitle}
              />
            </BodyBox>
            }
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


const Button = styled.button`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #0933b3;
  font-weight: 600;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
    border-radius: 3px;
  }
`;
const MainBoxBody = styled.div``;
