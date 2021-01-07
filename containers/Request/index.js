import React from 'react'
import styled from "styled-components";
import BannerContainer from './Banner0';
import Step from './StepBar';
import Containerv1 from "components/Containerv1";
// RequestCard
import RequestCardContainer from './RequestCard';
import Step3Container from './Step3';
import Background from 'components/Background';
//counter
import 'react-count-animation/dist/count.min.css';
// import 'react-count-animation/dist/count.min.css';
import QuestionContainer from './Step2';
// Step
import Step1Container from "./Step1";
import Step2Container from './Step2';

class RequestContainer extends React.Component {

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <BannerContainer/>
        <Background backgroundColor={"#f6f6f6"}>
          <Containerv1>
            <Step/>
            <Step2Container/>
            <Step1Container/>
            <Step3Container title={"견 적 서"} />
          </Containerv1>
        </Background>
      </div>
    );
  }
};
export default RequestContainer;
