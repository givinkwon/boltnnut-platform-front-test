import React from "react";
import styled, { css } from "styled-components";

import Banner0Container from "./Banner0";
import Banner1Conatiner from "./Banner1";
import Banner2Container from "./Banner2";
import Banner3Container from "./Banner3";
import Banner4Container from "./Banner4";
import Banner5Container from "./Banner5";
import Banner6Container from "./Banner6";
import Banner7Container from "./Banner7";
import Banner8Container from "./Banner8";
import BarContainer from "./Bar";

// New
import NewBanner0Container from "./NewBanner0";
import NewBanner1Container from "./NewBanner1";
import NewBanner2Container from "./NewBanner2";
import NewBanner3Container from "./NewBanner3";
import NewBanner4Container from "./NewBanner4";
import NewBanner5Container from "./NewBanner5";
import NewBanner6Container from "./NewBanner6";

// Mobile Container
import MobileBanner0Container from "./Mobile/MobileBanner0";
import MobileBanner1Container from "./Mobile/MobileBanner1";
import MobileBanner3Container from "./Mobile/MobileBanner3";
import MobileBanner6Container from "./Mobile/MobileBanner6";
import MobileBanner2Container from "./Mobile/MobileBanner2";
import MobileBanner4Container from "./Mobile/MobileBanner4";
import MobileBanner5Container from "./Mobile/MobileBanner5";
import MobileBanner7Container from "./Mobile/MobileBanner7";
import MobileBanner8Container from "./Mobile/MobileBanner8";

// New
import NewMobileBanner0Container from "./Mobile/NewMobileBanner0";

// Tablet Container
import TabletBanner0Container from "./Tablet/TabletBanner0";
import TabletBanner1Container from "./Tablet/TabletBanner1";
import TabletBanner2Container from "./Tablet/TabletBanner2";
import TabletBanner3Container from "./Tablet/TabletBanner3";
import TabletBanner4Container from "./Tablet/TabletBanner4";
import TabletBanner5Container from "./Tablet/TabletBanner5";
import TabletBanner6Container from "./Tablet/TabletBanner6";
import TabletBanner7Container from "./Tablet/TabletBanner7";
import TabletBanner8Container from "./Tablet/TabletBanner8";

import { inject, observer } from "mobx-react";
import Banner9Container from "./Banner9";
import TabletBanner9Container from "./Tablet/TabletBanner9";
import MobileBanner9Container from "./Mobile/MobileBanner9";

import Banner10Container from "./Banner10";
import MobileBanner10Container from "./Mobile/MobileBanner10";
import TabletBanner10Container from "./Tablet/TabletBanner10";

import TabletBanner11Container from "./Tablet/TabletBanner11";
import Banner11Container from "./Banner11";

import Banner12Container from "./Banner12";
import MobileBanner12Container from "./Mobile/MobileBanner12";
import TabletBanner12Container from "./Tablet/TabletBanner12";

import Banner13Container from "./Banner13";
import TabletBanner13Container from "./Tablet/TabletBanner13";
import MobileBanner13Container from "./Mobile/MobileBanner13";
import Banner14Container from "./Banner14";
import TabletBanner14Container from "./Tablet/TabletBanner14";
import MobileBanner14Container from "./Mobile/MobileBanner14";

import axios from "axios";

@inject("Home")
@observer
class HomeConatiner extends React.Component {
  state = {
    next: true,
    prev: false,
    width: 0,
    tab: 0,
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { width, reqList } = this.props;

    function test() {
      console.log("R");
      return axios({
        method: "POST",
        url: `https://analyticsreporting.googleapis.com/v4/userActivity:search`,
        data: {
          viewId: "0214568260",
          user: {
            type: "392846125574-q1os3ihbrss3u4hj7gcvkjhk6at6g7dl.apps.googleusercontent.com",
            userId: "463218669.1623114407",
          },
          dateRange: {
            startDate: "2021-06-07",
            endDate: "2021-06-14",
          },
        },
      });
    }

    return (
      <>
        {width < 767.98 ? (
          <>
            <CustomContainer>
              <NewMobileBanner0Container width={width} />

              {/* <MobileBanner13Container width={width} /> */}
              <MobileBanner14Container width={width} />
              <MobileBanner12Container width={width} />
              <MobileBanner8Container />
              <MobileBanner9Container />
            </CustomContainer>
          </>
        ) : 767.99 < width && width < 1279.98 ? (
          <>
            <CustomContainer>
              <TabletBanner13Container width={width} />
              <TabletBanner14Container width={width} />
              <TabletBanner12Container />
              <TabletBanner8Container />
              <TabletBanner9Container />
            </CustomContainer>
          </>
        ) : (
          <>
            <div style={{ overflow: "hidden" }}>
              <NewBanner0Container width={width} />
              <NewBanner1Container width={width} />
              <NewBanner2Container width={width} />
              <NewBanner3Container width={width} />
              <NewBanner4Container width={width} />
              <NewBanner5Container width={width} />
              <NewBanner6Container width={width} />

              {/* <Banner13Container width={width} />
            <Banner14Container />
            <Banner12Container />
            <Banner8Container />
            <Banner9Container /> */}
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
