import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";
import { inject, observer } from 'mobx-react'

import ButtonComponent from 'components/Button'
import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'

const person = "/static/icon/info/person.png";
const star = "/static/icon/info/star.png";

@inject('Request')

class Section3Container extends React.Component {
  Next = () => {
    const { Request } = this.props
    Request.setType('estimate')
    if(Request.type){
      Router.push("/request?big=&mid=")
      Request.setStep(1)
    }
  }
  render() {
    const { Request } = this.props

    return (
        <CustomContainer>
            <Container>
              <Header>이용 안내</Header>
              <ItemBox>
                <Text.FontSize24>10 영업일 이내 원하는 조건(견적,MOQ)을 구하지 못하는 경우</Text.FontSize24>
                <Text.FontSize48 color={'#0933b3'}>100% 환불</Text.FontSize48>
                <Text.FontSize24>가격 39,000원</Text.FontSize24>
                <NextButton active={Request.type==="estimate"} onClick={this.Next} backgroundColor={'#0a2165'} borderColor={'#e6e6e6'} onClick={this.Next}>
                    <Text.FontSize32 color={'#ffffff'} fontWeight={500}>서비스 시작하기</Text.FontSize32>
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
    font-stretch: normal;
    font-style: normal;
  }
  > p:nth-of-type(1) {
    font-weight: normal;
    line-height: 1.58;
    letter-spacing: -0.6px;
  }
  > p:nth-of-type(2) {
    font-weight: bold;
    line-height: 1.42;
    letter-spacing: -0.02px;
  }
  > p:nth-of-type(3) {
    font-weight: normal;
    line-height: 1.58;
    letter-spacing: -0.6px;
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

