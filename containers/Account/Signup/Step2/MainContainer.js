import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import SelectCard from "./SelectCard";
import Authentication from "./Authentication";
import Explaination from "./Explaination";
import Product from "./Product";
import Introduction from "./Introduction";
import Portfolio from "./portfolio";
import Location from "./Location";

import * as Text from "components/Text";

@inject("Auth", "Answer")
@observer
class MainContainer extends React.Component {
  render() {
    return (
      <Container>
        <Name>(주)동성실리콘</Name>
        <Description>
          해당 정보를 채울수록 클라이언트에게 '동성 실리콘'(가)이 노출될 확률이
          올라가요!
        </Description>
        <SelectCard name="전문분야" />
        <SelectCard name="제품분야" />
        <SelectCard name="취급 소재" />
        <SelectCard name="전문 공정" />
        <Authentication></Authentication>
        <Explaination></Explaination>
        <Product></Product>
        <Introduction></Introduction>
        <Portfolio></Portfolio>
        <Location></Location>
      </Container>
    );
  }
}

export default MainContainer;

const Container = styled.div`
  //   border: 3px solid red;
  flex-grow: 5;
  padding-left: 30px;
`;

const Name = styled.div`
  font-size: 26px;
  line-height: 52px;
  letter-spacing: -0.65px;
  color: #282c36;
  font-weight: bold;
  padding-bottom: 24px;
  border-bottom: 1px solid #e1e2e4;
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 34px;
  letter-spacing: -0.4px;
  color: #555963;
  font-weight: normal;
  margin-top: 30px;
  margin-bottom: 20px;
`;
