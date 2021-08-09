import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Containerv1";
import Background from "components/Background";
import MainContainer from "./MainContainer";
import BasicInfoModify from "AccountSetting/BasicInfoModify";
import SubBox from "containers/Account/Bookmark/Subbox";
import TabContainer from "Profile/Tab";
import Buttonv1 from "components/Buttonv1";
import * as Text from "components/Text";

const perfection = "static/images/perfection_bar.svg";
const perfection_blue = "static/images/perfection_bluebar.svg";

@inject("Auth", "Answer", "Profile")
@observer
class ProfileContainer extends React.Component {
  async componentDidMount() {
    const { Category, Profile } = this.props;
    console.log("componentdidmount");
    await Profile.checkLogin();
  }
  render() {
    const { width, Profile, Auth } = this.props;
    return (
      <>
        <Background style={{ paddingBottom: 300 }}>
          <Header>
            <HeaderTitle>
              <div style={{ marginBottom: 12 }}> > 프로필 수정</div>
            </HeaderTitle>
          </Header>
          <Container>
            <Body>
              <Aside>
                {/* <AsideHeader>{Auth.logged_in_user.username}</AsideHeader> */}
                <AsideHeader>1234@naver.com</AsideHeader>
                <AsideBody>
                  <Fragment>
                    <TabContainer />
                  </Fragment>
                </AsideBody>
                {Profile.profileTabIdx === 1 ? (
                  <Perfection>
                    <PerfectionHeader>
                      <span style={{ marginBottom: 27 }}>프로필 완성도</span>
                      <div
                        style={{
                          fontSize: 20,
                          letterSpacing: -0.5,
                          color: "#0933b3",
                          marginLeft: 12,
                        }}
                      >
                        30%
                      </div>
                    </PerfectionHeader>
                    <Bar>
                      <img src={perfection} style={{ position: "relative" }} />
                      <img
                        src={perfection_blue}
                        style={{ position: "absolute", top: 472 }}
                      />
                    </Bar>
                    <span
                      style={{
                        fontSize: 16,
                        letterSpacing: -0.4,
                        color: "#555963",
                        lineHeight: 1.5,
                      }}
                    >
                      더욱 완성도 높은 프로필을 위해 <br />
                      업체 정보를 채워보세요!
                    </span>
                  </Perfection>
                ) : (
                  <></>
                )}
              </Aside>
              <Main>
                {Profile.profileTabIdx === 1 && <MainContainer />}
                {Profile.profileTabIdx === 2 && <BasicInfoModify />}
                {Profile.profileTabIdx === 3 && <SubBox />}
                {/* {Profile.profileTabIdx === 4 && <AccountWithdraw />} */}
              </Main>
            </Body>
          </Container>
        </Background>
        {/* <Background style={{ marginTop: "80px" }}>
          <Containerv1>
            <Container>
              <SubContainer
                width={width}
                style={{ border: "5px solid green" }}
              />
              <MainContainer width={width} />
            </Container>
          </Containerv1>
        </Background> */}
      </>
    );
  }
}

export default ProfileContainer;

const Header = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 116px;
  font-family: NotoSansCJKkr;
`;

const HeaderTitle = styled.div`
  height: 100%;
  padding-left: 118px;
  display: flex;
  align-items: flex-end;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.4px;
  text-align: left;
  color: #555963;
}
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: NotoSansCJKkr;
`;

const Aside = styled.div`
  width: 230px;
  font-family: NotoSansCJKkr;
`;

const AsideHeader = styled.div`
  padding-top: 44px;
  padding-bottom: 16px;
  border-bottom: solid 1px #e1e2e4;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #0933b3;
`;

const AsideBody = styled.div`
  padding-top: 16px;
  font-size: 16px;
  line-height: 1.73;
  letter-spacing: -0.38px;
  text-align: left;
  color: #767676;
`;

const Main = styled.div`
  width: 100%;
  padding-left: 76px;
  font-family: NotoSansCJKkr;
`;

const Perfection = styled.div`
  margin-top: 102px;
`;

const PerfectionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.45px;
  text-align: left;
  color: #282c36;
`;

const Bar = styled.div`
  margin-bottom: 36px;
`;
