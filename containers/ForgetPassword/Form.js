import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import ButtonComponent from 'components/Button'
import InputComponent from 'components/Input'
import ButtonSpinnerComponent from 'components/ButtonSpinner'

import Router from 'next/router'

import * as Text from 'components/Text'
import { WHITE, PRIMARY } from 'static/style'

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
      // TODO 검색 API
      console.log('검색');
      this.props.Auth.login()
    }
  }
  render(){
    const { search } = this.state
    const { Auth } = this.props
    return (
      <Form>
        <Container>
          <Text.FontSize40 color={WHITE} fontWeight={700}>비밀번호 재설정</Text.FontSize40>
          <Text.FontSize20 color={WHITE}>가입한 이메일 주소가 무엇인가요?</Text.FontSize20>
          <Input label='이메일' placeholder='이메일' onChange={Auth.setEmail} value={Auth.email}/>
          <Input label='휴대폰' placeholder='휴대폰' onChange={Auth.setPhone} value={Auth.phone} onKeyDown={this.handleKeyDown}/>
          <More>
            <Text.FontSize16 color={WHITE} fontWeight={500}>
              다음 버튼을 누르시면 해당 이메일로 비밀번호를<br/>
              재설정하기 위한 안내절차를 발송합니다.
            </Text.FontSize16>
          </More>
          <ButtonBox>
            <ButtonComponent backgroundColor={WHITE} borderColor={WHITE} borderRadius={100} onClick={Auth.forget}>
              {
                Auth.loading
                ? <ButtonSpinnerComponent scale='50%' primary/>
                : <Text.FontSize24 color={PRIMARY} fontWeight={500}>비밀번호 재설정하기</Text.FontSize24>
              }
            </ButtonComponent>
          </ButtonBox>
        </Container>
      </Form>
    )
  }
}

export default FormConatiner

const More = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  > p {
    line-height: 1.4;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > p {
      margin-top: 30px;
      width: 100%;
      text-align: center;
    } 
  }
`
const Input = styled(InputComponent)`
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 7px 0 !important;
  }
`
const ButtonBox = styled.div`
  width: 100%;
  max-width: 450px;
  justify-content: space-between;
  display: flex;
  > div {
    width: 100%;
  }
`
const Form = styled.div`
  background-image: url('/static/images/banner.jpg');
  background-position: center;
  background-size: cover;
  ${Container} {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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