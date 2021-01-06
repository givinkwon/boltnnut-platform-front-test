import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import QuestionTitle from './Step2/QuestionTitle';
import QuestionSelect from './Step2/QuestionSelect';

class QuestionContainer extends React.Component {
  render(){
    return (
      <div>
        <QuestionTitle title={"제품은 어떤 소재인가요?"} index={ "1" }/>
        <QuestionSelect question={["4번 질문입니다", "2번질문입니다.", "3번질문입니다."]}/>
      </div>
    )
  }
}

export default QuestionContainer;
