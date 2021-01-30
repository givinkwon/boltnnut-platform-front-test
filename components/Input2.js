import React from 'react';
import styled from 'styled-components';
import * as Text from './Text';
import { DARKGRAY } from 'static/style';
import * as Content from 'components/Content';
import { inject, observer } from 'mobx-react'


const fileImage = 'static/images/components/Input2/Mask.png';

@inject('Request')
@observer
class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();
  }
  state = {
    fileName: '',
    file:''
  };
  onChange = (e) => {
    if(this.props.type === 'file'){
      this.props.onChange(e.currentTarget.files[0])
    }
    else {
      this.props.onChange(e.currentTarget.value)
    }
  }

  onChangeFile = (e) => {
    const {Request}  = this.props;
    const fileName = e.currentTarget.files[0].name;
    this.setState({
      ...this.state,
      file: e.currentTarget.files[0],
      fileName: fileName,
    })
    Request.setCommonFile(e.currentTarget.files[0]);
  }

  render() {
    const { onChange, children, label, file, Request, ...props } = this.props
    const { fileName } = this.state;
    console.log(this.props.width);

    if (!file) {
    return (
      <Wrap width={this.props.width}>
        { label && <Text.FontSize20 color={DARKGRAY} fontWeight={500}>{label}</Text.FontSize20> }
        <InputBox marginTop={label ? 12 : 0}>
          <Input>
            <input {...props} onChange={this.onChange}/>
          </Input>
          {children}
        </InputBox>
      </Wrap>
    )
    } else {
    return (
      <Wrap width={this.props.width}>
        <InputBox
          style={{width: 460, display: 'inline-block'}}
          onClick = {()=>this.file.current.click()}>
          <input
            type="file"
            style={{display: 'none'}}
            onChange={this.onChangeFile}
            ref={this.file}
            placeholder={"파일을 선택해 주세요."}
          />
        <FileText>
          { Request.common_file ? this.state.fileName : "파일을 선택해 주세요." }
        </FileText>
        <img
          src={fileImage}
        />
        </InputBox>
      </Wrap>  
    )
    }
  }
}

export default InputComponent

const InputBox = styled.div`
  display: flex;
  height: 50px;
  margin-top: 10px;
  border: solid 0.5px #c7c7c7;
  color: #404040;
  border-radius: 3px;
  > img {
    padding: 15px 15px;
    position: relative;
    float: right;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
      width: 206px;
      height: 32px;
      object-fit: contain;
      background-color: #ffffff;
      margin-top: 0px;
  }
`
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width ? props.width : "100%"};
  > p {
    margin-top: 15px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 12px;
    > p {
      margin-bottom: 16px;
    }
  }
`
const Input = styled.div`
  width: 100%;
  margin-top: ${props => props.marginTop}px;
  color: #404040;
  font-weight: 400;
  padding-left: 16px;
  :focus {
    outline: none;
  }
  > input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 !important;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.18px;
    text-align: left;
    font-size: 18px;
    :focus {
      outline: none;
    }
    ::placeholder {
    font-weight: 400;
    color: #c6c7cc;
  }
  }
`
const FileText = styled(Content.FontSize18)`
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.18px;
  text-align: left;
  color: #c6c7cc;
  display: flex;
  align-items: center;
  padding-left: 15px;
  position: absolute;
`