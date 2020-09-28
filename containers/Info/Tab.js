import React from "react";
import styled, { css } from "styled-components";

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY } from "static/style";

class TabConatiner extends React.Component {
  setTab = (val) => {
    this.props.setTab(val);
    window.history.pushState("", "", `/info?tab=${val}`);
  };
  render() {
    const { tab } = this.props;
    return (
      <Container>
        <Tabs>
          <Tab active={tab === 1} onClick={() => this.setTab(1)}>
            <Text.FontSize20 fontWeight={500}>
              클라이언트 이용방법
            </Text.FontSize20>
          </Tab>
          <Tab active={tab === 2} onClick={() => this.setTab(2)}>
            <Text.FontSize20 fontWeight={500}>전문가 이용방법</Text.FontSize20>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default TabConatiner;

const Tabs = styled.div`
  margin-top: 30px;
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
  width: 50%;
  background-color: #dededf;
  > p {
    color: #898989;
  }
  padding: 15px 0px;
  ${(props) =>
    props.active &&
    css`
      background-color: ${PRIMARY};
      > p {
        color: ${WHITE};
      }
    `}
`;
