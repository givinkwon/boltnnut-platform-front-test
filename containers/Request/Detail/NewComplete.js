import React from 'react'
import styled from 'styled-components'

import Container from 'components/Container'
import * as Text from 'components/Text'
import { WHITE } from 'static/style'


class CompleteBannerContainer extends React.Component {
  render(){
    return (
      <Banner>
        <Container>
          <MessageBox>
            <span> 고객님의 견적 의뢰가 접수되었습니다. </span>
          </MessageBox>
          <TextBox>
            볼트앤너트 컨설턴트가 의뢰 내용을 확인하여 견적을 산출해드립니다.
          </TextBox>
          <ServiceBox>
            <span class="Header"> 최대 1영업일 이내 연락을 드립니다.</span>
            <span> 견적을 바탕으로 내 제품에 적합한 제조업체를 안내드립니다. </span>
            <br/><br/>
            <span> 상담이 필요하다면 아래의 상담하기 버튼을 눌러주세요.</span>
            <span> 제조 전문 컨설턴트가 궁금하신 사항에 답변해드립니다. </span>
            <span> 회원가입을 하지 않으셨을 경우에는 상담 진행이 어려우니 상담 전 회원가입을 부탁드립니다. </span>
          </ServiceBox>

          <ButtonBox id="request_chat_button" href='https://pf.kakao.com/_xfAxlfxb/chat'>
            무료 1:1 상담하기
          </ButtonBox>
        </Container>
      </Banner>
    )
  }
}

export default CompleteBannerContainer

const Banner = styled.div`
  background-position: center;
  background-size: cover;
  ${Container} {
    display: flex;
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
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
    height: 100%;
    line-height: 1.5em;
  }
  @media (min-width: 330px) and (max-width: 369.98px) {
    height: 100%;
    line-height: 1.5em;
  }
  @media (min-width: 370px) and (max-width: 767.98px) {
    height: 100%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 100%;
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
  margin-top: 150px;
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
    @media (min-width: 0px) and (max-width: 499.98px) {
      font-size: 14px;
      font-weight: bold;
    }
    @media (min-width: 500px) and (max-width: 767.98px) {
      font-size:  18px;
      font-weight: bold;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(65%);
    margin-bottom: calc(2.8%);
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 300px;
    font-size: 18px;
  }
  @media (min-width: 767.99px) and (max-width: 1299.98px) {
    width: 400px;
  }
`
const ServiceBox = styled.div`
  height: 372px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  .Header {
        white-space: nowrap;
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.38;
        letter-spacing: -0.8px;
        text-align: center;
        color: #0a2165;
        @media (max-width: 767.98px) and (max-width: 1299.98px) {
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 2.56;
            letter-spacing: -0.4px;
            text-align: center;
            color: #0a2165;
        }
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
    @media (max-width: 767.98px) {
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.83;
      letter-spacing: -0.3px;
      text-align: left;
      color: #191919;
    }
  }
  @media (min-width: 0) and (max-width: 767.98px) {
    width: 60%;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    display: inline-flex;
    align-items: normal;
  }
  @media (min-width: 767.98px) and (max-width: 1299.98px) {
    width: 90%;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
  }
  @media (min-width: 1300px) {
    width: 1082px;
    height: 372px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
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
  @media (max-width: 767.98px) {
      font-size: 10px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.4;
      letter-spacing: -0.25px;
      text-align: left;
      color: #191919;

  }
`
const ButtonBox = styled.a`
  margin-top: 30px;
  text-decoration:none;
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
  @media (max-width: 767.98px) {
    width: 55%;
    height: 40px;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.13;
    letter-spacing: -0.4px;
    text-align: left;
    color: #ffffff;
  }
`
