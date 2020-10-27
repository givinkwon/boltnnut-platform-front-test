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


class Section4Container extends React.Component {
  render() {
    return (
        <CustomContainer>
            <Container>
              <ItemBox>
                <Text.FontSize40>볼트앤너트는 <span>고객님의 아이디어가<br/>제품으로 실체화 될 수 있도록</span><br/>최선을 다하겠습니다. </Text.FontSize40>
                <NextButton backgroundColor={'#0a2165'} borderColor={'#e6e6e6'} onClick={this.Next}>
                    <Text.FontSize32 color={'#ffffff'} fontWeight={500}>무료 가견적 문의하기</Text.FontSize32>
                </NextButton>
              </ItemBox>
            </Container>
        </CustomContainer>
    );
  }
}

export default Section4Container;

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
  padding-top : 220px;
  padding-bottom : 230px;
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

