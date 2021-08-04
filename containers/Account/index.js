import React, { Fragment } from "react";
import Head from "next/head";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import * as Text from "components/Text";

import BackgroundContainer from "./Background";
import BannerContainer from "./Step2/Banner";
import TabContainer from "./Step2/Tab";
import ChangePasswordContainer from "./Step2/ChangePassword";
import DeactivateUser from "./Step2/DeactivateUser";

@inject("Auth")
@observer
class AccountConatiner extends React.Component {
  state = {
    tab: 0,
  };
  setTab = (val) => {
    this.setState({ tab: val });
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
      // <>
      //   {!Auth.password_checked ? (
      //     <BackgroundContainer>
      //       <Form>
      //         <Text.FontSize36 color="white" fontWeight={700}>
      //           계정설정
      //         </Text.FontSize36>
      //         <Text.FontSize18 color="white">
      //           계정 설정에 접근하시려면 비밀번호를 입력해주세요
      //         </Text.FontSize18>

      //         <InputBox
      //           type="password"
      //           placeholder="비밀번호를 입력해주세요"
      //           onChange={(e) => Auth.setPassword(e.target.value)}
      //           onKeyPress={this.onKeyPress}
      //         />
      //         <Button onClick={Auth.checkPassword}>
      //           <Text.FontSize18 color="white" fontWeight={700}>
      //             확인
      //           </Text.FontSize18>
      //         </Button>
      //       </Form>
      //     </BackgroundContainer>
      //   ) : (
      //     <Fragment>
      //       {/* <BannerContainer tab={tab} /> */}
      //       <TabContainer tab={tab} setTab={this.setTab} />
      //       {tab === 1 && <ChangePasswordContainer />}
      //       {tab === 2 && <DeactivateUser />}
      //     </Fragment>
      //   )}
      // </>
      <>
        <Fragment>
          {/* <BannerContainer tab={tab} /> */}
          <TabContainer tab={tab} setTab={this.setTab} />
          {tab === 1 && <ChangePasswordContainer />}
          {tab === 2 && <DeactivateUser />}
        </Fragment>
      </>
    );
  }
}

export default AccountConatiner;

const Form = styled.div`
  width: fit-content;
  margin: 0 auto;

  padding-top: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > p:nth-of-type(2) {
    margin-top: 12px;
    margin-bottom: 50px;
  }
`;
const InputBox = styled.input`
  box-sizing: border-box;
  width: 500px;
  padding: 15px 25px;
  margin-bottom: 30px;
  background-color: white;
  border: none;
  border-radius: 10px;
  opacity: 0.8;

  color: #001a56;
  font-size: 18px;
`;
const Button = styled.div`
  margin-left: auto;

  cursor: pointer;
  border: 1px solid white;
  border-radius: 20px;
  padding: 8px 90px;
`;
