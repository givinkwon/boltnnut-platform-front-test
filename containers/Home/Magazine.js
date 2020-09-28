import React from 'react'
import styled, {css} from 'styled-components'
import Slider from "react-slick";
import Router from 'next/router';
import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'
import { BLACK1, DARKGRAY } from 'static/style'
import {inject, observer} from "mobx-react";

const search_ic = 'static/icon/search.png'
const right = 'static/icon/right-arrow.png'
const data = [
  {id:1, name: "제조 스타트업이 망하는 72가지 이유", image: 'static/images/main/2-1.png'},
  {id:2, name: "제품을 만드려면 특허는 기본?", image: 'static/images/main/2-2.png'},
  {id:3, name: "제조 스타트업이 망하는 72가지 이유", image: 'static/images/main/2-1.png'},
]


@inject('Home')
@observer
class MagazineContainer extends React.Component {
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
    const magazineCount = this.props.Home.magazine_list.length

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
    const data = this.props.Home.magazine_list
    const { prev, next } = this.state

    var settings = {
      dots: false,
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0,
      beforeChange: (current) => {
        this.setState({current: current})
      },
    };
    return (
      <FindExperct>
        <Header>
          <Text.FontSize40 color={BLACK1} fontWeight={700}>개발 매거진</Text.FontSize40>
          <Icon prev style={{marginLeft: 'auto', opacity: prev ? 1 : 0.4}} src={right} onClick={this.sliderPrev}/>
          <Icon style={{opacity: next ? 1 : 0.4}} src={right} onClick={this.sliderNext}/>
        </Header>
        <List>
          <Slider {...settings} ref={slider => (this.slider = slider)} afterChange={this.afterChangeHandler}>
          {
            data.map((item, idx) => {
              return (
                <ItemBox key={idx} onClick={() => this.pushToDetail(item.id)}>
                  <Item>
                    <Image ratio='45%' src={item.image} onClick={() => this.setState({tab: 1})}/>
                    <Text.FontSize24 color={DARKGRAY} fontWeight={500}>{item.title}</Text.FontSize24>
                  </Item>
                </ItemBox>
              )
            })
          }
          </Slider>
        </List>
      </FindExperct>
    )
  }
}

export default MagazineContainer;

const FindExperct = styled(Container)`
  @media (min-width: 0px) and (max-width: 767.98px) {
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
  }
`
const List = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
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
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
`
const Icon = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 30px;
    height: 30px;
  }
  ${props => props.prev && css`
    transform: rotate(180deg);
  `}
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
    text-align: center;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    > p {
      margin-top: 20px;
    }
  }
  @media (min-width: 768px) {
    > p {
      margin-top: 20px;
    }
  }
`
const Image = styled(RatioImage)`
  cursor: pointer;
  border-radius: 25px;
  
  width: calc(100% - 15px);
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    border-radius: 15px;
    max-width: 400px;
    
    :hover {
      border-radius: 15px;
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
    border-radius: 25px;
    > div {
      border-radius: 25px;
      transform: scale(1.2);
    }
  }
`