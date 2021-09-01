import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

import { inject, observer } from "mobx-react";

import RequestContent from "./RequestContent";
import RequestComplete from "./RequestComplete";
import RequestMain from "./Home/index";

@inject("Request")
@observer
class RequestContainer extends React.Component {
  componentDidMount() {
    const { Request } = this.props;

    if (Request.requestTabIdx === 0) {
      Request.requestTabIdx = 0;
    }
  }
  render() {
    const { Request } = this.props;

    return (
      <>
        <Background>
          <Containerv1 style={{ width: 792 }}>
            {Request.requestTabIdx === 0 && <RequestMain />}
            {Request.requestTabIdx === 1 && <RequestContent />}
            {Request.requestTabIdx === 2 && <RequestComplete />}
          </Containerv1>
        </Background>
      </>
    );
  }
}

export default RequestContainer;
