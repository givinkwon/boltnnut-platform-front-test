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
    const { Content2 } = this.props;
    return (
      <OuterBox
        entirePadding={this.props.entirePadding}
        paddingLeft={this.props.paddingLeft}
        paddingRight={this.props.paddingRight}
        paddingBottom={this.props.paddingBottom}
        paddingTop={this.props.paddingTop}
        marginTop={this.props.marginTop}
        justifyContent={this.props.justifyContent}
      >
        <InnerBox>
          <Content2></Content2>
        </InnerBox>
      </OuterBox>
    );
  }
}

export default InnerBoxComponent;

const OuterBox = styled.div`
  padding: ${(props) =>
    props.entirePadding ? props.entirePadding + "px" : null};
  padding-left: ${(props) =>
    props.paddingLeft ? props.paddingLeft + "px" : null};
  border: 1px solid black;
  margin-top: ${(props) => (props.marginTop ? props.marginTop + "px" : null)};
`;

const InnerBox = styled.div`
  color: red;
`;
