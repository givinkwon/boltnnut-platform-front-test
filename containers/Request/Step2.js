import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import QuestionTitle from './Step2/QuestionTitle';
import QuestionSelect from './Step2/QuestionSelect';
import RequestCardContainer from './RequestCard';

class Step2Container extends React.Component {
  content = () => {
    return (
      <>
        <QuestionTitle title={"제품은 어떤 소재인가요?"} index={ "1" }/>
        <QuestionSelect question={["예", "아니오"]} color={"#282c36"}/>
      </>
    );
  }
  render(){
    const content = this.content();
    return (
      <RequestCardContainer title={"제품 정보 선택"} content = { content }>
      </RequestCardContainer>
    );
  }
}

export default Step2Container;
