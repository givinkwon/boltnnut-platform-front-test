import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";
import Container from "components/Container";

import Button from "components/Button";
import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'
import * as AnswerAPI  from 'axios/Answer'

const search_ic = "static/icon/search.png";
const image1 = "/static/images/crown.png";

class NewBanner1Container extends React.Component {
  render() {
    var settings = {
      dots: true,
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
      <Banner>
        <List>
            <Slider {...settings}>
              <ItemBox>
                  <Item>
                    <Image ratio='50%' src={image1} />
                    <Text.FontSize16 color={DARKGRAY} fontWeight={400}  style={{marginTop: 16, marginBottom: 4}}>
                      제품 개발 업체 수
                    </Text.FontSize16>
                    <Text.FontSize40 color={DARKGRAY} fontWeight={900}>
                      <Strong>3900+ 개</Strong>
                    </Text.FontSize40>
                  </Item>
              </ItemBox>
              <ItemBox>
                  <Item>
                    <Image ratio='50%' src={image1} />
                    <Text.FontSize16 color={DARKGRAY} fontWeight={400}  style={{marginTop: 16, marginBottom: 4}}>
                      등록된 프로젝트 수
                    </Text.FontSize16>
                    <Text.FontSize40 color={DARKGRAY} fontWeight={900}>
                      <Strong>1300+ 개</Strong>
                    </Text.FontSize40>
                  </Item>
              </ItemBox>
              <ItemBox>
                  <Item>
                    <div class="Image">
                    <Image ratio='50%' src={image1} />
                    </div>
                    <Text.FontSize16 color={DARKGRAY} fontWeight={400}  style={{marginTop: 16, marginBottom: 4}}>
                      총 프로젝트 금액
                    </Text.FontSize16>
                    <Text.FontSize40 color={DARKGRAY} fontWeight={900} style={{width:320}}>
                      <Strong>1,747,000만원</Strong>
                    </Text.FontSize40>
                  </Item>
              </ItemBox>
             </Slider>
        </List>
      </Banner>
    );
  }
}

export default NewBanner1Container;

const Banner = styled(Container)`
  margin-right = 0; !important
  margin-left = 0; !important
  width = 1400px;
  height = 100%;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-top: 51px;
    padding-bottom: 0px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding-top: 51px;
    padding-bottom: 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding-top: 51px;
    padding-bottom: 0px;
  }
  @media (min-width: 1300px) {
    padding-top: 51px;
    padding-bottom: 0px;
  }
`
const List = styled.div`
  align-items: center;
  width : 100%;
  height : 100%;
  padding-top : 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0px;
    ul.slick-dots {
      li button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 0.2;
      }
      li.slick-active button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 1;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 0px;
    width: 800px;
    ul.slick-dots {
      li button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 0.2;
      }
      li.slick-active button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 1;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 0px;
  }
  @media (min-width: 1300px) {
    margin-top: 0px;
  }
`
const ItemBox = styled.div`
  weight: 100%;
  :focus {
    outline: none;
  }
`
const Item = styled.div`
  width: 466px;
  height: 250px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  > p {
    text-align: center;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    > p {
      margin-top: 20px;
    }
  }
  @media (min-width: 768px) {
    width: calc(100% - 10px);
    > p {
      margin-top: 20px;
    }
  }
`
const Image = styled(RatioImage)`
  width: 40px;
  height: 40px;
  justify-content: center;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 400px;
  }
`
const Strong = styled.span`
  width: 160px;
  height: 59px;
  font-family: NotoSansCJKkr;
  font-size: 40px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #061953;
`
const Subtitle = styled.span`
  width: 140px;
  height: 59px;
  font-family: NotoSansCJKkr;
  font-size: 40px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #061953;
`
const Title = styled.span`
  width: 130px;
  height: 16px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 3;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
`
