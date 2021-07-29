import React from "react";
import styled from "styled-components";
import BannerContainer from "./Banner0";
import Step from "./StepBar";
import Containerv1 from "components/Containerv1";
// RequestCard
import RequestCardContainer from "./RequestCard";
import Background from "components/Background";
//counter
import "react-count-animation/dist/count.min.css";

//Mobile
import MobileRequestContainer from "./Mobile/Mobileindex";
import { inject, observer } from "mobx-react";

import RequestSelectContainer from "./RequestSelect";
import Step1Container from "./Step1";
import Step3Container from "./Step3";
import Step4Container from "./Step4";
import Step5 from "./Step5";
import Step5Container from "./Step5";
import Step6Container from "./Step6";

import FileUploadContainer from "./FileUpload";
import DisbursementContainer from "./Disbursement";

import MarketingModal from "./MarketingModal";
import PaymentPageContainer from "./PaymentPage";
import NoneDrawingConsultingContainer from "./NoneDrawingConsulting";
import MobileNoneDrawingConsultingContainer from "./Mobile/MobileNoneDrawingConsulting";
import RequestCompleteContainer from "./RequestComplete";
import MobileRequestCompleteContainer from "./Mobile/MobileRequestComplete";
import ModifyCompleteContainer from "./ModifyComplete";
import MobileModifyCompleteContainer from "./Mobile/MobileModifyComplete";
import PartnerDirectRequest from "./PartnerDirectRequest";

@inject("Partner", "ManufactureProcess", "Request", "Auth")
@observer
class RequestContainer extends React.Component {
  componentDidMount = () => {
    const { Request } = this.props;
    this.props.Auth.bgColor = "#f6f6f6";
    Request.newIndex = 0;
    if (!this.props.ManufactureProcess.changeProject) {
      console.log("ABCVDSDSDSFDFDF");
      this.props.ManufactureProcess.reset();
    }
    console.log(Request.selected_partner);
  };
  render() {
    const { Request } = this.props;
    return (
      <>
        <Background>
          <Containerv1 style={{ width: 792 }}>
            <PartnerDirectRequest />
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
            {Request.newIndex == 0 && <MobileRequestContainer />}
            {Request.newIndex == 1 && <MobileRequestCompleteContainer />}
            {Request.newIndex == 2 && <MobileNoneDrawingConsultingContainer />}
            {Request.newIndex == 3 && <MobileModifyCompleteContainer />}
          </>
        )} */}
      </>
    );
  }
}

export default RequestContainer;
