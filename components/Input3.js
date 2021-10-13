import React from 'react';
import styled from 'styled-components'
import * as Text from './Text'
import { DARKGRAY } from 'static/style'

// 회원가입 페이지
class InputComponent extends React.Component {
  state = {
    width : 0, 
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
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
    const { width } = this.state;
    return (
      <Wrap>
        { width > 767.98 ? (
          <>
          { label && <Text.FontSize20 color={'#505050'} fontWeight={500}>{label}</Text.FontSize20> }

          </>
        ) : (
          <>
          { label && <span class="inputText">{label}</span> }

          </>
        )}
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
  border-bottom: 1px solid #e1e2e4;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0;
  }
`
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  

  @media (min-width: 0px) and (max-width: 767.98px) {
    > p {
      margin-bottom: 16px;
    }
    > p {
      margin-top: 16px;
    }
    >span {
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.43;
      letter-spacing: -0.35px;
      color: #505050;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > p {
      margin-top: 30px;
      /* 4% */
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > p {
      margin-top: 30px;
      /* 4% */
    } 
  }
  @media (min-width: 1300px) { 
    > p {
      margin-top: 30px;
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
    @media (min-width: 0px) and (max-width: 767.98px) {
     font-size: 14px !important;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
      font-size: 16px;
    }
    @media (min-width: 992px) and (max-width: 1299.98px) { 
      font-size: 18px;
    }
    @media (min-width: 1300px) { 
      font-size: 20px;
    }
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
    font-size: 20px;
  }
`