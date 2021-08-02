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
import MobileModalContainer from "./Mobile/MobileModal";
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
    const { width, reqList, Home } = this.props;

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
              {Home.modalState ? <MobileModalContainer /> : "none"}

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
