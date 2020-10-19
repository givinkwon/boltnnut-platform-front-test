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
const image1 = "/static/images/logo_1.jpg";
const image2 = "/static/images/logo_2.png";
const image3 = "/static/images/logo_3.png";

class Banner3Conatiner extends React.Component {
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
        <Text.FontSize40 color={BLACK1} fontWeight={700}>볼트앤너트 클라이언트의 실제 후기를 들어보세요</Text.FontSize40>

        <List>
            <Slider {...settings}>
                <ItemBox>
                  <Item>
                    <Image ratio='100%' src={image1} />
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>제조에 처음 도전한 저희는 개발업체를 찾느라 </Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>한 달 이상을 애먹고 있었어요. 볼트앤너트 덕에</Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>더 이상 시간을 낭비하지 않아도 되었습니다 </Text.FontSize20>
                  </Item>
                </ItemBox>
                <ItemBox>
                  <Item>
                    <Image ratio='100%' src={image2} />
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>업체를 고를 때 개발을 진행하는 마인드와 </Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>포토폴리오를 가장 중요하게 생각하는데</Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}>볼트앤너트가 모두 제공해줘서 편리했습니다.</Text.FontSize20>
                  </Item>
                </ItemBox>
                <ItemBox>
                  <Item>
                    <Image ratio='100%' src={image3} />
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}> 기존거래처에서 받은 조건이 찜찜해도 </Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}> 다른 방법이 없었는데 볼트앤너트를 통해</Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}> 업체들을 추천 받아 비교해볼 수 있었고</Text.FontSize20>
                    <Text.FontSize20 color={DARKGRAY} fontWeight={500}> 더 나은 조건의 업체와 계약하게 되었습니다</Text.FontSize20>
                  </Item>
                </ItemBox>
             </Slider>
        </List>

      </Banner>
    );
  }
}

export default Banner3Conatiner;

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