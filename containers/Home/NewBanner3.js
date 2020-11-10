import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";

import Button from "components/Button";
import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'
import * as AnswerAPI  from 'axios/Answer'

// bar
import BarContainer1 from "./Bar.js"

const search_ic = "static/icon/search.png";
const image1 = "/static/images/main/section2_image1.png";
const image2 = "/static/images/main/section2_image2.png";
const image3 = "/static/images/main/section2_image3.png";
const image4 = "/static/images/main/section2_image4.png";
const right = "/static/images/main/right_arrow.png";
const left = "/static/images/main/left_arrow.png";



class NewBanner3Container extends React.Component {
  state = {
    current: 1,
    next: true,
    prev: false,
    page: 1,
    show: 'visible'
  };

  componentDidUpdate () {
  }

  afterChangeHandler = (current) => {
    if(current === 0){
      this.setState({next: true, prev: false})
    }
    else {
      // slidesToShow : 2
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
    const newPage = this.state.page + 1

    if (newPage <= 4) {
      this.setState({page: newPage, show: "hidden"})
      setTimeout(() => {this.setState({show:'visible'})}, 500)
    }

    this.slider.slickNext()
  }
  sliderPrev = () => {

    const newPage = this.state.page -1

    if (this.state.page > 1) {
      this.setState({page: newPage, show: "hidden"})
      setTimeout(() => {this.setState({show:'visible'})}, 500)
    }

    if(this.state.current === 0) {
      this.setState({ prev: false,  next: true })
    }
    else {
      this.setState({ prev: true })
    }
    this.slider.slickPrev()
  }

  render() {
    const { prev, next, current, page, show } = this.state

    var settings = {
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows:false,
      draggable: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            draggable: false
          }
        },
      ]
    }

    return (
    <CustomContainer>
          <Container>
            <Header2>
              <span> 볼트앤너트에서 <Bold> <span class="line">제품개발업체의 살아있는 이야기</span></Bold>를 들어보세요. </span>
            </Header2>
                  <BarContainer1 current={this.state.page} />
                  <List>
                  <Slider {...settings} ref={slider => (this.slider = slider)} afterChange={this.afterChangeHandler}>
                   <div class="PortfolioBox">
                    <PortfolioBox>
                      <div class="body">
                        <W50 left>
                          <Item>
                              <Header> STEP.1 </Header>
                              <Middle> 프로필 </Middle>
                              <Bottom>개별분야, 매출액, 종업원수, 위치, 설립연도 등 업체의 기본 프로필을 확인하세요</Bottom>
                          </Item>
                        </W50>
                        <W50 right>
                            <Image ratio='100%' src={image1} />
                        </W50>
                      </div>
                      <div class="footer" style={{marginTop: 5}}>
                        <Line style={{color: '#ffffff', marginBottom: 0, marginTop: 0}}/>
                        <FooterItem>
                                  <div class="Arrow" style={{visibility: 'hidden'}}>
                                    <LeftArrow src={left} onClick = {this.sliderPrev}/>
                                  </div>
                                      <span class="footer-text-left" style={{visibility: 'hidden'}}> 1/4 </span>
                                        <Space />
                                      <span class="footer-text-right"> 포트폴리오 </span>
                                  <div class="Arrow" style={{visibility: this.state.show}}>
                                      <RightArrow src={right} onClick = {this.sliderNext} />
                                  </div>
                        </FooterItem>
                      </div>
                    </PortfolioBox>
                   </div>

                   <div class="PortfolioBox">
                    <PortfolioBox>
                      <div class="body">
                        <W50 left>
                          <Item>
                              <Header> STEP.2 </Header>
                              <Middle> 포트폴리오 </Middle>
                              <Bottom>업체가 개발하려는 제품과 동일 및 유사한 제품을<br/>개발한 경험이 있는지 직접 확인하세요.</Bottom>
                          </Item>
                        </W50>
                        <W50 right>
                            <Image ratio='100%' src={image2} />
                        </W50>
                      </div>
                      <div class="footer" style={{marginTop: 5}}>
                          <Line style={{color: '#ffffff', marginBottom: 0, marginTop: 0}}/>
                          <FooterItem>
                                  <div class="Arrow" style={{visibility: this.state.show}}>
                                    <LeftArrow src={left} onClick = {this.sliderPrev} />
                                  </div>
                                      <span class="footer-text-left"> 2/4 </span>
                                        <Space />
                                      <span class="footer-text-right"> 보유장비 </span>
                                    <div class="Arrow" style={{visibility: this.state.show}}>
                                      <RightArrow src={right} onClick = {this.sliderNext} />
                                  </div>
                          </FooterItem>
                      </div>
                    </PortfolioBox>
                   </div>

                   <div class="PortfolioBox">
                    <PortfolioBox>
                      <div class="body">
                        <W50 left>
                          <Item>
                              <Header> STEP.3 </Header>
                              <Middle> 보유 장비 </Middle>
                              <Bottom>업체가 제품 개발 및 생산에 어떤 장비를 사용하고 있는지 확인하세요.</Bottom>
                          </Item>
                        </W50>
                        <W50 right>
                            <Image ratio='100%' src={image3} />
                        </W50>
                      </div>
                      <div class="footer" style={{marginTop: 5}}>
                          <Line style={{color: '#ffffff', marginBottom: 0, marginTop: 0}}/>
                          <FooterItem>
                                  <div class="Arrow" style={{visibility: this.state.show}}>
                                      <LeftArrow src={left} onClick = {this.sliderPrev} />
                                  </div>
                                      <span class="footer-text-left"> 3/4 </span>
                                        <Space />
                                      <span class="footer-text-right" > 업체 스토리 </span>
                                  <div class="Arrow" style={{visibility: this.state.show}}>
                                      <RightArrow src={right} onClick = {this.sliderNext} />
                                  </div>
                          </FooterItem>
                      </div>
                    </PortfolioBox>
                   </div>

                   <div class="PortfolioBox">
                    <PortfolioBox>
                      <div class="body">
                        <W50 left>
                          <Item>
                              <Header> STEP.4 </Header>
                              <Middle> 업체 스토리 </Middle>
                              <Bottom>‘개발 프로세스’, ‘실제 개발 사례’, ‘개발 스타일 및 비전’ 등<br/>어디서도 들을 수 없는 업체의 생생한 이야기를 확인하세요.</Bottom>
                          </Item>
                        </W50>
                        <W50 right>
                            <Image ratio='100%' src={image4} />
                        </W50>
                      </div>
                      <div class="footer" style={{marginTop: 5}}>
                        <Line style={{color: '#ffffff', marginBottom: 0, marginTop: 0}}/>
                        <FooterItem>
                                  <div class="Arrow" style={{visibility: this.state.show}}>
                                    <LeftArrow src={left} onClick = {this.sliderPrev} />
                                  </div>
                                      <span class="footer-text-left"> 4/4 </span>
                                        <Space />
                                      <span class="footer-text-right" style={{visibility: 'hidden'}}> 업체 스토리 </span>
                                  <div class ="Arrow" style={{visibility: 'hidden'}}>
                                      <RightArrow src={right} onClick = {this.sliderNext} style={{visibility: 'hidden'}} />
                                  </div>
                        </FooterItem>
                      </div>
                    </PortfolioBox>
                   </div>
                    </Slider>
                </List>
          </Container>
    </CustomContainer>
    );
  }
}

export default NewBanner3Container;

const W100 = styled.div`
  width: 100%;
`
const W50 = styled.div`
  align-items: center;
  justify-content: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    height: 70%;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 450px;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`
const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  height: 100%;
  margin-right: 0;
  margin-left: 0;
  align-items: center;
  justify-content: center;
  background-color: #ebecf5 !important;;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`

const Container = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  text-align: center;
  height: 100%;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 930px;
  }

  @media (min-width: 1300px) {
    width: 1400px;
  }
`
const List = styled.div`
  width : 100%;
  height : 100%;
  padding-top : 0px;
  align-items: center;
  .PortfolioBox {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 0px;
  }
  @media (min-width: 1300px) {
    margin-top: 0px;
  }
`
const Item = styled.div`
  flex-direction: column;
  align-items: left;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  > p {
    text-align: left;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0px;
    width: 100%;
    align-items: center;
    margin: auto;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 0px;
    margin-left: 24px;
    margin-top: 66px;
    width: 100%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 450px;
    margin-left: 24px;
    margin-top: 66px;
  }
  @media (min-width: 1300px) {
    margin-top: 60px;
    margin-left: 60px;

  }
`
const FooterItem = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-top: 20px;
  vertical-align: middle;
  display: inline-flex;
  > p {
    text-align: left;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    margin-top: 16px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 8px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 12px;
  }

  @media (min-width: 1300px) {
    margin-top: 12px;
  }
span.footer-text-left {
  width: 24px;
  height: 32px;
  padding-bottom: 10px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.5;
  letter-spacing: normal;
  text-align: center;
  color: #707070;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    height: 32px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 42px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  height: 42px;
  }

  @media (min-width: 1300px) {
  height: 42px;
  }
}
span.footer-text-right{
  width: 90px;
  height: 32px;
  padding-bottom: 10px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.5;
  letter-spacing: normal;
  text-align: right;
  color: #061953;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    height: 32px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 42px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 42px;
  }

  @media (min-width: 1300px) {
    height: 42px;
  }
}
`
const Image = styled(RatioImage)`
  width: 510px;
  height: 284px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 240px;
    height: 120px;
    margin-top: 15px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 320px;
    margin-top: 36px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 400px;
    margin-top: 36px;
  }

  @media (min-width: 1300px) {
    margin-top: 60px;
    margin-right: 60px;
  }
`
const Header2 = styled.div`
  width: 1200px;
  height: 87px;
  font-family: NotoSansCJKkr;
  font-size: 40px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #061953;
  padding-top: 100px;
  margin: auto;
  @media (min-width: 0px) and (max-width: 767.98px) {
   width: 100%;
   font-size: 19px;
   padding-top: 60px;
   text-align: center;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 560px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 560px;
  }

  @media (min-width: 1300px) {
  }
`
const Header = styled.span`
  width: 52px;
  height: 24px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 56px;
  letter-spacing: normal;
  text-align: left;
  color: #9b9b9b;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 0px;
    width: 100%;
    height: 24px;
    font-size: 12px;
    text-align:center;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 0px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 60px;
  }

  @media (min-width: 1300px) {
  }
`
const Middle = styled.span`
  width: 300px;
  height: 47px;
  margin-top: 5px;
  font-family: NotoSansCJKkr;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: normal;
  text-align: left;
  color: #061953;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 0px;
    margin-top: 10px;
    width: 100%;
    font-size: 28px;
    text-align:center;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 0px;
    margin-top: 10px;
    width: 300px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 600px;
  }

  @media (min-width: 1300px) {
  }
`
const Bottom = styled.span`
  margin-top: 40px;
  width: 335px;
  height: 40px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 24px;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 0px;
    width: 270px;
    font-size: 10px;
    margin-top: 20px;
    text-align:center;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 0px;
    width: 270px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 270px;
  }

  @media (min-width: 1300px) {
  }
 `
 const Bold = styled.span`
  font-Weight : bold;
  font-family : NotoSansCJKkr;
  .line {
  background: linear-gradient(to top, rgba(255, 192, 0, 0.6), rgba(255, 192, 0, 0.6), transparent 40%);
  }
`;
const PortfolioBox = styled.div`
  width: 1300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
   height: 380px;
   width: 100%;
    margin-bottom: 63px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
    margin-bottom: 63px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
    margin-bottom: 100px;
  }

  @media (min-width: 1300px) {
  width: 1300px;
  margin: auto;
  margin-bottom: 100px;
  }
.body   {
  position: relative;
  justify-content: center;
  width: 1200px;
  height: 404px;
  background-color: #ffffff;
  display: inline-flex;
  flex-direction: row;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 90%;
    height: 300px;
    flex-direction:column;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
     width: 90%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 90%;
  }

  @media (min-width: 1300px) {
  }
}
.footer {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 1200px;
  height: 80px;
  background-color: #ffffff;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 90%;
    height: 60px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
     width: 90%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 90%;
  }

  @media (min-width: 1300px) {
  }
  }
`
const Line = styled.line`
  position: relative;
  width: 100%;
  height: 2px;
  margin-bottom: 90px;
  margin-top: 87px;
  opacity: 0.15;
  background-color: #061953;
  flex-direction: row;
  display: inline-flex;
  @media (min-width: 0px) and (max-width: 767.98px) {
   width: 100%;
   height: 2px;
   margin-bottom: 74px;
   margin-top: 64px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
  }
`

const RightArrow = styled(RatioImage)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  object-fit: contain;
  padding-right: 24px;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
    background-position : right;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 400px;
  }
`
const LeftArrow = styled(RatioImage)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  object-fit: contain;
  padding-left: 24px;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
    background-position : right;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 100%;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const Space = styled.div`
  margin-left: 460px;
  margin-right: 460px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 0px;
    margin-right: 0px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 200px;
    margin-right: 200px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-left: 280px;
    margin-right: 280px;
  }

  @media (min-width: 1300px) {
  }
`
// slider circle
const LineContainer = styled.div` 
  position: relative;
  width: 100%;
  height: 30px;
  margin-top: 69px;

`
const LineContainer2 = styled.div` 
  position: relative;
  width: 100%;
  height: 30px;
  margin-top: 12px;
  margin-bottom: 40px;

`
const SubContainer = styled.div` 
  position: absolute;
  width: 100%;
  height: 100%;
  display: table;
  font-size: 0; /* div 사이의 간격을 없애기 위해서 씀*/
`
const TableCellContainer = styled.div` 
  width: 100%;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;

`
const TextCellContainer = styled.div` 
  display: table-cell;
  vertical-align: middle;
  text-align: center;

`
const ContentBox = styled.div` 
  display: inline-table;
  width: calc(100% / 5);
  position: relative;
  height: 100%;
  vertical-align: middle;

`
const EndLine = styled.div` 
  display: inline-table;
  width: calc(70% / 5);
  position: relative;
  height: 100%;
  vertical-align: middle;
`
const Circle = styled.div`
  font-size: 16px;
  width: 28px;
  height: 28px;
  margin:auto;
  justify-content: center;
  align-items: center;
  color: #707070;
  line-height: 20px;
  text-align: center;
  display: block;
  z-index: 100;
  vertical-align: middle;

  position: relative; /* z-index는 relative 등의 특정 포지션에서만 작동함 */
  transform: translateX(10px);
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .after {
    border-radius: 16px;
    width: 100%;
    height: 28px;
    border: 2px solid #061953;
    background-color: #ffffff;
  }
  .active {
    border-radius: 16px;
    width: 100%;
    height: 28px;
    border: 1px solid #061953;
    background-color: #061953;
    color: white;
  }
  .normal {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background-color: white;
  }
`
const SlideLine = styled.div`
  height:2px;
  width: calc(100%);
  background-color: gray;
  position: relative;
  .active {
    background-color: #061953;
    height:2px;
    width: calc(100%);
    position: relative;
  }
`
const SlideText = styled.div`
  font-size: 16px;
  width: 100%;
  height: 20px;
  font-family: NotoSansCJKkr;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  text-align: center;
  color: #707070;
  display: block;
  z-index: 100;
  position: relative; /* z-index는 relative 등의 특정 포지션에서만 작동함 */
  float: middle;
  transform: translateX(10px);
  .active {
    color: #061953;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 10px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`