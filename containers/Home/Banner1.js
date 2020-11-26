import React from "react";
import styled from "styled-components";
import Router from "next/router";

import Container from "components/Container";
import Button from "components/Button";
import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'
import * as AnswerAPI  from 'axios/Answer'

const search_ic = "static/icon/search.png";
const image1 = "/static/images/banner2_4.png";

class Banner1Conatiner extends React.Component {
  render() {
    return (
      <Banner>
        <Text.FontSize40 color={BLACK1} fontWeight={700}>볼트앤너트 의뢰 프로세스</Text.FontSize40>
        <br/><br/><br/>
        <Image ratio='100%' src={image1} />

      </Banner>
    );
  }
}

export default Banner1Conatiner;

const Banner = styled(Container)`
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 0px;
    margin-bottom: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 40px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 60px 0px;
  }
  @media (min-width: 1300px) {
    padding: 80px 0px;
  }
`

const Image = styled(RatioImage)`
  border-radius: 0 !important;
  width: 100%;
  max-height: 550px;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-height : 300px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    max-height : 300px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    max-height : 400px;
  }

`
