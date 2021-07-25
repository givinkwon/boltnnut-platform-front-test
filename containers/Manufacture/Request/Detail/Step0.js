import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import Section from 'components/Section'
import ButtonComponent from 'components/Button'
import CheckBoxComponent from 'components/CheckBox'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const search_ic = 'static/icon/search.png'

@inject('Request')
@observer
class Step0Conatiner extends React.Component {
  Next = () => {
    const { Request } = this.props
    if(Request.type){
      Request.setTab(1)
    }
  }
   render(){
    const { Request } = this.props
    let center = 'center'
    return (
      <Section>
        <Container>
          <Text.FontSize36 color={PRIMARY} fontWeight={700}>원하시는 제조 영역을 선택해주세요</Text.FontSize36>

          <Info>
            <Text.FontSize24 fontWeight={500}>

                  {Request.type == "develop" &&
                  "디자인, 기구설계, 회로설계, 기계설계 등"
                  }
                  {Request.type == "develop" &&
                  <>
                  <br/><br/>
                  </>
                  }

                  {Request.type == "develop" &&
                  "제품설계업체들을 추천받으실 수 있습니다."
                  }
                  {Request.type == "develop" &&
                  <>
                  <br/><br/>
                  </>
                  }

                  {Request.type == "develop" &&
                  "제품 도면이 없다면 설계업체를 찾아보세요"
                  }

                  {Request.type == "manufacture" &&
                  "목업제작, 금형/사출, 금속가공/프레스 등의"
                  }
                  <br/><br/>
                  {Request.type == "manufacture" &&
                  "제품 생산 업체를 추천받으실 수 있습니다."
                  }

            </Text.FontSize24>
          </Info>

          <ButtonBox>
            <Button id="request_develop" active={Request.type==="develop"} onClick={() => Request.setType('develop')}>
              <Text.FontSize32 color={DARKGRAY} text-align={center} fontWeight={500}>제품 설계 업체</Text.FontSize32>
            </Button>
            <Button id="request_manufacture" active={Request.type==="manufacture"} onClick={() => Request.setType('manufacture')}>
              <Text.FontSize32 color={DARKGRAY} text-align={center} fontWeight={500}>제품 생산 업체</Text.FontSize32>
            </Button>
          </ButtonBox>
          <br/><br/>
          <Text.FontSize20 color={DARKGRAY} fontWeight={500}>* 볼트앤너트 파트너들은 서울,경기,인천의 업체입니다.</Text.FontSize20>
          <NextButton backgroundColor={Request.type ? PRIMARY : '#e6e6e6'} borderColor={Request.type ? PRIMARY : '#e6e6e6'} borderRadius={200} onClick={this.Next}>
            <Text.FontSize20 color={Request.type ? WHITE : '#a0a0a0'} fontWeight={500}>다음</Text.FontSize20>
          </NextButton>
        </Container>
      </Section>

    )
  }
}

export default Step0Conatiner

const W100 = styled.div`
  width: 100%;
`
const W50 = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    width: calc(50% - 14px);
    ${props => props.left && css`
      margin-right: 14px;
    `}
    ${props => props.right && css`
      margin-left: 14px;
    `}
  }
`
const NextButton = styled(ButtonComponent)`


  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: auto;
    margin-top: 15px;
  }
  @media (min-width: 768px) {
    margin-left: auto;
    margin-top: 30px;
  }
`
const Info = styled.div`
  > p {
    color: #aaaaaa;
    text-align: center;
    @media (min-width: 0px) and (max-width: 767.98px) {
      margin-top: 30px;
    }
    @media (min-width: 768px) {
      margin-top: 30px;
    }
  }
`
const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  background-color: #7a87a7;
    > div:nth-of-type(1){
      //background-image: url("/static/images/request/develop.jpg");
      //background-size: cover;
      //:hover{
      //background-color: ${DARKGRAY};
      //background-image: null !important;
      }
    
    > div:nth-of-type(2){
      //background-image: url("/static/images/request/manufacture.jpg");
      //background-size: cover;
    }
  @media (min-width: 0px) and (max-width: 767.98px) {
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
  }
`
const Button = styled.div`
  cursor: pointer;

  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f8f8f8;
  border: 1px solid #dddddd;
  ${props => props.active && css`
    background-color: #7a87a7;
    > p {
      color: ${WHITE};
    }
  `}
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 180px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 200px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 250px;
  }
  @media (min-width: 1300px) {
    height: 350px;
  }
`