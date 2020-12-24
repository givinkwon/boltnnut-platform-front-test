import React from 'react'
import styled, {css} from 'styled-components'

//import Banner1Conatiner from './Banner1'
import Banner1Conatiner from './Banner1';
import Banner2Conatiner from './Banner2'
import Banner3Conatiner from './Banner3'
import BannerConatiner from './Banner0'
import CategoryConatiner from './Category'
import FindExperctConatiner from './FindExpert'
import ContentGroupConatiner from './ContentGroup'
import MagazineConatiner from './Magazine'
import LogoConatiner from './logo'
import HomeRequestContainer from './Request';
import NewBanner1Container from './NewBanner1';
import NewBanner2Container from './NewBanner2';
import NewBanner3Container from './NewBanner3';
import NewBanner4Container from './NewBanner4';
import NewBanner5Container from './NewBanner5';
import ReviewBanner from './ReviewerBanner';

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
      { width < 360 ? (
      <>
        <CustomContainer>
          <Banner1Conatiner width={width}/>
          <MagazineConatiner/>
          <NewBanner5Container/>
          <NewBanner4Container/>
          <ReviewBanner/>
          <LogoConatiner/>
        </CustomContainer>
      </>
          ) : (
          <div style={{overflow:'hidden'}}>
            <BannerConatiner width={width}/>
            <Banner1Conatiner width={width}/>
            {width > 768 && <MagazineConatiner/>}
            <NewBanner5Container/>
            <NewBanner4Container/>
            <ReviewBanner/>
            <LogoConatiner/>
          </div>
          )
          } </>
      )
}
}

export default HomeConatiner

const CustomContainer = styled.div`
  background-color: #e1e5e6;
  overflow: hidden;
  margin-top: 2px;
`

