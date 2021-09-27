import React from "react";
import { inject, observer } from "mobx-react";

@inject("Request", "Partner", "Search")
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
    const { onChange, children, label, file, Request, Partner, isOpen, mobile, Search, ...props } = this.props;
    const { fileName, checkFileUpload } = this.state;

    return (
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
          <img src="/static/images/search/mobile/imgsearchicon.svg" style={{ marginLeft: 7 }} />
        </div>
      </div>
    );
  }
}

export default InputComponent;
