import React, { Fragment } from "react";
import Head from "next/head";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import * as Text from "components/Text";
import Background from "components/Background";
import Container from "components/Containerv1";
import BasicInfoModify from "./AccountSetting/BasicInfoModify";
import NotificationSetting from "./AccountSetting/NotificationSetting";
import PasswordChange from "./AccountSetting/PasswordChange";
import AccountWithdraw from "./AccountSetting/AccountWithdraw";
import TabContainer from "AccountSetting/Tab";

@inject("Auth")
@observer
class AccountConatiner extends React.Component {
  state = {
    tab: 0,
  };

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      const { Auth } = this.props;
      Auth.checkPassword();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    if (prevProps.query != query) {
      this.setState({ tab: parseInt(query.tab) });
    }
  }
  componentDidMount() {
    const { query } = this.props;
    if (query.tab) {
      this.setState({ tab: parseInt(query.tab) });
    }
  }
  render() {
    const { tab } = this.state;
    const { Auth } = this.props;

    return (
      <>
        <Background style={{ backgroundColor: "#f6f6f6", paddingBottom: 300 }}>
          <Header>
            <HeaderTitle>
              <div style={{ marginBottom: 12 }}>
                {" "}
                계정 설정
              </div>
            </HeaderTitle>
          </Header>
          <Container>
            <Body>
              <Aside>
                {/* <AsideHeader>{Auth.logged_in_user.username}</AsideHeader> */}
                <AsideBody>
                  <Fragment>
                    <TabContainer />
                  </Fragment>
                </AsideBody>
              </Aside>
              <Main>
                {Auth.accountTabIdx === 1 && <BasicInfoModify />}
                {Auth.accountTabIdx === 2 && <NotificationSetting />}
                {Auth.accountTabIdx === 3 && <PasswordChange />}
                {Auth.accountTabIdx === 4 && <AccountWithdraw />}
              </Main>
            </Body>
          </Container>
        </Background>
      </>
    );
  }
}

export default AccountConatiner;

const Header = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 116px;
  font-family: NotoSansCJKkr;
`;

const HeaderTitle = styled.div`
  margin-left: auto;
  margin-right : auto;
  width : 1200px;
  height: 100%;
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
  padding-top: 50px;
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
