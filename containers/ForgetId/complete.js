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
class CompleteConatiner extends React.Component {
  state = {
    search: ''
  }
  searchText = (e) => {
    this.setState({ search: e.target.value })
  }
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // TODO 검색 API
      this.props.Auth.login()
    }
  }
  toLogIn = () => {
    this.props.Auth.setStep(0)
    Router.push('/login')
  }
  render(){
    const { search } = this.state
    const { Auth } = this.props
    const emailList = Auth.email_find;
    console.log(emailList.length)
    return (
      <Form>
        <Container>
          <Text.FontSize56 color={'#0a2165'} fontWeight={700}>아이디 찾기</Text.FontSize56>
          <ForgetIDContainer>
            <Text.FontSize20 color={'#505050'} style={{paddingBottom: 15}}>입력하신 휴대폰 번호로 가입 된 이메일의 목록입니다.</Text.FontSize20>
            { emailList.length > 0 ? (
            <>
            {
              emailList.map((item,idx) => {
                return (
                  <Text.FontSize20 color={PRIMARY}> {item} </Text.FontSize20>
                )
              })
            }
            </>
            ) : (
            <>
              <Text.FontSize20 color={PRIMARY} fontWeight={'bold'}> 목록이 존재하지 않습니다. 휴대폰 번호를 다시 확인해주세요. </Text.FontSize20>
            </>
            )
            }
            <ButtonBox>
              <ButtonComponent backgroundColor={"#0a2165"} borderColor={WHITE} borderRadius={3} borderWidth={1} onClick={Auth.toLogIn}>
                {
                  Auth.loading
                  ? <ButtonSpinnerComponent scale='50%' primary/>
                  : <Text.FontSize24 color={WHITE} fontWeight={500}
                     onClick = {this.toLogIn}>
                      로그인 창으로 돌아가기</Text.FontSize24>
                }
              </ButtonComponent>
            </ButtonBox>
          </ForgetIDContainer>
        </Container>
      </Form>
    )
  }
}

export default CompleteConatiner

const ForgetIDContainer =  styled.div`
  border-radius: 10px;
  border: solid 1px #c7c7c7;
  padding : 40px;
  margin-top : 50px;
  > p {
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.5px;
  }
`
const ButtonBox = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  padding-top: 15px;
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