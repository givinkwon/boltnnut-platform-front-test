import React from 'react'
import styled from 'styled-components'

import Container from 'components/Container'
import * as Text from 'components/Text'
import { WHITE, BLACK } from 'static/style' 


class BannerConatiner extends React.Component {
  render(){
    return (
      <Banner>
        <Container>
          <Text.FontSize30 color={BLACK} fontWeight={700}>서비스 소개</Text.FontSize30>
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
    > p {
      font-stretch: normal;
      font-style: normal;
      line-height: 1.47;
      letter-spacing: -0.75px;

      margin : auto; 
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 200px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 250px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    height: 300px;
  }
  @media (min-width: 1300px) { 
    height: 335px;
  }
`