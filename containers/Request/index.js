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
// import 'react-count-animation/dist/count.min.css';
// Step
import Step1Container from "./Step1";

class RequestContainer extends React.Component {
  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <BannerContainer/>
        <Background backgroundColor={"#f6f6f6"}>
          <Containerv1>
            <Step/>
            <Step1Container/>
          </Containerv1>
        </Background>
      </div>
    );
  }
};
export default RequestContainer;
