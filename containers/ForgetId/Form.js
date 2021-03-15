import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import ButtonComponent from 'components/Button'
import InputComponent from 'components/Input4'
import ButtonSpinnerComponent from 'components/ButtonSpinner'

import Router from 'next/router'

import * as Text from 'components/Text'
import { BLACK, WHITE, PRIMARY } from 'static/style'

const search_ic = 'static/icon/search.png'

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
      this.props.Auth.forgetId();
    }
  }
  toSignUp = () => {
    this.props.Auth.setStep(0)
    Router.push('/signup')
  }
  toLogIn = () => {
    this.props.Auth.setStep(0)
    Router.push('/login')
  }
  render(){
    const { search } = this.state
    const { Auth } = this.props
    return (
      <Form>
        <Container>
          <Text.FontSize56 color={'#0a2165'} fontWeight={700}>아이디 찾기</Text.FontSize56>
          <ForgetIDContainer>
          <Text.FontSize20 color={"#0a2165"} fontWeight= {700}>가입 시 입력했던 휴대전화번호를 입력해 주세요.</Text.FontSize20>
            <Text.FontSize20 color={'#505050'} fontWeight={'normal'}>휴대전화번호</Text.FontSize20>
            <Input placeholder='- 없이 입력해주세요' onChange={Auth.setPhone} value={Auth.phone} onKeyDown={this.handleKeyDown}/>
            <ButtonBox>
              <ButtonComponent backgroundColor={"#0a2165"} borderColor={WHITE} borderRadius={3} borderWidth={1} onClick={Auth.forgetId}>
                {
                  Auth.loading
                  ? <ButtonSpinnerComponent scale='50%' primary/>
                  : <Text.FontSize24 color={WHITE} fontWeight={500}>아이디 찾기</Text.FontSize24>
                }
              </ButtonComponent>
            </ButtonBox>
          </ForgetIDContainer>
          <Move>
            <MovePage onClick={this.toLogIn}>로그인</MovePage>
            <MovePage onClick={this.toSignUp}>회원가입</MovePage>
          </Move>
        </Container>
      </Form>
    )
  }
}

export default FormConatiner

const Move = styled.div`
  display : flex ;
  margin-top : 30px;
  width: 80%;
  display: inline-flex;
  justify-content: space-between;
  p:nth-of-type(1){
  }
`
const MovePage = styled.p`
  color: #0a2165;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.7;
  letter-spacing: -0.5px;

  :hover {
    color :#0933b3 ; 
  }
`
const ForgetIDContainer =  styled.div`
  border-radius: 10px;
  border: solid 1px #c7c7c7;
  padding : 40px;
  margin-top : 50px;
  width: 80%;
  > p { 
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.5px;
  }
`
const More = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  > p {
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.38px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > p {
      width: 100%;
      text-align: center;
    } 
  }
`
const Input = styled(InputComponent)`
  width : 100%;
  height : 49 px; 
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 7px 0 !important;
  }
`
const ButtonBox = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  > div {
    width: 100%;
    :hover {
      background-color: #0933b3;
    }
    > p {
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.42;
      letter-spacing: -0.6px;
    }
  }
`
const Form = styled.div`
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
      margin-bottom: 30px;
    }
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    ${Container} {
      padding: 40px 0;
    }
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