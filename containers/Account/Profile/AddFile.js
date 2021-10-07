import React from "react";
import styled from "styled-components";
import * as Text from "components/Text";
import { DARKGRAY } from "static/style";
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";
import { CompressedPixelFormat } from "three";

const addButtonImg = "static/images/components/Input2/Mask.png";
const deleteButtonImg = "/static/images/delete.svg";
const clip = "./static/images/request/clip.svg";
const addfile = "./static/images/request/addfile.svg";

@inject("Profile")
@observer
class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();
  }
  state = {
    // 파일 업로드 state
    checkFileUpload: false,
    fileArray: [],
    fileName: "",
    file: "",
  };

  // 파일이 업로드 시 돌아가는 함수
  onChangeFile = (e) => {
    const { Profile } = this.props;

    if (e && e.currentTarget.files[0]) {
      // 파일 추가하기
      Profile.set_certification(e.currentTarget.files[0]);
      // 파일 업로드 state true로 변경
      this.setState({
        ...this.state,
        checkFileUpload: true,
      });
    }
  };

  render() {
    const { onChange, children, label, Profile, isOpen, content, ...props } = this.props;
    const { checkFileUpload } = this.state;

    return (
      <Wrap width={this.props.width}>
         <FileText checkFileUpload={this.state.checkFileUpload}>
          <InputBox
            style={{ width: "100%", display: "inline-flex" }}
          >
            <div>
              <input
                type="file"
                fileName={"fileName[]"}
                style={{ display: "none" }}
                onChange={this.onChangeFile}
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
                <span>{content}</span>
              </div>
              <div></div>
              <div></div>
            </div>
          </InputBox>
        </FileText>
      </Wrap>
    );
  }
}

export default InputComponent;


const InputBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;  
  color: #fff;
  border-radius: 3px;
  box-sizing: border-box;

    
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
    //   width: 950px;   
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

  // @media (min-width: 0px) and (max-width: 767.98px) { 
  //   height: 100%;
  //   height: 34px;
  //   object-fit: contain;
  //   border-radius: 3px;
  //   background-color: #ffffff;
  //   > img {
  //     position: relative;
  //     padding-top: 8px;
  //     padding-bottom: 8px;
  //     padding-right: 20px;
  //     padding-left: 0;
  //     width: 20px;
  //     height: 18px;
  //   }
  // }

  @media (min-width: 0px) and (max-width: 767.98px) {

    >div:nth-of-type(1){
      // width: 180px;
          min-height: 35px;
        
        >div:nth-of-type(1){
          width: 88%;
          padding-left: 10px;
          line-height:20px;
          >span{
            >span{
              >span{
                font-size: 12px;
              }
            }
          }
        }
        >div:nth-of-type(2){
        
            right: 6px;
          >img{
              float: right;
              width: 15px;
              height: 15px;
          }
        }
        
    }
    >div:nth-of-type(2){
      >div:nth-of-type(1){        
        margin-right: 40px;
    
  
        >span{
      
          margin-right: 5px;
        }
        >img {
      
        }      
      }
        
      >div:nth-of-type(2){      
        
        >span{      
          >span{          
            >span{
              margin-right: 10px;
              font-size: 14px;
              line-height: 40px;
            }
          }
        }
      }
    }

  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    >div:nth-of-type(1){
      width: 500px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    >div:nth-of-type(1){
      width: 600px;
    }
  }
  @media (min-width: 1300px) {
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
  color: #fff;
  display: inline-flex;
  align-items: center;
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
const DeleteFile = styled.img`
  width: 18px;
  height: 18px;
  padding: 2px;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 9px;
  background-color: #e1e2e4;
  align-self: center;
  line-height: 40px;
  letter-spacing: -0.45px;
  margin-right: 29px;
  vertical-align: middle;
  cursor: pointer;
`;

const AddFile = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;
`;

const AddFileList = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  letter-spacing: -0.4px;
  text-align: left;
  color: #1e2222;
  margin-bottom: 8px;
`;
