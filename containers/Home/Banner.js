import React from "react";
import styled from "styled-components";
import Router from "next/router";

import Button from "components/Button";
import * as Text from "components/Text";
import { WHITE } from "static/style";
import * as AnswerAPI  from 'axios/Answer'
import Slider from "react-slick";

import {inject, observer} from "mobx-react";
import DOMPurify from 'dompurify';
//counter
import 'react-count-animation/dist/count.min.css';
import AnimationCount from 'react-count-animation';

const search_ic = "static/icon/search.png";

@inject('Home')
class BannerConatiner extends React.Component {
  state = {
    width: 0,
    tab: 0,
    slideStart: 0,
    slideMoved: 0,
    slidePosition: 0,
    slidesToScroll: 258/this.props.width,
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: this.props.width });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: this.props.width });
    this.props.Home.init();
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  updateSlide = () => {
      this.setState({...this.state, slideMoved: 0})
  }
//  componentDidUpdate = () => {
//    var src = document.getElementById("slider");
//    src.addEventListener('touchend', this.updateSlide);
//  }

  slideStart = (e) => {/*
    const { slideStart  } = this.state;
    this.setState({...this.state, slideStart: e.targetTouches[0].clientX});
    console.log(this.state)
  */}
  slideMove = (e) => {/*
    const { slideStart, slideMoved, slidePosition } = this.state;
    var Moved = e.targetTouches[0].clientX - slideStart
    // slideStart에서 얘를 빼줌.
    if (Moved < 0) {
      this.setState({...this.state, slideMoved: Moved, slidePosition: slidePosition-10});
    } else {
      this.setState({...this.state, slideMoved: Moved, slidePosition: slidePosition+10});
    }
  */}
  // countCalc () {
  //   const { Request, Partner } = this.props;
  //   let result = 3924

  //   if(Partner.select_big != null && Partner.select_mid == null){
  //       result =  3 * (((Partner.select_big.id)/5) + 4)
  //   }
    
  //   return result
  // }
  render() {
    const { width, slidePosition, slidesToScroll } = this.state;
    const request_data = this.props.Home.request_list

    var settings = {
      dots: false,
      infinite: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: slidesToScroll,
      initialSlide: 0,
      draggable: false,
      autoplay: true,
      beforeChange: (current) => {
        this.setState({current: current})
      }
    };
    const countSettings1 = {
      start: 0,
      // count : this.countCalc(),
      count : 3927,
      duration: 6000,
      decimals: 0,
      useGroup: true,
      animation: 'up'
    };
    const countSettings2 = {
      start: 0,
      count : 1367,
      duration: 6000,
      decimals: 0,
      useGroup: true,
      animation: 'up'
    };
    return (
    <>
      { width > 768 ? (
      <Banner>
        <Container>
          <Title>
            내 제품 제작 비용과<br/> 전문 제조사를 바로 만나보세요.
          </Title>
          <ButtonBox>
            <Button
              id={'request'}
              backgroundColor={WHITE + "00"}
              borderColor={WHITE}
              onClick={() => Router.push("/request")}
            >
              <Text.FontSize32 color={WHITE} fontWeight={500} borderRadius={0} style={{height: 47, display: "flex", alignItems: "center"}}>
                무료로 가견적 받기
              </Text.FontSize32>
            </Button>
          </ButtonBox>
        </Container>
      </Banner>
      ) :
      (
        <MobileBox>
          <MobileBanner>
            <Title fontWeight={700}>
             클릭 한 번으로 제품 제작 비용과<br/> 전문 제조사를 바로 만나보세요.
            </Title>
            <MobileButton
              id={'request'}
              backgroundColor={WHITE + "00"}
              borderColor={WHITE}
              onClick={() => Router.push("/request")}
              >
              <span> 무료로 가견적 받기 </span>
            </MobileButton>
          </MobileBanner>
          <RequestBox>
            <div class="Header">
              실시간 의뢰 건 리스트
            </div>
            <div className="countup" class="Middle">
              <div class="body">
                제조 파트너사 등록 수<AnimationCount class="active" {...countSettings1}/>
              </div><br/>
              <div class="body">
                프로젝트 수<AnimationCount class="active" {...countSettings2}/>
              </div>
            </div>
          </RequestBox>
          <RequestList>
            <Slider {...settings}>
            {/*<CustomSlider
              id="slider"
              onTouchStart = {this.slideStart}
              onTouchMove = {this.slideMove}
              onTouchEnd = {this.slideEnd}
              X = {slidePosition}
              >*/}
              {
                request_data && request_data.slice(0,20).map((item, idx) => {
                  return (
                    <RequestItem>
                      {(item.name.split(':')[0])[0] + (item.name.split(':')[0])[1] + "  ...  "} 의뢰가 접수되었습니다.
                    </RequestItem>
                  )
                })
              }
              {/*
            </CustomSlider>
            */}
            </Slider>
          </RequestList>
        </MobileBox>
      )
      }
    </>
    );
  }
}

export default BannerConatiner;

const Container = styled.div`
  padding-right: 0% !important;
  padding-left: 0% !important;
  margin-right: 0% !important;
  margin-left: 0% !important;
  width: 100%;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  div:nth-of-type(1) {
    width: 366px;
    height: 92px;
    padding: 0 !important;
    margin-top: 120px;
    background-color: #0933b3;//${WHITE};
    border: none;
    border-radius: 10px;
    :hover {
      background-color: #0a2165;
      > p {
        color: ${WHITE} !important;
      }

    }
    @media (min-width: 0px) and (max-width: 767.98px) {
        width : 40%
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
         width : 30%
    }
  }
`
const Banner = styled.div`
  background-position: center;
  background-size: cover;
  margin-bottom: 26px;
  background-image: url("/static/images/main/main.jpg");
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 600px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 650px;
  }
  @media (min-width: 1300px) {
    height: 772px;
  }
  ${Container} {
    > p:nth-of-type(2) {
      margin-top: 8px;
    }
    > p:nth-of-type(3) {
      line-height: 1.3;
    }
  }
`;
// ed7d31
const Title = styled.div`
  padding-top: 200px;
  margin-right: 0%;
  margin-left: 0%;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: -1.55px;
  text-align: center;
  color: #ffffff;
  word-break: keep-all;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.61);
  @media (min-width: 0px) and (max-width: 768.98px) {
        width: 100%;
        height: 58px;
        object-fit: contain;
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.4;
        letter-spacing: -0.5px;
        text-align: center;
        color: #ffffff;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.61);
        padding-top: 52px;
        padding-bottom: 32px;
  }
  @media (min-width: 768.99px) and (max-width: 991.98px) {
        font-size: 37px !important;
        width: 60%;
        height: 22.3%;
        padding-top: 200px;
        padding-left: 20%;
        padding-right: 20%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
         font-size: 45px !important;
         width: 60%;
        height: 22.3%;
        padding-left: 20%;
        padding-right: 20%;
  }
  @media (min-width: 1300px){
    font-size: 62px !important;
    width: 60%;
    height: 22.3%;
    padding-left: 20%;
    padding-right: 20%;
  }

`

const Subtitle = styled(Text.FontSize20)`
  line-height: 1.4em;
  font-Weight : 500;
  width : 1200px !important;
  display : inline-flex;
  > div:nth-of-type(2) {
      text-align: right;
    }

  @media (min-width: 0px) and (max-width: 369.98px) {
        width : 100% !important;
        display : inline-block;
        font-size : 12px;
        text-align: center;
    }
  @media (min-width: 370px) and (max-width: 479.98px) {
        width : 100% !important;
        display : inline-block;
        text-align: center;
    }
  @media (min-width: 480px) and (max-width: 768.98px) {
        width : 100% !important;
        display : inline-block;
        text-align: center;
    }
  @media (min-width: 768.99px) and (max-width: 991.98px) {
         width : 720px !important;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
         width : 900px !important;
  }
`;

const Strong = styled.span`
  color: #ffc000 !important;
`;

const Bold = styled.span`
  font-Weight : 700;
`;

const W100 = styled.div`
  width: 100%;
`
const W50 = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    text-align: center !important;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
`
const MobileBox = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin-bottom: 8px;
`
const MobileBanner = styled.div`
  width: 421px;
  height: 225px;
  border-radius: 6px;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
  margin-top: 26px;
  background-image: url("/static/images/main/main_mobile.png");
`
const MobileButton = styled.div`
  width: 50%;
  height: 40px;
  object-fit: contain;
  background-color: #0a2165;
  border-radius : 6px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  margin-left: auto;
  margin-right: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #0933b3;
  }
  > span {
    width: 100%;
    height: 24px;
    font-size: 16px;
    font-stretch: normal;
    font-weight: 500;
    font-style: normal;
    line-height: 0.81;
    letter-spacing: -0.4px;
    text-align: center;
    justify-content: center;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
`
const RequestBox = styled.div`
  height: 46px;
  width: 90%;
  margin-top: 14px;
  position: relative;
  .Header {
    height: 24px;
    object-fit: contain;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.13;
    letter-spacing: -0.4px;
    text-align: left;
    color: #505050;
    position: absolute;
  }
  .Middle {
    height: 18px;
    padding-top: 6px;
    object-fit: contain;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.3px;
    text-align: right;
    color: #191919;
    position: relative;
    float: right;
    .active {
      font-weight : 500;
      color: #0933b3;
    }
  }
  .body {
    display : inline-flex;
  }
`
const RequestList = styled.div`
  width: 100%;
  height: 64px;
  padding-left: calc(10%);
  //display: -webkit-box;
  .slick-list {
    margin : 0;
    width: 100%;
    > div > div {
      width: 250px !important;
      margin-right: 9px;
    }
    > div > div > div > div  {
      display: flex !important;
      align-items: center;
      padding-left: 16px;
      padding-right: 16px;
      width: 208px !important;
    }
    > div {
    }
`
const RequestItem = styled.div`
  width: 250px;
  height: 31.5px;
  background-color: #f3f4f8;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.55;
  letter-spacing: -0.28px;
  text-align: center;
  color: #767676;
  margin-top: 8.5px;
  margin-right: 9px;
  border-radius: 6px;
`
const CustomSlider = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  transform: translateX(${props => props.X ? props.X : 0}px);
`