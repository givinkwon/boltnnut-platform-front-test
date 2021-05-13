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
import Step2Container from "./Step2";
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

@inject("DetailQuestion", "Partner", "ManufactureProcess", "Request", "Auth")
@observer
class RequestContainer extends React.Component {
  componentDidMount = () => {
    const { Request } = this.props;
    this.props.Auth.bgColor = "#f6f6f6";
    Request.newIndex = 0;
    this.props.ManufactureProcess.reset();
  };
  render() {
    const { Request } = this.props;
    return (
      <>
        {this.props.width >= 1279.98 ? (
          <div style={{ overflow: "visible" }}>
            <BannerContainer />

            <Background backgroundColor={"#ffffff"}>
              <Containerv1>
                {Request.newIndex == 0 && <FileUploadContainer />}
                {Request.newIndex == 1 && <RequestCompleteContainer />}
                {Request.newIndex == 2 && <NoneDrawingConsultingContainer />}
              </Containerv1>
            </Background>
          </div>
        ) : (
          <>
            {Request.newIndex == 0 && <MobileRequestContainer />}
            {Request.newIndex == 1 && <MobileRequestCompleteContainer />}
            {Request.newIndex == 2 && <MobileNoneDrawingConsultingContainer />}
          </>
        )}
      </>
    );
  }
}

export default RequestContainer;
