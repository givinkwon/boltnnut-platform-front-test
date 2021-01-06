import React from 'react';
import styled from 'styled-components';
import * as Text from './Text';
import { DARKGRAY } from 'static/style';
import * as Content from 'components/Content';

const fileImage = 'static/images/components/Input2/Mask.png';

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
    if(e.currentTarget.files.length === 0) {
      this.setState({
        ...this.state,
        fileName: '',
      })
      return
    }
    const fileName = e.currentTarget.files[0].name;
    this.setState({
      ...this.state,
      file: e.currentTarget.files[0],
      fileName: fileName,
    })
    console.log(this.state.fileName)
  }

  render() {
    const { onChange, children, label, file, ...props } = this.props
    const { fileName } = this.state;
    console.log(fileName)
    if (!file) {
    return (
      <Wrap>
        { label && <Text.FontSize20 color={DARKGRAY} fontWeight={500}>{label}</Text.FontSize20> }
        <InputBox marginTop={label ? 12 : 0}>
          <Input {...props} onChange={this.onChange}/>
          {children}
        </InputBox>
      </Wrap>
    )
    } else {
    return (
      <Wrap>
        <InputBox
          style={{width: 460, display: 'inline-block'}}
          onClick = {()=>this.file.current.click()}>
          <input
            type="file"
            style={{display: 'none'}}
            onChange={this.onChangeFile}
            ref={this.file}
          />
        <FileText>
          { this.state.fileName }
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
  width: 100%;
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
const Input = styled.input`
  width: 100%;
  margin-top: ${props => props.marginTop}px;
  padding: 15px 15px;
  color: #404040;
  font-weight: 400;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-weight: 400;
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