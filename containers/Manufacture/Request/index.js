import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

import { inject, observer } from "mobx-react";

import RequestContent from "./RequestContent";
import RequestComplete from "./RequestComplete";
import RequestMain from "./Home/index";
import MobileRequestContent from "Mobile/RequestContent";
import MobileRequestComplete from "Mobile/RequestComplete";
import MobileRequestMain from "Mobile/index";

@inject("Request")
@observer
class RequestContainer extends React.Component {
  componentDidMount() {
    const { Request } = this.props;
    
    if (Request.requestTabIdx === 0) {
      Request.requestTabIdx = 2;
    }
  }
  render() {
    const { Request, width } = this.props;

    return (
      <>
        {width > 767.98 ? ( 
        <Background>
          <Containerv1 style={{ width: 792 }}>
            {Request.requestTabIdx === 0 && <RequestMain width={width}/>}
            {Request.requestTabIdx === 1 && <RequestContent width={width}/>}
            {Request.requestTabIdx === 2 && <RequestComplete width={width}/>}
          </Containerv1>
        </Background>
        ) : (
        <Background>
          <Containerv1 style={{width: "100%"}}>
            {Request.requestTabIdx === 0 && <MobileRequestMain width={width}/>}
            {Request.requestTabIdx === 1 && <MobileRequestContent width={width}/>}
            {Request.requestTabIdx === 2 && <MobileRequestComplete width={width}/>}
          </Containerv1>
        </Background>
        )
        }
      </>
    );
  }
}

export default RequestContainer;
