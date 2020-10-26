import React from 'react';
import styled from 'styled-components'
import * as Text from './Text'
import { DARKGRAY } from 'static/style'

// 회원가입 페이지
class InputComponent extends React.Component {
  onChange = (e) => {
    if(this.props.type === 'file'){
      this.props.onChange(e.currentTarget.files[0])
    }
    else {
      this.props.onChange(e.currentTarget.value)
    }
  }
  render() {
    const { onChange, children, label, ...props } = this.props
    return (
      <Wrap>
        { label && <Text.FontSize20 color={'#505050'} fontWeight={500}>{label}</Text.FontSize20> }
        <InputBox marginTop={label ? 12 : 0}>
          <Input {...props} onChange={this.onChange}/>
          {children}
        </InputBox>
      </Wrap>
    )
  }
}

export default InputComponent

const InputBox = styled.div`
  display: flex;
  margin-top: 10px;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0;
  }
`
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > p {
    margin-top: 30px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > p {
      margin-bottom: 16px;
    }
  }
`
const Input = styled.input`
  width: 100%;
  margin-top: ${props => props.marginTop}px;

  border-radius: 3px;
  border: solid 1px #c7c7c7;
  padding: 15px 15px;
  color: #505050;
  :focus {
    outline: none;
  }
  ::placeholder {
    color : #c7c7c7;
    font-size : 20px;
    line-height: 1.7;
    letter-spacing: -0.5px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 15px 10px;
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 18px;
  }
  @media (min-width: 1300px) { 
    font-size: 18px;
  }
`