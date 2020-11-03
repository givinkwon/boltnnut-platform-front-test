import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";

import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'

const person = "/static/icon/info/person.png";
const star = "/static/icon/info/star.png";


class Section2Container extends React.Component {
  render() {
    return (
        <CustomContainer>
            <Container>
              <Header>성공한 사례</Header>
              <ItemBox>
                  <Image src={person}/>
                  <Item>
                    <div class="Header">
                        <Text.FontSize26>P사 운동기구 제품</Text.FontSize26>
                    </div>
                    <div class="Body1">
                        <Star src={star}/>
                        <Text.FontSize26>20.08.26</Text.FontSize26>
                    </div>
                    <div class="Body2">
                        <Text.FontSize26>인터넷에서 본 제품에 제가 원하는 기능을 추  가한 제품을 공급받고 싶었는데 볼트앤너트에서  빠르게 수배해줘서 쉽게 구매할 수 있었습니다. </Text.FontSize26>
                    </div>
                  </Item>
              </ItemBox>
              <ItemBox>
                  <Image src={person}/>
                  <Item>
                    <div class="Header">
                        <Text.FontSize26>L사 주방용 금속 용품</Text.FontSize26>
                    </div>
                    <div class="Body1">
                        <Star src={star}/>
                        <Text.FontSize26>20.08.26</Text.FontSize26>
                    </div>
                    <div class="Body2">
                        <Text.FontSize26>중국에서 유통하는 제품의 품질이 안 좋아서 국내에서 견적과 기간은 얼마나 되는 지가 궁금했는데 원하는 조건에 업체를 찾아주셔서 거래처 이전을 할 수 있었습니다.</Text.FontSize26>
                    </div>
                  </Item>
              </ItemBox>
            </Container>
        </CustomContainer>
    );
  }
}

export default Section2Container;

const ItemBox = styled.div`
  display: flex;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
  background-color : #ffffff;
  margin-bottom : 65px;
  margin-left : auto;
  margin-right : auto;

  /* -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px); */

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
    width: 1000px;
    > p {
      margin-top: 20px;
    }
  }
`
const Image = styled.img`
  width: 80px;
  height: 89px;
  margin : 85px 0px 0px 75px;
     
`;
const Star = styled.img`
  width: 134px;
  height: 31px;
`;


const Header = styled.div`
  object-fit: contain;
  font-size: 32px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  letter-spacing: normal;
  color: #505050;
  margin : auto ;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 50px;
    width: 290px;
    margin-bottom: 20px;
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 50px;
    width: 290px;
    margin-bottom: 40px;
    font-size: 24px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 70px;
    margin-bottom: 73px;
  }
  @media (min-width: 1300px) {
    padding-top: 150px;
    padding-bottom: 60px;
  }
`

const Item = styled.div`
  width : 100% ;
  margin: 40px 50px; 
  text-align : left;
  > div {
    margin-bottom : 10px;
    font-stretch: normal;
    font-style: normal;
  }
  > div:nth-of-type(1) {
    font-weight: bold;
    line-height: 1.73;
    letter-spacing: normal;
    text-align: left;
    color: #191919;
  }
  > div:nth-of-type(2) {
    font-weight: bold;
    line-height: 1.73;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
  }
  > div:nth-of-type(3) {
    font-weight: normal;
    line-height: 1.38;
    letter-spacing: -0.65px;
    text-align: left;
    color: #191919;
  }

  .Header {
      p {
          text-align : left ;
      }
    height: 36px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
    color: #191919;
  }
  .Body1 {
      display : inline-flex;
    p {
        text-align : left ; 
    }
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.45px;
    color: #191919;
  }
  .Body2 {
    p {
        text-align : left ; 
    }
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.45px;
    color: #191919;
  }
`


const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  background-color : #f5f7f7;
  p {
      text-align : center ;
  }
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
  margin-right: auto;
  margin-left: auto;
  text-align : center;
  align-items: center;
  padding-bottom : 65px;
  /* @media (min-width: 0px) and (max-width: 767.98px) {
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
  } */
`

