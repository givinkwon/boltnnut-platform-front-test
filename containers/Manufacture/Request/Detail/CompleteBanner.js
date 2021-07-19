import React from 'react'
import styled from 'styled-components'

import Container from 'components/Container'
import * as Text from 'components/Text'
import { WHITE } from 'static/style'


class CompleteBannerConatiner extends React.Component {
  render(){
    return (
      <Banner>
        <Container>
          <MessageBox>
            <Text.FontSize28 color="#001a56" fontWeight={400}>
              고객님의 제조 의뢰가 접수 되었습니다
            </Text.FontSize28>
          </MessageBox>

          <Text.FontSize48 color={WHITE} fontWeight={400}>
            볼트앤너트 '최진영' 개발 전문 컨설턴트와
          </Text.FontSize48>
          <Text.FontSize48 color={WHITE} fontWeight={400}>
            1 : 1 상담을 진행합니다.
          </Text.FontSize48>
          <br/>
          <Text.FontSize48 color={WHITE} fontWeight={700}>
            아래 상담하기를 클릭해주세요.
          </Text.FontSize48>
        </Container>
      </Banner>
    )
  }
}

export default CompleteBannerConatiner

const Banner = styled.div`
  background-image: url('/static/images/banner.jpg');
  background-position: center;
  background-size: cover;
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    p {
      word-break: keep-all;
    }
    > p {
      line-height: 1.3em;
      text-align: center;
    }
    > p:nth-of-type(2){
      margin-top: 8px;
    }
    > p:nth-of-type(3){
      line-height: 1.3;
    }
  }
  @media (min-width: 0px) and (max-width: 329.98px) {
    height: 480px;
    line-height: 1.5em;
  }
  @media (min-width: 330px) and (max-width: 369.98px) {
    height: 440px;
    line-height: 1.5em;
  }
  @media (min-width: 370px) and (max-width: 767.98px) {
    height: 400px;
    line-height: 1.5em;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 340px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 360px;
  }
  @media (min-width: 1300px) {
    height: 400px;
  }
`

const MessageBox = styled.div`
  padding: 10px 40px;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 24px;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 10px 15px;
    > p {
      line-height: 1.25em;
      text-align: center;
    }
  }
`
