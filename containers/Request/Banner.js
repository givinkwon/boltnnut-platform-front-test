import React from 'react'
import styled from 'styled-components'

import Container from 'components/Container'
import * as Text from 'components/Text'
import { WHITE } from 'static/style'


class BannerConatiner extends React.Component {
  render(){
    return (
      <Banner>
        <Container>
          <Text.FontSize40 color={'#0a2165'} fontWeight={700}>의뢰하기</Text.FontSize40>
          <Text.FontSize24 color={'#191919'} fontWeight={500}>나에게 꼭 맞는 제조방식 시작하기</Text.FontSize24>
        </Container>
      </Banner>
    )
  }
}

export default BannerConatiner

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
    margin-top : 200px;
    margin-bottom : 10px;
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
  }
  /* @media (min-width: 0px) and (max-width: 767.98px) {
    height: 180px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 200px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    height: 230px;
  }
  @media (min-width: 1300px) { 
    height: 250px;
  } */
`