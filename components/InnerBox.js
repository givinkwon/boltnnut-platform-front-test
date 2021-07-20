/**
 * @author Oh Kyu Seok
 * @email cane1226@gmail.com
 * @create date 2021-07-12 16:38:19
 * @modify date 2021-07-12 16:38:19
 * @desc [Zeplin용 UI Component입니다]
 */

import React from "react";
import styled, { css } from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

class InnerBoxComponent extends React.Component {
  render() {
    const { Content } = this.props;
    return (
      <OuterBox style={this.props.outerStyles}>
        <InnerBox>
          <Content></Content>
        </InnerBox>
      </OuterBox>
    );
  }
}

export default InnerBoxComponent;

const OuterBox = styled.div``;

const InnerBox = styled.div``;
