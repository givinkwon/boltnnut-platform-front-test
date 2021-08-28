import React from "react";
import styled from "styled-components";


import Background from "components/Background";

import { inject, observer } from "mobx-react";


@inject("Auth")
@observer
class ChattingHeader extends React.Component {
  render() {
    const { Auth } = this.props;
    return (
      <Background
      
        backgroundColor={"#ffffff"}
        style={{height: 1016, width: 360, marginLeft: "auto", border: "solid 1px #e1e2e4"}}
      >
        <HeaderTitle>
                <span>프로젝트 목록</span>
        </HeaderTitle>

        <HeaderContent>
                <span></span>
        </HeaderContent>

      
      </Background>
    );
  }
}

export default ChattingHeader;

const HeaderTitle = styled.div`
  width : 100%;
  height: 63px;
  border-bottom: solid 1px #e1e2e4;
  > span {
    font-size: 19px;
    width: 106px;
    height: 28px;
    margin: 18px 154px 17px 16px;
    object-fit: contain;
    font-family: NotoSansCJKkr;
    font-size: 19px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.74;
    letter-spacing: -0.48px;
    text-align: left;
    color: #282c36;
  }
`;

const HeaderContent = styled.div`
width : 100%;
height: 63px;
border-bottom: solid 1px #e1e2e4;
> span {
  font-size: 19px;
  width: 106px;
  height: 28px;
  margin: 18px 154px 17px 16px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 19px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.74;
  letter-spacing: -0.48px;
  text-align: left;
  color: #282c36;
}
`;
