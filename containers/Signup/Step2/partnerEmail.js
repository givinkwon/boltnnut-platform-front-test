import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import InputComponent from 'components/Input3'
import ButtonComponent from 'components/Button'
import ButtonSpinnerComponent from 'components/ButtonSpinner'
import CheckBoxComponent from 'components/CheckBox'
import SelectComponent from 'components/Select'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const customStyles = {
  dropdownIndicator: () => ({
    color: '#555555',
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000000' : '#555555',
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
  }),
  control: () => ({
    marginTop: 10,
    border: '1px solid #c7c7c7',
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 3,
    padding: 5,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
}

@inject('Auth')
@observer
class PartnerEmailConatiner extends React.Component {
  state = {
    width : 0, 
  };
  componentDidMount() {
    this.props.Auth.getPathData()
    this.props.Auth.getBusinessData()
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

   render(){
    const { Auth } = this.props
    const { width } = this.state;

    return (
      <div style={{marginBottom : 40}}>
        <Content>
          { width > 767.98 ? (
            <>
            <Header>
              <Text.FontSize24 color={'#0933b3'} fontWeight={700}>{Auth.type === 'expert' ? '이메일/비밀번호' : '회원가입'} </Text.FontSize24>
            </Header>
            <W100>
              <InputComponent placeholder='이메일을 입력하세요' label='이메일' onChange={Auth.setEmail} value={Auth.email}/>
            </W100>
            <W50 left>
              <InputComponent placeholder='비밀번호를 입력하세요' label='비밀번호' type='password' onChange={Auth.setPassword} value={Auth.password}/>
            </W50>
            <W50 right>
              <InputComponent placeholder='비밀번호 확인을 입력하세요' label='비밀번호 확인' type='password' onChange={Auth.setPassword2} value={Auth.password2}/>
            </W50>

            <W50 left>
              <InputComponent placeholder='-없이 입력해주세요' label='휴대전화' type='phone' onChange={Auth.setPhone} value={Auth.phone}/>
              {/* <br/>
              {Auth.type === 'expert' ? (<Text.FontSize14 color={DARKGRAY} fontWeight={500}>제조 의뢰 관련 카카오톡 및 SMS 알림 수신을 위해 올바른 번호를 입력해주세요</Text.FontSize14>)
                                      :(<Text.FontSize14 color={DARKGRAY} fontWeight={500}>파트너와 미팅 및 계약 관련 카카오톡 및 SMS 알림 수신을 위해 올바른 번호를 입력해주세요</Text.FontSize14>)
              } */}
            </W50>
            <W50 right>
              <SelectBox>
                <Text.FontSize20 color={DARKGRAY} fontWeight={500}>방문경로</Text.FontSize20>
                <SelectComponent
                  styles={customStyles} options={Auth.path_data} value={Auth.path}
                  getOptionLabel={(option) => option.path} placeholder='옵션을 선택해주세요' onChange={Auth.setPath}/>
              </SelectBox>
            </W50>
            {/* <W50 left>
              <InputComponent placeholder='회사명을 입력해주세요' label='회사명' type='name' onChange={Auth.setName} value={Auth.name}/>
              <br/>
              {Auth.type === 'expert' ? ''
                                      :(<Text.FontSize14 color={DARKGRAY} fontWeight={500}>개인인 경우 '개인'을 입력해주세요</Text.FontSize14>)
              }
            </W50>
            <W50 right>
              <InputComponent placeholder='직위를 입력해주세요' label='직위' type='title' onChange={Auth.setTitle} value={Auth.title}/>
            </W50>
            <W50 left>
              <SelectBox>
                <Text.FontSize20 color={DARKGRAY} fontWeight={500}>업종</Text.FontSize20>
                <SelectComponent
                  styles={customStyles} options={Auth.business_data} value={Auth.business}
                  getOptionLabel={(option) => option.business} placeholder='옵션을 선택해주세요' onChange={Auth.setBusiness}/>
              </SelectBox>
            </W50>
            {Auth.business && Auth.business.business == "기타" && <W50 right>
              <InputComponent placeholder='기타 업종을 입력해주세요' label='업종' type='business2' onChange={Auth.setBusiness2} value={Auth.business2}/>
              <br/>
            </W50> */}


            </>
          ) : (
            <>
            <Header>
              <span>이메일/비밀번호</span>
            </Header>
            <W100>
              <InputComponent placeholder='이메일을 입력하세요' label='이메일' onChange={Auth.setEmail} value={Auth.email}/>
            </W100>
            <W100>
              <InputComponent placeholder='비밀번호를 입력하세요' label='비밀번호' type='password' onChange={Auth.setPassword} value={Auth.password}/>
              <span class="BoxText">8자 이상 입력해주세요</span>
            </W100>
            <W100>
              <InputComponent placeholder='비밀번호 확인을 입력하세요' label='비밀번호 확인' type='password' onChange={Auth.setPassword2} value={Auth.password2}/>
              <span class="BoxText">비밀번호가 일치합니다.</span>
              {/* //수정필요 */}
            </W100>
            <W100>
              <InputComponent placeholder='-없이 입력해주세요' label='휴대전화' type='phone' onChange={Auth.setPhone} value={Auth.phone}/>
            </W100>
            <W100>
              <SelectBox>
                <span class="selectHeader">방문경로</span>
                <SelectComponent
                  styles={customStyles} options={Auth.path_data} value={Auth.path}
                  getOptionLabel={(option) => option.path} placeholder='옵션을 선택해주세요' onChange={Auth.setPath}/>
              </SelectBox>
            </W100>

            </>
          )}

          
        </Content>
      </div>
    )
  }
}

export default PartnerEmailConatiner

const W100 = styled.div`
  width: 100%;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display : inline-flex;
    > span {
      white-space: nowrap;
      margin-top : auto;
      margin-right : 1px; 
      margin-left : 12px; 
    }
    
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    
  }
  @media (min-width: 1300px) {
    
  }
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
const Header = styled.div`
  display: flex;
  align-items: center;
  width : 100%;
  > p {
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > span {
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.13;
      letter-spacing: -0.4px;
      color: #0933b3;
    }

  }
  @media (min-width: 768px) and (max-width: 991.98px) {

  }
  @media (min-width: 992px) and (max-width: 1299.98px) {

  }
  @media (min-width: 1300px) {

  }
`
const Content = styled.div`
  border: solid 1px #c7c7c7;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  p{
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.5px;
  }
  div {
    border-radius: 3px;
  }
  > div > div > p {
    color: #505050;
  }
  .BoxText {
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.25px;
    color: #505050; 
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 4.8%;
    .BoxText {
      font-size: 10px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 4.8%;
    .BoxText {
      font-size: 18px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 4.8%;

  }
  @media (min-width: 1300px) {
    width : 996px;
    padding: 40px;


  }
`
const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  div {
    color : #c7c7c7;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.5px;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    .selectHeader {
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.43;
      letter-spacing: -0.35px;
      color: #505050;

    }
    > div > div > div {
      font-size: 14px;
    }
    p {
      margin-top: 8px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div > div > div {
      font-size: 16px;
    }
    > p {
      margin-top: 30px;
      /* 4% */
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div > div > div {
      font-size: 18px;
    }
    > p {
      margin-top: 30px;
      /* 4% */
    }
  }
  @media (min-width: 1300px) {
    > div > div > div {
      font-size: 20px;
    }
    > p {
      margin-top: 30px;
      /* 4% */
    }
  }
`
