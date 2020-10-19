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
          <Text.FontSize48 color={WHITE} fontWeight={700}>제품개발 의뢰하기</Text.FontSize48>
          <Text.FontSize24 color={WHITE} fontWeight={400}>의뢰하고자 하는 제품에 대한 질문에 답하고 적합한 전문업체를 찾아보세요</Text.FontSize24>
        </Container>
      </Banner>
    )
  }
}

export default BannerConatiner

const Banner = styled.div`
  background-image: url('/static/images/banner.jpg');
  background-position: center;
  background-size: cover;
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    > p:nth-of-type(2){
      margin-top: 8px;
      line-height: 1.3em;
    }
    > p:nth-of-type(3){
      line-height: 1.3;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
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
  }
`