import React from "react";
import Select from "react-select";
import RequestDetailContainer from "./RequestModal";

class MobileRequest extends React.Component {
  render() {
    return <RequestDetailContainer width={this.props.width} />;
  }
}

export default MobileRequest;
