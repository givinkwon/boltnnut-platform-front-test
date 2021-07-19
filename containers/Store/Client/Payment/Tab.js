import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY } from "static/style";


@inject("Auth")
@observer
class TabConatiner extends React.Component {
  setTab = (val) => {
    this.props.setTab(val);
    window.history.pushState("", "", `/store?tab=${val}`);
  };

  render() {
    const { Auth, tab, setTab } = this.props;
    return (
        <Tabs>
            <Tab active={tab === 1} onClick={() => this.setTab(1)}>
                <Text.FontSize20 fontWeight={500}>일반</Text.FontSize20>

            </Tab>

            <Tab active={tab === 2} onClick={() => this.setTab(2)}>
                <Text.FontSize20 fontWeight={500}>프라임</Text.FontSize20>

            </Tab>

            <Tab active={tab === 3} onClick={() => this.setTab(3)}>
                <Text.FontSize20 fontWeight={500}>비즈니스</Text.FontSize20>

            </Tab>
        </Tabs>
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

const Tab2 = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
