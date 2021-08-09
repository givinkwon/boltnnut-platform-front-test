import React from "react";
import styled, { css } from "styled-components";

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY } from "static/style";
import { inject, observer } from "mobx-react";

@inject("Profile")
@observer
class TabConatiner extends React.Component {
  setTab = (val) => {
    this.props.Profile.profileTabIdx = val;
  };
  render() {
    const { tab, Profile } = this.props;
    return (
      <Tabs>
        <Tab
          active={Profile.profileTabIdx === 1}
          onClick={() => this.setTab(1)}
        >
          프로필 수정
        </Tab>
        <Tab
          active={Profile.profileTabIdx === 2}
          onClick={() => this.setTab(2)}
        >
          계정 설정
        </Tab>
        <Tab
          active={Profile.profileTabIdx === 3}
          onClick={() => this.setTab(3)}
        >
          관심 제조사
        </Tab>
        <Tab
          active={Profile.profileTabIdx === 4}
          onClick={() => this.setTab(4)}
        >
          채팅
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
