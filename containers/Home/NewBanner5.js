import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";

import Button from "components/Button";
import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'
import * as AnswerAPI  from 'axios/Answer'

const search_ic = "static/icon/search.png";
const image1 = "/static/images/main/Banner3_1.png";
const image2 = "/static/images/main/Banner3_2.png";

class NewBanner5Container extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        },
      ]
    }
    return (
    <CustomContainer>
          <Container>
            <Header> 제조사 찾기 말고 다른 서비스를 찾으시나요? </Header>
                <Item>
                    <ImageTextBox>
                      <div class="BackImage"/>
                      <div class="TextBox">
                        <div class="ImageHeader">
                          예산이 예상보다 비싸다구요? <br/> 자체에서 개발한 양산개발 시스템으로
                        </div>
                        <div class="ImageBottom">
                          <span class="ImageBold"> 최대 40% </span>
                           비용을 낮추는 양산개발 서비스를 이용해 보세요
                        </div>
                        <div class="More">
                           자세히 보기 >
                        </div>
                      </div>
                      <div class="CoverImage"/>
                    </ImageTextBox>
                    <ImageTextBox>
                      <div class="BackImage2"/>
                      <div class="TextBox">
                        <div class="ImageHeader">
                          제조사 말고 제품을 찾고 계신가요? <br/> 제품의 중국 단가가 궁금하신가요?
                        </div>
                        <div class="ImageBottom">
                          <span class="ImageBold"> 원하시는 제품 </span>
                           을 발주 조건의 정보를 알아봐 드리는 국내외 발주 공장 수배 서비스를 이용해 보세요.
                        </div>
                        <div class="More">
                           자세히 보기 >
                        </div>
                      </div>
                      <div class="CoverImage"/>
                    </ImageTextBox>
                </Item>
          </Container>
    </CustomContainer>
    );
  }
}

export default NewBanner5Container;

const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
  background-color: rgba(158, 159, 161, 0.12);

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
  text-align : center;
  align-items: center;
  height: 100%;
  margin: auto;
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
    width: 1200px;
  }
`

const Banner = styled(Container)`
  width: 1400px;
  height: 100%;
  align-items: center;
  background-color: #f5f5f5;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 0px 0px;
    margin-bottom: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 0px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 0px 0px;
  }
  @media (min-width: 1300px) {
    padding: 0px 0px;
  }
`
const List = styled.div`
  width : 100%;
  height : 100%;
  padding-top : 0px;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  display: inline-flex;
  margin-bottom: 38px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0px;
    .slick-list {
      width: 728px;
      text-align: center;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 0px;
    .slick-list {
      width: 728px;
      text-align: center;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 0px;
    .slick-list {
      width: 1080px;
      text-align: center;
    }

  }
  @media (min-width: 1300px) {
    margin-top: 0px;
    .slick-list {
      width: 1080px;
      text-align: center;
    }
  }
`
const ItemBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
  :focus {
    outline: none;
  }
`
const Item = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  display: inline-flex;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100%);
    display: flex;
    flex-direction: row;
    align-items: left;
    > p {
      margin-top: 20px;
    }
  }
  @media (min-width: 768px) {
    width: calc(100%);
    > p {
      margin-top: 20px;
    }
  }
`
const Image = styled(RatioImage)`
  width: 588px;
  height: 523px;
  justify-content: center;
  align-items: center;
  margin-bottom: 140px;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const Header = styled.div`
  width: 700px;
  height: 47px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.44;
  letter-spacing: -0.8px;
  text-align: left;
  color: #191919;
  padding-top: 150px;
  padding-bottom: 60px;
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const ImageTextBox = styled.div`
  width: 588px;
  height: 523px;
  justify-content: center;
  align-items: center;
  margin-bottom: 140px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  .BackImage {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("/static/images/main/Banner3_1.png");
    filter: blur(2px);
    opacity: 0.78;
    z-index: 0;
  }
  .BackImage2 {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("/static/images/main/Banner3_2.png");
    filter: blur(2px);
    opacity: 0.78;
    z-index: 0;
  }
  .CoverImage {
   position: absolute;
   height: 100%;
   width: 100%;
   background-color: #000000;
   opacity: 0.55;
   z-index:1;
  }
  .TextBox{
    position: absolute;
    padding-top: 90px;
    padding-left: 40px;
    z-index: 2;
    .ImageHeader {
        width: 363px;
        height: 81px;
        object-fit: contain;
        font-size: 24px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.88;
        letter-spacing: -0.6px;
        text-align: left;
        color: #ffffff;
  }
  .ImageBottom {
     width: 500px;
     height: 188px;
     object-fit: contain;
     font-size: 32px;
     font-weight: bold;
     font-stretch: normal;
     font-style: normal;
     line-height: 1.66;
     letter-spacing: -0.8px;
     text-align: left;
     color: #191919;
     .ImageBold {
      font-size: 56px;
      letter-spacing: -1.4px;
      color: #ffc000;
      }
   }
}
.More {
  width: 120px;
  height: 29px;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.7;
  letter-spacing: -0.5px;
  text-align: right;
  color: #ffffff;
  float: right;
  padding-right: 10px;
  padding-top: 70px;
  }
`
const Bold = styled.span`
  font-Weight : bold;
  font-family: NotoSansCJKkr-Bold;
`
const ButtonBox = styled.div`
  width: 200px;
  height: 56px;
  opacity: 0.98;
  border-radius: 28px;
  align-items: center;
  background-color: #061953;
  margin-bottom: 67px;
  div:nth-of-type(1) {
    margin-right: 10px;
    width: 100% !important;
    height: fit-content;
    background-color: #061953 !important;;
    border: none;
    border-radius: 30px;
    > p {
        width: 120px;
        height: 100%;
        font-family: NotoSansCJKkr;
        padding-top: 5px;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 3;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
      }
    :hover {
      background-color: ${WHITE};
      > p {

      }
    }
    @media (min-width: 0px) and (max-width: 767.98px) {
        width : 50%
        margin-bottom: 44px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
  	    width : 30%
        margin-bottom: 44px;
    }
  }
`
