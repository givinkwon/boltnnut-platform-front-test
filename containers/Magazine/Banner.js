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
          {/*<Text.FontSize62 color={'#0a2165'}>제조 인사이트</Text.FontSize62>*/}
          <Text.FontSize32 color={'#191919'}>제조에 도움이 되는 지식들을 만나보세요.</Text.FontSize32>
        </Container>
      </Banner>
    )
  }
}

export default BannerConatiner

const Banner = styled.div`
  /* background-image: url('/static/images/banner.jpg');
  background-position: center;
  background-size: cover; */
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-top: 40px;
    > p {
      text-align : center; 
    }
    > p:nth-of-type(1){
      margin-top: 8px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.29;
      letter-spacing: -1.55px;
    }
    > p:nth-of-type(2){
      margin-top: 8px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.06;
      letter-spacing: -0.8px;
    }
    > p:nth-of-type(3){
      line-height: 1.3;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 120px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 300px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    height: 350px;
  }
  @media (min-width: 1300px) { 
    height: 426px;
  }
`
// 값들 임의로 정함
