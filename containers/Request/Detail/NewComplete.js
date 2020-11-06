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
            <span> 고객님의 제조 의뢰가 접수되었습니다. </span>
          </MessageBox>
          <TextBox>
            볼트앤너트 '최진영' 개발 전문 컨설턴트와 1:1 상담을 진행합니다.
          </TextBox>
          <ServiceBox>
            <span class="Header"> 아래 상담하기를 클릭해주세요.</span>
            <span> 의뢰서를 바탕으로 추가 문답 진행 후 최대 3-분 내로 내 제품에 적합한 개발업체 리스트를 받아보실 수 있습니다. </span>
            <span> 채팅방에 입장 후 꼭 볼트앤너트 ID를 입력해주세요.</span>
            <span> ID 미입력시 상담 진행이 어렵습니다. </span>
            <span> 회원가입을 하지 않으셨을 경우에는 상담 진행이 어려우니 상담 전 회원가입을 부탁드립니다. </span>
          </ServiceBox>
          <TextBox2>
            ※접속이 되지 않을 경우 아래로 문의해주세요 <br/>
            T. 02-926-6637   C. 홈페이지 우측 하단 실시간 톡
          </TextBox2>
          <ButtonBox id="request_chat_button" href='https://pf.kakao.com/_xfAxlfxb/chat'>
            무료 1:1 상담하기
          </ButtonBox>
        </Container>
      </Banner>
    )
  }
}

export default CompleteBannerConatiner

const Banner = styled.div`
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
    height: 100%;
  }
  @media (min-width: 1300px) {
    height: 100%
  }
`

const MessageBox = styled.div`
  width: 538px;
  height: 58px;
  object-fit: contain;
  border-radius: 40px;
  background-color: #0a2165;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 36px;
  > span {
    object-fit: contain;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
    text-align: center;
    color: white;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 10px 15px;
    > p {
      line-height: 1.25em;
      text-align: center;
    }
  }
`
const TextBox = styled.div`
  color: #191919;
  font-size: 28px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: -0.7px;
  text-align: center;
  margin-bottom: 40px;
`
const ServiceBox = styled.div`
  width: 1082px;
  height: 372px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  .Header {
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.38;
        letter-spacing: -0.8px;
        text-align: center;
        color: #0a2165;
  }
  > span {
    color: #191919;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.45;
    letter-spacing: -0.55px;
    text-align: center;
    :nth-of-type(2) {
      margin-top: 40px;
    }
  }
`
const TextBox2 = styled.div`
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.83;
  letter-spacing: -0.18px;
  text-align: center;
  color: #191919;
  margin-top: 26px;
  margin-bottom: 40px;
`
const ButtonBox = styled.div`
  width: 274px;
  height: 64px;
  border-radius: 4px;
  background-color: #0933b3;
  font-size: 26px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.73;
  letter-spacing: normal;
  text-align: left;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 200px;
  cursor: pointer;
`