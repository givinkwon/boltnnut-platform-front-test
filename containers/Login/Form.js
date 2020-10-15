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

const logo_ic = "/static/images/logo_marine.png";
const line = "/static/images/line.png";


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
          <Logo src={logo_ic}/>
          <Text.FontSize24 color={'#0a2165'}>제품 개발 전문가 매칭 플랫폼</Text.FontSize24>
          <Input label='아이디/이메일' placeholder='아이디/이메일' onChange={Auth.setEmail}/>
          <Input label='비밀번호' placeholder='비밀번호' type='password' onChange={Auth.setPassword} onKeyDown={this.handleKeyDown}/>
          <ButtonBox>
            <ButtonComponent backgroundColor={"#0a2165"} borderColor={WHITE} borderRadius={3} borderWidth={1} onClick={Auth.login} >
              {
                Auth.loading
                ? <ButtonSpinnerComponent primary/>
                : <Text.FontSize24 color={WHITE} fontWeight={500}>로그인</Text.FontSize24>
              }
            </ButtonComponent>
            <ButtonComponent id="sign_up_button" backgroundColor={WHITE+'00'}  borderRadius={3} borderWidth={1} onClick={this.toSignUp}>
              <Text.FontSize24 color={"#505050"} fontWeight={500}>회원가입</Text.FontSize24>
            </ButtonComponent>
          </ButtonBox>
          <More>
            <CheckBoxComponent onChange={(state) => Auth.always_login = state}>
              <p style={{color: '#9999', fontSize: 16, fontWeight: 400}}>로그인 상태 유지</p>
            </CheckBoxComponent>
            <Fotget onClick={this.toForgot}>아이디 찾기</Fotget>
            {/* 로그인미완 */}
            <Line src={line}/>
            <Fotget onClick={this.toForgot}>비밀번호 찾기</Fotget>
          </More>
        </Container>
      </Form>
    )
  }
}

export default FormConatiner

const Logo = styled.img`
  cursor: pointer;
  width: 383px;
  height: 60px;
`;
const Line = styled.img`
  width: 1px;
  height: 24px;
  padding: 0 10px;
`;
const Fotget = styled.p`
  color: #0a2165;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  margin-left: auto;
  p:nth-of-type(2) {
    margin-left : 0px;
  }
  :hover {
    text-decoration: underline;
    text-decoration-color: #fff;
  }
`
const More = styled.div`
  width: 588px;
  max-width: auto;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  p:nth-of-type(2) {
    margin-left : 0px;
  }
  
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
  width : 588px; 
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 8px 0 !important;
  }
`
const ButtonBox = styled.div`
  width: 588px;
  justify-content: space-between;
  display: inline;

  div {
    width:auto;
    height: 52px;
    border: solid 1px #c7c7c7;
  }
  
  /* @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      width: 120px;
    }
  } */
`
const Form = styled.div`
  /* background-image: url('/static/images/banner.jpg');
  background-position: center;
  background-size: cover; */
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
