import React from "react";
import styled from "styled-components";
import * as Text from "./Text";
import { DARKGRAY } from "static/style";
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";

const fileImage = "/static/icon/addFile.svg";

@inject("Request", "Category")
@observer
class MultipleInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();
  }

  state = {
    fileName: "",
    file: "",
  };

  onChange = (e) => {
    if (this.props.type === "file") {
      this.props.onChange(e.currentTarget.files[0]);
    } else {
      this.props.onChange(e.currentTarget.value);
    }
  };

  onChangeFile = (e) => {
    const { Category } = this.props;

    const fileArr = e.target.files;
    let fileURLs = [];
    let file;
    let filesLength = fileArr.length > 20 ? 20 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        const fileType = file.name.split(".")[1].toLowerCase();

        if (Category.possiblePartnerPortfolioType.indexOf(fileType) > -1) {
          fileURLs[i] = reader.result;
          Category.imgUrl = [...fileURLs];
        } else {
          console.log("파일확장자 불일치");
        }
      };
      reader.readAsDataURL(file);
    }

    this.props.onChange(e.currentTarget.files);
  };

  render() {
    const { onChange, children, label, file, Request, boxHeight, ...props } =
      this.props;

    return (
      <>
        <Wrap width={this.props.width}>
          <InputBox
            style={{
              width: "100%",
              display: "inline-block",
              height: "auto",
              background: "#f6f6f6",
            }}
            onClick={() => this.file.current.click()}
          >
            <input
              type="file"
              multiple={"multiple"}
              fileName={"fileName[]"}
              style={{ display: "none" }}
              onChange={this.onChangeFile}
              ref={this.file}
              placeholder={"파일을 선택해 주세요."}
            />

            <FileuploadBox style={{ color: "#0933B3" }}>
              <img src={fileImage} style={{ marginRight: 12 }} />
              파일 첨부
            </FileuploadBox>
          </InputBox>
        </Wrap>
      </>
    );
  }
}

export default MultipleInputComponent;

const FileuploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 5px;
  background: white;
`;
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
