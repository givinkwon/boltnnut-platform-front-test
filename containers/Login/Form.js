import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import ButtonComponent from 'components/Button'
import InputComponent from 'components/Input'
import CheckBoxComponent from 'components/CheckBox'
import ButtonSpinnerComponent from 'components/ButtonSpinner'

import Router from 'next/router'

import * as Text from 'components/Text'
import { WHITE, PRIMARY } from 'static/style'


@inject('Auth')
@observer
class FormConatiner extends React.Component {
  state = {
    search: ''
  }
  searchText = (e) => {
    this.setState({ search: e.target.value })
  }
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // TODO 검색 API
      console.log('검색');
      this.props.Auth.login()
    }
  }
  toSignUp = () => {
    this.props.Auth.setStep(0)
    Router.push('/signup')
  }
  toForgot = () => {
    this.props.Auth.reset()
    Router.push('/forget_password')
  }
  render(){
    const { search } = this.state
    const { Auth } = this.props
    return (
      <Form>
        <Container>
          <Text.FontSize40 color={WHITE} fontWeight={700} style={{textAlign: 'center', wordBreak: 'keep-all'}}>전문 제조업체 매칭 플랫폼 볼트앤너트</Text.FontSize40>
          <Text.FontSize20 color={WHITE}>전문 제조업체 매칭 플랫폼에 오신걸 환영합니다</Text.FontSize20>
          <Input label='아이디/이메일' placeholder='아이디/이메일' onChange={Auth.setEmail}/>
          <Input label='비밀번호' placeholder='비밀번호' type='password' onChange={Auth.setPassword} onKeyDown={this.handleKeyDown}/>
          <More>
            <CheckBoxComponent onChange={(state) => Auth.always_login = state}>
              <p style={{color: '#fff', fontSize: 16, fontWeight: 400}}>항상 로그인</p>
            </CheckBoxComponent>
            <Fotget onClick={this.toForgot}>비밀번호를 잊으셨나요?</Fotget>
          </More>
          <ButtonBox>
            <ButtonComponent backgroundColor={WHITE} borderColor={WHITE} borderRadius={100} onClick={Auth.login}>
              {
                Auth.loading
                ? <ButtonSpinnerComponent primary/>
                : <Text.FontSize24 color={PRIMARY} fontWeight={500}>로그인</Text.FontSize24>
              }
            </ButtonComponent>
            <ButtonComponent id="sign_up_button" backgroundColor={WHITE+'00'} borderColor={WHITE} borderRadius={100} onClick={this.toSignUp}>
              <Text.FontSize24 color={WHITE} fontWeight={500}>회원가입</Text.FontSize24>
            </ButtonComponent>
          </ButtonBox>
        </Container>
      </Form>
    )
  }
}

export default FormConatiner

const Fotget = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  margin-left: auto;
  :hover {
    text-decoration: underline;
    text-decoration-color: #fff;
  }
`
const More = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 15px;
    /*
    flex-direction: column;
    align-items: flex-start;
    */
    > p {
      margin-left: auto;
      font-size: 14px;
    }
    
    .MuiTypography-root.MuiFormControlLabel-label > p {
      font-size: 14px !important;
    }
    
    .MuiSvgIcon-root {
      width: 0.8em !important;
    }
  }
`
const Input = styled(InputComponent)`
  max-width: 400px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 8px 0 !important;
  }
`
const ButtonBox = styled.div`
  width: 100%;
  max-width: 450px;
  justify-content: space-between;
  display: flex;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      width: 120px;
    }
  }
`
const Form = styled.div`
  background-image: url('/static/images/banner.jpg');
  background-position: center;
  background-size: cover;
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    > p:nth-of-type(2){
      margin-top: 15px;
      margin-bottom: 15px;
    }
    p {
      line-height: 1.25em;
    }
  }
  min-height: 500px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: calc(100vh - 214px);
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: calc(100vh - 214px);
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    height: calc(100vh - 214px);
  }
  @media (min-width: 1300px) { 
    height: calc(100vh - 218px);
  }
`