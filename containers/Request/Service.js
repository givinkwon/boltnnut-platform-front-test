import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'


import Container from 'components/Container'
import ServiceContainer from 'components/ServiceContainer'
import Section from 'components/Section'
import ButtonComponent from 'components/Button'
import CheckBoxComponent from 'components/CheckBox'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const search_ic = 'static/icon/search.png'
const right = "/static/images/main/main_right.png";


@inject('Auth')
@observer
class Step1Conatiner extends React.Component {
  Next = () => {
    const { Auth } = this.props
    if(Auth.type){
      Auth.setStep(1)
    }
  }
  Info = () => {
    const { Auth } = this.props
    if(Auth.type){
      Auth.setStep(1)
    }
  }
   render(){
    const { Auth } = this.props
    return (
      <Section style={{paddiingTop : 0}}>
        <ServiceContainer>
          {/* <Info>
            <Text.FontSize24>
              {
                Auth.type === 'client' &&
                  '의뢰를 하고자하는 의뢰사'
              }
              {
                Auth.type === 'expert' &&
                  '제조 전문성을 가진 제조사'
              }
            </Text.FontSize24>
          </Info> */}

          <ButtonBox>
            <Button id="sign_uo_button_client" active={Auth.type==="client"} onClick={() => Auth.setType('client')}>
              <div style={{margin : 0}}>
                <Text.FontSize40 color={'#191919'} fontWeight={700}>제조사찾기 서비스</Text.FontSize40>
                <Text.FontSize24 color={'#767676'} fontWeight={500}>제조 컨설턴트와 전문 제조사가<br/>고객님의 아이디어를 컨설팅 드리고<br/>현실화 시켜드립니다</Text.FontSize24>
              </div>
            </Button>
            <Button id="sign_uo_button_partner" active={Auth.type==="expert"} onClick={() => Auth.setType('expert')}>
              <div style={{margin : 0}}>
                <Text.FontSize40 color={'#191919'} fontWeight={700}>양산개발 서비스</Text.FontSize40>
                <Text.FontSize24 color={'#767676'} fontWeight={500}>지속적인 소통과 제품 분석 시스템으로<br/>제품 생산에 불필요한 과정을 방지하여<br/>양산 비용을 최대 40% 절감합니다.</Text.FontSize24>            
              </div>
            </Button>
            <Button id="sign_uo_button_partner" active={Auth.type==="expert"} onClick={() => Auth.setType('expert')}>
              <div style={{margin : 0}}>
                <Text.FontSize40 color={'#191919'} fontWeight={700}>견적수량 도출 서비스</Text.FontSize40>
                <Text.FontSize24 color={'#767676'} fontWeight={500}>국내 제조사와 해외유통사 네크워크를<br/>통해 원하는 조건에 맞는 제조견적, MOQ<br/>(최소발주수량)등의 정보를 전달해드립니다.</Text.FontSize24>            
              </div>
            </Button>
          </ButtonBox>
          <NextButtonBox>
            <InfoButton backgroundColor={Auth.type ? WHITE : '#ffffff'} borderColor={Auth.type ? PRIMARY : '#dcdcdc'} borderRadius={3} onClick={this.Info}>
                <Text.FontSize24 color={Auth.type ? PRIMARY : '#0a2165'} fontWeight={500}>알아보기</Text.FontSize24>
            </InfoButton>
            <NextButton backgroundColor={Auth.type ? PRIMARY : '#0a2165'} borderColor={Auth.type ? PRIMARY : '#dcdcdc'} borderRadius={3} onClick={this.Next}>
                <Text.FontSize24 color={Auth.type ? WHITE : '#ffffff'} fontWeight={500}>의뢰하기</Text.FontSize24>
            </NextButton>
          </NextButtonBox>
          
        </ServiceContainer>
      </Section>

    )
  }
}

export default Step1Conatiner

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