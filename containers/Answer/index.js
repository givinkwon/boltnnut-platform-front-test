import React from 'react'
import Head from 'next/head'

import Banner2Container from 'Home/Banner2'
import Banner3Container from 'Home/Banner3'

import BannerContainer from './Banner'
import ContentContainer from './Content'
import FindExpertContainer from 'containers/Home/FindExpert'
import ContentGroupContainer from 'containers/Home/ContentGroup'
import MagazineContainer from 'containers/Home/Magazine'

class AnswerConatiner extends React.Component {
  render(){
    return (
      <>
        <BannerContainer/>
        <ContentContainer/>
        <Banner2Container/>
        <Banner3Container/>
        {/*<FindExpertContainer/>
        <ContentGroupContainer/>*/}
        <MagazineContainer/>
      </>
    )
  }
}

export default AnswerConatiner
