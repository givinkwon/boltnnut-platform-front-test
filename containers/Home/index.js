import React from "react";
import styled, { css } from "styled-components";

// New
import Banner0Container from "./Banner0";
import Banner1Container from "./Banner1";
import Banner2Container from "./Banner2";
import Banner3Container from "./Banner3";
import Banner4Container from "./Banner4";
import Banner5Container from "./Banner5";
import Banner6Container from "./Banner6";

// New
import MobileBanner0Container from "./Mobile/MobileBanner0";
import MobileBanner1Container from "./Mobile/MobileBanner1";
import MobileBanner2Container from "./Mobile/MobileBanner2";
import MobileBanner3Container from "./Mobile/MobileBanner3";
import MobileBanner4Container from "./Mobile/MobileBanner4";
import MobileBanner5Container from "./Mobile/MobileBanner5";

import { inject, observer } from "mobx-react";
import axios from "axios";

@inject("Home")
@observer
class HomeConatiner extends React.Component {

  render() {
    const { width, reqList, Home } = this.props;

    return (
      <>
        {width < 767.98 ? (
          <>
            <CustomContainer>
              <MobileBanner0Container width={width} />
              <MobileBanner1Container width={width} />
              <MobileBanner2Container width={width} />
              <MobileBanner3Container width={width} />
              <MobileBanner4Container width={width} />
              <MobileBanner5Container width={width} />
            </CustomContainer>
          </>
        ) : (
          <>
            <div style={{ overflow: "hidden" }}>
              <Banner0Container width={width} />
              <Banner1Container width={width} />
              <Banner2Container width={width} />
              <Banner3Container width={width} />
              <Banner4Container width={width} />
              <Banner5Container width={width} />
              <Banner6Container width={width} />
            </div>
          </>
        )}
      </>
    );
  }
}

export default HomeConatiner;

const CustomContainer = styled.div`
  background-color: #ffffff;
  overflow: hidden;
`;
