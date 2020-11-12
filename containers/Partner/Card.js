import React, {Component} from "react"
import styled from "styled-components"
import Router, { withRouter } from 'next/router'
import { inject, observer } from 'mobx-react'
import 'intersection-observer'; // polyfill
import Observer from "@researchgate/react-intersection-observer";

import * as Text from "components/Text"
import RatioImage from "components/RatioImage"

import Slider from "react-slick";

import ProfileInfoContainer from "ProfileInfo"

import {DARKGRAY, GRAY, PRIMARY} from "static/style"
const image1 = 'static/images/mask.png';
const dropdown = 'static/images/main/dropdown.png';

const jot1 = 'static/images/partner/jot1.png';
const jot2 = 'static/images/partner/jot2.png';
const jot3 = 'static/images/partner/jot3.png';
const jot4 = 'static/images/partner/jot4.png';
const jot5 = 'static/images/partner/jot5.png';
const sival = 'static/images/partner/arrow_up.png';
const next = 'static/images/partner/next.png';
const prev = 'static/images/partner/prev.png';

const NextArrow = (props) => {
  const { onClick } = props;
  const ArrowCircle = styled.div`
    width: 46px;
    height: 46px;
    opacity: 0.7;
    background-color: #505050;
    border-radius: 30px;
    cursor: pointer;
    @media (min-width: 0px) and (max-width: 767.98px) {
      width: 19px;
      height: 19px;
      > div > img {
        width: 6px;
        height: 11px;
      }
    }
  `
  return (
    <div>
      <ArrowCircle>
        <div
          style={{display: 'inline-flex', width: '100%', height: '100%', justifyContent:'center', alignItems: 'center'}}>
          <img src={next} onClick = {onClick}/>
        </div>
      </ArrowCircle>
    </div>
  )
}
const PrevArrow = (props) => {
  const { onClick } = props;
  const ArrowCircle = styled.div`
    width: 46px;
    height: 46px;
    opacity: 0.7;
    background-color: #505050;
    border-radius: 30px;
    cursor: pointer;
    @media (min-width: 0px) and (max-width: 767.98px) {
      width: 19px;
      height: 19px;
      > div > img {
        width: 6px;
        height: 11px;
      }
    }
  `
  return (
    <div>
      <ArrowCircle>
        <div
          style={{display: 'inline-flex', width: '100%', height: '100%', justifyContent:'center', alignItems: 'center'}}>
          <img src={prev} onClick={onClick}/>
        </div>
      </ArrowCircle>
    </div>
  )
}

@inject('Partner')
@observer
class CardContainer extends Component {
  state = {
    showDrop: true,
    showDetail: 'none',
    width: 0,
  }

  static defaultProps = {
    observer: false,
    handleIntersection: function () {
      console.log('handleIntersection 함수를 전달해주세요')
    }
  }

  toDetail = () => {
    const { item } = this.props;
    this.props.Partner.detail = item
    Router.push(`/partner/${item.id}`)
  }

  detailDown = () => {
    const { showDrop, showDetail } = this.state;
    this.setState({showDrop: 'none', showDetail: true})
  }

  detailUp = () => {
    const { showDrop, showDetail } = this.state;
    this.setState({showDrop: true, showDetail: 'none'})
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    const { item, observer, handleIntersection, Partner } = this.props;
    const { showDrop, showDetail, width } = this.state;

    var settings = {
      dots: false,
      infinite: false,
      arrows: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0,
      draggable: false,
      nextArrow: <NextArrow/>,
      prevArrow: <PrevArrow/>,
    }

    const options = {
      onChange: handleIntersection,
    };

    if(item){
      return (
      <Card>
        { showDrop == true ? (
          <SummaryContainer onClick = {this.detailDown}>
            <Image src={item.logo}/>
            <TextBox>
              <div class="Header">
                {item.name}
              </div>
              <div class="Body">
                {item.info_company.substring(0,50)} ...
              </div>
              <div class="devbox">
              { width > 767.99 ? (
              <>
                {
                  item.category.length > 0 && item.category.slice(0,4).map((item1,idx) => {
                    return (
                      <div class="develop">
                        {item1.category}
                      </div>
                    )
                  })
                }
              </>
                ) : (
              <>
                {
                  item.category.length > 0 && item.category.slice(0,3).map((item1,idx) => {
                    return (
                      <div class="develop">
                        {item1.category}
                      </div>
                    )
                  })
                }
              </>
                )}
                {
                  item.category.length > 5 && "..."
                }
              </div>
            </TextBox>
          </SummaryContainer>
          ) : (
            <SummaryContainer onClick = {this.detailUp}>
              <Image src={item.logo}/>
              <TextBox>
                <div class="Header">
                  {item.name}
                </div>
                <div class="Body">
                  {item.info_company.substring(0,50)} ...
                </div>
                <div class="devbox">
                { width > 767.99 ? (
                <>
                  {
                    item.category.length > 0 && item.category.slice(0,4).map((item1,idx) => {
                      return (
                        <div class="develop">
                          {item1.category}
                        </div>
                      )
                    })
                  }
                </>
                  ) : (
                <>
                  {
                    item.category.length > 0 && item.category.slice(0,3).map((item1,idx) => {
                      return (
                        <div class="develop">
                          {item1.category}
                        </div>
                      )
                    })
                  }
                </>
                  )}
                  {
                    item.category.length > 5 && "..."
                  }
                </div>
              </TextBox>
            </SummaryContainer>
          )
        }
        
        <div class="dropdown">
          { showDrop == true ? (
              <img src={dropdown} onClick = {this.detailDown}/>
              ) : (
              <img src={sival} onClick = {this.detailUp} />
              )
          }
        </div>
      <>
        { width > 767.99 ? (
      <>
        <DetailContainer style={{display: showDetail}}>
          <PortfolioContainer>
            <Slider {...settings} ref={slider => (this.slider = slider)}>
              {
                item.portfolio_set.length > 0 && item.portfolio_set.map((item2,idx) => {
                  return (
                    <PortfolioImage>
                      <img src={item2.img_portfolio}/>
                    </PortfolioImage>
                  )
                })
              }
            </Slider>
          </PortfolioContainer>
          <Detail1>
            <MobileDetail1>
              <div class="title">
                전문분야
              </div>
              <div class="info" style={{borderLeft: "0.5px solid #d5d5d5", borderRight: "0.5px solid #d5d5d5"}}>
                경력 <br/>
                {item.career}
              </div>
              <div class="info" style={{borderRight: "0.5px solid #d5d5d5", marginLeft: 0}}>
                지역 <br/>
                {Partner.getCityNameById(item.city)}
              </div>
            </MobileDetail1>
            <MobileDetail1>
              <div class="title">
                주요실적
              </div>
              <div class="info" style={{textAlign: 'left'}}>
                {item.deal}
              </div>
            </MobileDetail1>
            <MobileDetail1>
              <div class="title">
                진행한 제품군
              </div>
              <div class="info" style={{textAlign: 'left'}}>
                {item.info_biz}
              </div>
            </MobileDetail1>
          </Detail1>
        </DetailContainer>
      </>
      ) : (
      <>
        <DetailContainer style={{display: showDetail}}>
          <PortfolioContainer>
              <Slider {...settings} ref={slider => (this.slider = slider)}>
              {
                item.portfolio_set.length > 0 && item.portfolio_set.map((item2,idx) => {
                  return (
                    <PortfolioImage>
                      <img src={item2.img_portfolio}/>
                    </PortfolioImage>
                  )
                })
              }
              </Slider>
          </PortfolioContainer>
          <Detail1>
            <MobileDetail1 >
              <div class="title">
                전문분야
              </div>
              <div class="info" style={{borderLeft: "0.5px solid #d5d5d5", borderRight: "0.5px solid #d5d5d5"}}>
                설립연도 <br/>
                {item.career}
              </div>
              <div class="info" style={{borderRight: "0.5px solid #d5d5d5"}}>
                지역 <br/>
                {Partner.getCityNameById(item.city)}
              </div>
            </MobileDetail1>
            <MobileDetail1>
              <div class="title">
                주요실적
              </div>
              <div class="info" style={{textAlign: 'left'}}>
                {item.deal}
              </div>
            </MobileDetail1>
            <MobileDetail1>
              <div class="title">
                진행한 제품군
              </div>
              <div class="info" style={{textAlign: 'left'}}>
                {item.info_biz}
              </div>
            </MobileDetail1>
          </Detail1>
        </DetailContainer>
      </>
      )
      }
    </>
      </Card>
      )
    }
    return null
  }
}

export default withRouter(CardContainer);

const SummaryContainer = styled.div`
  display: inline-flex;
  width: 100%;
  padding-top: 33px;
  cursor: pointer;

  @media (min-width: 0px) and (max-width: 767.99px) {
      padding: 0;
      padding-top: 16px;
      align-items: center;
  }
  @media (min-width: 767.99px) and (max-width: 1299.98px) {
      width: 100%;
  }

`
const DetailContainer = styled.div`
  width: 100%;
  /* transition: ; */
  @media (min-width: 0px) and (max-width: 767.99px) {
      width: 100%;
      padding-top: 17px;
      > div {
      :nth-of-type(1) {
        border-radius: 0px;
      }
      }
  }
  .dropup {
    width: 100%;
    padding-right: calc(10%);
    height: 12px;
    padding-top: 19px;
    padding-bottom: 19px;
    > img {
      cursor: pointer;
      float: right;
      padding-right: 33px;
    }
    @media (min-width: 0px) and (max-width: 767.99px) {
      padding: 0 0;
      width: 100%;
      > img {
        cursor: pointer;
        float: right;
        padding-right: 0px;
        width: 7px;
        height: 4px;
        padding-right: 0px;
      }
    }
  }
`
const Detail1 = styled.div`
  line-height: 2;
  width: calc(96.4%);
  height: 371px;
  object-fit: contain;
  background-color: #f1f3f4;
  display: table;
  margin-top: 25px;
  padding-left: calc(3.7%);
  > img {
    width: calc(34.5%);
  }
  .detailInner {
    display: table-cell;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    padding-bottom: 24px;
    .fuck {
      flex-direction: column;
      display: inline-block;
      > img {
        padding-top: 20px;
      }
      .text {
        width: 150px;
        height: 27px;
        object-fit: contain;
        font-size: 18px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.45px;
        text-align: center;
        color: var(--black);
      }
    }
  }
  @media (min-width: 0px) and (max-width: 767.99px) {
    margin-top: 0px;
    width: 90.3%;
    padding-left: calc(5%);
    padding-right: calc(5%);
    border-radius: 6px;
    height: 144px;
    > div {
      :nth-of-type(1) {
        height: 30px;
      }
      :nth-of-type(2) {
        height: 52px;
      }
      :nth-of-type(3) {
        height: auto;
        margin-bottom: 20px;
      }
    }
  }
  @media (min-width: 768.98px) and (max-width: 1299.98px) {
    width: calc(96.4%);
    > div {
      :nth-of-type(1) {
        height: 54px;
      }
      :nth-of-type(2) {
        height: 62px;
      }
      :nth-of-type(3) {
        height: auto;
        margin-bottom: 20px;
      }
    }
  }
`
const PortfolioContainer = styled.div`
  width: 894px;
  height: 238px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  > div {
    :nth-of-type(1) {
      display: flex;
      align-items: center;
    }
  }
  .slick-list {
    width: 100%;
  }
  .slick-slider {
    width: calc(90%);
    .slick-initialized {
      display: flex;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    height: 133px;
    padding-top: 0px;
    padding-bottom: 12px;
  }
  @media (min-width: 767.99px) and (max-width: 1299.98px) {
    width: 95%;
    padding-left: calc(2.5%);
  }
`
const PortfolioImage = styled.div`
    width: 100%;
    height: 236px;
    > img {
      width: calc(95%);
      height: 100%;
    }
    @media (min-width: 0px) and (max-width: 767.98px) {
      width: 203px;
      height: 133px;
  }
`
const Card = styled.div`
  width: 894px;
  height: 100%;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  border-radius : 10px;
  margin-bottom: 15px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 0px) and (max-width: 767.99px) {
    width: 90%;
    height: 100%;
    border-radius: 6px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    padding: 0;
    > img {
     width: 72px;
     height: 81px;
     border-radius: 3px;
     background-color: #c9c9c9;
    }
  }
  :hover {
    box-shadow: 0 0 6px 0 ${PRIMARY}55;
  }
  .dropdown {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    > img {
      cursor: pointer;
      float: right;
      padding-right: 33px;
    }
    @media (min-width: 0px) and (max-width: 767.99px) {
      padding: 0;
      padding-bottom: 10px;
      > img {
        cursor: pointer;
        float: right;
        width: 7px;
        height: 4px;
        padding-right: 10px;
      }
    }
  }
  @media (min-width: 768.98px) and (max-width: 1299.98px) {
    width: 720px !important;
  }
`
const TextBox = styled.div`
  height: 186px;
  margin-left: 30px;
  .Header {
    width: auto;
    height: 36px;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-family: 'Noto Sans KR', sans-serif;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
    text-align: left;
    color: #191919;
    @media (min-width: 0px) and (max-width: 767.98px) {
      width: auto;
      height: 16px;
      font-size: 10px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 0.9;
      letter-spacing: -0.25px;
      text-align: left;
      color: #191919;
    }
  }
  .Body {
    width: 470px;
    font-size: 18px;
    font-weight: normal;
    font-family: 'Noto Sans KR', sans-serif;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.45px;
    text-align: left;
    color: #191919;
    margin-top: 20px;

    @media (min-width: 0px) and (max-width: 767.98px) {
      width: calc(90%);
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: -0.25px;
      text-align: left;
      color: #191919;
      margin-top: 0px;
    }
    @media (min-width: 768px) and (max-width: 1199.98px) {
      width: 90%;
      margin-right: 10%;
    }
  }
  .devbox {
    width: 470px;
    height: 30px;
    display: inline-flex;
    margin-top: 20px;
    .develop {
      width: 120px;
      height: 30px;
      border-radius: 4px;
      background-color: #f1f1f1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      @media (min-width: 0px) and (max-width: 767.98px) {
        width: auto;
        height: 16px;
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.25px;
        text-align: left;
        color: #191919;
        }
      }
  @media (min-width: 0px) and (max-width: 767.98px) {
       margin: 0;
       margin-top: 14px;
       width: 100%;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(90%);
    height: 81px;
  }
  @media (min-width: 991.98px) and (max-width: 1299.98px) {
    width: 70%;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
const Image = styled(RatioImage)`
  width: 196px;
  height: 186px;
  border-radius: 3px;
  background-color: #c9c9c9;
  display: inline-block;
  vertical-align: middle;
  margin-left: 30px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(20%);
    height: calc(7%);
    vertical-align: top;
    margin-top: 2px;
    margin-left: 10px;
  }
  @media (min-width: 767.99px) and (max-width: 1299.98px) {
       height: calc(7%);
       width: calc(30%);
    }
`
const MobileDetail1 = styled.div`
  @media (min-width: 767.98px) {
    width: 99%;
    height: 62px;
    margin-top: 37px;
    display: inline-flex;
  .title {
    width: 104px;
    height: 15px;
    object-fit: contain;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.25px;
    text-align: left;
    color: #191919;
    display: inline-table;
  }
  .info {
    width: 100%;
    font-size: 18px;
    text-align: center;
    border-left: solid #d5d5d5 {props => props.active && 0.5px};
    border-right: solid #d5d5d5 {props => props.active && 0.5px};
    margin-left: 64px;
    }
  }
  @media (min-width:0px) and (max-width: 767.97px) {
    width: 99%;
    height: 100%;
    padding-top: 15px;
    display: inline-flex;
  .title {
    width: 72px;
    height: 15px;
    object-fit: contain;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.25px;
    text-align: left;
    color: #191919;
    display: inline-table;
  }
  .info {
    width: 100%;
    height: 100%;
    font-size: 10px;
    text-align: center;
    border-left: solid #d5d5d5 {props => props.active && 0.5px};
    border-right: solid #d5d5d5 {props => props.active && 0.5px};
  }
  }
`
