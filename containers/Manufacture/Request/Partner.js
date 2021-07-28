import React, { useCallback } from 'react'
import { inject, observer } from 'mobx-react'
import InfoContainer from "./Detail/Info";
import BannerContainer from './Banner0'
import Banner2Container from './Banner2'
import SearchBarContainer from './SearchBar'
import ContentContainer from './Content'
import * as Text from 'components/Text'
import {PRIMARY, WHITE, DARKGRAY, BLACK, BLACK1} from "static/style";
import styled, {css} from "styled-components"
import Container from "components/Container";
import ContentConatiner from "containers/Partner/Content";
import Router from 'next/router';
import Card from './Card';

//counter
import 'react-count-animation/dist/count.min.css';
import AnimationCount from 'react-count-animation';

// slicker
import Slider from "react-slick";
const search_ic = 'static/icon/search.png'
const right = 'static/icon/right-arrow.png'
import RatioImage from 'components/RatioImage'


@inject('Partner')
@observer
class PartnerInfoContainer extends React.Component {
  state = {
    current: 1,
    next: true,
    prev: false,
    Page: 1,
  };

  async UNSAFE_componentWillMount() {
    const { Partner } = this.props;
    await Partner.reset();
    await Partner.init();
    await Partner.search();
  }

  handleIntersection = () => {
    const {Page} = this.state
    this.setState({
      ...this.state,
      Page: Page + 1,
    })

    const {Partner} = this.props
    if(Page % 10 == 0){
        console.log('추가 로딩을 시도합니다')
        Partner.getNextPartner();
    }
    const breakpoint = this.slider.state.breakpoint
    this.slider.slickNext()
  }

  afterChangeHandler = (current) => {
    if(current === 0){
      this.setState({next: true, prev: false})
    }
    else {
      if(current === 1) {
        this.setState({next: false, prev: true})
      }
      else {
        this.setState({next: true, prev: true})
      }
    }
  }

  sliderNext = () => {
    const breakpoint = this.slider.state.breakpoint
    this.slider.slickNext()
  }

  sliderPrev = () => {
    if(this.state.current === 0) {
      this.setState({ prev: false,  next: true })
    }
    else {
      this.setState({ prev: true })
    }
    this.slider.slickPrev()
  }

  render() {
  const { Partner } = this.props;
  const { prev, next } = this.state;


  const settings = {
      dots: false,
      infinite: false,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 2,
      beforeChange: (current) => {
        this.setState({current: current})
      },
    };

  return (
          <FindExperct>
          <Header>
          <Text.FontSize40 color={BLACK1} fontWeight={700}><br/><br/> </Text.FontSize40>
          </Header>
          {Partner.partner_list.length > 0 && <List>
            <Slider {...settings} ref={slider => (this.slider = slider)} afterChange={this.afterChangeHandler}>
                   {
                   Partner.partner_list.length > 0  && Partner.partner_list.map((item, idx) => {
                       return (
                       <Card
                       key={item.id}
                       item={item}
                       />
                       )
                       })
                   }
            </Slider>
            <Arrow left onClick ={this.sliderPrev}/>
            <Arrow right onClick={this.handleIntersection}/>
          </List>}
          </FindExperct>
          )
          }
}

export default PartnerInfoContainer

const Arrow = styled.div`
  position: absolute;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  width: 60px;
  height: 60px;
  display: block;
  top: calc(50% - 30px);
  ${props => props.left && css`
    background-image: url('/static/icon/slick_left.png');
    left: -25px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      left: -15px;
    }
  `}
  ${props => props.right && css`
    background-image: url('/static/icon/slick_right.png');
    right: -25px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      right: -15px;
    }
  `}
`

const Item = styled.div`
  width: calc(100% - 15px);

  > p {
    text-align: center;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    > p {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
  @media (min-width: 768px) {
    > p {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
`

const Icon = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  align: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 30px;
    height: 30px;
  }
  ${props => props.prev && css`
    transform: rotate(180deg);
  `}
`

const FindExperct = styled(Container)`
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const List = styled.div`
  position: relative;

  .slick-track {
    overflow-y: hidden !important;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 40px;
    .slick-track {

    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 50px;
    .slick-track {
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 60px;
    .slick-track {

    }
  }
  @media (min-width: 1300px) {
    margin-top: 60px;
    .slick-track {
    }
  }
`
const Header = styled.div`
  display: flex;
  align-items: center;
`
