import React from 'react'
import styled from 'styled-components'

import * as Text from 'components/Text'
import { WHITE } from 'static/style'
import Background from 'components/Background';
import Container from 'components/Containerv1';
const BackImg = "static/images/answer/MaskGroup/MaskGroup77.png"

class BannerConatiner extends React.Component {
  render(){
    return (
      <Background src={ BackImg } backgroundColor={ "#000000" } style={{height: 208, opacity: 0.9}}>
        <Container>
          <Item>
            <Text.FontSize48 color={WHITE} fontWeight={700}>요청한 의뢰서 확인하기</Text.FontSize48>
            <Text.FontSize24 color={WHITE} fontWeight={400}>의뢰한 제품에 대한 전문업체들의 의뢰서를 확인해보세요</Text.FontSize24>
          </Item>
        </Container>
      </Background>
    )
  }
}

export default BannerConatiner


const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;


  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 180px;
    > p:nth-of-type(2){
      margin-top: 16px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 208px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    height: 208px;
  }
  @media (min-width: 1300px) { 
    height: 208px;
  }

  > p {
    line-height: 1.5em;
    word-break: keep-all;
  }

  > p:nth-of-type(2){
    margin-top: 8px;
  }
  > p:nth-of-type(3){
    line-height: 1.3;
  }
`

const Banner = styled.div`
  background-image: url('/static/images/answer/MaskGroup/MaskGroup77.png');
  background-position: center;
  background-size: cover;



  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    
    > p {
      line-height: 1.25em;
      word-break: keep-all;
    }
    
    > p:nth-of-type(2){
      margin-top: 8px;
    }
    > p:nth-of-type(3){
      line-height: 1.3;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 180px;
    > p:nth-of-type(2){
      margin-top: 16px;
    }
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