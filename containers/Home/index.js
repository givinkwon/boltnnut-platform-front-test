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

import * as AccountAPI from "axios/Account/Account";

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

    const formData = new FormData();
    const formData2 = new FormData();

    document.referrer === ""
      ? formData.append("prevUrl", "direct")
      : formData.append("prevUrl", document.referrer);

    document.referrer === ""
      ? formData2.append("prevUrl", "direct")
      : formData2.append("prevUrl", document.referrer);

    console.log(window.location.href);
    formData.append("url", window.location.href);
    const req = {
      data: formData,
    };

    const req2 = {
      data: formData2,
    };
    AccountAPI.setUserIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    AccountAPI.setPrevUrlLog(req2)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
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
