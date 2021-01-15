import React from 'react';
import styled from 'styled-components';
import * as Text from './Text';
import { DARKGRAY } from 'static/style';
import SelectComponent from 'components/Select';

const line = '/static/images/request/Step1/phoneline.png';

const customStyles = {
  dropdownIndicator: () => ({
    color: '#555555',
    width: "100%",
    height: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000000' : '#555555',
    backgroundColor: '#fff',
    borderRadius: 0,
    fontSize: 16,
  }),
  control: () => ({
    fontSize: 18,
    fontWeight: 500,
    color: "#282c36",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.67,
    letterSpacing: -0.18,
    height: '100%',
    border: "solid 1px #c6c7cc",
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 3,
    padding: 0,
    marginBottom: 1
  }),
  placeholder: () => ({
    paddingLeft: 8
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
}

class PhoneInputComponent extends React.Component {
  state = {
    phone1: '010',
    phone2: '',
    phone3: '',
    phone: ''
  }

  test = (idx, e) => {
    const { phone1, phone2, phone3, phone } = this.state;
    
    let nphone1;

    if (idx==1) {
      nphone1 = e.value
    } else {
      nphone1 = phone1
    }
    const nphone2 = document.getElementById("p2").value;
    const nphone3 = document.getElementById("p3").value;

    if (idx == 1) {
      this.setState({...this.state, phone1: nphone1});
    }
    
    this.setState({phone: `${nphone1}-${nphone2}-${nphone3}`});
  }

  componentDidUpdate() {
    const phone = document.getElementById("inputid").value;
    this.props.onChange(phone);
  }

  render() {
    const { onChange, children, label, ...props } = this.props;
    const { phone, phone1, phone2, phone3 } = this.state;
    console.log("render")
    

    const phonelist = [
      {label: '010', value: '010'},
      {label: '011', value: '011'},
      {label: '070', value: '070'},
    ]

    return (
        <InputBox marginTop={label ? 12 : 0}>
          <input id = {"inputid"} type = 'text' value={phone} class="Input" />
          <Select
            id = {"p1"}
            styles={customStyles} options={phonelist} getOptionLabel={(option) => option.label}
            placeholder="010" value={phone1} onChange={(event) => this.test(1, event)}
          />
            <img src={line} style={{height: 1, margin: this.props.space}}/>
          <Input id = {"p2"} {...props} placeholder = {this.props.phd2} onChange={(event) => this.test(2, event)}/>
            <img src={line} style={{height: 1, margin: this.props.space}} />
          <Input id = {"p3"} {...props} placeholder = {this.props.phd3} onChange={(event) => this.test(3, event)}/>
        </InputBox>
    )
  }
}

export default PhoneInputComponent

const InputBox = styled.div`
  width: ${(props) => (props.width ? props.width : '70%')};
  display: flex;
  align-items: center;
  margin-top: 12px;
  @media (min-width: 0px) and (max-width: 767.98px) {
      width: 56px;
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
    margin-left: 10px;
    > p {
      margin-bottom: 16px;
    }
  }
`
const Input = styled.input`
  width: ${(props) => (props.width ? props.width : 74)}px;
  height: ${(props) => (props.height ? props.height : 44)}px;
  margin-top: ${props => props.marginTop}px;
  color: #404040;
  font-weight: 400;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
  padding-left: 16px;
  padding-top: 0;
  padding-bottom: 0;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.18px;
    text-align: left;
    color: #c6c7cc;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
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
const Select = styled(SelectComponent)`
  width: ${(props) => (props.width ? props.width : 90)}px;
  height: ${(props) => (props.height ? props.height : 44)}px;
  margin-bottom: 1px;
  .css-1hb7zxy-IndicatorsContainer {
    > span {
      display: none;
    }
  }
`