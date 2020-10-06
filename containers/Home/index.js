import React from 'react'
import styled, {css} from 'styled-components'

import Banner1Conatiner from './Banner1'
import Banner2Conatiner from './Banner2'
import Banner3Conatiner from './Banner3'
import BannerConatiner from './Banner'
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
import TestBanner from './ReviewerBanner';

class HomeConatiner extends React.Component {
  render() {
    return (
      <>

        <BannerConatiner/>
        <MagazineConatiner/>
        {/*<NewBanner1Container/>
        <NewBanner2Container/>
        <NewBanner3Container/>*/}
        <NewBanner5Container/>
        <NewBanner4Container/>
        <TestBanner/>
        <LogoConatiner/>
      </>
    )
  }
}

export default HomeConatiner

