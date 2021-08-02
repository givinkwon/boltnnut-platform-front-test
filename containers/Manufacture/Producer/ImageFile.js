import React from "react";
import styled from "styled-components";
import * as Text from "components/Text";
import { DARKGRAY } from "static/style";
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";
import { CompressedPixelFormat } from "three";
import { toJS } from "mobx";

@inject("Request", "ManufactureProcess", "Project", "Partner", "Producer")
@observer
class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();
  }
  state = {
    fileArray: [],
    fileName: "",
    file: "",
    checkFileUpload: false,
  };

  componentWillUnmount() {
    const { Partner } = this.props;

    Partner.fileArray = [];
  }

  render() {
    const { onChange, children, label, file, Request, ManufactureProcess, Partner, isOpen, mobile, Producer, ...props } = this.props;
    const { fileName, checkFileUpload } = this.state;

    return (
      <InputBox mobile={mobile} style={{ width: "100%", display: "inline-flex" }}>
        <div>
          <input
            type="file"
            multiple={"multiple"}
            fileName={"fileName[]"}
            style={{ display: "none" }}
            onChange={Partner.onChangeFile}
            id="inputFile"
            ref={this.file}
            value=""
            placeholder={"파일을 선택해 주세요."}
          />

          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log(this.file);
              this.file.current.click();
            }}
          >
            <img src="/static/icon/camera.svg" />
          </div>
        </div>
      </InputBox>
    );
  }
}

export default InputComponent;

const InputBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  border: solid 1px #ffffff;
  color: #404040;
  border-radius: 3px;
  box-sizing: border-box;


  >div:nth-of-type(1){
      border-radius: 3px;
      display:flex;
      align-items: center;
      position: relative;
      >div:nth-of-type(1){
        word-wrap: break-word;
        word-break: break-all;
        // width: 92%;
        padding-left: 10px;

      }
      >div:nth-of-type(2){
          position: absolute;
          right: 24px;
        >img{
            float: right;
        }
      }
      
  }
  >div:nth-of-type(2){
    display: ${(props) => (props.mobile ? "" : "inline-flex")};
    width: ${(props) => (props.mobile ? "100%" : "")};

    >div:nth-of-type(1){        
      margin-right: 40px;
      cursor: pointer;
      width: ${(props) => (props.mobile ? "100%" : "")};

      >span{
        font-size: ${(props) => (props.mobile ? "14px" : "18px")};
        line-height: 40px;
        letter-sacing: ${(props) => (props.mobile ? "-0.35px" : "-0.45px")};
        color: #0933b3;
        font-weight: normal;
        box-sizing: border-box;
        margin-right: 5px;
      }
      >img {
        vertical-align : baseline;
        width: ${(props) => (props.mobile ? "20px" : "")};
        height: ${(props) => (props.mobile ? "18px" : "")};
      }      
    }
      
    >div:nth-of-type(2){      
      width: 34px;   
      word-wrap: break-word;
      word-break:break-all;
      
      >span{      
        >span{          
          >span{
            margin-right: 10px;
            font-size: 18px;
            line-height: 40px;
            letter-spacing: -0.45px;
            color: #282c36;
            font-weight: normal;
            cursor: pointer;
          }
        }
      }
    }
  }
}


`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "")};
`;
const Input = styled.div`
  width: 100%;
  margin-top: ${(props) => props.marginTop}px;
  color: #404040;
  font-weight: 400;
  padding-left: 2.3%;
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-left: 2.3% !important;
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
`;
const FileText = styled(Content.FontSize18)`
  width: ${(props) => (props.mobile ? "100%" : "1152px")}
  font-stretch: normal;
  font-style: normal;
  line-height: 40px;
  letter-spacing: -0.18px;
  text-align: left;
  color: #c6c7cc;
  display: inline-flex;
  align-items: center;
  padding: ${(props) => (props.mobile ? "0 0 0 14px" : "0 16px 0 0")};
  flex-wrap: wrap;
  background-color: #ffffff;
  box-sizing: border-box;
  height: ${(props) => (props.mobile ? "100%" : "")}
  > span:nth-of-type(1) {
    > span {
      > img {
        margin: auto;
      }
    }
  }
  > span {
    align-self: center;

    > span {
      margin-right: 10px;
      color: #282c36;
      font-weight: normal;
    }

    > img:last-child {
      margin-right: 20px;
    }
  }
`;
