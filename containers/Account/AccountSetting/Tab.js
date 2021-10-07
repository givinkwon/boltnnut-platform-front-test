import React from "react";
import styled, { css } from "styled-components";

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY } from "static/style";
import { inject, observer } from "mobx-react";

@inject("Auth")
@observer
class TabConatiner extends React.Component {
  setTab = (val) => {
    this.props.Auth.accountTabIdx = val;
  };
  render() {
    const { tab, Auth } = this.props;
    return (
      <Tabs>
        <Tab active={Auth.accountTabIdx === 1} onClick={() => this.setTab(1)}>
          기본 정보 수정
        </Tab>
        <Tab active={Auth.accountTabIdx === 2} onClick={() => this.setTab(2)}>
          알림 설정
        </Tab>
        {/* <Tab active={Auth.accountTabIdx === 3} onClick={() => this.setTab(3)}>
          비밀번호 변경
        </Tab> */}
        <Tab active={Auth.accountTabIdx === 4} onClick={() => this.setTab(4)}>
          회원 탈퇴
        </Tab>
      </Tabs>
    );
  }
}

export default TabConatiner;

const Tabs = styled.div`
  width: 100%;
`;

const Tab = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
  
  ${(props) =>
    !props.active &&
    css`
      > p {
        opacity: 0.4;
      }
    `}
`;
