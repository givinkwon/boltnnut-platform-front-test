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
    phone: '',
    phone1: '',
    phone2: '',
    phone3: ''
  }

  setPhone = (idx, e) => {
    e.preventDefault();
    const nphone1 = document.getElementById("p1");
    const nphone2 = document.getElementById("p2");
    const nphone3 = document.getElementById("p3");
    
    this.setState({
                   phone1: nphone1.value,
                   phone2: nphone2.value,
                   phone3: nphone3.value,
                   phone: `${nphone1.value}-${nphone2.value}-${nphone3.value}`
                  });
    this.props.onChange(`${nphone1.value}-${nphone2.value}-${nphone3.value}`);
  }

  render() {
    const { onChange, children, label, ...props } = this.props;
    const { phone, phone1, phone2, phone3 } = this.state;

    return (
        <InputBox marginTop={label ? 12 : 0}>
          <InputCell>
            <input id = {"p1"} class="Input" {...props} 
              placeholder = {this.props.phd1} 
              value = {this.state.phone1}
              onChange={(event) => this.setPhone(1, event)}
            />
          </InputCell>
            <img src={line} style={{height: 1, margin: this.props.space}}/>
          <InputCell>
            <input id = {"p2"} class="Input" {...props} 
              placeholder = {this.props.phd2}
              value = {this.state.phone2}
              onChange={(event) => this.setPhone(2, event)}
            />
          </InputCell>
            <img src={line} style={{height: 1, margin: this.props.space}} />
          <InputCell>
            <input id = {"p3"} class="Input" {...props} 
              placeholder = {this.props.phd3} 
              value = {this.state.phone3}
              onChange={(event) => this.setPhone(3, event)}
            />
          </InputCell>
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
      width: 100%;
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
const InputCell = styled.div`
  width: 74px;
  height: 44px;
  margin-top: ${props => props.marginTop}px;
  color: #404040;
  font-weight: 400;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
  padding-left: 16px;
  padding-top: 0;
  padding-bottom: 0;
  > input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 !important;
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
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 66px;
    height: 34px;
    > input {
      width: 100%;
      height: 100%;
      border: none;
      padding: 0 !important;
      :focus {
        outline: none;
      }
      ::placeholder {
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.67;
        letter-spacing: -0.18px;
        text-align: left;
        color: #c6c7cc;
      }
    }
  }
`