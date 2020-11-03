import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'
import Router from "next/router";


import Container from 'components/Container'
import ServiceContainer from 'components/ServiceContainer'
import Section from 'components/Section'
import ButtonComponent from 'components/Button'
import CheckBoxComponent from 'components/CheckBox'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

@inject('Request')
@observer
class Step1Conatiner extends React.Component {
  Info = () => {
    const { Request } = this.props
    if(Request.type == 0){
      Request.setTab(0)
      Router.push("/info")
      return
    }
    if(Request.type == 1){
      Request.setTab(1)
      Router.push("/info")
      return
    }
    if(Request.type == 2){
      Request.setTab(2)
      Router.push("/info")
      return
    }

  }
  Next = () => {
    const { Request } = this.props
    if(Request.type == 0 || Request.type == 1 || Request.type == 2){
      Request.setStep(1)
    }
  }
   render(){
    const { Request } = this.props
    return (
      <SectionContainer style={{paddiingTop : 0}}>
        <HeaderContainer>
          <Text.FontSize24 color={'#191919'} fontWeight={500}>나에게 꼭 맞는 제조방식 시작하기</Text.FontSize24>
        </HeaderContainer>
        <ServiceContainer>
          {/* <Info>
            <Text.FontSize24>
              {
                Request.type === 'client' &&
                  '의뢰를 하고자하는 의뢰사'
              }
              {
                Request.type === 'expert' &&
                  '제조 전문성을 가진 제조사'
              }
            </Text.FontSize24>
          </Info> */}

          <ButtonBox>
            <Button id="find_manufacturer" active={Request.type==0} onClick={() => Request.setType(0)}>
              <div style={{margin : 0}}>
                <Text.FontSize40 color={'#191919'} fontWeight={700}>가견적 서비스</Text.FontSize40>
                <Text.FontSize24 color={'#767676'} fontWeight={500}>원하시는 개발 조건에 적합한<br/>전문 제조사의 가견적을<br/>바로 받아보세요</Text.FontSize24>
              </div>
            </Button>
            <Button id="development_massProduct" active={Request.type==1} onClick={() => Request.setType(1)}>
              <div style={{margin : 0}}>
                <Text.FontSize40 color={'#191919'} fontWeight={700}>유통 제조 패키지</Text.FontSize40>
                <Text.FontSize24 color={'#767676'} fontWeight={500}>제품에 필요한 모든 요소를<br/>고려하여 제품 개발과 생산의<br/>A-Z까지 설계해드립니다</Text.FontSize24>
              </div>
            </Button>
            <Button id="find_estimate" active={Request.type==2} onClick={() => Request.setType(2)}>
              <div style={{margin : 0}}>
                <Text.FontSize40 color={'#191919'} fontWeight={700}>R&D 제조 패키지</Text.FontSize40>
                <Text.FontSize24 color={'#767676'} fontWeight={500}>개발부터 생산까지<br/>턴키 서비스를 통해<br/>제조 프로세스를 설계해드립니다</Text.FontSize24>
              </div>
            </Button>
          </ButtonBox>
          <NextButtonBox>
            <InfoButton backgroundColor={Request.type ? WHITE : '#ffffff'} borderColor={Request.type ? PRIMARY : '#dcdcdc'} borderRadius={3} onClick={this.Info}>
                <Text.FontSize24 color={Request.type ? PRIMARY : '#0a2165'} fontWeight={500}>알아보기</Text.FontSize24>
            </InfoButton>
            <NextButton backgroundColor={Request.type ? PRIMARY : '#0a2165'} borderColor={Request.type ? PRIMARY : '#dcdcdc'} borderRadius={3} onClick={this.Next}>
                <Text.FontSize24 color={Request.type ? WHITE : '#ffffff'} fontWeight={500}>의뢰하기</Text.FontSize24>
            </NextButton>
          </NextButtonBox>
          
        </ServiceContainer>
      </SectionContainer>

    )
  }
}

export default Step1Conatiner
const SectionContainer = styled(Section)`
  padding-top : 0px !important;
`

const HeaderContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    display: inline-flex;
    margin-bottom : 90px;
  >p {
      line-height: 1.42;
      letter-spacing: -0.6px;
      margin-right : auto;
      margin-left : auto;
      font-stretch: normal;
      font-style: normal;
    }
`

const InfoButton = styled(ButtonComponent)`
  margin-top : 80px;
  margin-left : auto;
  margin-right : 15px;
  border-radius: 3px;

  
  :hover {
    p { 
    color : #ffffff;
    }
    background-color :  #0933b3;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 117px;
    height: 52px;
    border-radius: 3px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 117px;
    height: 52px;
    border-radius: 3px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    width: 117px;
    height: 52px;
    border-radius: 3px;
  }
  @media (min-width: 1300px) { 
    width: 117px;
    height: 52px;
    border-radius: 3px;
  }
`
const NextButton = styled(ButtonComponent)`
  margin-top : 80px;
  margin-left : 15px;
  margin-right : auto;
  border-radius: 3px;
  
  :hover {
    background-color : #0933b3;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 117px;
    height: 52px;
    border-radius: 3px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 117px;
    height: 52px;
    border-radius: 3px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    width: 117px;
    height: 52px;
    border-radius: 3px;
  }
  @media (min-width: 1300px) { 
    width: 117px;
    height: 52px;
    border-radius: 3px;
  }
`
const Image = styled.img`
  width: 9px;
  height: 17px;
  margin-left : 4px;
  margin-top : 4px;
`
// const Info = styled.div`
//   > p {
//     color: #aaaaaa;
//     text-align: center;
//     @media (min-width: 0px) and (max-width: 767.98px) {
//       margin-top: 30px;
//     }
//     @media (min-width: 768px) {
//       margin-top: 30px;
//     }
//   }
// `
const NextButtonBox = styled.div`
  width: 100%;
  display: flex;
  margin-bottom : 140px;
  > p { 
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
  }
`
const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  font-stretch: normal;
  font-style: normal;
  
  div:nth-of-type(1) {
    margin-right: 18px;
  }
  div:nth-of-type(2) {
    margin-right: 18px;
    margin-left: 18px;
  }
  div:nth-of-type(3) {
    margin-left: 18px;
  }
  > p { 
    line-height: 1.35;
    letter-spacing: -1px;
  }
  > p > p { 
    line-height: 1.5;
    letter-spacing: -0.6px;
  }
  /* @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 15px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 40px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    margin-top: 50px;
  }
  @media (min-width: 1300px) { 
    margin-top: 60px;
  } */
`
const Button = styled.div`
  cursor: pointer;
  width: 588px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: 1px solid #c7c7c7;
  border-radius: 10px;
  box-sizing: border-box;
  :hover {
    border: 4px solid #0933b3;
    box-shadow: 0 3px 6px 0 var(--black-16);
  }
  p{
    display : flex;
    justify-content: center;
    align-items: center;
    text-align : center;
    :nth-of-type(1) {
      margin-bottom : 10px; 
      line-height: 1.35;
      letter-spacing: -1px;
    }
    :nth-of-type(2) {
      line-height: 1.42;
      letter-spacing: -0.6px;
    }
  }
  
  ${props => props.active && css`
    background-color: #0933b3;
    p {
      color: ${WHITE};
      display : flex; 
    }
  `}
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 300px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 340px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    height: 400px;
  }
  @media (min-width: 1300px) { 
    height: 437px;
  }
`
