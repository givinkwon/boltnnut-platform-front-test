import React from 'react'
import styled from "styled-components";
import BannerContainer from './Banner0';
import Step from './StepBar';
import Containerv1 from "components/Containerv1";
// RequestCard
import RequestCardContainer from './RequestCard';
import Background from 'components/Background';
//counter
import 'react-count-animation/dist/count.min.css';

//Mobile
import MobileRequestContainer from './Mobile/Mobileindex';


import { inject, observer } from "mobx-react";

import Step1Container from "./Step1";
import Step2Container from './Step2';
import Step3Container from './Step3';
import Step4Container from './Step4';
import Step5 from './Step5';
import Step5Container from './Step5';

@inject("DetailQuestion", "Request")
@observer
class RequestContainer extends React.Component {
  state = {
    next: true,
    prev: false,
    width: 0,
    tab: 0,
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
    console.log(this.props.width)
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { Request } = this.props;
    return (
      <div style={{ overflow: 'hidden' }}>
        <BannerContainer />
        <Background backgroundColor={"#f6f6f6"}>
          <Containerv1>
            <Step />
            {/* { Request.step_index == 1 && <Step1Container page={Request.step1_index} />}
            { Request.step_index == 2 && <Step2Container />}
            { Request.step_index == 3 && <Step3Container />}
            { Request.step_index == 4 && <Step4Container />} */}
            <MobileRequestContainer/>
          </Containerv1>
        </Background>
      </div>
    );
  }
};
export default RequestContainer;
