import React from "react";
import styled from "styled-components";

import * as Content from "components/Content";
import { inject, observer } from "mobx-react";

@inject("Request", "Project", "Partner", "Search")
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
    const {
      onChange,
      children,
      label,
      file,
      Request,
      Partner,
      isOpen,
      mobile,
      Search,
      ...props
    } = this.props;
    const { fileName, checkFileUpload } = this.state;

    return (
      <InputBox mobile={mobile} style={{ display: "inline-flex" }}>
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
              this.file.current.click();
            }}
          >
            <CameraImgBox
              src="/static/images/camera.svg"
              scrollActive={Partner.scrollActive}
            />
          </div>
        </div>
      </InputBox>
    );
  }
}

export default InputComponent;

const CameraImgBox = styled.img`
  width: ${(props) => (props.scrollActive ? "26px" : "32px")} !important;
  height: ${(props) => (props.scrollActive ? "26px" : "32px")} !important;
  margin-top: 1px;
`;

const InputBox = styled.div`
  display: flex;
  border: solid 1px #ffffff;
  color: #404040;
  border: none;
  box-sizing: border-box;

  > div:nth-of-type(1) {
    border-radius: 3px;
    display: flex;
    align-items: center;
    position: relative;
    > div:nth-of-type(1) {
      word-wrap: break-word;
      word-break: break-all;
    }
    > div:nth-of-type(2) {
      position: absolute;
      right: 24px;
    }
  }
  > div:nth-of-type(2) {
    display: ${(props) => (props.mobile ? "" : "inline-flex")};
    width: ${(props) => (props.mobile ? "100%" : "")};

    > div:nth-of-type(1) {
      margin-right: 40px;
      cursor: pointer;
      width: ${(props) => (props.mobile ? "100%" : "")};

      > span {
        font-size: ${(props) => (props.mobile ? "14px" : "18px")};
        line-height: 40px;
        letter-spacing: ${(props) => (props.mobile ? "-0.35px" : "-0.45px")};
        color: #0933b3;
        font-weight: normal;
        box-sizing: border-box;
        margin-right: 5px;
      }
    }

    > div:nth-of-type(2) {
      width: 34px;
      word-wrap: break-word;
      word-break: break-all;

      > span {
        > span {
          > span {
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
`;
