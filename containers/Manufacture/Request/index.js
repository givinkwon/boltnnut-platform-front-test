import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

import { inject, observer } from "mobx-react";

import RequestContent from "./RequestContent";
import RequestComplete from "./RequestComplete";

@inject("Request")
@observer
class RequestContainer extends React.Component {

  render() {
    const { Request, width } = this.props;

    return (
      <>
        <Background>
          <Containerv1 style={{ width: 792 }}>
            
            {Request.newIndex == 0 && <RequestContent />}
            {Request.newIndex == 1 && <RequestComplete />}
          </Containerv1>
        </Background>
      </>
    );
  }
}

export default RequestContainer;
