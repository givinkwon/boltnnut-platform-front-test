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
const image1 = "/static/images/banner2_1.png";
const image2 = "/static/images/banner2_2.png";
const image3 = "/static/images/banner2_3.png";
const image4 = "/static/images/banner2_4.png";

class Banner2Conatiner extends React.Component {
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
      <Banner>
        <Text.FontSize40 color={BLACK1} fontWeight={700}>내 제품을 개발해본 업체는 어디에? 여기에!</Text.FontSize40>
        <br/>
        <Text.FontSize40 color={BLACK1} fontWeight={700}>제품개발업체 매칭 프로세스를 소개합니다.</Text.FontSize40>
        <List>
            <Slider {...settings}>
                <ItemBox>
                  <Item>
                    <Image ratio='100%' src={image1} />
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>개발하고자 하는 제품 의뢰서를 작성해주세요 </Text.FontSize20>

                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>의뢰서 작성 시간은 최대 3분 입니다.</Text.FontSize20>
                  </Item>
                </ItemBox>
                <ItemBox>
                  <Item>
                    <Image ratio='100%' src={image2} />
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>볼트앤너트 개발 전문 컨설턴트와의  </Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>1:1 추가 상담 후 최대 30분 내로 </Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>최적의 개발업체 리스트를 보내드립니다.</Text.FontSize20>
                    {/*<Text.FontSize20 color={DARKGRAY} fontWeight={500}>모든 정보를 제공해드립니다.</Text.FontSize20>*/}
                  </Item>
                </ItemBox>
                <ItemBox>
                  <Item>
                    <Image ratio='100%' src={image3} />
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}> 포토폴리오부터 제조사 스토리까지  </Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}> 추천받은 업체의 상세정보를 확인한 후 </Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}> 업체와 맞춤형 1:1 상담을 진행하세요.</Text.FontSize20>
                    {/*<Text.FontSize20 color={DARKGRAY} fontWeight={500}> 추천된 전문가가 맞춤형 상담을 해드립니다.</Text.FontSize20>*/}
                  </Item>
                </ItemBox>
             </Slider>
        </List>

      </Banner>
    );
  }
}

export default Banner2Conatiner;

const Banner = styled(Container)`
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
  padding-top : 70px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 30px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 30px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 30px;
  }
  @media (min-width: 1300px) {
    margin-top: 30px;
  }
`
const ItemBox = styled.div`
  :focus {
    outline: none;
  }
`
const Item = styled.div`
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
  border-radius: 0 !important;
  width: calc(70% - 20px);
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 400px;
  }
`