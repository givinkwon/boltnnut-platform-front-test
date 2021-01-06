import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'

class QuestionSelect extends React.Component {
  render(){
    return (
      <SelectContainer>
        {this.props.question.map((question) => <Select><Text>{question}</Text></Select>)}
      </SelectContainer>
    );
  }
}

export default QuestionSelect;

const SelectContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-left: 33px;
`
const Text = styled(Title.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.16px;
  color: #282c36;
  margin-left: 10px;
`
const Select = styled.button`
  border: none;
  width: 686px;
  height: 46px;
  background-color: #ffffff;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
