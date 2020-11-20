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
  state = {
    current: 0,
    next: true,
    prev: false,
    show: 'visible'
  }
  pushToDetail = async (id) => {
    const {Magazine} = this.props;
    await Router.push(`/magazine/${id}`);
    Magazine.setCurrent(id);
    console.log(id)
  }

  sliderNext = () => {
    const {current, next} = this.state;
    console.log(this.props.Magazine.magazine_list.length) // 16
    var fullPage = parseInt((this.props.Magazine.magazine_list.length - 6)/3)+1

    if (current != fullPage && this.props.Magazine.magazine_list.length > 6) {
      const newPage = current + 1
      this.setState({...this.state, current: newPage, show:'hidden'})
      setTimeout(() => {this.setState({...this.state, show:'visible'})}, 600)
      this.slider.slickNext();
    }
    console.log(this.state)
  }
  sliderPrev = () => {
    const {current, prev} = this.state;

    if (current != 0) {
      const newPage = current - 1
      this.setState({...this.state, current: newPage, show:'hidden'})
      setTimeout(() => {this.setState({...this.state, show:'visible'})}, 600)
      this.slider.slickPrev();
    }
  }
  render() {
    const { prev, next, width, height, current, show } = this.state;
    const current_set = (parseInt(current/5) + 1)
    var fullPage = parseInt((this.props.Magazine.magazine_list.length - 6)/3)+1

    var settings = {
      dots: false,
      infinite: false,
      arrows: false,
      slidesToShow: 2,
      rows: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      draggable: false,
    };

    return (
        <FindExperct>
          <List style={{marginBottom:330}}>
            <Slider {...settings} ref={slider => (this.slider = slider)}>
            {
            this.props.Magazine.magazine_list.map((item, idx) => {
              return (
                <Item
                  onClick={() => this.pushToDetail(item.id)}>
                  <Image ratio='45%' src={item.image}/>
                  <span> {item.title} </span>
                </Item>
              )
              })
            }
            </Slider>
          </List>
          <PageBar>
            {
            current == 0 ? (
              <img src={left} onClick = {this.sliderPrev} style={{opacity: 0.4, visibility: this.state.show}}/>
              ) : (
              <img src={left} onClick = {this.sliderPrev} style={{visibility: this.state.show}}/>
              )
            }
              <PageCount value = {5*(current_set - 1) + 1} active={current%5 == 0}> {5*(current_set - 1) + 1} </PageCount>
              <PageCount value = {5*(current_set - 1) + 2} active={current%5 == 1}> {5*(current_set - 1) + 2} </PageCount>
              <PageCount value = {5*(current_set - 1) + 3} active={current%5 == 2}> {5*(current_set - 1) + 3} </PageCount>
              <PageCount value = {5*(current_set - 1) + 4} active={current%5 == 3}> {5*(current_set - 1) + 4} </PageCount>
              <PageCount value = {5*(current_set - 1) + 5} active={current%5 == 4}> {5*(current_set - 1) + 5} </PageCount>
              <PageCount> ... </PageCount>
            {
            current == fullPage ? (
              <img src={right} onClick = {this.sliderNext} style={{opacity: 0.4, visibility: this.state.show}}/>
              ) : (
              <img src={right} onClick = {this.sliderNext} style={{visibility: this.state.show}}/>
              )
            }
          </PageBar>
        </FindExperct>
  )}
}

export default ContentConatiner;

const FindExperct = styled(Container)`
  text-align: center;
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
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  > div {
    width: 100%;
  }
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
  width: calc(100%);
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > span {
    width: 100%;
    height: 100%;
    object-fit: contain;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
    text-align: center;
    color: var(--black);
    white-space: nowrap;
    @media (max-width: 1299.98px) {
      font-size: 18px;
      width: 90%;
      height: 50px;
      white-space: initial;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) {
  }
`
const Image = styled(RatioImage)`
  cursor: pointer;
  border-radius: 25px;

  width: calc(90%);
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
// paging
const PageBar = styled.div`
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 150px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  > img {
    cursor: pointer;
  }
`
const PageCount = styled.span`
    width: 14px;
    height: 30px;
    font-size: 25px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.63px;
    text-align: left;
    color : #999999;
    cursor: pointer;
    ${(props) =>
      props.active &&
      css`
      font-weight: 700;
      color: #0933b3;
      `
     }
`
