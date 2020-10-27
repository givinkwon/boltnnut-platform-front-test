import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";

import ButtonComponent from 'components/Button'
import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'

const person = "/static/icon/info/person.png";
const star = "/static/icon/info/star.png";


class Section3Container extends React.Component {
  render() {
    return (
        <CustomContainer>
            <Container>
              <Header>비용 절감이 가능한 이유</Header>
              <ItemBox>
                <Text.FontSize32>1. 합리적인 견적만을 추구합니다. </Text.FontSize32>
                <Text.FontSize32>2. 제조 전문 컨설턴트가 <span>불필요한 용역 요소를 사전에 제거</span>하여 개발비를 낮춰줍니다. </Text.FontSize32>
                <Text.FontSize32>3. 디자인, 설계, 목업, 금형 등 <span>구간 별 최적의 업체와 개발/양산을 진행</span>하여<br/>과도한 비용소모를 막습니다. </Text.FontSize32>
                <NextButton backgroundColor={'#0a2165'} borderColor={'#e6e6e6'} onClick={this.Next}>
                    <Text.FontSize32 color={'#ffffff'} fontWeight={500}>서비스 이용하기</Text.FontSize32>
                </NextButton>
              </ItemBox>
            </Container>
        </CustomContainer>
    );
  }
}

export default Section3Container;
const ItemBox = styled.div`
  display: inline;
  width: 100%;
  margin-bottom : 200px;
  > p { 
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.19;
    letter-spacing: -0.8px;
    text-align: center;
    color : #191919 ;
    > span {
      font-weight: 600;
      color: #0933b3;
    }
  }
  

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
const NextButton = styled(ButtonComponent)`
  margin: auto;
  margin-top : 50px;
  border-radius: 16px;
  box-shadow: 0 3px 6px 0 var(--black-16);
  
  :hover {
    background-color : #0933b3;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 302px;
    height: 77px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 302px;
    height: 77px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    width: 302px;
    height: 77px;
  }
  @media (min-width: 1300px) { 
    width: 302px;
    height: 77px;
  }
`
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
const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
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
  padding-bottom : 200px;
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

