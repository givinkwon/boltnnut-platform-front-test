import React from 'react'
import styled from "styled-components";
import BannerContainer from './Banner0';
import Step from './StepBar';
import NewButton from '../../components/NewButton';

// import 'react-count-animation/dist/count.min.css';

class RequestConatiner extends React.Component {
  render () {
    return (
      <div style={{overflow: 'hidden'}}>
        <BannerContainer />
        <Step/>
        <NewButton>다음</NewButton>
      </div>
    )
  }
}

export default RequestConatiner;
