import React from 'react'
import { inject, observer } from 'mobx-react'
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Router from 'next/router';

// RequestCard
import RequestCardContainer from './RequestCard';
import Background from 'components/Background';
//counter
import 'react-count-animation/dist/count.min.css';
import AnimationCount from 'react-count-animation';

@inject('Partner','Request')
@observer
class RequestConatiner extends React.Component {

  async componentDidMount () {
    await this.props.Partner.init(); // 제품 분야 불러오기 위함
  }

  render () {
    return (
      <Background backgroundColor={"#f6f6f6"}>
        <Containerv1>
          <RequestCardContainer title={"aa"}>
          </RequestCardContainer>
        </Containerv1>
      </Background>
    );
  }
}

export default RequestConatiner

const MarginContainer = styled.div`
  height: 200px;
  margin-bottom: 200px;
`
