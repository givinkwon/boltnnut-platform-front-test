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
import { GRAY, DARKGRAY, PRIMARY, WHITE, BLACK } from 'static/style'

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
class EmailConatiner extends React.Component {
  state = {
    width : 0, 
    name: '',
    firstPassword: '',
    lastPassword: '',
    checkPassword: '',
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
  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  //   // 파라미터로 받은 event.target.name이 name 아닐 경우에만 handleCheck함수 실행
  //   // setTimeout으로 딜레이를 준 이유는 딜레이를 주지 않았을 경우 setState 변경된 값이 handleCheck에서 바로 반영되지 않음
  //   if (e.target.name !== 'name') {
  //     setTimeout(this.handleCheck, 100);
  //   }
  // };
  handleCheck = () => {
    const { firstPassword, lastPassword } = this.state;
    // 비밀번호 무입력 상태일 때와 둘 중에 하나의 값이 입력 상태가 아닐때
    if (firstPassword.length < 1 || lastPassword.length < 1) {
      this.setState({
        checkPassword: '📝패스워드 입력📝',
      });
      // 비밀번호가 같다면 일치
    } else if (firstPassword === lastPassword) {
      this.setState({
        checkPassword: '✅일치 ✅',
      });
      // 비밀번호가 같지 않다면 불일치
    } else {
      this.setState({
        checkPassword: '❌불일치 ❌',
      });
    }
  };
   render(){
    const { Auth } = this.props;
    const { width } = this.state;
    const { name, firstPassword, lastPassword, checkPassword } = this.state;

    return (
      <div style={{marginBottom : 45}}>
        {/* <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>{Auth.type === 'expert' ? '이메일/비밀번호' : '회원가입'} </Text.FontSize20>
        </Header> */}
        <Content>
        { width > 767.98 ? (
          <>
          <W100>
            <InputComponent placeholder='이메일을 입력하세요' label='이메일 주소' onChange={Auth.setEmail} value={Auth.email}/>
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

          <W50 left>
            <InputComponent placeholder='회사명을 입력해주세요' label='회사명' type='name' onChange={Auth.setName} value={Auth.name}/>
            <br/>
            {Auth.type === 'expert' ? ''
                                     :(<Text.FontSize15 color={BLACK} fontWeight={500}>개인일 경우 '개인'을 입력해주세요</Text.FontSize15>)
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
          </W50>}
          </>
        ) : (
          <>
          <W100>
            <InputComponent placeholder='이메일을 입력하세요' label='이메일 주소' onChange={Auth.setEmail} value={Auth.email}/>
          </W100>
          <W100>
            <InputComponent name="firstPassword" value={firstPassword} placeholder='비밀번호를 입력하세요' label='비밀번호' type='password' onChange={Auth.setPassword} value={Auth.password}/>
            <span class="BoxText">8자 이상 입력해주세요</span>
          </W100>
          <W100>
            <InputComponent name="lastPassword" value={lastPassword} placeholder='비밀번호 확인을 입력하세요' label='비밀번호 확인' type='password' onChange={Auth.setPassword2} value={Auth.password2}/>
            <span class="BoxText">비밀번호가 일치합니다.</span>
            {/* //수정필요 */}
          </W100>

          <W100>
            <InputComponent placeholder='-없이 입력해주세요' label='휴대전화' type='phone' onChange={Auth.setPhone} value={Auth.phone}/>
            {/* <br/>
            {Auth.type === 'expert' ? (<Text.FontSize14 color={DARKGRAY} fontWeight={500}>제조 의뢰 관련 카카오톡 및 SMS 알림 수신을 위해 올바른 번호를 입력해주세요</Text.FontSize14>)
                                     :(<Text.FontSize14 color={DARKGRAY} fontWeight={500}>파트너와 미팅 및 계약 관련 카카오톡 및 SMS 알림 수신을 위해 올바른 번호를 입력해주세요</Text.FontSize14>)
            } */}
          </W100>
          <W100>
            <SelectBox>
              <span class="selectText">방문경로</span>
              <SelectComponent
                styles={customStyles} options={Auth.path_data} value={Auth.path}
                getOptionLabel={(option) => option.path} placeholder='옵션을 선택해주세요' onChange={Auth.setPath}/>
            </SelectBox>
          </W100>

          <W100>
            <InputComponent placeholder='회사명을 입력해주세요' label='회사명' type='name' onChange={Auth.setName} value={Auth.name}/>
          </W100>
          <W100>
            <InputComponent placeholder='직위를 입력해주세요' label='직위' type='title' onChange={Auth.setTitle} value={Auth.title}/>
          </W100>
          <W100>
            <SelectBox>
              <span class="selectText">업종</span>
              <SelectComponent
                styles={customStyles} options={Auth.business_data} value={Auth.business}
                getOptionLabel={(option) => option.business} placeholder='옵션을 선택해주세요' onChange={Auth.setBusiness}/>
            </SelectBox>
          </W100>
          {Auth.business && Auth.business.business == "기타" && <W100>
            <InputComponent placeholder='기타 업종을 입력해주세요' label='업종' type='business2' onChange={Auth.setBusiness2} value={Auth.business2}/>
            <br/>
          </W100>}
          </>
        )}
        </Content>
      </div>
    )
  }
}

export default EmailConatiner

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
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;

  padding: 0 15px;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 0px 10px;
  }
`
const Content = styled.div`
  padding: 10px 40px 40px;
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
    padding: 20px 10px;
    .BoxText {
      font-size: 10px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    .BoxText {
      font-size: 18px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    .BoxText {
    }
  }
  @media (min-width: 1300px) {
    .BoxText {
    }
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
  > p {
    margin-top: 30px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    .selectText {
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
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div > div > div {
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div > div > div {
      font-size: 18px;
    }
  }
  @media (min-width: 1300px) {
    > div > div > div {
      font-size: 20px;
    }
  }
`
