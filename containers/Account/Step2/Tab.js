import React from "react";
import styled, { css } from "styled-components";

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY } from "static/style";

class TabConatiner extends React.Component {
  setTab = (val) => {
    this.props.setTab(val);
    window.history.pushState("", "", `/account?tab=${val}`);
  };
  render() {
    const { tab } = this.props;
    return (
      <Outer>
        <Container>
          <Tabs>
            <Tab active={tab === 1} onClick={() => this.setTab(1)}>
              <Text.FontSize18 fontWeight={500}>
                비밀번호 변경
              </Text.FontSize18>
            </Tab>
            <Tab active={tab === 2} onClick={() => this.setTab(2)}>
              <Text.FontSize18 fontWeight={500}>
                계정 탈퇴
              </Text.FontSize18>
            </Tab>
          </Tabs>
        </Container>
      </Outer>
    );
  }
}

export default TabConatiner;

const Outer = styled.div`
  background-color: ${PRIMARY};
`
const Tabs = styled.div`
  display: flex;
  @media (min-width: 0px) and (max-width: 767.98px) {
    /* height: 180px; */
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    /* height: 200px; */
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    /* height: 230px; */
  }
  @media (min-width: 1300px) {
    /* height: 250px; */
  }
`;

const Tab = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  
  > p {
    color: white;
    padding: 0 20px;
    border-right: 1px solid #dedede;
    word-break: keep-all;
    line-height: 1.2em;
  }
  padding: 15px 0px;
  
  :nth-of-type(1) > p {
    padding-left: 0;
  }
  
  :last-child {
    > p {
      border-right: none;
    }
  }
  
  ${(props) =>
    !props.active &&
    css`
      > p {
        opacity: 0.4;
      }
    `}
`;
