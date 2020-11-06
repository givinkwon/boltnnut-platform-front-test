import React from 'react'
import { inject, observer } from 'mobx-react'
import InfoContainer from "./Detail/Info";
import BannerContainer from './Banner'
import Step1Container from "./Step1";
import Step2Conatiner from "./Step2";
import SearchBarContainer2 from "Partner/NewSearchBar2";
import CompleteBannerConatiner from "./Detail/NewComplete";


import Router from 'next/router';

//counter
import 'react-count-animation/dist/count.min.css';
import AnimationCount from 'react-count-animation';

@inject('Request')
@observer
class RequestConatiner extends React.Component {
  state = {
    step2: false,
    complete: false,
  }
  render () {
    const { Request } = this.props
    console.log(Request.type)
    console.log(Request.step)
    return (
      <>
        <BannerContainer step2={true} style={{display: "none"}}/>
        {Request.step === 0 && <Step1Container/>}
        {Request.step === 1 && <SearchBarContainer2/>}
        {Request.step === 2 && <CompleteBannerConatiner/>}
        {/*Request.step === 1 && <SearchBarContainer2/>*/}
        {/* <SearchBarContainer/>
        <br/><br/><br/><br/>
        <CounterContainer />
        <PartnerInfoContainer />
        <br/><br/><br/><br/> */}
      </>
    )
  }
}

export default RequestConatiner
