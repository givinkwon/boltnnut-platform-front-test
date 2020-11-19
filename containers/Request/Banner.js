import React from 'react'
import styled from 'styled-components'

import Container from 'components/Container'
import * as Text from 'components/Text'
import { WHITE } from 'static/style'


class BannerContainer extends React.Component {
  render(){
    return (
      <Banner>
        <Container>
          <Text.FontSize40 color={'#0a2165'} fontWeight={700}>의뢰하기</Text.FontSize40>
          {
            this.props.step2 &&
            <span> 최대 1 영업일 이내로 제작하고자 하는 제품의 가견적을 안내드립니다. </span>
          }
        </Container>
      </Banner>
    )
  }
}

export default BannerContainer

const Banner = styled.div`
  background-position: center;
  background-size: cover;
  
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    font-stretch: normal;
    font-style: normal;
    margin-bottom : 10px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      margin-top : 80px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
      margin-top : 100px;
    }
    @media (min-width: 992px) and (max-width: 1299.98px) {
      margin-top : 200px;

    }
    @media (min-width: 1300px) {
      margin-top : 200px;

    }
    >p {
      margin-right : auto;
      margin-left : auto;
      font-stretch: normal;
      font-style: normal;
    }
    > p:nth-of-type(1){
      line-height: 1.35;
      letter-spacing: -1px;
    }
    > p:nth-of-type(2){
      margin-top: 8px;
      line-height: 1.42;
      letter-spacing: -0.6px;
    }
    > span {
        height: 36px;
        object-fit: contain;
        font-size: 24px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.42;
        letter-spacing: -0.6px;
        text-align: center;
        color: #0933b3;
        @media (min-width: 0px) and (max-width: 767.98px) {
            margin-top: 15px;
            font-size: 16px;
        }
        @media (min-width: 768px) and (max-width: 991.98px) {
            margin-top: 15px;
            font-size: 18px;
        }
        @media (min-width: 992px) and (max-width: 1299.98px) {

        }
        @media (min-width: 1300px) {

        }

    }
  }

`
