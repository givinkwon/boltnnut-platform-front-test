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
const right = "/static/images/main/main_right.png";
const left = "/static/images/main/main_left.png";
const image1 = "/static/images/main/logo_1.png";
const image2 = "/static/images/main/logo_2.png";
const image3 = "/static/images/main/logo_5.png";

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
    const request_data = this.props.Home.request_list
    const { prev, next } = this.state
    console.log(request_data)

    var settings = {
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      beforeChange: (current) => {
        this.setState({current: current})
      },
    };
    return (
      <FindExperct>
        <LeftArrow src={left} onClick = {this.sliderPrev}/>
        <MagazineBox>
          <Header>
            <Text.FontSize30 color={"#0a2165"} fontWeight={700}>매거진</Text.FontSize30>
          </Header>
          <List>
            <Slider {...settings} ref={slider => (this.slider = slider)} afterChange={this.afterChangeHandler}>
                    {
                      data.map((item, idx) => {
                        return(
                          <ItemBox>
                            <Item>
                              <Image ratio='45%' src={item.image} onClick={() => this.setState({tab: 1})}/>
                              <TextBox>
                                <div class="Header">
                                  {item.title}
                                </div>
                                <div class="Body">
                                  asdsad
                                </div>
                              </TextBox>
                            </Item>
                            <Item>
                              <Image ratio='45%' src={item.image} onClick={() => this.setState({tab: 1})}/>
                              <TextBox>
                                <div class="Header">
                                  {item.title}
                                </div>
                                <div class="Body">
                                  asdsad
                                </div>
                              </TextBox>
                            </Item>
                          </ItemBox>
                        )
                      })
                    }

            </Slider>
          </List>
        </MagazineBox>
        <RightArrow src={right} onClick = {this.sliderNext}/>
        <RequestBox>
          <Header>
            <Text.FontSize30 color={"#0a2165"} fontWeight={700}>실시간 의뢰 건 리스트</Text.FontSize30>
          </Header>
          <Middle>
            제조 파트너사 등록 수 <span class="Bold">3900</span>  프로젝트 수 <span class="Bold">1300</span>
          </Middle>
          <RequestItemBox>
              {
                request_data.map((item, idx) => {
                  return (
                    <RequestItem>
                      {item.name} 의뢰가 접수되었습니다.
                    </RequestItem>
                  )
                })
              }
            <RequestImageContainer>
              <RequestImage src={image1}/>
              <RequestImage src={image2}/>
              <RequestImage src={image3}/>
            </RequestImageContainer>
          </RequestItemBox>
        </RequestBox>
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
    width: 100%;
    height: 662px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
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
    margin-top: 11px;
  }
  @media (min-width: 1300px) {
    margin-top: 11px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
`
const Middle = styled.div`
  width: 420px;
  height: 29px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.5px;
  text-align: left;
  color: #191919;
  margin-top: 13px;
  .Bold {
    font-weight: 500;
    color: #0933b3;
  }
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
  flex-direction: column;
  width: 873px;
  :focus {
    outline: none;
  }
  text-decoration: none;
`
const Item = styled.div`
  width: calc(100% - 15px);
  display: flex;
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
    > div {
      display: flex;
      }
    padding-bottom: 45px;
    height: 240px;
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
const MagazineBox = styled.div`
  width: 873px;
  height: 100%;
  flex-direction: column;
`
const TextBox = styled.div`
  flex-direction: column;
  .Header {
  width: 385px;
  height: 70px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 26px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 700;
  line-height: 1.31;
  letter-spacing: -0.65px;
  text-align: left;
  color: #191919;
  margin-left: 10px;
  }
  .Body {
  margin-left: 10px;
      width: 377px;
  height: 100%;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  text-align: left;
  color: #767676;
  }
`
const LeftArrow = styled(RatioImage)`
  cursor: pointer;
  margin-right: 70px;
  width: 19px;
  height: 32px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
    background-position = right;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-right: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-right: 10px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const RightArrow = styled(RatioImage)`
  cursor: pointer;
  margin-left: 38px;
  width: 19px;
  height: 32px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
    background-position = right;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 10px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
    margin-right: 69px;
  }
`
const RequestBox = styled.div`
  width: 384px;
  height: 100%;
  flex-direction: column;
  margin-bottom: 70px;
`
const RequestItemBox = styled.div`
  width: 384px;
  height: 100%;
`
const RequestItem = styled.div`
  width: 384px;
  height: 63px;
  background-color: #f3f4f8;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  color: #767676;
  margin-top: 24px;
`
const RequestImageContainer = styled.div`
  width: 100%;
  height: 104px;
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  display: inline-flex;
`
const RequestImage = styled(Image)`
  width: 104px;
  height: 104px;
`