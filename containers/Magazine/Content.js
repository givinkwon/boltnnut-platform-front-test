import React, { Fragment } from "react";
import styled, {css} from 'styled-components'
import Router from 'next/router'
import Slider from "react-slick";

import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'
import { BLACK1, GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'
import {inject, observer} from "mobx-react";

import * as FormatUtils from 'utils/format';


const left = 'static/icon/left-arrow.png'
const right = 'static/icon/right-arrow.png'

@inject('Magazine')
@observer
class ContentConatiner extends React.Component {

  constructor(props) {
  super(props);
  this.state = { width: 0, height: 0 };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
  this.setState({ width: window.innerWidth, height: window.innerHeight });

  }

  pushToDetail = async (id) => {
    const {Magazine} = this.props;
    await Router.push(`/magazine/${id}`);
    Magazine.setCurrent(id);
  }

  state = {
    current: 1,
    next: true,
    prev: false,
  }
  slider = null
  afterChangeHandler = (current) => {
    const magazineCount = this.props.Magazine.magazine_list.length

    if(current === 0){
      this.setState({next: true, prev: false})
    }
    else {
      // slidesToShow : 2
      if(current === magazineCount - 2) {
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
    const magazineList = this.props.Magazine.magazine_list
    const { prev, next, width, height, current } = this.state

    if(width > 768){
      var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        rows: 3,
        beforeChange: (current) => {
          this.setState({current: current})
        },
        appendDots: dots => (   
          <div
            style={{
              backgroundColor: "#0000",
              marginTop:100,
              bottom:-200,
            }}
          >
            <Icon prev style={{marginRight : '15px', opacity: prev ? 1 : 0.4}} src={left} onClick={this.sliderPrev}/>
            <ul style={{ margin: "0px", display:"inline-flex" }}> {dots} </ul>
            <Icon style={{marginLeft : '15px', opacity: next ? 1 : 0.4}} src={right} onClick={this.sliderNext}/>
          </div>
        ),
        customPaging: i => (
          <Text.FontSize25 style={{}}>
            {i + 1}
          </Text.FontSize25>
        )
      };
    }
    if(width < 768){
      var settings = {
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        rows: 3,
        beforeChange: (current) => {
          this.setState({current: current})
        },
        appendDots: dots => (   
          <div
            style={{
              backgroundColor: "#0000",
              marginTop:100,
              bottom:-200,
            }}
          >
            <Icon prev style={{marginRight : '15px', opacity: prev ? 1 : 0.4}} src={left} onClick={this.sliderPrev}/>
            <ul style={{ margin: "0px", display:"inline-flex" }}> {dots} </ul>
            <Icon style={{marginLeft : '15px', opacity: next ? 1 : 0.4}} src={right} onClick={this.sliderNext}/>
          </div>
        ),
        customPaging: i => (
          <Text.FontSize25 style={{}}> 
            {i + 1}
          </Text.FontSize25>
        )
      };
    }
    return (
        <FindExperct>
          {/* <Header>
            <Text.FontSize40 color={BLACK1} fontWeight={700}>제품 인사이트</Text.FontSize40>
            <Icon prev style={{marginLeft: 'auto', opacity: prev ? 1 : 0.4}} src={right} onClick={this.sliderPrev}/>
            <Icon style={{opacity: next ? 1 : 0.4}} src={right} onClick={this.sliderNext}/>
          </Header> */}
          <List style={{marginBottom:330}}>
            <Slider {...settings} ref={slider => (this.slider = slider)} afterChange={this.afterChangeHandler}>
            {
              magazineList.map((item, idx) => {
                return (
                  <ItemBox key={idx} onClick={() => this.pushToDetail(item.id)}>
                    <Item>
                      <Image ratio='45%' src={item.image} onClick={() => this.setState({tab: 1})}/>
                      <Text.FontSize24 color="#191919" fontWeight={500}>{item.title}</Text.FontSize24>
                    </Item>
                  </ItemBox>
                )
              })
            }
            </Slider>
          </List>
        </FindExperct>
  )}
}

export default ContentConatiner;

const FindExperct = styled(Container)`
  
  /* @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 0px;
    margin-bottom: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 40px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 60px 0px;
  }
  @media (min-width: 1300px) {
    padding: 80px 0px;
  } */
`
const List = styled.div`

  ul{
    li {
      margin: 0 15px;
      cursor: pointer;
    }
    li p {
      color: #0933b3;
      opacity: 0.1;
      cursor: pointer;

    }
    li.slick-active p {
      color: #0933b3;
      opacity: 1;
      cursor: pointer;
    }
    p{
      width: 14px;
      height: 30px;
      font-weight: 700;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: 0.63px;
      text-align: left;
      color: #999999;
      :hover {
        color: #0933b3;
      }

    }
  }

  /* @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 30px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 30px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 40px;
  }
  @media (min-width: 1300px) {
    margin-top: 60px;
  } */
`

const Header = styled.div`
  display: flex;
  align-items: center;
`
const Icon = styled.img`
  cursor: pointer;
  width: 10x;
  height: 17px;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 30px;
    height: 30px;
  }
`

const ItemBox = styled.a`
  display: block;

  :focus {
    outline: none;
  }

  text-decoration: none;
`
const Item = styled.div`
  width: calc(100% - 15px);

  > p {
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
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
const Image = styled(RatioImage)`
  cursor: pointer;
  border-radius: 25px;

  width: calc(100%);
  height: 310px ;

  @media (min-width: 0px) and (max-width: 767.98px) {
    border-radius: 10px;
    max-width: 400px;

    :hover {
      border-radius: 10px;
      > div {
        border-radius: 15px;
        transform: scale(1.2);
      }
    }
  }
  > div {
    transition: 0.4s;
  }

  :hover {
    border-radius: 10px;
    > div {
      border-radius: 10px;
      transform: scale(1.2);
    }
  }
`
