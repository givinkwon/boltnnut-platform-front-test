import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

import { inject, observer } from "mobx-react";

import PartnerDirectRequest from "./PartnerDirectRequest";
import RequestComplete from "./RequestComplete";

@inject()
@observer
class RequestContainer extends React.Component {
  render() {
    const { Request, width } = this.props;
    console.log(width);
    return (
      <>
        <Background>
          <Containerv1 style={{ width: 792 }}>
            {Request.newIndex !== 1 ? (
              <PartnerDirectRequest />
            ) : (
              <RequestComplete />
            )}
            {/* <RequestComplete /> */}
            {/* <PartnerDirectRequest /> */}
          </Containerv1>
        </Background>
        {/* {this.props.width >= 1279.98 ? (
          <div style={{ overflow: "visible" }}>
            {console.log(`newIndex : ${Request.newIndex}`)}
                {Request.newIndex == 0 && (
                  <FileUploadContainer width={this.props.width} />
                )}
                {Request.newIndex == 1 && <RequestCompleteContainer />}
                {Request.newIndex == 2 && <NoneDrawingConsultingContainer />}
                {Request.newIndex == 3 && <ModifyCompleteContainer />}
            <PaymentPageContainer />
          </div>
        ) : (
          <>
             {/* <PartnerDirectRequestM /> */}
        {/* </>
        )} */}
      </>
    );
  }
}

export default RequestContainer;
