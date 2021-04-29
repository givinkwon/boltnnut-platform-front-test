import React, { useCallback } from "react";
import { inject, observer } from "mobx-react";
import * as Text from "components/Text";
import { PRIMARY, WHITE, DARKGRAY, BLACK, BLACK1 } from "static/style";
import styled, { css } from "styled-components";
import Container from "components/Container";

//counter
import "react-count-animation/dist/count.min.css";
import AnimationCount from "react-count-animation";

@inject("Partner", "Request")
@observer
class CounterContainer extends React.Component {
  countCalc() {
    const { Request, Partner } = this.props;
    let result = 0;
    //console.log(Request.select_big, Request.select_mid, Request.select_small)

    if (Partner.select_big != null && Partner.select_mid == null) {
      result =
        Partner.select_big.id === 0
          ? 4490
          : 460 * (Partner.select_big.id / 5 + 4);
    }
    if (
      Partner.select_big != null &&
      Partner.select_mid != null &&
      Partner.select_small == null
    ) {
      result =
        Partner.select_big.id === 0
          ? 4490
          : 460 * (Partner.select_big.id / 5 + 4) -
            260 * (Partner.select_mid.id / 50 + 5);
    }
    if (
      Partner.select_big != null &&
      Partner.select_mid != null &&
      Partner.select_small != null
    ) {
      result =
        Partner.select_big.id === 0
          ? 4490
          : 460 * (Partner.select_big.id / 5 + 4) -
            260 * (Partner.select_mid.id / 50 + 5) -
            40 * (Request.select_small.id / 100 + 3);
    }
    return result;
  }

  render() {
    const { Request } = this.props;

    const settings = {
      start: 0,
      count: this.countCalc(),
      duration: 3000,
      decimals: 0,
      useGroup: true,
      animation: "up",
    };

    return (
      <Container>
        <br />
        <br />
        <br />
        <br />

        <Text.FontSize48 center={true} color={DARKGRAY} fontWeight={500}>
          볼트앤너트 큐레이션 시스템이
        </Text.FontSize48>
        <br />
        <br />
        <Text.FontSize36 center={true} color={PRIMARY} fontWeight={500}>
          <div className="countup" style={{ display: "inline-flex" }}>
            <AnimationCount {...settings} /> 개의 적합한 업체를 찾았습니다.
          </div>
        </Text.FontSize36>
      </Container>
    );
  }
}

export default CounterContainer;
