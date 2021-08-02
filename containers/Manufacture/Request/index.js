import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

import { inject, observer } from "mobx-react";

import PartnerDirectRequest from "./PartnerDirectRequest";


@inject()
@observer
class RequestContainer extends React.Component {

  render() {
    const { Request, width } = this.props;
    console.log(width)
    return (
      <>
      <Background>
        <Containerv1 style={{ width: 792 }}>
        {this.props.width >= 767.98 ? (

              <PartnerDirectRequest />
        ) : (
          <>
             {/* <PartnerDirectRequestM /> */}
          </>
        )}

        </Containerv1>
      </Background>
      </>
    );
  }
}

export default RequestContainer;
