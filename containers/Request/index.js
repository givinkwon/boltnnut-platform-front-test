
import React from 'react'
import { inject, observer } from 'mobx-react'
import styled from "styled-components";
import InfoContainer from "./Detail/Info";
import BannerContainer from './Banner'
import Step1Container from "./Step1";
import Step2Conatiner from "./Step2";
import SearchBarContainer2 from "Partner/NewSearchBar2";
import CompleteBannerContainer from "./Detail/NewComplete";


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

  componentDidMount () {
    const { Request } = this.props;
  }

  render () {
    const { Request } = this.props
    const { step2 } = this.state;

    return (
      <>
        {Request.step === 0 ? (<BannerContainer step2 = {true}/>) : (<BannerContainer/>)}
        {/* {Request.step === 0 && <Step1Container/>} */}
        {Request.step === 0 &&
        <>
        <SearchBarContainer2/>
        <MarginContainer/>
        </>
        }
        {Request.step === 1 && <CompleteBannerContainer/>}
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

const MarginContainer = styled.div`
  height: 200px;
  margin-bottom: 200px;
`