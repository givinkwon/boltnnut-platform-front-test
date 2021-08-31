import React from "react";
import styled from "styled-components";
import * as Text from "./Text";
import { DARKGRAY } from "static/style";
import { inject, observer } from "mobx-react";

@inject("Request", "Category")
@observer
class TextAreaComponent extends React.Component {
  onChange = (e) => {
    if (this.props.type === "file") {
      alert("G");
      this.props.onChange(e.currentTarget.files[0]);
    } else {
      this.props.onChange(e.currentTarget.value);
    }
  };

  onChangeFile = (e) => {
    this.props.onChange(e.currentTarget.files);
  };

  render() {
    const { onChange, children, label, file, Request, boxHeight, ...props } =
      this.props;

    return (
      <Wrap width={this.props.width}>
        {label && (
          <Text.FontSize20 color={DARKGRAY} fontWeight={500}>
            {label}
          </Text.FontSize20>
        )}
        <InputBox marginTop={label ? 12 : 0} boxHeight={boxHeight}>
          <Input>
            <textarea {...props} onChange={this.onChange} />
          </Input>
          {children}
        </InputBox>
      </Wrap>
    );
  }
}

export default TextAreaComponent;

const InputBox = styled.div`
  display: flex;
  height: ${(props) => (props.boxHeight ? props.boxHeight : "50px")};

  width: 100%;
  border: solid 1px #c7c7c7;
  color: #404040;
  border-radius: 3px;

  > img {
    padding: 15px 15px;
    position: relative;
    float: right;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 100%;
    height: 34px;
    object-fit: contain;
    border-radius: 3px;
    background-color: #ffffff;
    > img {
      position: relative;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-right: 20px;
      padding-left: 0;
      width: 20px;
      height: 18px;
    }
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "100%")};
  > p {
    margin-top: 15px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
`;
const Input = styled.div`
  width: 100%;
  margin-top: ${(props) => props.marginTop}px;
  color: #404040;
  font-weight: 400;
  padding-top: 22px;
  padding-left: 16px;
  :focus {
    outline: none;
  }
  > textarea {
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
    font-size: 16px;
    resize: none;
    :focus {
      outline: none;
    }
    ::placeholder {
      font-weight: 400;
      color: #c6c7cc;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    // padding-left: 2.3% !important;
    padding-left: 16px;
    > input {
      width: 100%;
      height: 100%;
      border: none;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.67;
      letter-spacing: -0.18px;
      text-align: left;
      font-size: 14px;
      :focus {
        outline: none;
      }
      ::placeholder {
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 2.43;
        letter-spacing: -0.35px;
        text-align: left;
        color: #999999;
        padding-left: 0;
      }
    }
  }
`;
