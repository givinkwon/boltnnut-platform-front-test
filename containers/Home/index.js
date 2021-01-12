import React from 'react';
import styled, {css} from 'styled-components';

import Banner0Container from './Banner0';
import Banner1Conatiner from './Banner1';
import Banner2Container from './Banner2';
import Banner3Container from './Banner3';
import Banner4Container from './Banner4';
import Banner5Container from './Banner5';
import Banner6Container from './Banner6';
import Banner7Container from './Banner7';
import Banner8Container from './Banner8';
import BarContainer from './Bar';

// Mobile Container
import MobileBanner0Container from './Mobile/MobileBanner0';
import MobileBanner2Container from './Mobile/MobileBanner2';
import MobileBanner4Container from './Mobile/MobileBanner4';
import MobileBanner5Container from './Mobile/MobileBanner5';
import MobileBanner7Container from './Mobile/MobileBanner7';
import MobileBanner8Container from './Mobile/MobileBanner8';
import { inject, observer } from "mobx-react";


@inject('Home')
@observer
class HomeConatiner extends React.Component {
  state = {
    next: true,
    prev: false,
    width: 0,
    tab: 0,
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
    console.log(this.props.width)
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { width, reqList } = this.props;

    return (
      <>
        { width < 767.98 ? (
          <>
            <CustomContainer>
              <MobileBanner0Container/>
              <MobileBanner2Container/>
              <MobileBanner4Container/>
              <MobileBanner5Container/>
              <MobileBanner7Container/>
              <MobileBanner8Container/>
            </CustomContainer>
          </>
        ) : (767.99 < width && width < 1279.98)  ? (
        <>
          <CustomContainer>
            <MobileBanner0Container/>
            <MobileBanner2Container/>
            <MobileBanner4Container/>
            <MobileBanner5Container/>
            <MobileBanner7Container/>
            <MobileBanner8Container/>
          </CustomContainer>
        </>
        ) : (
          <>
          <div style={{overflow:'hidden'}}>
            <Banner0Container/>
            <Banner1Conatiner/>
            <Banner2Container/>
            <Banner3Container/>
            <Banner4Container/>
            <Banner5Container/>
            <Banner6Container/>
            <Banner7Container/>
            <Banner8Container/>
          </div>
          </>
        )}
      </>
    )}
  }

export default HomeConatiner

const CustomContainer = styled.div`
  background-color: #e1e5e6;
  overflow: hidden;
  margin-top: 2px;
`
