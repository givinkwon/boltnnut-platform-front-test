import React, { useCallback } from 'react'
import { inject, observer } from 'mobx-react'
import InfoContainer from "./Detail/Info";
import BannerContainer from './Banner'
import Banner2Container from './Banner2'
import SearchBarContainer from './SearchBar'
import ContentContainer from './Content'
import * as Text from 'components/Text'
import {PRIMARY, WHITE, DARKGRAY, BLACK, BLACK1} from "static/style";
import styled, {css} from "styled-components"
import Container from "components/Container";
import PartnerInfoContainer from "./Partner";
import CounterContainer from "./Counter";

import Router from 'next/router';

//counter
import 'react-count-animation/dist/count.min.css';
import AnimationCount from 'react-count-animation';

// slicker
import Slider from "react-slick";
const search_ic = 'static/icon/search.png'
const right = 'static/icon/right-arrow.png'
import RatioImage from 'components/RatioImage'

@inject('Partner', 'Request')
@observer
class RequestConatiner extends React.Component {

  render () {
    const { Request, Partner } = this.props;

  return (
      <>
        <BannerContainer/>
        <SearchBarContainer/>
        <br/><br/><br/><br/>
        <CounterContainer />
        <PartnerInfoContainer />
        <br/><br/><br/><br/>
      </>
    )
  }
}

export default RequestConatiner
