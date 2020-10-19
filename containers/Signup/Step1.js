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

@inject('Auth')
@observer
class Step1Conatiner extends React.Component {
  Next = () => {
    const { Auth } = this.props
    if(Auth.type){
      Auth.setStep(1)
    }
  }
   render(){
    const { Auth } = this.props
    return (
      <Section>
        <Container>
          <Text.FontSize36 color={PRIMARY} fontWeight={700}>어떤 회원이신가요?</Text.FontSize36>

          <Info>
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
          </Info>

          <ButtonBox>
            <Button id="sign_uo_butoon_client" active={Auth.type==="client"} onClick={() => Auth.setType('client')}>
              <Text.FontSize36 color={DARKGRAY} fontWeight={500}>클라이언트</Text.FontSize36>
            </Button>
            <Button id="sign_uo_butoon_partner" active={Auth.type==="expert"} onClick={() => Auth.setType('expert')}>
              <Text.FontSize36 color={DARKGRAY} fontWeight={500}>전문가</Text.FontSize36>
            </Button>
          </ButtonBox>
          <NextButton backgroundColor={Auth.type ? PRIMARY : '#e6e6e6'} borderColor={Auth.type ? PRIMARY : '#e6e6e6'} borderRadius={200} onClick={this.Next}>
            <Text.FontSize20 color={Auth.type ? WHITE : '#a0a0a0'} fontWeight={500}>다음</Text.FontSize20>
          </NextButton>
        </Container>
      </Section>

    )
  }
}

export default Step1Conatiner

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