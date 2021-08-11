import React from "react";
import styled from "styled-components";
import * as Text from "components/Text";
import { DARKGRAY } from "static/style";
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";
import { CompressedPixelFormat } from "three";

const addButtonImg = "static/images/components/Input2/Mask.png";
const deleteButtonImg = "/static/images/delete.png";
const clip = "./static/images/request/clip.svg";

@inject("Request")
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
    const { Request } = this.props;

    if (e && e.currentTarget.files[0]) {
      // 파일 추가하기
      Request.set_file_set(e.currentTarget.files[0]);
      console.log(Request.request_file_set);
      // 파일 업로드 state true로 변경
      this.setState({
        ...this.state,
        checkFileUpload: true,
      });
    }
  };

  render() {
    const { onChange, children, label, Request, isOpen, ...props } = this.props;
    const { checkFileUpload } = this.state;

    return (
      <Wrap width={this.props.width}>
        {Request.request_file_set.map((item, idx) => {
          console.log(Request.request_file_set);
          return (
            <>
              <AddFileList>
                <span
                  onClick={() => {
                    if (checkFileUpload) {
                      Request.request_file_set.splice(idx, 1);
                      const inputFile = document.getElementById("inputFile");
                      inputFile.innerHTML = "";

                      if (Request.request_file_set.length === 0) {
                        this.setState({ checkFileUpload: false });
                      }
                    }
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>
                    <img
                      src={clip}
                      style={{
                        marginLeft: 17,
                        marginRight: 17,
                      }}
                    ></img>
                    <span>{item.name}</span>
                    <DeleteFile
                      onClick={() => Request.delete_File(idx)}
                      src={deleteButtonImg}
                      style={{
                        display: this.state.checkFileUpload ? "inline" : "none",
                        marginLeft: 17,
                      }}
                    />
                  </span>
                </span>
              </AddFileList>
            </>
          );
        })}
        <FileText checkFileUpload={this.state.checkFileUpload}>
          <InputBox>
            <div>
              <input
                type="file"
                multiple={"multiple"}
                fileName={"fileName[]"}
                style={{ display: "none" }}
                onChange={this.onChangeFile}
                id="inputFile"
                ref={this.file}
                value=""
                placeholder={"파일을 선택해 주세요."}
              />
              <AddFile>
                <div
                  onClick={() => {
                    this.file.current.click();
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img src={addButtonImg} style={{ width: 30, height: 30 }} />
                  <span
                    style={{
                      fontSize: 16,
                      lineHeight: 2.13,
                      letterSpacing: -0.4,
                      color: "#0933b3",
                      marginLeft: 8,
                    }}
                  >
                    파일 첨부
                  </span>
                </div>
              </AddFile>
            </div>
          </InputBox>
        </FileText>
      </Wrap>
    );
  }
}

export default InputComponent;

const InputBox = styled.div`
  height: 42px;
  width: 100%;
  display: flex;
  align-items: center; 
  justify-content: center;
  color: #404040;
  border-radius: 3px;
  background-color: #ffffff;
  box-sizing: border-box;

  >div{
    display: flex;

    >div:nth-of-type(1){        
      cursor: pointer;

      >span{
        font-size: 18px;
        line-height: 40px;
        letter-sacing: -0.45px;
        color: #0933b3;
        font-weight: normal;
        box-sizing: border-box;
        margin-right: 5px;
      }
      >img {
        vertical-align : text-top;
      }      
    }
      
    >div:nth-of-type(2){      
      width: 950px;   
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
  width: 100%;
  font-stretch: normal;
  font-style: normal;
  line-height: 40px;
  letter-spacing: -0.18px;
  text-align: left;
  color: #c6c7cc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: solid 0.5px #c7c7c7;
  border-radius: 3px;
  background-color: #f6f6f6;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin-top: 16px;
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px !important;
    padding-top: 0px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.43;
    letter-spacing: -0.35px;
    text-align: left;
    color: #999999;
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
