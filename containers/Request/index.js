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
import QuestionContainer from './Step2';

class RequestContainer extends React.Component {
  content = () => {
    return <QuestionContainer/>
  }
  render() {
    const content = this.content();
    return (
      <div style={{ overflow: 'hidden' }}>
        <BannerContainer/>
        <Background backgroundColor={"#f6f6f6"}>
          <Containerv1>
            <Step/>
            <RequestCardContainer title={"제품 정보 선택"} content={ content }>
            </RequestCardContainer>
          </Containerv1>
        </Background>
      </div>
    );
  }
};
export default RequestContainer;
